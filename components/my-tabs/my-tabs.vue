<template>
  <view class="tab-container">
    <view class="tab-box">
      <scroll-view
        scroll-x
        class="scroll-view"
        scroll-width-animation
        :scroll-left="scrollLeft"
      >
        <view class="scroll-content">
          <view class="tab-item-box">
            <block v-for="(item, index) in tabData" :key="index">
              <view
                :id="'_tab_' + index"
                class="tab-item"
                :class="{ 'tab-item-active': activeIndex === index }"
                @click="onTabClick(index)"
                :style="{
                  color:
                    activeIndex === index
                      ? defaultConfig.activeTextColor
                      : defaultConfig.textColor,
                }"
                >{{ item.label || item }}</view
              >
            </block>
          </view>
          <!-- 滑块 -->
          <view
            class="underLine"
            :style="{
              transform: 'translateX(' + slider.left + 'px)',
              width: defaultConfig.underLineWidth + 'px',
              height: defaultConfig.underLineHeight + 'px',
              backgroundColor: defaultConfig.underLineColor,
            }"
          ></view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  name: "my-tabs",
  data() {
    return {
      tabList: [], //内部维护数对象
      activeIndex: 0, //当前激活性index
      scrollLeft: 0, //横向滚动条位置
      slider: {
        left: 0,
      },
      // 默认配置
      defaultConfig: {
        textColor: "#333333", //默认的字体颜色
        activeTextColor: "#f94d2a", //高亮的字体颜色
        underLineWidth: 24, // 下划线宽度 px
        underLineHeight: 2, // 下划线高度 px
        underLineColor: "#f94d2a", // 下划线颜色
      },
    };
  },
  watch: {
    config: {
      handler(val) {
        this.defaultIndex = { ...this.defaultIndex, ...val };
      },
      immaediate: true,
    },
    defaultIndex: {
      handler(val) {
        this.activeIndex = val;
        this.tabToIndex();
      },
      immaediate: true,
    },
    tabData: {
      handler(val) {
        this.tabList = val;
        setTimeout(() => {
          this.updataTabWidth();
        }, 0);
      },
      immaediate: true,
    },
  },
  props: {
    // 配置对象
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
    tabData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    defaultIndex: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    onTabClick(index) {
      this.activeIndex = index;
      this.tabToIndex();
      this.$emit("tabClick", index);
    },
    // 计算滑块滚动位置
    tabToIndex() {
      if (this.tabList.length === 0) return;
      const index = this.activeIndex;
      this.slider = {
        left: this.tabList[index]._slider.left,
      };
      this.scrollLeft = this.activeIndex * this.defaultConfig.underLineWidth;
    },
    updataTabWidth() {
      let data = this.tabList;

      if (data.length == 0) return false;
      const query = uni.createSelectorQuery().in(this);
      data.forEach((item, index) => {
        query
          .select("#_tab_" + index)
          .boundingClientRect((res) => {
            // 为数据对象中每一个 item 都维护一个 _slider（滑动条） 对象
            item._slider = {
              // 当前的 tab 距离左侧的距离
              left:
                res.left + (res.width - this.defaultConfig.underLineWidth) / 2,
            };
            // 运算完成之后，执行一次 【滑块】位置运算
            if (data.length - 1 === index) {
              this.tabToIndex();
            }
          })
          .exec();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-container {
  font-size: 14px;
  height: 45px;
  line-height: 45px;
  background-color: #ffffff;
  .tab-box {
    display: flex;
    width: 100%;
    height: 45px;
    position: relative;
    .scroll-view {
      white-space: nowrap;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      .scroll-content {
        position: relative;
        width: 100%;
        height: 100%;
        .tab-item-box {
          height: 100%;
          .tab-item {
            display: inline-block;
            text-align: center;
            height: 100%;
            padding: 0 15px;
            position: relative;
            color: #333;
            &-active {
              color: $uni-text-color-hot;
              font-weight: bold;
            }
          }
        }
        .underLine {
          height: 2px;
          width: 25px;
          background-color: #f94d2a;
          border-radius: 3px;
          transition: 0.5s;
          position: absolute;
          bottom: 0;
        }
      }
    }
  }
}
/* #ifdef H5 */
/deep/.uni-scroll-view::-webkit-scrollbar {
  display: none;
}

/deep/.uni-scroll-view {
  scrollbar-width: none;
}
/* #endif */
</style>
