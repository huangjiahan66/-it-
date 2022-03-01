<template>
  <view class="search-result-list-container">
    <!-- 是否显示空数据 -->
    <empty-data v-if="isEmpty"></empty-data>
    <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      @down="downCallback"
      @up="upCallback"
    >
      <block v-for="(item, index) in resultList" :key="index">
        <view class="search-result-item-box" @click="onItemClick(item)">
          <!-- 内容区 - 样式 1 -->
          <search-result-item-theme-1
            v-if="!item.pic_list || item.pic_list.length === 0"
            :data="item"
          />
          <!-- 内容区 - 样式 2 -->
          <search-result-item-theme-2
            v-else-if="item.pic_list.length === 1"
            :data="item"
          />
          <!-- 内容区 - 样式 3 -->
          <search-result-item-theme-3 v-else :data="item" />

          <!-- / -->
        </view>
      </block>
    </mescroll-body>
  </view>
</template>

<script>
import { getSearchResult } from "api/search";
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
export default {
  mixins: [MescrollMixin],
  name: "search-result-list",
  data() {
    return {
      page: 1, //页数
      resultList: [], //搜索到的内容
      inInit: true, //表示当前是否为首次请求
      mescroll: null,
      isEmpty: false, //是否显示空数据组件
    };
  },
  created() {
    // this.loadSearchResult();
  },
  mounted() {
    this.mescroll = this.$refs.mescrollRef.mescroll;
  },
  props: {
    queryStr: {
      type: String,
      required: true,
    },
  },
  methods: {
    //获取搜索数据
    async loadSearchResult() {
      const { data: res } = await getSearchResult({
        q: this.queryStr,
        p: this.page,
      });
      this.resultList = res.list;
      // 更改返回数据样式（行内样式）

      res.list.forEach((item) => {
        item.title = item.title.replace(
          /<em>/g,
          "<em style='color:#f94d2a; margin:0 2px'>"
        );
        item.description = item.description.replace(
          /<em>/g,
          "<em style='color:#f94d2a; margin:0 2px'>"
        );
      });

      //  如果是第一页 直接赋值
      if (this.page === 1) {
        this.resultList = res.list;
      } else {
        // 上拉加载 原来的值 +服务器返回的值
        this.resultList = [...this.resultList, ...res.list];
      }
      // 没数据显示
      if (this.resultList.length === 0) {
        this.isEmpty = true;
      }
    },
    /**
     * 首次加载
     */
    async mescrollInit() {
      await this.loadSearchResult();
      this.inInit = false;
      // 数据加载完了 关闭动画
      this.mescroll.endSuccess();
      console.log("首次加载");
    },
    /**
     * 下拉刷新的回调
     */
    async downCallback() {
      if (this.inInit) return;
      this.page = 1;
      await this.loadSearchResult();
      this.mescroll.endSuccess();
      console.log("下拉刷新");
    },
    /**
     * 上拉加载的回调
     */
    async upCallback() {
      if (this.inInit) return;
      this.page += 1;
      await this.loadSearchResult();
      this.mescroll.endSuccess();
      console.log("上拉加载");
    },
    onItemClick(item) {
      uni.navigateTo({
        url: `/subpkg/pages/blog-detail/blog-detail?author=${item.author}&articleId=${item.id}`,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.search-result-list-container {
  padding: 12px 15px;
  .search-result-item-box {
    margin-bottom: 16px;
  }
}
</style>
