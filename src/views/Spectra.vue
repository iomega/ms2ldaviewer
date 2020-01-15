<template>
    <div class="q-pa-md">
        <h5>Spectra: {{ spectraid }}</h5>
        <SpectraMeta :meta="metadata"/>
        <MotifsOfSpectra :spectraid="spectraid"/>
        <FeaturesOfSpectra :features="features" :phis="phis"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import FeaturesOfSpectra from '@/components/FeaturesOfSpectra.vue';
import SpectraMeta from '@/components/SpectraMeta.vue';
import MotifsOfSpectra from '@/components/MotifsOfSpectra.vue';
import { store } from '@/store';

export default Vue.extend({
    components: {
        FeaturesOfSpectra,
        SpectraMeta,
        MotifsOfSpectra
    },
    computed: {
        spectraid() {
            return this.$route.params.id;
        },
        features() {
            const id = this.$route.params.id;
            const document = store.state.dataset.corpus[id];
            return document;
        },
        phis() {
            const id = this.$route.params.id;
            const document = store.state.dataset.phi[id];
            return document;
        },
        metadata() {
            const id = this.$route.params.id;
            return store.state.dataset.doc_metadata[id];
        }
    }
})
</script>