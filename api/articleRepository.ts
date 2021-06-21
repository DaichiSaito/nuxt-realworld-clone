import { NuxtAxiosInstance } from "@nuxtjs/axios";
import {
  Article,
  ResponseTypes,
  Tag
} from '@/types'
import { LIMIT_LIST_ITEM } from '@/constants'
type FeedArticleListRequest = {
  tag?: Tag,
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
    tag,
    limit = LIMIT_LIST_ITEM,
    offset = 0
  }: ArticleListRequest = {}): ArticleListResponse {
    const defaultPaarm = {
      ...(tag && { tag })
    }
    return axios.$get('/articles', {
      params: { ...defaultPaarm, limit, offset }
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