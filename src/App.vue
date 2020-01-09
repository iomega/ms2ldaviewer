<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          MS2LDA viewer
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item clickable exact to="/">
          <q-item-section>
            <q-item-label>Summary</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/spectras">
          <q-item-section>
            <q-item-label>Spectras</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/motifs">
          <q-item-section>
            <q-item-label>Motifs</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/settings">
          <q-item-section>
            <q-item-label>Settings</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/pick">
          <q-item-section>
            <q-item-label>Pick a dataset</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/about">
          <q-item-section>
            <q-item-label>About</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

<style>
</style>
