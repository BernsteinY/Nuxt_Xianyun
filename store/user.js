// 保存数据的属性  state
export const state = () => {
  return {
    //  用户信息
    userInfo: {
      token: '',
      user: {}
    },
  }
}


// 同步修改数据 mutations
export const mutations = {
  // 保存用户信息到state
  setUserInfo(state, data) {
    state.userInfo = data
  },
  // 清除用户数据
  clearUserInfo(state) {
    state.userInfo = {
      token: "",
      user: {}
    }
  }

}

// 异步修改数据 actions
export const actions = {
  // // 登录
  // login({
  //   commit
  // }, data) {
  //   return this.$axios({
  //     url: '/accounts/login',
  //     methods: 'POST',
  //     data: data
  //   }).then(res => {
  //     const data = res.data
  //     commit("setUserInfo", data)
  //     return data
  //   })
  // }
}
