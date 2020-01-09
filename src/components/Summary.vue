<template>
  <div>
    <div>{{ dataset.loaded }}</div>
    <div>{{ dataset.corpus }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Summary',
  props: ['dataset']
})
</script>