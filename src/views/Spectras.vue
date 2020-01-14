<template>
    <div class="q-pa-md">
        <h5>List of spectras</h5>
        <q-table :data="data" :columns="columns" dense @row-click="gotoSpectra" :pagination.sync="pagination"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import router from '@/router';
import { store } from '@/store';

export default Vue.extend({
    name: 'spectras',
    data() {
        return {
            columns: [{
                name: 'name',
                label: 'Name',
                sortable: true,
                field: 'filename'
            }, {
                name: 'precursormass',
                field: 'precursormass',
                sortable: true,
                label: 'Precursor Mass'
            }, {
                name: 'parentmass',
                field: 'parentmass',
                sortable: true,
                label: 'Parent Mass'
            }],
            pagination: {
                sortBy: 'name',
                rowsPerPage: 25
            }
        }
    },
    computed: {
        data() {
            const docs = store.state.dataset.doc_metadata;
            return Object.entries(docs).map(([k, v]) => {
                return {id: k, ...v};
            })
        }
    },
    methods: {
        gotoSpectra: function(_event: any, {id}: any) {
            router.push({name:'spectra', params: {id}})
        }
    }
})
</script>