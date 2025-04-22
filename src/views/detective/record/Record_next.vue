<template>
  <div class="record-content">
    <div class="record-list">
      <div class="record-list-header">
        <span class="list-title">全部上传记录</span>
      </div>
      <div v-for="item in listData" :key="item.no" class="record-item">
        <span class="record-number">{{ item.no }}</span>
        <span class="record-title">{{ item.title }}</span>
      </div>
    </div>
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
.record-content {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 10vh;
}

.record-list {
  width: 100%;
  max-width: 850px;
  background-color: #fff;
  border-radius: 8px;
  padding: 0 20px;
}

.record-list-header {
  padding: 20px 0;
  margin-bottom: 15px;
  border-bottom: 1px solid #ebeef5;
}

.list-title {
  font-size: 22px;
  font-weight: 600;
  color: #303133;
}

.record-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
}

.record-item:hover {
  background-color: #f9f9f9;
  transform: translateX(5px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.record-item:last-child {
  border-bottom: none;
}

.record-number {
  width: 60px;
  text-align: center;
  font-weight: bold;
  color: #409eff;
  margin-right: 30px;
  font-size: 18px;
}

.record-title {
  flex: 1;
  font-size: 16px;
  color: #303133;
}

@media (max-width: 768px) {
  .record-content {
    padding-top: 5vh;
  }
  
  .record-list {
    max-width: 95%;
  }
  
  .record-number {
    margin-right: 10px;
  }
}
  </style>