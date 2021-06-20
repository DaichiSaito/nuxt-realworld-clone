<template>
  <div id="main">
    <app-header />
    <Nuxt />
    <app-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, useAsync } from '@nuxtjs/composition-api'

// これは { useUser } にしないんだ
import useUser from '@/compositions/useUser'
import appFooter from './appFooter.vue'
import appHeader from './appHeader.vue'

export default defineComponent({
  name: 'Default',
  components: {
    appHeader,
    appFooter
  },
  setup() {
    console.log("こっちがさき？")
    const { retryLogin } = useUser()

    useAsync(() => {
      if (process.server) {
        return false
      }

      const token = window.localStorage.getItem('token')
      console.log(token)

      if (token) {
        retryLogin(token)
      }
    })    
  },
})
</script>
