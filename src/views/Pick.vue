<template>
  <div class="q-pa-md">
    <Start v-on:load-example="onLoadExample" v-on:load-url="onLoadUrl" v-on:load-file="onLoadFile" />
  </div>
</template>

<script>
// @ is an alias to /src
import { store } from "@/store";
import router from "@/router";
import Start from "@/components/Start.vue";
import Summary from "@/components/Summary.vue";

export default {
  name: "pick",
  components: {
    Start
  },
  methods: {
    onLoadExample: async function() {
      await store.dispatch("loadExample");
      router.push({ name: "home" });
    },
    onLoadUrl: async function(url) {
      await store.dispatch("loadFromUrl", url);
      router.push({ name: "home" });
    },
    onLoadFile: async function(file) {
      await store.dispatch("loadFromFile", file);
      router.push({ name: "home" });
    }
  }
};
</script>
