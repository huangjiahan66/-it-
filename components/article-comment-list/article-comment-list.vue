<template>
  <view class="comment-limt-container" v-if="!isShowAllComment">
    <view class="comment-title">精简评论</view>
    <block v-for="(item, index) in commentList.slice(0, 2)" :key="index">
      <!-- item 项组件 (每一个评论 ) -->
      <article-comment-item :data="item.info" />
    </block>
    <view class="show-more" @click="onMoreClick">查看更多评论</view>
  </view>

  <!-- 全部评论 -->

  <view class="comment-all-container" v-else>
    <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      @up="upCallback"
      :down="{
        use: false,
      }"
      :up="{
        textNoMore: '---到底了 不要再刷了！！！---',
      }"
    >
      <view class="comment-title">全部评论</view>
      <block v-for="(item, index) in commentList" :key="index">
        <!-- item 项组件 (每一个评论 ) -->
        <article-comment-item :data="item.info" />
      </block>
    </mescroll-body>
  </view>
</template>
<script>
import { getArticleCommentList } from "api/article";
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
export default {
  name: "article-comment-list",
  mixins: [MescrollMixin],
  props: {
    // 文章 ID
    articleId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      page: 1, // 当前页数
      pageSize: 5, // 每页评论数
      commentList: [], // 评论列表
      isShowAllComment: false, //是否展示全部评论
      isInit: true, // 是否为init
      mescroll: null, // 组件实力
      commentListTotal: 0, // 评论总数
    };
  },
  created() {
    this.loadCommentList();
  },
  mounted() {},
  methods: {
    /**
     * 获取评论列表
     */
    async loadCommentList() {
      const { data: res } = await getArticleCommentList({
        articleId: this.articleId,
        page: this.page,
        size: this.pageSize,
      });
      // 获取总数
      this.commentListTotal = res.count;
      // 判断是不是第一页
      if (this.page == 1) {
        this.commentList = res.list;
      } else {
        this.commentList = [...this.commentList, ...res.list];
      }
    },
    onMoreClick() {
      this.isShowAllComment = true;
    },
    // 首次加载
    async mescrollInit() {
      await this.loadCommentList();
      this.isInit = false; //首次加载搞定了
      // 结束 上拉加载
      this.getMescroll().endSuccess();
      this.getMescroll().endBySize(
        this.commentList.length,
        this.commentListTotal
      );
    },
    // 上拉加载更多
    async upCallback() {
      if (this.isInit) return;
      this.page += 1;
      await this.loadCommentList();
      // 结束 上拉加载
      this.getMescroll().endSuccess();
    },
    //返回 mescroll实例对象
    getMescroll() {
      if (!this.mescroll) {
        this.mescroll = this.$refs.mescrollRef.mescroll;
      }
      return this.mescroll;
    },
    // 添加commenList增加一个评论
    addCommentList(data) {
      this.commentList.unshift(data);
    },
  },
};
</script>
<style lang="scss" scoped>
.comment-title {
  font-weight: bold;
  color: $uni-text-color-title;
  font-size: $uni-font-size-lg;
  margin: $uni-spacing-col-lg 0;
}
.comment-limt-container {
  .show-more {
    margin: $uni-spacing-col-lg;
    text-align: center;
    color: $uni-text-color-more;
    font-size: $uni-font-size-base;
  }
}
</style>
