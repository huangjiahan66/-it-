<template>
  <view class="my-search-container">
    <!-- 搜索输入框 -->
    <uni-search-bar
      class="my-search-bar"
      v-if="isShowInput"
      :radius="100"
      :bgColor="config.backgroundColor"
      :placeholder="placeholderText"
      :value="value"
      @confirm="onSearch"
      @focus="onFocus"
      @blur="onBlur"
      @clear="onClear"
      @cancel="onCancel"
      @input="onInput"
    >
      <uni-icons slot="clearIcon" type="clear" color="#999999" />
    </uni-search-bar>
    <view
      class="my-search-box"
      v-else
      :style="{
        height: config.height + 'px',
        backgroundColor: config.backgroundColor,
        border: config.border,
      }"
    >
      <image class="icon" src="@/static/images/search.png" mode="scaleToFill" />
      <text
        class="placeholder"
        :style="{
          color: config.textColor,
        }"
        >{{ placeholderText }}</text
      >
    </view>
  </view>
</template>

<script>
export default {
  name: "my-search",
  data() {
    return {};
  },
  props: {
    placeholderText: {
      type: String,
      default: "搜索",
    },
    // 配置对象
    config: {
      type: Object,
      default: () => ({
        height: 36,
        backgroundColor: "#fffff",
        icon: "/static/images/search.png",
        textColor: "#454545",
        border: "1px solid #c9c9c9",
      }),
    },
    // 是否显示输入框
    isShowInput: {
      type: Boolean,
      default: false,
    },
    // 输入的内容
    // value 名称不可修改，与 $emit('input') 事件对应
    value: {
      type: String,
    },
  },
  methods: {
    /**
     * 点击搜索按钮触发
     */
    onSearch() {
      this.$emit("search", this.value);
    },
    /**
     * 输入框获取焦点触发
     */
    onFocus() {
      this.$emit("focus", this.value);
    },
    /**
     * 输入框失去焦点触发
     */
    onBlur() {
      this.$emit("blur", this.value);
    },
    /**
     * 点击输入框中的清空按钮时
     */
    onClear() {
      this.$emit("clear", this.value);
    },
    /**
     * 点击取消按钮时
     */
    onCancel() {
      this.$emit("cancel", this.value);
    },
    /**
     *  value 改变时触发事件
     */
    onInput(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.my-search-container {
  display: flex;
  align-items: center;
  .my-search-bar {
    width: 100%;
  }
  .my-search-box {
    width: 100%;
    height: 36px;
    background-color: #ffffff;
    border-radius: 15px;
    border: 1px solid #c9c9c9;
    display: flex;
    align-items: center;
    padding: 0 10px;
    .icon {
      width: 20px;
      height: 20px;
    }
    .placeholder {
      font-size: 12px;
      margin-left: 5px;
      color: #808080;
    }
  }
}
</style>
