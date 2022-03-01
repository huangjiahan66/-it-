import { login } from "api/user";
const TOKEN_KEY = "token";
const USER_INFO_KEY = "user-info";
export default {
  namespaced: true,
  state: () => ({
    token: uni.getStorageSync(TOKEN_KEY) || "",
    userInfo: uni.getStorageSync(USER_INFO_KEY) || {},
  }),
  mutations: {
    // 保存token到vuex
    setToken(state, token) {
      state.token = token;
      this.commit("user/saveToken");
    },
    // 保存userInfo到vuex
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      this.commit("user/saveUserInfo");
    },
    // 删除token
    removeToken(state) {
      state.token = "";
      this.commit("user/saveToken");
    },
    // 删除用户信息
    removeUserInfo(state) {
      state.userInfo = {};
      this.commit("user/saveUserInfo");
    },
    saveToken(state) {
      uni.setStorageSync(TOKEN_KEY, state.token);
    },
    saveUserInfo(state) {
      uni.setStorageSync(USER_INFO_KEY, state.userInfo);
    },
  },
  actions: {
    /**
     * 完成登录
     */
    async login(context, userProfile) {
      // console.log(userProfile);
      // 用户数据
      const userInfo = userProfile.userInfo;
      // 调用登录接口
      const { data: res } = await login({
        signature: userProfile.signature,
        iv: userProfile.iv,
        nickName: userInfo.nickName,
        gender: userInfo.gender,
        city: userInfo.city,
        province: userInfo.province,
        avatarUrl: userInfo.avatarUrl,
      });
      // TODO: 登录逻辑  保存到vuex

      this.commit("user/setToken", res.token);
      this.commit("user/setUserInfo", userInfo);
    },

    logout() {
      this.commit("user/removeToken");
      this.commit("user/removeUserInfo");
    },
    /**
     * 进行登录判定
     */
    async isLogin(context) {
      if (context.state.token) return true;
      // 如果没有登录 下面操作
      const [error, res] = await uni.showModal({
        title: "登录之后才可以进行后续操作",
        content: "立即跳转到登录页面？（登录后回自动返回当前页面哦~~~）",
      });
      const { cancel, confirm } = res;
      // 点了确定按钮
      if (confirm) {
        uni.navigateTo({
          url: "/subpkg/pages/login-page/login-page",
        });
      }
      // TODO: 如果用户未登录，则引导用户进入登录页面
      return false;
    },
  },
};
