<template>
  <div class="app-container">

    <div class="com1" style="float: left;">
          <!--查询表单 :inline="true"表示行内表单所有都在一行-->
          <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="设备名称">
              <el-input v-model="searchObj.mobile" placeholder="设备名称" />
              </el-form-item>
              <el-form-item label="状态">
              <el-select v-model="searchObj.status" placeholder="请选择" clearable>
                  <el-option label="在线" value="1" />
                  <el-option label="离线" value="0" />
              </el-select>
              </el-form-item>
              
          
          </el-form>
      </div>

      
    
     <div class="com" style="float: right;">
          <el-button type="primary" @click="fetchData()">
          查询
          </el-button>
          <el-button type="primary" @click="fetchData()">
          新增
          </el-button>
          <!-- <el-button type="primary" @click="fetchData()">
          启用
          </el-button> -->
          <el-button type="danger" @click="fetchData()">
          删除
          </el-button>
          <!-- <el-button type="danger" @click="fetchData()">
          禁用
          </el-button> -->
     </div>
     <div style="float: left;">
      <el-container>
      <el-aside width="400px">
        <div
          style="
          width: 400px;
            font-weight: bolder;
            color: white;
            line-height: 40px;
            background-color: rgba(27, 169, 249, 1);
            float: left;
          ">
          充电站点
        </div>
        

        <el-table :data="list" border row-key="id" lazy >
          <el-table-column label="站点名称" align="left" prop="stationName" />
        </el-table>
        <ul id="treeDemo" class="ztree"></ul>
      </el-aside>
      <el-main>
          <el-tag style="width: 256px;height: 300px;">
            <div>
              <video ref="video" width="256px" style="margin-left: -10px;padding-bottom: 100px;" height="300px" autoplay></video>
              <div id="joystick-container"></div>
            </div>
          </el-tag>
          <el-tag type="success" style="width: 256px;height: 300px;">
            <video ref="video2" width="256px" style="margin-left: -10px;padding-bottom: 100px;" height="300px" autoplay></video>
            <div id="joystick-container1"></div>
          </el-tag>
          <el-tag type="success" style="width: 256px;height: 300px;">
            <video ref="video3" width="256px" style="margin-left: -10px;padding-bottom: 100px;" height="300px" autoplay></video> 
            <div id="joystick-container2"></div>
          </el-tag>
          
        </el-main>
    </el-container>
     </div>
     <!-- <div> <img :src="imageURL" alt="image"></div> -->
  </div>
  
</template>
<script>
import station from '@/api/core/station';
//import CameraService from '@/api/core/CameraService';
import Nipple from 'nipplejs';
export default {
  data() {
    return {
      imageURL: '"http://172.20.10.10:81/stream',
      fits: ['fill'],
      stream:null,
      url: '',
      list: null, // 数据列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 2, // 每页记录数
      searchObj: {}, // 查询条件
      loginRecordList: [], //会员登录日志
      dialogTableVisible: false, //对话框是否显示
      multipleSelection: [],
      handleNodeClick:[],
      form: {
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: "",
      input: "",
      },
    defaultProps: {
      children: "children",
      label: "label",
    },
    }
    
  },

  created() {
    // 当页面加载时获取数据
    this.fetchData();
  },
  mounted() {
    //const video = this.getStream();
    const video = this.$refs.video;
    const video2 = this.$refs.video2;
    const video3 = this.$refs.video3;

  // 获取摄像头流
  navigator.mediaDevices.getUserMedia({
    video: true,
    video2: true,
    video3: true,
    //audio: false
  })
  .then(stream => {
    video.srcObject = stream;
    video.play();
    video2.srcObject = stream;
    video2.play();
    video3.srcObject = stream;
    video3.play();
  })
  .catch(err => {
    console.log(`无法获取摄像头流: ${err}`);
  });

  // 创建摇杆控件
  const joystickContainer = document.getElementById('joystick-container');
  const joystick = Nipple.create({
    zone: joystickContainer,
    mode: 'static',
    color: 'blue',
    size: 100,
  });
  

  // 绑定摇杆控制事件
  joystick.on('move', (evt, data) => {
    // 计算平移距离
    const delta = data.distance * 3; // 乘以一个系数，控制平移速度
    const x = data.direction.x;
    const y = data.direction.y;

    // 根据摇杆方向计算平移距离
    let tx = 0;
    let ty = 0;
    if (x === 'left') {
      tx = -delta;
    } else if (x === 'right') {
      tx = delta;
    }
    if (y === 'up') {
    ty = -delta;
    } else if (y === 'down') {
    ty = delta;
    }
    

     // 平移视频
    video2.style.transform = `translate(${tx}px, ${ty}px)`;
    video.style.transform = `translate(${tx}px, ${ty}px)`;
  });
  // 创建摇杆控件1
  const joystickContainer1 = document.getElementById('joystick-container1');
  const joystick1 = Nipple.create({
    zone: joystickContainer1,
    mode: 'static',
    color: 'blue',
    size: 100,
  });
  // 绑定摇杆控制事件1
  joystick1.on('move', (evt, data) => {
    // 计算平移距离
    const delta = data.distance * 3; // 乘以一个系数，控制平移速度
    const x = data.direction.x;
    const y = data.direction.y;

    // 根据摇杆方向计算平移距离
    let tx = 0;
    let ty = 0;
    if (x === 'left') {
      tx = -delta;
    } else if (x === 'right') {
      tx = delta;
    }
    if (y === 'up') {
    ty = -delta;
    } else if (y === 'down') {
    ty = delta;
    }
    

     // 平移视频
    video2.style.transform = `translate(${tx}px, ${ty}px)`;
    
  });
   // 创建摇杆控件2
   const joystickContainer2 = document.getElementById('joystick-container2');
  const joystick2 = Nipple.create({
    zone: joystickContainer2,
    mode: 'static',
    color: 'blue',
    size: 100,
  });
  // 绑定摇杆控制事件1
  joystick2.on('move', (evt, data) => {
    // 计算平移距离
    const delta = data.distance * 3; // 乘以一个系数，控制平移速度
    const x = data.direction.x;
    const y = data.direction.y;

    // 根据摇杆方向计算平移距离
    let tx = 0;
    let ty = 0;
    if (x === 'left') {
      tx = -delta;
    } else if (x === 'right') {
      tx = delta;
    }
    if (y === 'up') {
    ty = -delta;
    } else if (y === 'down') {
    ty = delta;
    }
    

     // 平移视频
    video3.style.transform = `translate(${tx}px, ${ty}px)`;
    
  });

},

  methods: {
     
    fetchData(){
      station.listByParentId(1).then(response=>{
        this.list = response.data.list
      })
    },
    //延迟加载子节点
    getChildren(row, treeNode, resolve) {
      station.listByParentId(row.id).then(response => {
      //负责将子节点数据展示在展开的列表中  
      resolve(response.data.list)
      })
    },
    // async getStream() {
    //     const cameraService = new CameraService();
    //     const stream = await cameraService.getStream();
    //     // 在 video 元素中显示视频流
    //     const video = this.$refs.video;
    //     video.src = URL.createObjectURL(stream);
    //     video.play();
    // },
    // beforeDestroy() {
    //   // 在组件销毁时关闭视频流
    //   if (this.stream) {
    //     const tracks = this.stream.getTracks();
    //     tracks.forEach(track => track.stop());
    //   }
    // }
  }
};

</script>
