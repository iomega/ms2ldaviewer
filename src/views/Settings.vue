<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input type="number" v-model="probability" label="Proablility threshold" step="0.01" />
      <q-input type="number" v-model="overlap" label="Overlap score threshold" step="0.01"/>
      <div>
        <q-btn label="Save" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: function() {
    return {
      probability: 0.1,
      overlap: 0.2
    };
  },
  methods: {
      onSubmit() {
        //   store.commit()
      },
      onReset() {
          this.probability = 0.1;
          this.overlap = 0.2;
      }
  }
});
</script>