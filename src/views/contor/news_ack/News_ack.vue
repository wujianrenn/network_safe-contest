<template>
  <div class="news-ack-header">
    <div class="news-ack-btn-group">
      <el-button @click="handleButtonClick((type = 0))">已审核通过</el-button>
      <el-button @click="handleButtonClick((type = 1))">待审核</el-button>
    </div>
</div>
<el-scrollbar height="900px">
  <el-table
    :data="tableData"
    stripe
    style="width: 100%"
    @row-click="handleButtonIfpass"
  >
      <el-table-column type="index" width="100" />
      <!-- <el-table-column prop="no" label="序号" width="100" /> -->
      <el-table-column prop="title" label="舆情标题" width="300" />
      <el-table-column prop="time" label="上传时间" width="180" />
      <el-table-column prop="name" label="用户名" width="100" />
      <!-- eslint-disable-next-line -->
      <el-table-column label="评估结果" width="200" slot-scope="scope">
        <el-button
          @row-click="handleButtonIfpass(index, 0)"
          @click="IfStatus(0)"
          plain
          >通过</el-button
        >
        <el-button
          @row-click="handleButtonIfpass(index, 1)"
          @click="IfStatus(1)"
          >不通过</el-button
        >
      </el-table-column>
      <el-table-column prop="date" label="查看详情" width="200">
        <el-button @click="handleButtonDetail()">查看详情</el-button>
      </el-table-column>
    </el-table>
  </el-scrollbar>
  <!-- <el-pagination layout="prev, pager, next" :total="50" /> -->
  <el-dialog v-model="dialogTableVisible" title="详情">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span style="font-size: 24px"> {{ tableData[0].title }}</span>
        </div>
      </template>
      <p>{{ tableData[0].title }}</p>
      <p style="float: right; margin-bottom: 20px">{{ tableData[0].title }}</p>
    </el-card>
  </el-dialog>
</template>

<script>
import axios from "axios";
import { ElNotification } from "element-plus";
import { toRaw } from "vue";

export default {
  data() {
    return {
      dialogTableVisible: false,
      tableData: [
        // {
        //   no: "1",
        //   title: "钟南山称今年6月底或是今年疫情高峰？",
        //   time: "2022.5.16",
        //   name: "天眼",
        // },
        // {
        //   no: "2",
        //   title: "华为研发出量子芯片？",
        //   time: "2022.5.20",
        //   name: "南风",
        // },
        // {
        //   no: "3",
        //   title: "最近AI诈骗盛行？",
        //   time: "2022.5.22",
        //   name: "张强",
        // },
        // {
        //   no: "4",
        //   title: "G7峰会上拜登称美中关系会短时间内缓和，可信吗？",
        //   time: "2022.5.06",
        //   name: "秀西",
        // },
        // {
        //     no: '5',
        //     title: '桂林371所学校因暴雨停课？',
        //     time:'2022.5.12',
        //     name: '宇胜',
        // },
        // {
        //     no: '6',
        //     title: 'oppo终止哲库业务是因为美国的威胁？',
        //     time:'2022.5.18',
        //     name: '哲雅',
        // },
      ],
    };
  },
  methods: {
    IfStatus(status) {
      status = status;
    },
    handleButtonDetail(row) {
      this.dialogTableVisible = true;
      // 处理按钮点击事件
      console.log("点击了编辑按钮，当前行数据：", row);
    },
    handleButtonClick(type) {
      // 处理按钮点击事件
      // console.log('点击了编辑按钮，当前行数据：', row);
      const token = sessionStorage.getItem("token");
      console.log("1");
      axios.defaults.headers.common["token"] = ` ${token}`;
      console.log(token);
      const url = "http://124.223.59.64:80/opinion/list" + type;
      console.log(url);
      axios
        .get(url, token)
        .then((response) => {
          console.log(response);
          response.data.data.reverse().forEach((dataItem, index) => {
            this.tableData.push({
              no: index + 1,
              id: dataItem.id,
              title: dataItem.title,
              time: dataItem.updateTime,
              name: dataItem.nickName,
            });
          });
          if (response.data.code != 1) {
            alert("网络出现问题，请重试!");
            return;
          }
          // sessionStorage.setItem('token',res.token)
        })
        .catch((error) => {
          console.error(error);
        });
    },

    handleButtonIfpass(item) {
      const items = toRaw(item); // 获取当前行的ID
      console.log("Clicked ID:", items.id); // 这里是点击的 ID
      const status = this.status;
      console.log("Status:", status); // 通过或不通过的状态
      const token = sessionStorage.getItem("token");
      axios.defaults.headers.common["token"] = ` ${token}`;
      console.log(token);
      const url = "http://124.223.59.64:80/opinion/update/" + items.id;
      console.log(url);
      axios
        .post(url, token)
        .then((response) => {
          console.log(response);
          if (response.data.code != 1) {
            alert("网络出现问题，请重试!");
            return;
          }
        })
        .catch((error) => {
          console.error(error);
        });
      ElNotification({
        title: "Success",
        message: "This is a success message",
        type: "success",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.news-ack-header {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.news-ack-btn-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
// 表格和内容区块自适应
.el-scrollbar {
  width: 100%;
  min-width: 0;
}
.el-table {
  width: 100% !important;
  min-width: 320px;
}
// 响应式优化
@media (max-width: 600px) {
  .news-ack-header {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  .news-ack-btn-group {
    flex-direction: column;
    gap: 8px;
  }
}
.middle {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
