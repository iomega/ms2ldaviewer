<template>
    <div class="q-pa-md">
        <h5>Motif: {{ id }}</h5>
        <span>Type: {{ meta.type }}</span>
        <FeaturesOfMotif :motifid="id"/>
        <SpectrasOfMotif :motifid="id"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { store } from '@/store'
import FeaturesOfMotif from '@/components/FeaturesOfMotif.vue';
import SpectrasOfMotif from '@/components/SpectrasOfMotif.vue';

export default Vue.extend({
    components: {
        FeaturesOfMotif,
        SpectrasOfMotif
    },
    computed: {
        id() {
            return this.$route.params.name;
        },
        meta() {
            const id = this.$route.params.name;
            return store.state.dataset.topic_metadata[id];
        },
        beta() {
            const id = this.$route.params.name;
            return Object.entries(store.state.dataset.beta[id]).map(
                ([feature, prob]) => {
                    return {feature, prob};
                }
            );
        }
    }
})
</script>