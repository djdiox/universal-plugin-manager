<template>
  <v-container />
</template>

<script>
const electron = require('electron')
export default {
  mounted () {
    const notify = new electron.Notification({
      title: 'Successful Logged in!',
      subtitle: 'You can now access the features'
    })
    notify.show()
  }
}
</script>

<style></style>
