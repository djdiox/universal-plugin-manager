<template>
  <v-app>
    <v-navigation-drawer app>
      <!-- -->
    </v-navigation-drawer>
    <system-bar style="display: flex; width: 100%" />

    <app-header style="display:flex;width:100%" />
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
      (c) dj diox 2022
    </v-footer>
  </v-app>
</template>

<script>
import appHeader from '@/components/header'
import SystemBar from '@/components/SystemBar.vue'

export default {
  name: 'DefaultLayout',
  components: { appHeader, SystemBar }
}
</script>

<style>
body {
  margin: 0 !important;
}
</style>
