  <template>
  <div id="wrapper">
    <main>
      <v-container>
        <div>
          
        </div>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Description</th>
                <th class="text-left">Install</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in plugins" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td><v-btn @click="install(item)">Install</v-btn></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </main>
  </div>
</template>

  <script>
// import SystemInformation from './LandingPage/SystemInformation'
// import HelloWorld from './HelloWorld.vue'
export default {
  name: "landing-page",
  data(){
    return {
      currentPlugin: 'Wox'
    }
  }, 
  components: {
    // HelloWorld
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    install(plugin) {

    }
  },
};
</script>

  <style>
@import url("https://fonts.googleapis.com/css?family=Roboto");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Roboto", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}
</style>
