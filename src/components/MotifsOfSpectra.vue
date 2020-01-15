<template>
  <div class="q-mt-md"> 
    <SpectraPlot :spectraid="spectraid" :motifid="motifid" />
    <h5>Associated motifs</h5>
    <q-table
      :data="data"
      row-key="name"
      :columns="columns"
      dense
      :pagination.sync="pagination"
      selection="single"
      :selected.sync="selected"
    >
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <router-link :to="{ name: 'motif', params: { name: props.value }}">{{ props.value }}</router-link>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import FeaturesOfSpectra from "@/components/FeaturesOfSpectra.vue";
import SpectraMeta from "@/components/SpectraMeta.vue";
import MotifsOfSpectra from "@/components/MotifsOfSpectra.vue";
import SpectraPlot from "@/components/SpectraPlot.vue";
import { store } from "@/store";

export default Vue.extend({
  name: "MotifsOfSpectra",
  props: ["spectraid"],
  components: {
    SpectraPlot
  },
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
      const theta = store.state.dataset.theta[this.spectraid];
      const overlaps = store.state.dataset.overlap_scores[this.spectraid];

      return Object.entries(theta).map(([name, prob]) => {
        const overlap = overlaps[name];
        return { name, prob, overlap };
      });
    },
    motifid() {
      if ((this as any).selected.length) {
        return (this as any).selected[0].name;
      } else {
        return "";
      }
    }
  }
});
</script>