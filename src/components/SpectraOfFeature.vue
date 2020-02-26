<template>
<div class="q-mt-md">
    <h6>In spectra</h6>
    <p>Total intensity in dataset: {{ total }}</p>
    <p>Appears in {{ count }} spectra</p>
    <q-table :data="spectra" row-key="name" :columns="columns" dense :pagination.sync="pagination">
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
import { store } from '@/store'

type ISpectra = {name: string, intensity: number}[];

export default Vue.extend({
  name: "SpectraOfFeature",
  props: ["featureid"],
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
          name: "intensity",
          field: "intensity",
          sortable: true,
          label: "Intensity"
        }
      ],
      pagination: {
        sortBy: "intensity",
        descending: true,
        rowsPerPage: 25
      }
    };
  },
  computed: {
      spectra() {
          const featureid = this.featureid;
          const allspectra = store.state.dataset.corpus;
          const spectrawithfeature: ISpectra = [];
          Object.entries(allspectra).forEach(([name, features]) => {
              const intensity = features[featureid];
              if (intensity) {
                spectrawithfeature.push({ name, intensity });
              }
          });
          return spectrawithfeature;
      },
      total() {
          const spectra: ISpectra = this.spectra;
          return spectra.map(s => s.intensity).reduce((a, c) => a + c);
      },
      count() {
          const spectra: ISpectra = this.spectra;
          return spectra.length;
      }
  }
});
</script>