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
  // getArticleList({
    
  // }: ArticleListRequest = {}): ArticleListResponse {
  //   return axios.$get('/articles', {

  //   })
  // },
  getFeedArticleList({
    limit = LIMIT_LIST_ITEM,
    offset = 0,
  }: FeedArticleListRequest = {}): ArticleListResponse {
    return axios.$get('/articles/feed')
  },
})

export type ArticleRepository = ReturnType<typeof articleRepository>