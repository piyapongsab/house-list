<template>
  <div>
    <base-header />
    <v-layout justify-center>
        <dataTable />
    </v-layout>
    <v-layout justify-center>
        <base-footer />
    </v-layout>
  </div>
</template>
<script>
import { sync } from "vuex-pathify";
import dataTable from "../views/table/dataTable.vue";
import BaseFooter from "../views/layout/base-footer.vue";
import BaseHeader from "../views/layout/base-header.vue";

export default {
  components: {
    dataTable,
    BaseFooter,
    BaseHeader,
  },
  data() {
    return {
    };
  },
  computed: {
    ...sync("*"),
  },
};
</script>
