<template>
  <te-navbar id="navbar">
    <template #brand>
      <h1 class="text-3xl">
        {{ settings.siteName }}
      </h1>
    </template>
    <template #right>
      <nuxt-link to="/">
        Test
      </nuxt-link>
    </template>
  </te-navbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavigationHeader',
  computed: {
    ...mapGetters(['pages/pages', 'settings/settings']),
    pages () {
      return this['pages/pages']
    },
    settings () {
      return this['settings/settings']
    }
  },
  async created () {
    await this.getPages()
    await this.getSettings()
  },
  methods: {
    async getPages () {
      await this.$store.dispatch('pages/getPages')
    },
    async getSettings () {
      await this.$store.dispatch('settings/getSettings')
    }
  }
}
</script>

<style scoped>
  #navbar {
    background-color: transparent !important;
    box-shadow: none !important;
  }
</style>
