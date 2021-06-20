<template>
  <div class="home-page">
    <Banner v-if="!isLogin" />
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <!-- TODO: tab-navivation -->
          <article-list-loading v-if="fetchState.pending" />
          <template v-if="!fetchState.pending && !fetchState.error">
            <article-preview-list
              :article-list="articleList"
            />
          </template>
        </div>
      </div>
    </div>
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

import ArticleListLoading from '@/components/articleList/ArticleListLoading.vue'
import { useArticleList, useUser } from '@/compositions'
export default defineComponent({
  name: 'IndexPage',
  components: {
    ArticleListLoading
  },
  setup () {
    console.log("それともこっちがさき？")
    const { isLogin } = useUser()
    const {
      state: articleListState,
      getFeedArticleList
    } = useArticleList()

    const fetchData = async (offset = 0) => {
      await getFeedArticleList(offset)
    }
    const { fetchState } = useFetch(() => fetchData())

    return {
      fetchState,
      fetchData,
      ...toRefs(articleListState),
      isLogin
    }
  }
})
</script>

<style>
