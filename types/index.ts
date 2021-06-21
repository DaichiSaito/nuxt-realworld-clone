export interface User {
  email: string
  token: string
  username: string
  bio: string
  image: string
}

export type Tag = string

export interface Article {
  slug: string
  title: string
  description: string
  body: string
  createdAt: string
  updatedAt: string
}

export type ResponseType<K extends string, V> = Promise<{ [P in K]: V }>
export type ResponseTypes<T> = Promise<T>
export type OptionalPick<T, K extends keyof T> = Pick<Partial<T>, K>
export type CustomErrors = {
  errors: {
    errorName: string[]
  }
}
