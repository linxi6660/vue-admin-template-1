import request from "@/utils/request";
export default {
  getPageList(page, limit, searchObj) {
    return request({
      url: `/chargingPile/deal/lnAccount/list/${page}/${limit}`,
      method: "get",
      params: searchObj,
    });
  },
  show(id) {
    return request({
      url: `/chargingPile/deal/lnAccount/show/${id}`,
      method: "get",
    });
  },
  getById(id) {
    return request({
      url: `/chargingPile/deal/lnAccount/get/${id}`,
      method: "get",
    });
  },
};
