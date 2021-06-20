import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { reactive, useContext, toRef } from "@nuxtjs/composition-api";
import { AuthLoginRequest, AuthRegisterRequest } from '@/api'
import { User } from '@/types'
type State = {
  user: User,
  isLogin: boolean
}

const initState = {
  user: {
    bio: '',
    email: '',
    image: '',
    token: '',
    username: ''
  },
  isLogin: false
}

const state = reactive<State>(initState)

// ログイン状態にするメソッド。
// 引数にはaxiosインスタンスとuserのオブジェクトを受け取る 
const setLogin = ({
  axios,
  user
}: {
  axios: NuxtAxiosInstance,
  user: User
}) => {
  state.isLogin = true
  state.user = user
  // これは何をしてるのかわからない。default headerに入れてくれるのかな？
  axios.setToken(user.token, 'Token')
  window.localStorage.setItem('token', user.token)
}

export default function useUser() {
  const { $axios, $repository } = useContext()
  
  const retryLogin = async (token: User['token']) => {
    const response = await $repository.user.getCurrentUser(token)
    console.log(response)
    if (response.user) {
      console.log("retryLogin成功")
      setLogin({
        axios: $axios,
        user: response.user
      })
    } else {
      console.log("retryLogin失敗")
    }
  }

  const fetchAuthLogin = async ({ email, password }: AuthLoginRequest) => {
    const response = await $repository.user.authLogin({
      email,
      password
    })

    if ('user' in response) {
      setLogin({
        axios: $axios,
        user: response.user
      })

      return true
    }
    return false
  }

  const fetchAuthRegister = async({
    username,
    email,
    password,
  }: AuthRegisterRequest) => {
    if (!email || !password) {
      return
    }

    const response = await $repository.user.authRegister({
      username,
      email,
      password,
    })

    if ('user' in response) {
      setLogin({
        axios: $axios,
        user: response.user
      })
      return true 
    }

    return false
  }

  return {
    user: toRef(state, 'user'),
    isLogin: toRef(state, 'isLogin'),
    fetchAuthLogin,
    fetchAuthRegister,
    retryLogin
  }
}