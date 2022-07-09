<template>
  <div class="content">
    <v-data-table
      :headers="headers"
      :items="itemPost"
      dense
      :items-per-page="5"
      v-show="flag_connect"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>HOUSE LIST</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="50%" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="success" dark class="mb-2" v-bind="attrs" v-on="on">
                create
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                      :style="`${
                        $vuetify.breakpoint.mdAndUp
                          ? 'margin-top: -1rem'
                          : 'margin-top: -1rem'
                      }`"
                    >
                      <v-text-field
                        prefix="*"
                        v-model="editedItem.name"
                        label="Name"
                        placeholder="Name"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                      :style="`${
                        $vuetify.breakpoint.mdAndUp
                          ? 'margin-top: -1rem'
                          : 'margin-top: -1rem'
                      }`"
                    >
                      <v-text-field
                        prefix="*"
                        v-model="editedItem.post_code"
                        label="Post Code"
                        placeholder="Post Code"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                      :style="`${
                        $vuetify.breakpoint.mdAndUp
                          ? 'margin-top: -1rem'
                          : 'margin-top: -1rem'
                      }`"
                    >
                      <v-text-field
                        prefix="*"
                        v-model="editedItem.price"
                        label="Price"
                        placeholder="Price"
                        type="number"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      :style="`${
                        $vuetify.breakpoint.mdAndUp
                          ? 'margin-top: -1rem'
                          : 'margin-top: -1rem'
                      }`"
                    >
                      <v-textarea
                        v-model="editedItem.desc"
                        rows="4"
                        outlined
                        dense
                        label="Description"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions
                :style="`${
                  $vuetify.breakpoint.mdAndUp
                    ? 'margin-top: -2rem'
                    : 'margin-top: -2rem'
                }`"
              >
                <v-layout justify-center>
                  <v-btn class="mr-10" outlined @click="close"> Cancel </v-btn>
                  <v-btn
                    :disabled="!formIsValid"
                    :color="editedIndex === -1 ? 'success' : 'warning'"
                    @click="submit(editedIndex === -1, editedItem)"
                  >
                    {{ editedIndex === -1 ? "Create" : "Update" }}
                  </v-btn>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn class="btn_detail mr-6" rounded @click="editItem(item)">
          view detail
        </v-btn>
        <v-btn class="btn_delete" rounded @click="deleteItem(item)">
          delete
        </v-btn>
      </template>
      <template v-slot:no-data> House List is Empty </template>
    </v-data-table>
    <loading v-model="loading" />
  </div>
</template>
<script>
import axios from "axios";
import { sync } from "vuex-pathify";
import Swal from "sweetalert2";
import Loading from "@/components/loading.vue";

export default {
  components: {
    Loading,
  },
  data() {
    return {
      loading: false,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "ID",
          align: "center",
          sortable: false,
          value: "id",
          bold: true,
        },
        { text: "Name", align: "center", value: "name", sortable: false },
        {
          text: "Post Code",
          align: "center",
          value: "post_code",
          sortable: false,
        },
        { text: "Price", align: "center", value: "price", sortable: false },
        { text: "Action", align: "center", value: "actions", sortable: false },
      ],
      itemPost: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        post_code: "",
        price: "",
        desc: "",
      },
      defaultItem: {
        name: "",
        post_code: "",
        price: "",
        desc: "",
      },
    };
  },
  computed: {
    ...sync("*"),
    formTitle() {
      return this.editedIndex === -1 ? "Create" : "Item Detail";
    },
    formIsValid() {
      return (
        this.editedItem.name &&
        this.editedItem.post_code &&
        this.editedItem.price
      );
    },
  },
  watch: {
    flag_connect(val) {
      if (!val) return;
      this.getDataHome();
    },
  },
  methods: {
    getDataHome() {
      this.loading = true;
      axios
        .get(`${this.endpoint}/home/?skip=1&take=100`)
        .then((response) => {
          this.itemPost = response.data.payload;
        })
        .catch((e) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Network Error & House List is Empty ",
            showConfirmButton: false,
            timer: 2500,
          });
        });
      this.loading = false;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    editItem(item) {
      this.editedIndex = this.itemPost.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    submit(val, item) {
      let body = {
        name: item.name,
        desc: item.desc,
        price: item.price,
        post_code: item.post_code,
      };
      if (val) {
        axios
          .post(`${this.endpoint}/home/`, body)
          .then((response) => {
            this.dialog = false;
            this.close()
            this.dialogSwal(
              true,
              "Success",
              "create a success",
              "success",
              "#3085d6",
              "CONTINUE"
            );
          })
          .catch((e) => {
            this.dialogSwal(
              false,
              "Fail",
              "let's try one more again",
              "error",
              "#3085d6",
              "TRY AGAIN",
              true
            );
          });
      } else {
        axios
          .patch(`${this.endpoint}/home/${item.id}`, body)
          .then((response) => {
            this.dialog = false;
            this.close()
            this.dialogSwal(
              true,
              "Success",
              "Update a success",
              "success",
              "#3085d6",
              "CONTINUE"
            );
          })
          .catch((e) => {
            this.dialogSwal(
              false,
              "Fail",
              "let's try one more again",
              "error",
              "#3085d6",
              "TRY AGAIN",
              true
            );
          });
      }
    },
    deleteItem(item) {
      axios
        .delete(`${this.endpoint}/home/${item.id}`)
        .then((response) => {
          this.getDataHome();
        })
        .catch((e) => {
          this.dialogSwal(
            false,
            "Fail",
            "let's try one more again",
            "error",
            "#3085d6",
            "TRY AGAIN",
            true
          );
        });
    },
    dialogSwal(flag, title, text, icon, color, btnText, cancel = false) {
      Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonColor: color,
        confirmButtonText: btnText,
        showCancelButton: cancel,
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          if (!flag) {
            this.submit(this.editedIndex === -1, this.editedItem);
          } else {
            this.getDataHome();
          }
        }
      });
    },
  },
};
</script>
<style>
.v-data-table {
  line-height: 4.5 !important;
  max-width: 100%;
}
.v-text-field__prefix,
.v-text-field__suffix {
  align-self: center;
  cursor: default;
  transition: color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  white-space: nowrap;
  color: red;
}
</style>
