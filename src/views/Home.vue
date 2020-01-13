<template>
  <div class="q-pa-md">
    <Summary v-bind:dataset="dataset"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Summary from '@/components/Summary.vue'
import { store } from '@/store';
import { dataset } from '@/db';

export default {
  name: 'home',
  components: {
    Summary
  },
  computed: {
    dataset: function() {
      return dataset;
    }
  }
}
</script>
