<template>
    <div class="q-pa-md">
        <h5>Spectra: {{ id }}</h5>
        <Features v-bind:features="features" v-bind:phis="phis"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Features from '@/components/Features.vue';
import { store } from '@/store';

export default Vue.extend({
    components: {
        Features
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
        features() {
            const id = this.$route.params.id;
            const document = store.state.dataset.corpus[id];
            return document;
        },
        phis() {
            const document = store.state.dataset.phi[this.$route.params.id];
            return document;
        }
    }
})
</script>