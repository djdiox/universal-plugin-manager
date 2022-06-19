<template>
  <v-container fluid>
    <h1>Test</h1>
    <input type="file" webkitdirectory directory multiple @change="onFileChange">
    <button @click.prevent="showFolder(folder)">Show Path</button>
  </v-container>
</template>

<script >
import { shell } from 'electron'
export default {
  name: 'IndexPage',
  data () {
    return {
      externalContent: '',
      folder: []
    }
  },
  methods: {
    openURL (url) {
      window.open(url)
    },
    async onFileChange (e) {
      const files = e.target.files || e.dataTransfer.files
      console.log(e, e.target.files)
      if (!files.length) {
        this.folder = e.target.files
        console(this.folder)
      }
    },
    async showFolder () {
      const result = await shell.openPath(folder)
      console.log(result)
    }
  }
}
</script>

<style>
.e-nuxt-container {
  min-height: calc(100vh - 50px);
  background: linear-gradient(to right, #ece9e6, #ffffff);
  font-family: Helvetica, sans-serif;
}

.e-nuxt-content {
  display: flex;
  justify-content: space-around;
  padding-top: 100px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.e-nuxt-logo {
  width: 400px;
}

.e-nuxt-system-info {
  padding: 20px;
  border-top: 1px solid #397c6d;
  border-bottom: 1px solid #397c6d;
}

.e-nuxt-links {
  padding: 100px 0;
  display: flex;
  justify-content: center;
}

.e-nuxt-button {
  color: #364758;
  padding: 5px 20px;
  border: 1px solid #397c6d;
  margin: 0 20px;
  border-radius: 15px;
  font-size: 1rem;
}

.e-nuxt-button:hover {
  cursor: pointer;
  color: white;
  background-color: #397c6d;
}
</style>
