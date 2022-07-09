<template>
  <div class="bg_header">
    <v-layout justify-center>
      <v-flex xs12 sm12 md4 lg4 mr-16 mt-5>
        <span class="black--text text--lighten-1">URL</span>
        <v-text-field
          v-model="url"
          label="Url"
          placeholder="http://localhost"
          filled
          solo
          prefix="*"
          outlined
          dense
          :disabled="flag_connect"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm12 md3 lg3 mr-16 mt-5>
        <span class="black--text text--lighten-1">Port</span>
        <v-text-field
          v-model="port"
          label="Port"
          placeholder="8000"
          filled
          solo
          prefix="*"
          type="number"
          outlined
          dense
          :disabled="flag_connect"
        ></v-text-field>
      </v-flex>
      <v-flex md2 sm12 mt-12 v-show="!flag_connect">
        <v-btn
          color="primary"
          :disabled="!formIsValid"
          @click="connect(url, port)"
          >Connect
        </v-btn>
      </v-flex>
      <v-flex md2 sm12 mt-12 v-show="flag_connect">
        <v-btn color="error" @click="dicconnect">DisConnect </v-btn>
      </v-flex>
    </v-layout>
    <loading v-model="loading" />
  </div>
</template>
<script>
import { sync } from "vuex-pathify";
import { isEmpty } from "lodash";
import Loading from "@/components/loading.vue";

export default {
  components: {
    Loading,
  },
  data() {
    return {
      loading: false,
      url: "",
      port: "",
    };
  },
  computed: {
    ...sync("*"),
    formIsValid() {
      return this.url && this.port;
    },
  },
  methods: {
    connect(url, port) {
      if (isEmpty(url) && isEmpty(port)) return;
      this.loading = true;
      this.endpoint = `${url}:${port}`;
      this.flag_connect = true;
      this.loading = false;
    },
    dicconnect() {
      this.url = "";
      this.port = "";
      this.$store.commit("resetState");
    },
  },
};
</script>
