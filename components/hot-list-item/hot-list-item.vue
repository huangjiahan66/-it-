<template>
  <view class="item-container" @click="$emit('click')">
    <view class="item-box">
      <view class="item-box-left">
        <hot-ranking :ranking="ranking"></hot-ranking>
      </view>
      <view class="item-box-right">
        <view class="item-title line-clamp-2">{{ data.title }}</view>
        <view class="item-desc line-clamp-2">{{ data.desc }}</view>
        <view class="item-bottom-box">
          <text class="item-author">{{ data.nickname }}</text>
          <view class="hot-box">
            <image class="hot-icon" src="@/static/images/hot-icon.png" />
            <text class="hot-text">{{ data.views | hotNumber }}热度</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "hot-list-item",
  data() {
    return {};
  },
  props: {
    // item数据
    data: {
      type: Object,
      required: true,
    },
    // 排名
    ranking: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.item-container {
  padding-bottom: 12px;
  .item-box {
    display: flex;
    margin: 0 8px;
    padding: 12px 8px;
    background-color: #ffffff;
    border-radius: 6px;
    box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);
  }
  .item-box-left {
    margin-right: 5px;
  }
  .item-box-right {
    width: 100%;
    .item-title {
      font-size: 16px;
      font-weight: bold;
      color: #000;
    }
    .item-desc {
      padding-top: 4px;
      font-size: 14px;
      color: #333;
    }
    .item-bottom-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5px;
      .item-author {
        font-size: 12px;
        color: #999;
      }
      .hot-box {
        .hot-icon {
          width: 20px;
          height: 20px;
          vertical-align: top;
        }
        .hot-text {
          margin-left: 5px;
          font-size: 12px;
          color: $uni-text-color-hot;
        }
      }
    }
  }
}
</style>
