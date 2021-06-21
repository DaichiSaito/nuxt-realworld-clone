<template>
  <div class="home-page">
    <Banner v-if="!isLogin" />
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <tab-navigation
            :tab-type="feedType"
            :tab-items="tabItems"
            @on-click-tab="getArticleListByFeed"
          />
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
import Banner from '@/components/banner/Banner.vue'
import TabNavigation from '@/components/articleList/TabNavigation.vue'
import { useArticleList, useUser } from '@/compositions' 
import { feedTypes } from '@/constants'
export default defineComponent({
  name: 'IndexPage',
  components: {
    Banner,
    TabNavigation,
    ArticleListLoading
  },
  setup () {
    console.log("それともこっちがさき？")
    const { isLogin } = useUser()
    const {
      state: articleListState,
      feedType,
      getFeedArticleList,
      getArticleList,
      getArticleListByFeed
    } = useArticleList()

    const fetchData = async (offset = 0) => {
      if (feedType.value === 'YOUR') {
        await getFeedArticleList(offset)
      } else {
        await getArticleList({ offset })
      }
    }
    const { fetchState } = useFetch(() => fetchData())

    const tabItems = computed(() => {
      const [, globalFeed] = feedTypes
      return isLogin.value ? feedTypes : [globalFeed]
    })

    return {
      fetchState,
      fetchData,
      ...toRefs(articleListState),
      isLogin,
      feedType,
      tabItems,
      getArticleListByFeed
    }
  }
})
</script>

<style>
