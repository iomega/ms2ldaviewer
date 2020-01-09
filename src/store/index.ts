import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loaded: false,
        dataset: {
        },
        thresholds: {
            probability: 0.1,
            overlap: 0.2
        }
    },
    mutations: {
        loadExampleDataset(state) {
            state.dataset = {
                corpus: 'mycorpus'
            }
            state.loaded = true
        }
    }
})