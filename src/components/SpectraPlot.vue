<template>
  <svg :height="height" :width="width" xmlns="http://www.w3.org/2000/svg">
    <line
      class="parent"
      :x1="parent.x1"
      :y1="parent.y1"
      :x2="parent.x2"
      :y2="parent.y2"
      :stroke="parent.stroke"
      :stroke-width="2"
    >
      <title>{{ parent.name }}</title>
    </line>
    <g class="fragments">
      <line
        v-for="f in fragments"
        :key="f.x1"
        :x1="f.x1"
        :y1="f.y1"
        :x2="f.x2"
        :y2="f.y2"
        :stroke="f.stroke"
        :stroke-width="2"
      >
        <title>{{ f.name }}</title>
      </line>
    </g>
    <g class="losses">
      <line
        v-for="f in losses"
        :key="f.x1"
        :x1="f.x1"
        :y1="f.y1"
        :x2="f.x2"
        :y2="f.y2"
        :stroke="f.stroke"
        stroke-dasharray="4"
        :stroke-width="2"
      >
        <title>{{ f.name }}</title>
      </line>
    </g>
    <g />
  </svg>
</template>

<script lang="ts">
import Vue from "vue";
import { store } from "@/store";
import { scaleLinear } from "d3-scale";

export default Vue.extend({
  name: "SpectraPlot",
  props: ["spectraid", "motifid"],
  data() {
    return {
      width: 700,
      height: 300
    };
  },

  computed: {
    features() {
      const corpus = store.state.dataset.corpus[this.spectraid];
      const meta = store.state.dataset.doc_metadata[this.spectraid];
      const fragments = Object.keys(corpus)
        .filter(d => d.startsWith("fragment_"))
        .map(d => {
          const mass = parseFloat(d.split("_")[1]);
          return {
            name: d,
            mass,
            intensity: corpus[d]
          };
        });
      const losses = Object.keys(corpus)
        .filter(d => d.startsWith("loss_"))
        .map(d => {
          const mass = parseFloat(d.split("_")[1]);
          return {
            name: d,
            mass,
            intensity: corpus[d]
          };
        });

      return {
        parent: {
          mass: meta.parentmass,
          // TODO parent can have no intensity
          intensity: meta.parentintensity || (this as any).maxIntensity
        },
        fragments,
        losses
      };
    },
    maxIntensity() {
      const corpus = store.state.dataset.corpus[this.spectraid];
      return Object.values(corpus).sort((a, b) => b - a)[0];
    },
    maxMass() {
      const parentMass = (this as any).features.parent.mass;
      const corpus = store.state.dataset.corpus[this.spectraid];
      const fragmentMass = Object.keys(corpus)
        .map(d => parseFloat(d.split("_")[1]))
        .sort((a, b) => b - a)[0];
      if (parentMass > fragmentMass) {
        return parentMass;
      } else {
        return fragmentMass;
      }
    },
    xScale() {
      const domain = [0, (this as any).maxMass];
      const range = [0, (this as any).width];
      return scaleLinear()
        .domain(domain)
        .range(range);
    },
    yScale() {
      const domain = [0, (this as any).maxIntensity];
      const range = [(this as any).height, 0];
      return scaleLinear()
        .domain(domain)
        .range(range);
    },
    parent() {
      const stroke = "blue";
      const x = (this as any).xScale((this as any).features.parent.mass);
      const y1 = (this as any).yScale(0);
      const y2 = (this as any).yScale((this as any).features.parent.intensity);
      return {
        x1: x,
        y1,
        x2: x,
        y2,
        stroke,
        name: "Parent"
      };
    },
    fragments() {
      const beta = this.motifid
        ? store.state.dataset.beta[this.motifid as any]
        : {};
      return (this as any).features.fragments.map((d: any) => {
        const stroke = beta.hasOwnProperty(d.name) ? "red" : "black";
        const x = (this as any).xScale(d.mass);
        const y1 = (this as any).yScale(0);
        const y2 = (this as any).yScale(d.intensity);
        return {
          x1: x,
          y1,
          x2: x,
          y2,
          stroke,
          name: d.name
        };
      });
    },
    losses() {
      const beta = this.motifid
        ? store.state.dataset.beta[this.motifid as any]
        : {};
      return (this as any).features.losses.map((d: any) => {
        const stroke = beta.hasOwnProperty(d.name) ? "red" : "black";
        const x1 = (this as any).xScale(
          (this as any).features.parent.mass - d.mass
        );
        const x2 = (this as any).xScale((this as any).features.parent.mass);
        const y = (this as any).yScale(d.intensity);
        return {
          x1,
          y1: y,
          x2,
          y2: y,
          stroke,
          name: d.name
        };
      });
    }
  }
});
</script>