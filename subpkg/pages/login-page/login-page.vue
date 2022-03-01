<template>
  <view>
    <my-login @onLoginSuccess="onLoginSuccess"></my-login>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 用户登录成功事件回调
    onLoginSuccess() {
      uni.navigateBack({ delta: 1 });
    },
  },
};
</script>

<style lang="scss"></style>
