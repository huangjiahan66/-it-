<template>
  <view class="video-detail-container">
    <view class="video-box">
      <video
        id="myVideo"
        class="video"
        :src="videoData.play_url"
        :danmu-list="danmuList"
        enable-danmu
        danmu-btn
        controls
      />

      <hot-video-info :data="videoData" />
    </view>
    <!-- 弹幕模块 -->
    <view class="danmu-box">
      <!-- 加载动画 -->
      <uni-load-more status="loading" v-if="isLoadingComment"></uni-load-more>
      <!-- 无弹幕 -->
      <empty-data v-else-if="commentList.length === 0"></empty-data>
      <!-- 弹幕列表 -->
      <view class="comment-container" v-else>
        <view class="all-comment-title">全部弹幕</view>
        <view class="list">
          <block v-for="(item, index) in commentList" :key="index">
            <article-comment-item :data="item" />
          </block>
        </view>
      </view>
    </view>

    <!-- 底部功能区 -->
    <article-operate
      @commitClick="onCommit"
      :articleData="videoData"
      :placeholder="'发个弹幕，开心一下'"
      @changePraise="onChangePraise"
      @changeCollect="onChangeCollect"
    ></article-operate>
    <!-- 输入弹幕的popup -->
    <uni-popup ref="popup" type="bottom" @change="onCommitPopupChange">
      <article-comment-commit
        v-if="isShowCommit"
        :articleId="videoData.id"
        @success="onSendDanmu"
      />
    </uni-popup>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getVideoDanmuList } from "api/video";
import { getRandomColor } from "utils";
export default {
  data() {
    return {
      danmuList: [], // 弹幕数据源
      commentList: [], //评论数据源
      isShowCommit: false,
      // video 组件上下文
      videoContext: null,
      isLoadingComment: true, // 弹幕列表数据加载中
    };
  },

  computed: {
    ...mapState("video", ["videoData"]),
  },
  created() {
    this.loadVideoDanmuList();
  },
  onReady: function (res) {
    // 获取 video 组件上下文
    this.videoContext = uni.createVideoContext("myVideo");
  },
  methods: {
    /**
     * 获取弹幕数据
     */
    ...mapMutations("video", ["setVideoData"]),
    async loadVideoDanmuList() {
      const { data: res } = await getVideoDanmuList({
        videoId: this.videoData.id,
      });
      // 定义随机颜色
      res.list.forEach((item) => {
        item.color = getRandomColor();
      });
      // console.log(res.list);
      this.danmuList = [...res.list];
      this.commentList = [...res.list];
      this.isLoadingComment = false;
    },
    onCommit() {
      this.$refs.popup.open();
    },
    onCommitPopupChange(e) {
      if (e.show) {
        this.isShowCommit = e.show;
      } else {
        setTimeout(() => {
          this.isShowCommit = e.show;
        }, 200);
      }
    },
    //发送弹幕成功之后的回调
    onSendDanmu(data) {
      // 发送弹幕
      this.videoContext.sendDanmu({
        text: data.info.content,
        color: getRandomColor(),
      });
      // 添加弹幕到数据源
      this.commentList.unshift(data.info);
      // 关闭 pop
      this.$refs.popup.close();
      // 关闭标记
      this.isShowCommit = false;
      // 提示用户
      uni.showToast({
        title: "发表成功",
      });
    },
    /**
     * 点赞处理回调
     */
    onChangePraise(isPraise) {
      this.setVideoData({ ...this.videoData, isPraise });
    },
    /**
     * 收藏处理回调
     */
    onChangeCollect(isCollect) {
      this.setVideoData({ ...this.videoData, isCollect });
    },
  },
};
</script>

<style lang="scss" scoped>
.video-detail-container {
  .video-box {
    background-color: $uni-bg-color;
    position: sticky;
    top: 0;
    z-index: 9;
    .video {
      width: 100%;
      height: 230px;
    }
    .danmu-box {
      border-top: $uni-spacing-col-sm solid $uni-bg-color-grey;
      margin-bottom: 36px;
      .comment-container {
        padding: $uni-spacing-col-lg $uni-spacing-row-lg;
        .all-comment-title {
          font-size: $uni-font-size-lg;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
