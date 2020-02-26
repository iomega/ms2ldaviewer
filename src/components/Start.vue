<template>
    <div class="q-pa-md q-gutter-sm">
        <q-btn v-on:click="$emit('load-example')" label="Load example" flat/>
        <div>Or</div>
        <q-file v-on:input="loadFile" label="Upload JSON document" accept=".json, application/json"/>
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
            url: '',
            file: null
        };
    },
    methods: {
        loadUrl: function() {
            this.$emit('load-url', this.url)
        },
        loadFile: function(value: any) {
            this.$emit('load-file', value);
        }
    }
})
</script>