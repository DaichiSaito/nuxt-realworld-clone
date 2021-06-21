import { reactive, ref, useContext } from "@nuxtjs/composition-api";
import { ArticleListRequest } from '@/api/articleRepository'
import { Article } from '@/types'

export type FeedType = 'GLOBAL' | 'YOUR'

type State = {
  articleList: Article[]
}

const feedType = ref<FeedType>('GLOBAL')

const setFeedType = (type: FeedType) => {
  feedType.value = type
}

export default function useArticleList () {
  const { $repository } = useContext()

  const state = reactive<State>({
    articleList: []
  })

  const getArticleList = async (payload: ArticleListRequest = {}) => {
    const {
      articles
    } = await $repository.article.getArticleList(payload)

    state.articleList = articles
  }

  const getFeedArticleList = async (offset = 0) => {
    console.log("getFeedArticleList")

    // const res = await $axios.get("http://localhost:3333/articles/feed")
    // console.log(res)
    const {
      articles
    } = await $repository.article.getFeedArticleList({ offset })

    // console.log("hogehoge")
    // console.log(articles)
    // const res = await $axios.get("http://localhost:3333/articles/feed")
    // const articles = res.data as [Article]
    state.articleList = articles
    // state.articleList = [{ slug: "a", title: "aaa", description: "aaa", body: "hhh", createdAt: "20200101", updatedAt: "20200102"}]
    
  }

  const getArticleListByFeed = async (listType: FeedType) => {
    console.log(listType)
    const fetchArticleBy = {
      GLOBAL: getArticleList,
      YOUR: getFeedArticleList,
    }

    await fetchArticleBy[listType]()

    setFeedType(listType)
  }
  return {
    state,
    feedType,
    getArticleList,
    getFeedArticleList,
    getArticleListByFeed,
    setFeedType
  }
}