import { login, logout, getInfo, register, validateEmail } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    is_staff: false
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_IS_STAFF: (state, is_staff) => {
    state.is_staff = is_staff
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 调用login方法发送网络请求
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        // vuex
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user register
  register(context, { stunumber, password, email, valicode }) {
    return new Promise((resolve, reject) => {
      register({ stunumber, password, email, valicode }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  validateEmail(context, { email }) {
    console.error(email)
    return new Promise((resolve, reject) => {
      validateEmail({ email }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar, is_staff } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_IS_STAFF', is_staff)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

