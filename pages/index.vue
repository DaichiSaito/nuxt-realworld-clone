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
        <template v-if="!fetchState.pending && !fetchState.error">
          <div class="col-md-3">
            <popular-tag-list
              :tag-list="tagList"
              @on-click-tag="getArticleListByTag"
            />
          </div>
        </template>
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
import PopularTagList from '@/components/articleList/PopularTagList.vue'
import { useArticleList, useUser, useTag } from '@/compositions' 
import { feedTypes } from '@/constants'
export default defineComponent({
  name: 'IndexPage',
  components: {
    Banner,
    TabNavigation,
    ArticleListLoading,
    PopularTagList
  },
  setup () {
    console.log("それともこっちがさき？")
    const { isLogin } = useUser()
    const {
      state: articleListState,
      feedType,
      getFeedArticleList,
      getArticleList,
      getArticleListByFeed,
      getArticleListByTag
    } = useArticleList()

    const { state: tagState, getTagList } = useTag()

    const fetchData = async (offset = 0) => {
      if (feedType.value === 'YOUR') {
        await getFeedArticleList(offset)
      } else {
        await getArticleList({ offset })
      }

      await getTagList()
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
      tagList: toRef(tagState, 'tagList'),
      isLogin,
      feedType,
      tabItems,
      getArticleListByFeed,
      getArticleListByTag
    }
  }
})
</script>

<style>
