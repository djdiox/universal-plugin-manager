<template>
  <v-system-bar dark color="primary" window>
    <v-spacer />
    <v-icon>mdi-wifi-strength-4</v-icon>
    <v-icon>mdi-signal-cellular-outline</v-icon>
    <v-icon>mdi-battery</v-icon>
    <span>{{ time }}</span>
  </v-system-bar>
</template>

<script>
export default {
  computed: {
    time () {
      const date = new Date()
      return date.getHours() + ' : ' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    }
  }
}
</script>

<style></style>
