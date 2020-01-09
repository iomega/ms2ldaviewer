<template>
  <div class="q-pa-md">
    <Start v-on:load-example="onLoadExample"/>
  </div>
</template>

<script>
// @ is an alias to /src
import { store } from '@/store';
import router from '@/router';
import Start from '@/components/Start.vue'
import Summary from '@/components/Summary.vue'

export default {
  name: 'pick',
  components: {
    Start
  },
  methods: {
    onLoadExample: function() {
      store.commit('loadExampleDataset')
      router.push({name:'home'})
    }
  }
}
</script>
