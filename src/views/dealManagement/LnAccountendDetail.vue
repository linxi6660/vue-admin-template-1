<template>
  <div class="app-container">
    <h4>借款信息</h4>
    <table
      class="table table-striped table-condenseda table-bordered"
      width="100%"
    >
      <tbody>
        <tr>
          <th width="15%">订单号</th>
          <td width="35%">{{ LnAccountendDetail.lnAccountInfo.orderId }}</td>
          <th width="15%">创建时间</th>
          <td width="35%">{{ LnAccountendDetail.lnAccountInfo.createTime }}</td>
        </tr>
        <tr>
          <th>客户名称111</th>
          <td>{{ LnAccountendDetail.lnAccountInfo.customerName }}</td>
          <th>联系电话</th>
          <td>{{ LnAccountendDetail.lnAccountInfo.mobile }}</td>
        </tr>
        <tr>
          <th>交易类型</th>
          <td>
            {{ LnAccountendDetail.lnAccountInfo.tradeType }}
          </td>
          <th>支付方式</th>
          <td>{{ LnAccountendDetail.lnAccountInfo.modePayment }}</td>
        </tr>
        <tr>
          <th>交易金额</th>
          <td>{{ LnAccountendDetail.lnAccountInfo.transactionAmount }}</td>
          <th>充电站点名称</th>
          <td>{{ LnAccountendDetail.lnAccountInfo.siteName }}</td>
        </tr>
        <tr>
          <th>交易状态</th>
          <td>{{ LnAccountendDetail.lnAccountInfo.transactionStatus }}</td>
          <th></th>
          <td></td>
        </tr>
      </tbody>
    </table>
    <el-row style="text-align: center; margin-top: 40px">
      <el-button @click="back">返回</el-button>
    </el-row>
  </div>
</template>
<script>
import accountApi from "@/api/core/account";
import "@/styles/show.css";
export default {
  data() {
    return {
      LnAccountendDetail: {
        lnAccountInfo: {
          param: {},
        },
        //LnAccountendDetail: {},
      },
    };
  },
  created() {
    if (this.$route.params.id) {
      this.fetchDataById();
    }
  },
  methods: {
    fetchDataById() {
      accountApi.show(this.$route.params.id).then((response) => {
        this.LnAccountendDetail = response.data.LnAccountendDetail;
      });
    },
    back() {
      this.$router.push({ path: "/dealManagement/runningAccount" });
    },
  },
};
</script>
