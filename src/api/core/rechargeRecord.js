import request from "@/utils/request";

export default {
  getPageList(page, limit, keyword) {
    return request({
      url: `/admin/lnRecord/RecordServicelist/${page}/${limit}`,
      method: "get",
      params: { keyword },
    });
  },
};
