<template>
  <v-container fluid>
    <h1>Installed Applications</h1>
    <!-- <input type="file" webkitdirectory directory multiple @change="onFileChange"> -->
    <!-- <v-btn @click.prevent="showFolder()">Show Path</v-btn> -->

    <!-- <p v-for="item in folder" :key="item.path" @click="openURL(item.path)">
      {{ item.name }}
    </p> -->
    <!-- <v-data-table :headers="headers" :items="folder" :items-per-page="5" class="elevation-1" /> -->
    <v-card>
      <v-card-title>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details />
      </v-card-title>
      <v-data-table :headers="headers" :items="folder" :search="search" @click:row="handleClick" />
    </v-card>
  </v-container>
</template>

<script>
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import electron, { app } from 'electron'
import * as uuid from 'uuid'

// // import CrudController from '../../db/crud-controller'
// import { Low, JSONFile } from 'lowdb';
// const __dirname = dirname(fileURLToPath(import.meta.url)) // Use JSON file for storage
// const file = join(__dirname, 'db.json')
// const adapter = new JSONFile(file)
// const db = new Low(adapter)

// // const { shell, dialog } = require('electron')
// // { path: fullPath, isLink: true, attributes: stats, fileName, name: fileName.split('.')[0] }
// const controller = new CrudController()
export default {
  name: 'IndexPage',
  data () {
    return {
      externalContent: '',
      search: '',
      path: '',
      folder: [],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'path', value: 'path' },
        { text: 'isLink', value: 'isLink' }
      ]
    }
  },
  async mounted () {
    // const adapter = new JSONFile('db.json')
    // const db = new Low(adapter)
    // await db.read()
    this.showFolder()
  },
  methods: {
    handleClick (item) {
      console.log(item)
      this.$router.push({ path: '/apps/' + item.id })
    },
    async showFolder () {
      switch (process.platform) {
      case 'win32':
        this.path = 'C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs'
        await this.showFolderWin32('C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs')
        break
      case 'darwin':
        this.path = '/Applications/'
        await this.showFolderMacOS(this.path)
        break
      default:
        // eslint-disable-next-line no-case-declarations
        const notify = new Notification('Not Supported', {
          body: process.platform + ' is not supported'
        })
        console.log(notify)
        // ipcRenderer.invoke('showDialog', 'message')
        // dialog.showOpenDialogSync(BrowserWindow.getFocusedWindow(), {
        //   title: 'Unsupported platform',
        //   message: process.platform + ' is not supported yet',
        //   type: 'error'
        // })
        // fs.writeFileSync('./apps.json', JSON.stringify((this.folder, null, 2)))
      }
    },
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
    async showFolderMacOS () {
      // const result = await shell.openPath(folder)
      const dir = fs
        .readdirSync(this.path)
        .flatMap(file => {
          // const currentPath = this.path + '/' + file
          // if (fs.statSync(currentPath).isDirectory()) {
          //   return fs.readdirSync(currentPath).map(otherFile => {
          //     return currentPath + '/' + otherFile
          //   })
          // }
          return this.path + file
        })
        .map(fullPath => {
          const fileName = path.basename(fullPath)
          const stats = fs.statSync(fullPath)
          const res = {
            path: fullPath,
            isLink: true,
            id: uuid.v4(),
            attributes: stats,
            fileName,
            name: fileName.split('.')[0]
          }
          return res
        })
        .filter(app => app.fileName.endsWith('.app'))

      // const res = await walk(this.folder)
      // this.folder = dir
      // this.folder = this.folder.map(app => {
      //   app.hash = crypto.createHash('md5').update(JSON.stringify(app)).digest('hex')
      //   return app
      // })
      this.folder = dir
      fs.writeFileSync('./apps.json', JSON.stringify(this.folder, null, 2), 'utf-8')
      console.log(dir)
    }
  },
  async showFolderWin32 (path) {
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
          id: uuid.v4(),
          isLink: false,
          attributes: null,
          fileName,
          name: fileName.split('.')[0]
        }
        if (fullPath.endsWith('lnk')) {
          try {
            res.attributes = electron.shell.readShortcutLink(fullPath)
            res.isLink = true
          } catch (error) {
            console.log('Can not read from ' + fullPath, error)
            // console.error('Cannot read shortcut')
          }
        }
        return res
      })
    // const res = await walk(this.folder)

    this.folder = this.folder.map(app => {
      app.hash = crypto.createHash('md5').update(JSON.stringify(app)).digest('hex')
      return app
    })
    this.folder = dir
    fs.writeFileSync('./apps.json', JSON.stringify(this.folder, null, 2), 'utf-8')
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
