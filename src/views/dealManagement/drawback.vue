<template>
  <div>
    <div style="float: left; width: 1400px">
      <div style="margin: 20px"></div>
      <div
        style="
          width: 350px;
          float: left;
          margin-right: 127px;
          margin-left: 309px;
        "
      >
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAlign"
        >
          <el-form-item label="充电单号">
            <el-input v-model="getChargeIdon.chargeId"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="getChargeIdon.telephone"></el-input>
          </el-form-item>
          <el-form-item label="充电电量">
            <el-input v-model="getChargeIdon.electricity"></el-input>
          </el-form-item>
          <el-form-item label="电桩编号">
            <el-input v-model="getChargeIdon.chargingPile"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="width: 350px; float: left">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAlign"
        >
          <el-form-item label="客户名称">
            <el-input v-model="getChargeIdon.username"></el-input>
          </el-form-item>
          <el-form-item label="支付方式">
            <el-input v-model="getChargeIdon.payment"></el-input>
          </el-form-item>
          <el-form-item label="消费金额">
            <el-input v-model="getChargeIdon.consumption"></el-input>
          </el-form-item>
          <el-form-item label="充电电站">
            <el-input v-model="getChargeIdon.site"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div style="float: left; margin-right: 127px; margin-left: 309px">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="退款原因">
          <el-input
            type="textarea"
            v-model="getChargeIdon.reasons"
            style="width: 750px"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="资料附件">
          <!-- <el-input> -->
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <!-- </el-input> -->
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="退款金额">
          <el-input v-model="getChargeIdon.amount"></el-input>
        </el-form-item>
        <el-form-item
          label="备注:退款的金额会按原路返回，中途若产生手续费需退款人承担，谢谢！"
        >
        </el-form-item>
      </el-form>
    </div>
    <div
      style="width: 350px; float: left; margin-right: 127px; margin-left: 600px"
    >
      <el-button style="margin-right: 127px" @click="ToSkip()">返回</el-button>
      <el-button type="primary" @click="refundlist()">提交</el-button>
    </div>
  </div>
</template>

<script>
import recordinfoApi from "@/api/core/orderform";
export default {
  data() {
    return {
      getChargeIdon: {},

      labelPosition: "right",
      formLabelAlign: {
        username: "",
        chargeId: "",
        telephone: "",
        electricity: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },

  created() {
    this.getChargeId();
  },
  methods: {
    getChargeId() {
      recordinfoApi.getchargeId(this.$route.query.chargeId).then((response) => {
        this.getChargeIdon = response.data.getChargeIdon;
      });
    },
    refundlist() {
      recordinfoApi.Refundlist(this.getChargeIdon).then((response) => {});
      this.oe();
    },
    ToSkip() {
      //返回充电记录页面
      this.$router.push("/dealManagement/recordOfCharging");
    },
    oe() {
      //返回充电记录页面
      this.$router.push("/dealManagement/refundDispose");
    },
  },
};
</script>
