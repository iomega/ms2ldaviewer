<template>
  <div class="q-mt-md">
    <h5>Spectras</h5>
    <q-table :data="data" row-key="name" :columns="columns" dense :pagination.sync="pagination">
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <router-link :to="{ name: 'spectra', params: { id: props.value }}">{{ props.value }}</router-link>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { store } from "@/store";
export default Vue.extend({
  name: "SpectrasOfMotif",
  props: ["motifid"],
  data() {
    return {
      columns: [
        {
          name: "name",
          label: "Name",
          sortable: true,
          field: "name"
        },
        {
          name: "prob",
          field: "prob",
          sortable: true,
          label: "Probability"
        },
        {
          name: "overlap",
          field: "overlap",
          sortable: true,
          label: "Overlap score"
        }
      ],
      pagination: {
        sortBy: "prob",
        descending: true,
        rowsPerPage: 25
      },
      selected: []
    };
  },
  computed: {
    data() {
      const overlaps = store.state.dataset.overlap_scores;
      return Object.entries(
        store.state.dataset.theta
      ).filter(([name, motifs]) => motifs.hasOwnProperty(this.motifid))
      .map(([name, motifs]) => {
          const overlap = overlaps[name][this.motifid];
          return {
            name,
            prob: motifs[(this as any).motifid],
            overlap
          }
      });
    }
  }
});
</script>