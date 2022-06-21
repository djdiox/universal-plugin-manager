<template>
  <v-container>
    <p>{{ id }}</p>
    <v-card class="mx-auto" max-width="400" tile>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Single-line item</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Two-line item</v-list-item-title>
          <v-list-item-subtitle>Secondary text</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title>Three-line item</v-list-item-title>
          <v-list-item-subtitle> Secondary line text Lorem ipsum dolor sit amet, </v-list-item-subtitle>
          <v-list-item-subtitle> consectetur adipiscing elit. </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-container>
</template>

<script>
export default {
  async asyncData ({ params, redirect }) {
    console.log(params, redirect)
    return {
      id: params.id
    }
    // this.id = params.id
    // this.id = params.id
    // const mountains = await fetch('https://api.nuxtjs.dev/mountains').then(res => res.json())

    // const filteredMountain = mountains.find(
    //   el => el.continent.toLowerCase() === params.continent && el.slug === params.mountain
    // )
    // if (filteredMountain) {
    //   return {
    //     continent: filteredMountain.continent,
    //     mountain: filteredMountain.title
    //   }
    // } else {
    //   redirect('/')
    // }
  },
  data () {
    return {
      id: ''
    }
  },
  mounted () {}
}
</script>

<style></style>
