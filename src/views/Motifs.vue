<template>
    <div class="q-pa-md">
        <h5>List of motifs</h5>
        <q-table :data="data" :columns="columns" dense @row-click="gotoMotif" :pagination.sync="pagination"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import router from '@/router';
import { store } from '@/store';

export default Vue.extend({
    name: 'motifs',
    data() {
        return {
            columns: [{
                name: 'name',
                label: 'Name',
                sortable: true,
                field: 'name'
            }, {
                name: 'type',
                label: 'Type',
                field: 'type'
            }],
            pagination: {
                sortBy: 'name',
                rowsPerPage: 25
            }
        }
    },
    computed: {
        data() {
            return Object.values(store.state.dataset.topic_metadata);
        }
    },
    methods: {
        gotoMotif: function(_event: any, {name}: any) {
            router.push({name:'motif', params: {name}})
        }
    }
})
</script>