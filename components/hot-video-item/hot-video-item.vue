<template>
  <view class="hot-video-item-container">
    <view class="video-box" @click="$emit('click', data)">
      <video
        id="myVideo"
        class="video"
        :src="data.play_url"
        enable-danmu
        danmu-btn
        controls
      />
    </view>
    <hot-video-info :data="data"></hot-video-info>
  </view>
</template>

<script>
export default {
  name: "hot-video-item",
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.hot-video-item-container {
  margin-bottom: $uni-spacing-col-lg;
  position: relative;
  .video {
    width: 100%;
    height: 230px;
  }
}
</style>
