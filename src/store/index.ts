import Vue from 'vue'
import Vuex from 'vuex'
import { loadExampleDataset, loadFromUrl } from '@/db'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loaded: false,
        loading: false,
        thresholds: {
            probability: 0.1,
            overlap: 0.2
        }
    },
    mutations: {
        beforeLoad(state) {
            state.loading = true
            state.loaded = false
        },
        afterLoad(state) {
            state.loading = false
            state.loaded = true
        }
    },
    actions: {
        async loadExample({commit}) {
            commit('beforeLoad');
            await loadExampleDataset();
            commit('afterLoad');
        },
        async loadFromUrl({commit}, url) {
            commit('beforeLoad');
            await loadFromUrl(url);
            commit('afterLoad');
        }
    }
})