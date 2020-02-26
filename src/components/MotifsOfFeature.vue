<template>
  <div class="q-mt-md">
    <h6>In motifs</h6>
    <q-table
      :data="motifs"
      row-key="name"
      :columns="columns"
      dense
      :pagination.sync="pagination"
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
import { store } from "@/store";

export default Vue.extend({
  name: "MotifsOfFeature",
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
          name: "prob",
          field: "prob",
          sortable: true,
          label: "Probability"
        }
      ],
      pagination: {
        sortBy: "prob",
        descending: true,
        rowsPerPage: 25
      }
    };
  },
  computed: {
    motifs() {
      const featureid = this.featureid;
      const beta = store.state.dataset.beta;
      const data: {name: string, prob: number}[] = [];
      Object.entries(beta).forEach(([name, features]) => {
          const prob = features[featureid];
          if (prob) {
              data.push({name, prob});
          }
      });
      return data;
    }
  }
});
</script>