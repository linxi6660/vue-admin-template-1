<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="充电单号">
        <el-input v-model="searchObj.chargeId" placeholder="充电单号" />
      </el-form-item>
      <el-form-item label="客户姓名">
        <el-input v-model="searchObj.username" placeholder="客户姓名" />
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="searchObj.telephone" placeholder="联系电话" />
      </el-form-item>
      <el-form-item label="充电站点名称">
        <el-input v-model="searchObj.site" placeholder="充电站点名称" />
      </el-form-item>
      <el-form-item label="交易状态">
        <el-select v-model="searchObj.status" placeholder="请选择" clearable>
          <el-option label="充电中" value="1" />
          <el-option label="退款中" value="2" />
          <el-option label="已完成" value="3" />
        </el-select>
      </el-form-item>

      <el-button
        type="primary"
        icon="el-icon-search"
        @click="findArticleData()"
      >
        查询
      </el-button>
      <el-button type="primary" @click="findArticleData()">退款申请</el-button>
      <el-button type="danger" @click="findArticleData()">冲正</el-button>
      <!-- Excel导出按钮 -->
      <el-button
        @click="exportData"
        type="primary"
        size="mini"
        icon="el-icon-upload2"
        >导出</el-button
      >
    </el-form>
    <!-- 列表 -->
    <el-table :data="list" stripe>
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column
        prop="chargeId"
        label="充电单号"
        width="150"
        height="30"
      />
      <el-table-column prop="username" label="客户名称" />
      <el-table-column prop="telephone" label="联系电话" />
      <el-table-column prop="payment" label="支付方式" />
      <el-table-column prop="consumption" label="消费金额" />
      <el-table-column prop="electricity" label="充电电量" />
      <el-table-column prop="site" label="充值站点名称" />
      <el-table-column prop="chargingPile" label="充电桩编号" />

      <el-table-column label="交易状态" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" type="warning" size="mini">
            充电中
          </el-tag>
          <el-tag v-if="scope.row.status === 2" type="danger" size="mini">
            退款中
          </el-tag>
          <el-tag v-if="scope.row.status === 3" type="success" size="mini">
            已完成
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="mini" @click="goView()" class="btn btn-success">
            <router-link :to="'/dealManagement/recordView?chargeId=' + scope.row.chargeId">
              查看
            </router-link>
          </el-button> -->
          <el-button
            type="view"
            size="mini"
            @click="goView()"
            class="btn btn-success"
          >
            查看
          </el-button>
          <el-button type="primary" size="mini">
            <router-link
              :to="'/dealManagement/drawback?chargeId=' + scope.row.chargeId"
            >
              退款申请
            </router-link>
          </el-button>
          <el-button type="danger" size="mini">
            <router-link :to="'/core/borrower/info-detail/' + scope.row.id">
              冲正
            </router-link>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 25, 50, 100]"
      style="padding: 30px 0"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="changePageSize"
      @current-change="changeCurrentPage"
    />
  </div>
</template>
<script>
import recordinfoApi from "@/api/core/recordOfCharging";
export default {
  data() {
    return {
      list: {}, // 数据列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询条件
      loginRecordList: [], //会员登录日志
      dialogTableVisible: false, //对话框是否显示
      BASE_API: process.env.VUE_APP_BASE_API, //获取后端接口地址
    };
  },
  created() {
    this.findArticleData();
  },
  methods: {
    changePageSize(size) {
      this.limit = size;
      this.findArticleData();
    },
    changeCurrentPage(page) {
      this.page = page;
      this.findArticleData();
    },
    findArticleData() {
      recordinfoApi
        .findArticle(this.page, this.limit, this.searchObj)
        .then((response) => {
          this.list = response.data.pageModel.records;
          this.total = response.data.pageModel.total;
        });
    },
    resetData() {
      //还原表单
      this.searchObj = {};
      //重新查询
      this.fetchData();
    },

    exportData() {
      //导出excel并下载
      window.location.href = "http://localhost:8110/acr/core/lnCharge/export";
    },
    goView() {
      //指定跳转地址
      this.$router.replace("/recordView");
    },
  },
};
</script>
