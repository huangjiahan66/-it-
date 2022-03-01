<template>
  <view class="hot-container">
    <image class="logo" src="@/static/images/logo1.png" mode="aspectFit" />
    <!-- search -->
    <view class="search-box" @click="onToSearch">
      <my-search placeholderText="请输入您想搜索的内容"></my-search>
    </view>
    <!-- tabs -->
    <view class="tab-sticky">
      <my-tabs
        :tabData="tabData"
        :defaultIndex="currentIndex"
        @tabClick="onTabClick"
      ></my-tabs>
    </view>
    <!-- list -->
    <swiper
      class="swiper"
      :current="currentIndex"
      :style="{ height: currentSwiperHeight + 'px' }"
      @animationfinish="onSwiperEnd"
      @change="onSwiperChange"
    >
      <swiper-item
        class="swiper-item"
        v-for="(tabItem, tabIndex) in tabData"
        :key="tabIndex"
      >
        <view>
          <!-- 加载动画 -->
          <uni-load-more status="loading" v-if="isLoading" />
          <!-- 列表 -->
          <block v-else>
            <hot-list-item
              :class="'hot-list-item-' + tabIndex"
              v-for="(item, index) in listData[tabIndex]"
              :key="index"
              :data="item"
              :ranking="index + 1"
              @click="onItemClick(item)"
            ></hot-list-item>
          </block>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { getHotTabs, getHotListFormTabType } from "api/hot";
export default {
  data() {
    return {
      tabData: [], //tabs数据
      currentIndex: 0, //激活项
      isLoading: true, //list数据加载loading
      listData: {}, // index 为key ,list为value
      currentSwiperHeight: 0, // 当前 swiper 的高度
      swiperHeightData: {}, // 以 index 为 key，对应的 swiper 的高度 为 val
      currentPageScrollTop: 0, //当前的滚动距离
    };
  },
  created() {
    this.loadHotTabs();
  },
  onPageScroll({ scrollTop }) {
    this.currentPageScrollTop = scrollTop;
  },

  methods: {
    // 获取tabs
    async loadHotTabs() {
      const { data: res } = await getHotTabs();
      this.tabData = res.list;
      this.loadHotListFormTab();
    },
    // swiper动画完成
    onSwiperEnd() {
      // 如果没有数据
      if (!this.listData[this.currentIndex]) {
        return this.loadHotListFormTab();
      }
      this.currentSwiperHeight = this.swiperHeightData[this.currentIndex];
    },
    onSwiperChange(e) {
      if (this.currentPageScrollTop > 130) {
        uni.pageScrollTo({ scrollTop: 130 });
      }
      this.currentIndex = e.detail.current;
    },
    // 获取list数据
    async loadHotListFormTab() {
      this.isLoading = true;
      const id = this.tabData[this.currentIndex].id; // 获取id
      const { data: res } = await getHotListFormTabType(id);
      this.listData[this.currentIndex] = res.list;
      this.isLoading = false;
      // 渲染完 算高度
      setTimeout(async () => {
        this.currentSwiperHeight = await this.getCurrentSwiperHeight();
        this.swiperHeightData[this.currentIndex] = this.currentSwiperHeight;
      }, 0);
    },
    //  点击每一个tab触发事件
    onTabClick(index) {
      this.currentIndex = index;
      this.loadHotListFormTab();
    },
    // 计算swiper高度
    getCurrentSwiperHeight() {
      return new Promise((resolve, reject) => {
        let sum = 0;
        const query = uni.createSelectorQuery().in(this);
        query
          .selectAll(`.hot-list-item-${this.currentIndex}`)
          .boundingClientRect((res) => {
            res.forEach((item) => {
              sum += item.height;
            });
            resolve(sum);
          })
          .exec();
      });
    },
    onToSearch() {
      uni.navigateTo({
        url: "/subpkg/pages/search-blog/search-blog",
      });
    },
    onItemClick(item) {
      uni.navigateTo({
        url: `/subpkg/pages/blog-detail/blog-detail?author=${item.user_name}&articleId=${item.id}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.hot-container {
  background-color: #ffffff;
  .logo {
    width: 100%;
    height: 145px;
  }
  .search-box {
    padding: 0 16px;

    margin-bottom: 8px;
  }
  .tab-sticky {
    position: sticky;
    z-index: 999;
    top: 0;
  }
}
</style>
