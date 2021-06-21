import { FeedType } from '@/compositions/useArticleList'

export const ErrorType = {
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  Unprocessable: 422,
}

type TabItems<T> = Readonly<
  {
    type: T
    name: string
  }[]
  >
export type FeedTabItems = TabItems<FeedType>

export const feedTypes: FeedTabItems = [
  {
    type: 'YOUR',
    name: 'Your Feed'
  },
  {
    type: 'GLOBAL',
    name: 'Global Feed'
  }
]

export const LIMIT_LIST_ITEM = 20
export const DEFAULT_PROFILE_IMG =
  'https://static.productionready.io/images/smiley-cyrus.jpg'