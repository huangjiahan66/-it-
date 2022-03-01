// 热搜相关接口

// 热搜文章
import request from "../utils/request";

export function getHotTabs() {
  return request({
    url: "/hot/tabs",
  });
}

// 热搜文章列表
export function getHotListFormTabType(type) {
  return request({
    url: "/hot/list",
    data:{
      type
    }
  });
}
