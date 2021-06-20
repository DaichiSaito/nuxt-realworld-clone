<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        nuxt-realworld-clone
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
    <template v-if="!fetchState.pending && !fetchState.error">
      <div v-for="article in articleList">
        {{article.title}}
      </div>
    </template>
    {{articleList}}
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  toRef,
  toRefs,
  useFetch,
} from '@nuxtjs/composition-api'
import { useArticleList } from '@/compositions'
export default defineComponent({
  name: 'IndexPage',
  components: {

  },
  setup () {
    const {
      state: articleListState,
      getFeedArticleList
    } = useArticleList()

    const fetchData = async (offset = 0) => {
      await getFeedArticleList(offset)
    }
    const { fetchState } = useFetch(() => fetchData())
    console.log(articleListState)

    return {
      fetchState,
      fetchData,
      ...toRefs(articleListState)
    }
  }
})
</script>

<style>
