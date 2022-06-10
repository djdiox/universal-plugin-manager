<template>
  <div></div>
</template>

<script>
import Keychain from '1password'
export default {
  mounted () {
    console.log(this.$electron)
    // Keychain = require("1password");
    keychain = new Keychain()
    keychain.load('./1password.cloudkeychain', function (err) {
      console.log('Keychain has loaded')
    })
  }
}
</script>

<style>
</style>