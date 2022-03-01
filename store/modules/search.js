const STORAGE_KEY = "search-list";
const HISTORY_MAX = 10;
export default {
  namespaced: true,
  state: () => {
    return {
      searchData: uni.getStorageSync(STORAGE_KEY) || [], //搜索歷史的數據
    };
  },
  mutations: {
    // 保存到sotrage
    saveToStorage(state) {
      uni.setStorage({
        key: STORAGE_KEY,
        data: state.searchData,
      });
    },
    /**
     * 添加数据
     */
    addSearchData(state, val) {
      if (!val) return;
      const index = state.searchData.findIndex((item) => item === val);
      if (index !== -1) {
        state.searchData.splice(index, 1);
      }
      state.searchData.unshift(val);
      // 判断是否超过了最大缓存数量
      if (state.searchData.length > HISTORY_MAX) {
        state.searchData.splice(
          HISTORY_MAX - 1,
          state.searchData.length - HISTORY_MAX - 1
        );
      }

      this.commit("search/saveToStorage");
    },
    /**
     * 删除指定数据
     */
    removeSearchData(state, index) {
      state.searchData.splice(index, 1);
      this.commit("search/saveToStorage");
    },
    /**
     * 删除所有数据
     */
    removeAllSearchData(state) {
      state.searchData = [];
      this.commit("search/saveToStorage");
    },
  },
};
