<template>
  <v-container>
    <p>{{ id }}</p>
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
