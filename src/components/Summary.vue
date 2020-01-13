<template>
  <div>
    <div>Summary of ms2LDA result dataset</div>
    <Options v-bind:dataset="dataset"/>
    <div>
    <router-link to="/spectras">{{ nrSpectras }} spectras</router-link>
    </div><div>
    <router-link to="/motifs">{{ nrMotifs }} motifs</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Options from './ExperimentOptions.vue'

export default Vue.extend({
  name: 'Summary',
  props: ['dataset'],
  components: {
    Options
  },
  computed: {
    nrSpectras() {
      return Object.keys(this.dataset.corpus).length;
    },
    nrMotifs() {
      return Object.keys(this.dataset.topic_metadata).length;
    }
  }
})
</script>