<template>
  <view class="hot-video-container">
    <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      @down="downCallback"
      @up="upCallback"
    >
      <block v-for="(item, index) in videoList" :key="index">
        <hot-video-item :data="item" @click="onItemClick"></hot-video-item>
      </block>
    </mescroll-body>
  </view>
</template>

<script>
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
import { getHotVideoList } from "api/video";
import { mapMutations } from "vuex";
export default {
  mixins: [MescrollMixin],
  data() {
    return {
      // 数据源
      videoList: [],
      size: 10,
      page: 1,
      // 是否为 init 第一次加载
      isInit: true,
      // 实例
      mescroll: null,
    };
  },
  created() {
    // this.loadHotVideoList();
  },
  mounted() {
    this.mescroll = this.$refs.mescrollRef.mescroll;
  },
  methods: {
    ...mapMutations("video", ["setVideoData"]),
    async loadHotVideoList() {
      const { data: res } = await getHotVideoList({
        page: this.page,
        size: this.size,
      });
      if (this.page == 1) {
        this.videoList = res.list;
      } else {
        this.videoList = [...this.videoList, ...res.list];
      }
    },
    // 首次加载
    async mescrollInit() {
      this.isInit = false;
      await this.loadHotVideoList();
      // 结束 上拉加载 && 下拉刷新
      this.mescroll.endSuccess();
    },
    // 下拉刷新
    async downCallback() {
      if (this.isInit) return;
      this.page = 1;
      await this.loadHotVideoList();
      // 结束 上拉加载 && 下拉刷新
      this.mescroll.endSuccess();
    },
    // 上拉加载
    async upCallback() {
      if (this.isInit) return;
      this.page += 1;
      await this.loadHotVideoList();
      // 结束 上拉加载 && 下拉刷新
      this.mescroll.endSuccess();
    },
    onItemClick(data) {
      // 保存当前点击的 video 数据到 vuex
      this.setVideoData(data);
      uni.navigateTo({
        url: `/subpkg/pages/video-detail/video-detail`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.hot-video-container {
  background-color: $uni-bg-color-grey;
}
</style>
