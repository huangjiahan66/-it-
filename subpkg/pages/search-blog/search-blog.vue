<template>
  <view class="search-blog-container">
    <view class="search-bar-box">
      <my-search
        :isShowInput="true"
        :placeholderText="defaultText"
        v-model="searchVal"
        :config="{
          backgroundColor: '#f1f0f3',
        }"
        @search="onSearchConfirm"
        @focus="onSearchFocus"
        @blur="onSearchBlur"
        @clear="onSearchClear"
        @cancel="onSearchCancel"
      ></my-search>
    </view>
    <!-- 热搜列表 -->
    <view class="search-hot-list-box card" v-if="showType === HOT_LIST">
      <!-- 列表 -->
      <search-hot-list @onSearch="onSearchConfirm" />
    </view>
    <!-- 搜索历史 -->
    <view class="search-history-box" v-else-if="showType === SEARCH_HISTORY">
      <search-history @search="onSearchConfirm" />
    </view>
    <!-- 搜索结果 -->
    <view class="search-result-box" v-else>
      <search-result-list ref="mescrollItem" :queryStr="searchVal" />
    </view>
  </view>
</template>

<script>
import { mapMutations } from "vuex";
import { getDefaultText } from "api/search";
import MescrollCompMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js";
const HOT_LIST = 0; //热搜列表
const SEARCH_HISTORY = 1; //搜索历史
const SEARCH_RESULT = 2; //搜索历史
export default {
  mixins: [MescrollCompMixin],
  data() {
    return {
      searchVal: "",
      defaultText: "我是默认的哦",
      HOT_LIST,
      SEARCH_HISTORY,
      SEARCH_RESULT,
      showType: HOT_LIST,
    };
  },
  created() {
    this.loadDefaultText();
  },
  methods: {
    ...mapMutations("search", ["addSearchData"]),
    // 获取推荐获取文本
    async loadDefaultText() {
      const { data: res } = await getDefaultText();

      this.defaultText = res.defaultText;
    },

    /**
     * 搜索内容
     */
    onSearchConfirm(val) {
      this.searchVal = val ? val : this.defaultText;
      // 存到vuex里
      this.addSearchData(this.searchVal);
      if (this.searchVal) {
        this.showType = SEARCH_RESULT;
      }
    },
    // searchbar 获取焦点
    onSearchFocus(val) {
      this.showType = SEARCH_HISTORY;
    },
    /*
     * searchbar 失去焦点
     */
    onSearchBlur(val) {},
    /**
     * searchbar 清空内容
     */
    onSearchClear() {
      this.showType = SEARCH_HISTORY;
    },
    /**
     * searchbar 取消按钮
     */
    onSearchCancel(val) {
      this.showType = HOT_LIST;
    },
  },
};
</script>

<style lang="scss" scoped>
.search-blog-container {
  .search-bar-box {
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: #ffffff;
    padding: 5px;
  }
}
</style>
