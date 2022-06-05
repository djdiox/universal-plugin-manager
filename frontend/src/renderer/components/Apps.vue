<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    Keychain = require("1password");
    keychain = new Keychain();
    keychain.load("./1password.cloudkeychain", function (err) {
      console.log("Keychain has loaded");
    });
  },
};
</script>

<style>
</style>