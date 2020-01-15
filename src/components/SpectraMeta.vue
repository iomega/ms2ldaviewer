<template>
    <ul>
        <li>Title: {{ meta.title }}</li>
        <li>Filename: {{ meta.filename }}</li>
        <li>MS level: {{ meta.mslevel }}</li>
        <li>Scans: {{ meta.scans }}</li>
        <li>Charge: {{ meta.charge }}</li>
        <li>Precursor mass: {{ meta.precursormass }}</li>
        <li>Parent mass: {{ meta.parentmass }}</li>
        <li>Instrument: {{ meta.instrument }}</li>
        <li>SMILES: {{ meta.smiles }}</li>
        <li>INCHI key: {{ meta.inchikey }}</li>
    </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { IDocMetadata } from '@/db';

@Component
export default class SpectraMeta extends Vue {
    @Prop() meta!: IDocMetadata;
}
</script>