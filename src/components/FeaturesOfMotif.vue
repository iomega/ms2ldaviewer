<template>
    <div class="q-pa-md">
        <h5>Features</h5>
        After thresholding to save the model, the total probability left in this motif is {{ total }}.
        <q-table :data="data" :columns="columns" dense :pagination.sync="pagination">
            <template v-slot:body-cell-name="props">
                <q-td :props="props">
                    <router-link :to="{ name: 'feature', params: { name: props.value }}">{{ props.value }}</router-link>
                </q-td>
            </template>
        </q-table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { store } from '@/store'
export default Vue.extend({
    name: 'FeaturesOfMotif',
    props: ['motifid'],
    data() {
        return {
            columns: [{
                name: 'name',
                label: 'Feature',
                sortable: true,
                field: 'name'
            }, {
                name: 'prob',
                field: 'prob',
                sortable: true,
                label: 'Probability'
            }],
            pagination: {
                sortBy: 'prob',
                descending: true,
                rowsPerPage: 25
            }
        }
    },
    computed: {
        data() {
            const beta = store.state.dataset.beta[this.motifid];
            return Object.entries(beta).map(([name, prob]) => {
                return { name, prob}
            });
        },
        total() {
            const beta = store.state.dataset.beta[this.motifid];
            return Object.values(beta).reduce((a ,c) => a + c);
        }
    }
})
</script>