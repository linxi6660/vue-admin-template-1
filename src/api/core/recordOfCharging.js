import request from "@/utils/request";

export default {
  findArticle(page, limit, searchObj) {
    return request({
      url: `http://localhost:8110/acr/core/lnCharge/listChargePage/${page}/${limit}`,
      method: "get",
      params: searchObj,
    });
  },
  getchargeId(chargeId) {
    return request({
      url: `http://localhost:8110/acr/core/lnCharge/getChargeId/${chargeId}`,
      method: "get",
    });
  },
  Refundlist(getChargeIdon) {
    return request({
      url: `http://localhost:8110/acr/core/lnCharge/Refundlist`,
      method: "post",
      params: getChargeIdon,
    });
  },
};
