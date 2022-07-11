<template>
  <header class="main-header">
    <!-- <nav>
      <div>
        <nuxt-link to="/" exact> System info </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/apps" exact> Apps </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/tasks" exact> Tasks</nuxt-link>
      </div>
    </nav> -->
    <v-card class="mx-auto overflow-hidden" height="100vh" width="100%">
      <v-app-bar color="deep-purple" dark>
        <v-app-bar-nav-icon @click="drawer = true" />

        <v-toolbar-title>Plugin Manager</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" absolute temporary>
        <template #prepend>
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/women/81.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Jane Smith</v-list-item-title>
              <v-list-item-subtitle>Logged In</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-divider />

        <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" @click="performAction(item.title)">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data () {
    return {
      drawer: false,
      group: null,
      items: [
        { title: 'Home', icon: 'mdi-home-city' },
        { title: 'My Account', icon: 'mdi-account' },
        { title: 'Users', icon: 'mdi-account-group-outline' },
        { title: 'Login', icon: 'mdi-account' }
      ]
    }
  },
  methods: {
    performAction (action) {
      switch (action) {
      case 'Login':
        console.log('Logging in')
        this.$router.push('/login')
        break
      case 'home':
        this.$router.push('/')
        break
      default:
        break
      }
    }
  }
}
</script>

<style scoped>
.main-header {
  height: 50px;
  display: flex;
  background-color: #364758;
}

nav {
  width: 100%;
  display: flex;
  justify-content: center;
}

nav div {
  height: 100%;
  margin: 0 20px;
  display: flex;
  align-items: center;
}

a {
  font-family: Helvetica, sans-serif;
  color: white;
  font-size: 1rem;
  font-weight: 100;
  text-decoration: underline;
  text-transform: uppercase;
}

a:hover {
  opacity: 0.9;
}
</style>
