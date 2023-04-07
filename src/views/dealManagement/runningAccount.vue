<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="订单号">
        <el-input v-model="searchObj.orderId" placeholder="订单号" />
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input v-model="searchObj.customerName" placeholder="客户名称" />
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="searchObj.mobile" placeholder="联系电话" />
      </el-form-item>
      <el-form-item label="充电站点名称">
        <el-input v-model="searchObj.siteName" placeholder="充电站点名称" />
      </el-form-item>
      <el-form-item label="交易状态">
        <el-select
          v-model="searchObj.transactionStatus"
          placeholder="请选择"
          clearable
        >
          <el-option label="未完成" value="0" />
          <el-option label="已完成" value="1" />
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="fetchData()">
        查询
      </el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
      <!-- Excel导出按钮 -->
      <el-button
        @click="exportData"
        type="primary"
        size="mini"
        icon="el-icon-upload2"
      >
        导出
      </el-button>
    </el-form>
    <!-- 列表 -->
    <el-table :data="list" border stripe>
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="orderId" label="订单号" />
      <el-table-column prop="createTime" label="时间" />
      <el-table-column prop="customerName" label="客户名称" />
      <el-table-column prop="mobile" label="联系电话" />
      <el-table-column label="交易类型" width="90">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.tradeType === 0" type="warning" size="mini">
            预付款
          </el-tag>
          <el-tag
            v-else-if="scope.row.tradeType === 1"
            type="success"
            size="mini"
          >
            充电付款
          </el-tag>
          <el-tag
            v-else-if="scope.row.tradeType === 2"
            type="success"
            size="mini"
          >
            退款
          </el-tag>
          <!-- <el-tag v-else type="danger" size="mini">操作失败</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column label="支付方式" width="90">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.modePayment === 0" type="warning" size="mini">
            微信支付
          </el-tag>
          <el-tag
            v-else-if="scope.row.modePayment === 1"
            type="success"
            size="mini"
          >
            支付宝支付
          </el-tag>
          <el-tag
            v-else-if="scope.row.modePayment === 2"
            type="success"
            size="mini"
          >
            充点卡支付
          </el-tag>
          <!-- <el-tag v-else type="danger" size="mini">支付失败</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column prop="transactionAmount" label="交易金额" />
      <el-table-column prop="siteName" label="充电站点名称" />
      <el-table-column label="交易状态" width="90">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.transactionStatus === 0"
            type="warning"
            size="mini"
          >
            未完成
          </el-tag>
          <el-tag
            v-else-if="scope.row.transactionStatus === 1"
            type="success"
            size="mini"
          >
            已完成
          </el-tag>
          <!-- <el-tag v-else type="danger" size="mini">绑定失败</el-tag> -->
        </template>
      </el-table-column>

      <!-- <el-table-column label="用户状态" width="90">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" type="danger" size="mini">
            锁定
          </el-tag>
          <el-tag v-else type="success" size="mini">正常</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="getAccountById(scope.row.id)"
          >
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[3, 6, 9]"
      style="padding: 30px 0"
      layout="total, sizes, prev, pager,next, jumper"
      @size-change="changePageSize"
      @current-change="changeCurrentPage"
    />
    <!-- <el-pagination background layout="prev, pager, next" :total="100">
    </el-pagination> -->
    <!-- {{ tableData }} -->
    <!-- 用户登录日志 -->
    <el-dialog title="交易流水详情" :visible.sync="dialogTableVisible">
      <!-- <h3>故障站点：{{Role.addressSite}} ---- 故障站点负责人：{{Hitch.person }} ---- 故障站点联系人：{{Hitch.contacts}}----站点联系人电话：{{Hitch.contactsPhone}}</h3> -->
      <br />
      <table>
        <tr align="center">
          <!-- <td><b>故障充电桩编号:</b>{{ Hitch.id }}</td> -->
          <td><b>交易编号:</b></td>
          <td>{{ Account.orderId }}</td>
          <td><b>创建时间：</b></td>
          <td>{{ Account.createTime }}</td>
        </tr>
        <br />
        <tr align="center">
          <!-- <td><b>故障充电桩编号:</b>{{ Hitch.id }}</td> -->
          <td><b>客户名称:</b></td>
          <td>{{ Account.customerName }}</td>
          <td><b>联系电话:</b></td>
          <td>{{ Account.mobile }}</td>
        </tr>
        <br />
        <tr align="center">
          <!-- <td><b>故障充电桩编号:</b>{{ Hitch.id }}</td> -->
          <td><b>交易金额:</b></td>
          <td>{{ Account.transactionAmount }}</td>
          <td><b>充电站点名称:</b></td>
          <td>{{ Account.siteName }}</td>
        </tr>
        <br />
        <tr align="center">
          <td>交易类型:</td>
          <td>
            <el-tag v-if="Account.tradeType === 0" type="warning" size="mini">
              预付款
            </el-tag>
            <el-tag
              v-else-if="Account.tradeType === 1"
              type="success"
              size="mini"
            >
              充电付款
            </el-tag>
            <el-tag
              v-else-if="Account.tradeType === 2"
              type="success"
              size="mini"
            >
              退款
            </el-tag>
          </td>
        </tr>
        <br />
        <tr align="center">
          <td>支付方式:</td>
          <td>
            <el-tag v-if="Account.modePayment === 0" type="warning" size="mini">
              微信支付
            </el-tag>
            <el-tag
              v-else-if="Account.modePayment === 1"
              type="success"
              size="mini"
            >
              支付宝支付
            </el-tag>
            <el-tag
              v-else-if="Account.modePayment === 2"
              type="success"
              size="mini"
            >
              充点卡支付
            </el-tag>
          </td>
        </tr>
        <br />

        <tr align="center">
          <td>交易状态:</td>
          <td>
            <el-tag
              v-if="Account.transactionStatus === 0"
              type="warning"
              size="mini"
            >
              未完成
            </el-tag>
            <el-tag
              v-else-if="Account.transactionStatus === 1"
              type="success"
              size="mini"
            >
              已完成
            </el-tag>
          </td>
        </tr>
      </table>
    </el-dialog>
  </div>
</template>
<script>
import accountApi from "@/api/core/account";
export default {
  data() {
    return {
      list: null, // 数据列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 3, // 每页记录数
      searchObj: {}, // 查询条件

      BASE_API: process.env.VUE_APP_BASE_API, //获取后端接口地址
      //show: {}, //会员登录日志
      dialogTableVisible: false, //对话框是否显示
      Account: {},
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    changePageSize(size) {
      console.log("size", size);
      this.limit = size;
      this.fetchData();
    },
    changeCurrentPage(page) {
      console.log("page", page);
      this.page = page;
      this.fetchData();
    },
    //根据id查询
    getAccountById(id) {
      //打开对话框
      this.dialogTableVisible = true;
      //加载数据
      accountApi.getById(id).then((response) => {
        console.log(id);
        this.Account = response.data.record;
      });
    },
    fetchData() {
      accountApi
        .getPageList(this.page, this.limit, this.searchObj)
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
      window.location.href =
        this.BASE_API + "/chargingPile/deal/lnAccount/export";
    },
  },
};
</script>
