<template>
  <v-container fluid>
    <h1>Test</h1>
    <input type="file" webkitdirectory directory multiple @change="onFileChange">
    <v-btn @click.prevent="showFolder()">Show Path</v-btn>
  </v-container>
</template>

<script>
import fs from 'fs'
import path from 'path';
import { shell } from 'electron'
export default {
  name: 'IndexPage',
  data () {
    return {
      externalContent: '',
      path: 'C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs',
      folder: []
    }
  },
  mounted () {
    this.showFolder()
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
      // const result = await shell.openPath(folder)
      const dir = fs
        .readdirSync(this.path)
        .flatMap(file => {
          const currentPath = this.path + '\\' + file
          if (fs.statSync(currentPath).isDirectory()) {
            return fs.readdirSync(currentPath).map(otherFile => {
              return currentPath + '\\' + otherFile
            })
          }
          return this.path + '\\' + file
        })
        .map(fullPath => {
          const fileName = path.basename(fullPath)
          const res = {
            path: fullPath,
            isLink: false,
            attributes: null,
            fileName,
            name: fileName.split('.')[0]
          }
          if (fullPath.endsWith('lnk')) {
            try {
              res.attributes = shell.readShortcutLink(fullPath)
              res.isLink = true
            } catch (error) {
              console.log('Can not read from ' + fullPath, error)
              // console.error('Cannot read shortcut')
            }
          }
          return res
        })
      // const res = await walk(this.folder)

      console.log(dir)
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
