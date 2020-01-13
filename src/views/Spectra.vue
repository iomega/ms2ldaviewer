<template>
    <div class="q-pa-md">
        <h5>Spectra: {{ id }}</h5>
        <Features v-bind:features="features" v-bind:phis="phis"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { dataset } from '@/db';
import Features from '@/components/Features.vue';

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
            const document = dataset.corpus[id];
            return document;
        },
        phis() {
            const document = dataset.phi[this.$route.params.id];
            return document;
        }
    }
})
</script>