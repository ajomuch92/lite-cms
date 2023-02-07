<template>
  <div class="w-1/3 rounded-md shadow-md px-3 py-4">
    <h1 class="text-3xl">
      Fill this Info
    </h1>
    <p>Fill this fields before continue using your site</p>
    <te-input
      v-model="register.siteName"
      class="my-3"
      placeholder="Site Name"
      floating
      helper-text="Required Field"
    />
    <te-textarea
      v-model="register.description"
      class="my-3"
      placeholder="Site Name"
      floating
    />
    <label>Select your timezone</label>
    <te-select
      v-model="register.timezone"
      class="w-full"
      :options="timezones"
      size="large"
    />
    <te-input
      v-model="register.dateformat"
      class="my-3"
      placeholder="Date format"
      floating
    />
    <te-input
      v-model="register.owner"
      class="my-3"
      placeholder="Owner"
      floating
    />
    <te-input
      v-model="register.email"
      class="my-3"
      placeholder="Email"
      floating
      type="email"
    />
    <te-input
      v-model="user.username"
      class="my-3"
      placeholder="Username"
      floating
    />
    <te-input
      v-model="user.password"
      class="my-3"
      placeholder="Password"
      floating
      type="password"
    />
    <te-button ripple @click="createDatabaseAndRegister">
      Get Start
    </te-button>
  </div>
</template>

<script>
import { timeZones } from '../static/utils'

export default {
  name: 'InstallDatabase',
  data: () => ({
    register: {
      siteName: '',
      description: '',
      timezone: '',
      dateformat: '',
      owner: '',
      email: ''
    },
    user: {
      username: '',
      password: ''
    },
    timezones: []
  }),
  created () {
    this.timezones = timeZones
  },
  methods: {
    validateFields () {
      if (!this.register.siteName) {
        throw new Error('Site name is required')
      }
      if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi.test(this.register.email)) {
        throw new Error('Invalid email')
      }
      if (!this.user.username) {
        throw new Error('User name is required')
      }
      if (!this.user.password) {
        throw new Error('Password is required')
      }
    },
    async createDatabaseAndRegister () {
      const loading = this.$showLoading({
        type: 'growing'
      })
      try {
        this.validateFields()
        const dataToSend = {
          ...this.register,
          user: this.user
        }
        await this.$store.dispatch('settings/installDatabase', dataToSend)
        this.$showToast({
          position: 'bottom',
          align: 'right',
          timeout: 3000,
          type: 'light',
          toast: {
            title: 'Init',
            subtitle: 'Build made successfully!',
            type: 'success'
          }
        })
      } catch (err) {
        this.$showToast({
          position: 'bottom',
          align: 'right',
          timeout: 3000,
          type: 'light',
          toast: {
            title: 'Error',
            subtitle: err.message || 'There was an error',
            type: 'danger'
          }
        })
      } finally {
        loading.close()
      }
    }
  }
}
</script>

<style scoped>

</style>
