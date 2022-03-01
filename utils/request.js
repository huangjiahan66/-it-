const BASE_URL = "https://api.imooc-blog.lgdsunday.club/api";
import store from "../store";
function request({ url, data, method }) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      header: {
        icode: "B1A65310DDDDE679",
        Authorization: store.state.user.token,
      },
      data,
      method,
      success: ({ data, statusCode, header }) => {
        if (data.success) {
          resolve(data);
        } else {
          uni.showToast({
            title: data.message,
            icon: "none",
            mask: true,
            duration: 3000,
          });
          reject(data.message);
        }
      },
      fail: (error) => {
        reject(error);
      },
      complete: () => {
        // 关闭加载
        uni.hideLoading();
      },
    });
  });
}

export default request;
