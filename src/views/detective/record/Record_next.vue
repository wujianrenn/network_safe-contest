<template>
    <div class="centainer">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span style="font-size:24px">全部上传记录</span>
          </div>
        </template>
        <div v-for="item in listData" :key="item.no" class="text-item" >
          <span style="margin-right: 100px;">{{ item.no }}</span> 
        <span>{{ item.title }}</span>
        </div>
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
    // name: 'News', // 组件名称
    data() {
      const listData = [
      {
        no: "1",
        title: "钟南山称今年6月底或是今年疫情高峰？",
        time: "2022.5.16",
        name: "张三",
      },
      {
        no: "2",
        title: "最近AI诈骗盛行？",
        time: "2022.5.16",
        name: "张三",
      },
      {
        no: "3",
        title: "G7峰会上拜登称美中关系会短时间内缓和，可信吗？",
        time: "2022.5.16",
        name: "张三",
      },
      {
        no: "4",
        title: "桂林371所学校因暴雨停课？",
        time: "2022.5.16",
        name: "张三",
      },
      {
        no: "5",
        title: "华为研发出量子芯片？",
        time: "2022.5.16",
        name: "张三",
      },
      {
        no: "6",
        title: "oppo终止哲库业务是因为美国的威胁？",
        time: "2022.5.16",
        name: "张三",
      },
            ]
        return {
            listData 
        };
    },
    methods: {
      // 方法
    },
    mounted() {
      // 挂载后执行的代码

    }
  }
  </script>

  <style scoped>
    .text-item{
    margin-top:20px;
  }
  .text-item:first-child{
    margin-top: 0px;
  }
  .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 800px;
  margin: 150px 150px;
}
    .centainer {
        width: 90%;
        height: calc(100vh - 284px);
        background-color: rgb(240, 240, 249);
        /* display: flex; */
        /* justify-content: space-between; */
        align-items: center;
        border-radius: 4%;
        padding: 20px 50px 0px 40px;
    }
  </style>