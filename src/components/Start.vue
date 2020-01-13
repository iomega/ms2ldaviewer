<template>
    <div>
        <button v-on:click="$emit('load-example')">Load example</button>
        <div>Or</div>
        <button disabled>Upload JSON document</button>
        <div>Or</div>
        <q-input label="Load from URL" v-model="url" v-on:keyup.enter="loadUrl"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'Start',
    data() {
        return {
            url: ''
        };
    },
    methods: {
        loadUrl: function() {
            this.$emit('load-url', this.url)
        }
    }
})
</script>