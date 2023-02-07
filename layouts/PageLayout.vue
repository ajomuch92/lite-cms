<template>
  <main class="xl:px-40 md:px-20 sm:px-0">
    <navigation-header v-if="!installable" />
    <Nuxt />
  </main>
</template>

<script>
export default {
  name: 'PageLayout',
  computed: {
    installable () {
      return this.$store.getters['settings/install']
    }
  }
}
</script>

<style scoped>

</style>
