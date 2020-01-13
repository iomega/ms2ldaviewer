<template>
    <div>
        <h5>Experiment options</h5>
    <ul>
        <li>
            K: {{ dataset.K }}
        </li>
    </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ExperimentOptions',
  props: ['dataset']
})
</script>