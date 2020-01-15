import Vue from 'vue'
import Vuex from 'vuex'
import { loadExampleDataset, loadFromUrl, IDataset } from '@/db'

Vue.use(Vuex)

const emptyDataset: IDataset = {
    K: 0,
    doc_metadata: {},
    corpus: {},
    phi: {},
    topic_metadata: {},
    beta: {},
    theta: {},
    overlap_scores: {}
}
Object.freeze(emptyDataset);

export const store = new Vuex.Store({
    state: {
        loaded: false,
        loading: false,
        thresholds: {
            probability: 0.1,
            overlap: 0.2
        },
        dataset: emptyDataset
    },
    mutations: {
        beforeLoad(state) {
            state.loading = true
            state.loaded = false
        },
        afterLoad(state, dataset) {
            state.loading = false
            state.loaded = true
            Object.freeze(dataset) // Dataset is read-only, dont let vuejs watch for changes
            state.dataset = dataset
        }
    },
    actions: {
        async loadExample({commit}) {
            commit('beforeLoad');
            const dataset = await loadExampleDataset();
            commit('afterLoad', dataset);
        },
        async loadFromUrl({commit}, url) {
            commit('beforeLoad');
            const dataset = await loadFromUrl(url);
            commit('afterLoad', dataset);
        }
    }
})