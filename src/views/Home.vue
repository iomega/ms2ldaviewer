<template>
  <div class="home">
    <Start v-on:load-example="onLoadExample"/>
    <Summary v-if="dataset.loaded" v-bind:dataset="dataset"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Start from '@/components/Start.vue'
import Summary from '@/components/Summary.vue'

export default {
  name: 'home',
  components: {
    Start,
    Summary
  },
  data: function() {
    return {
      dataset: {
        loaded: false
      }
    }
  },
  methods: {
    onLoadExample: function() {
      this.dataset = {
        loaded: true,
        corpus: 'mycorpus'
      }
    }
  }
}
</script>
