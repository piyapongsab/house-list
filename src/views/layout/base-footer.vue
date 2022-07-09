<template>
  <div v-show="flag_connect" class="bg_footer">
    <v-layout justify-center>
      <v-flex class="xs12 sm4 md4 lg4 mt-9">
        <span class="black--text text--lighten-1">SELECT POST CODE</span>
        <v-autocomplete
          v-model="postCode"
          :items="itemPostCode"
          item-value="post_code"
          item-text="post_code"
          no-data-text="ไม่พบข้อมูล"
          label="SELECT POST CODE"
          solo
          dense
          outlined
          return-object
        />
        <v-flex v-if="postCode && postCodeDetail" class="txtpostCode">
          <div>Average: {{ postCodeDetail.average || "-" }}</div>
          <div>Median: {{ postCodeDetail.median || "-" }}</div>
        </v-flex>
      </v-flex>
    </v-layout>
    <loading v-model="loading" />
  </div>
</template>
<script>
import { sync } from "vuex-pathify";
import axios from "axios";
import { isEmpty } from "lodash";
import Loading from "@/components/loading.vue";

export default {
  components: {
    Loading,
  },
  data() {
    return {
      loading: false,
      postCode: null,
      postCodeDetail: null,
      itemPostCode: [],
    };
  },
  computed: {
    ...sync("*"),
  },
  watch: {
    flag_connect(val) {
      if (!val) return this.defualtData();
      this.getItemPostCode();
    },
    postCode(value) {
      if (isEmpty(value)) return;
      axios
        .get(`${this.endpoint}/postCode/${value.post_code}`)
        .then((response) => {
          this.postCodeDetail = response.data.payload;
        })
        .catch((e) => {
          this.postCodeDetail = null;
        });
    },
  },
  methods: {
    async getItemPostCode() {
      this.loading = true;
      axios
        .get(`${this.endpoint}/postCode/`)
        .then((response) => {
          this.itemPostCode = response.data.payload;
        })
        .catch((e) => {
          this.itemPostCode = [];
        });
      this.loading = false;
    },
    defualtData() {
      this.postCode = null;
      this.postCodeDetail = null;
      this.itemPostCode = [];
    },
  },
};
</script>
