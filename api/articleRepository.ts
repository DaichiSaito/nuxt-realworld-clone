import { NuxtAxiosInstance } from "@nuxtjs/axios";
import {
  Article,
  ResponseTypes
} from '@/types'
import { LIMIT_LIST_ITEM } from '@/constants'
type FeedArticleListRequest = {
  limit?: number
  offset?: number
}

// export type CreateArticleRequest = Pick<
//   Article,
//   'title' | 'description' | 'body'
//   >

export interface ArticleListRequest extends FeedArticleListRequest {
    
}

// type ArticleResponse = ResponseType<'article', Article>
type ArticleListResponse = ResponseTypes<{
  articles: Article[]
}>

export const articleRepository = (axios: NuxtAxiosInstance) => ({
  getArticleList({
    limit = LIMIT_LIST_ITEM,
    offset = 0
  }: ArticleListRequest = {}): ArticleListResponse {
    return axios.$get('/articles', {
      params: { limit, offset }
    })
  },
  getFeedArticleList({
    limit = LIMIT_LIST_ITEM,
    offset = 0,
  }: FeedArticleListRequest = {}): ArticleListResponse {
    console.log("getFeedArticleList")
    return axios.$get('/articles/feed', {
      params: {
        limit,
        offset
      }
    })
  },
})

export type ArticleRepository = ReturnType<typeof articleRepository>