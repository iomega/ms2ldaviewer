<template>
  <div class="q-pa-md">
    <h5>Feature: {{ id }}</h5>
    <p>Mass range: {{ range[0] }} - {{ range[1] }} </p>
    <SpectraOfFeature :featureid="id"/>
    <MotifsOfFeature :featureid="id"/>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { store } from '@/store'
import SpectraOfFeature from '@/components/SpectraOfFeature.vue'
import MotifsOfFeature from '@/components/MotifsOfFeature.vue'

export default Vue.extend({
    components: {
        SpectraOfFeature,
        MotifsOfFeature
    },
    computed: {
        id() {
            return this.$route.params.name;
        },
        range() {
            const id = this.$route.params.name;
            return store.state.dataset.features[id];
        }
    }
})
</script>