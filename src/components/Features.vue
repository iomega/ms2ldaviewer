<template>
  <div class="q-pa-md">
    <h5>Features</h5>
    <q-table :data="data" :columns="columns" dense :pagination.sync="pagination" >
        <template v-slot:body-cell-motifs="props">
            <q-td :props="props">
                <ul>
                    <li v-for="motif in props.row.motifs" v-bind:key="motif.id">
                        {{ motif.id }} ({{ motif.prob }})
                    </li>
                </ul>
            </q-td>
        </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: 'Features',
    props: ['features', 'phis'],
    data() {
        return {
            columns: [{
                name: 'name',
                label: 'Name',
                sortable: true,
                field: 'name'
            }, {
                name: 'intensity',
                field: 'intensity',
                sortable: true,
                label: 'Intensity'
            }, {
                name: 'motifs',
                field: 'motifs',
                label: 'Mass2Motif (prob)'
            }],
            pagination: {
                sortBy: 'intensity',
                descending: true,
                rowsPerPage: 25
            }
        }
    },
    computed: {
        data() {
            return Object.entries(this.features).map(([name, intensity]) => {
                const motifs = Object.entries(this.phis[name]).map(
                    ([motif, prob]) => {return {id: motif, prob}}
                );
                return {
                    name, intensity, motifs
                };
            })
        }
    },
});
</script>