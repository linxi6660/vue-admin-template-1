import request from "@/utils/request";
export default {
  getPageList(page, limit, searchObj) {
    return request({
      url: `/chargingPile/deal/lnRecord/list/${page}/${limit}`,
      method: "get",
      params: searchObj,
    });
  },
};
