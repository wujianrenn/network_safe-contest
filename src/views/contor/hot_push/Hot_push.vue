<template>
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
  
  <el-table :data="tableData" stripe style="width: 100%; height: 820px">
    <el-table-column prop="no" label="序号" width="100" />
    <el-table-column prop="title" label="舆情标题" width="300" />
    <el-table-column prop="time" label="上传时间" width="180" />
    <el-table-column prop="name" label="用户名" width="100" />
    <el-table-column label="评估结果" width="200">
      <el-button @click="handleButtonJudge((status = 1))">真</el-button>
      <el-button @click="handleButtonJudge((status = 0))">假</el-button>
    </el-table-column>
    <el-table-column prop="date" label="查看详情" width="200">
      <el-button @click="handleButtonClick()">查看详情</el-button>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tableData: [
        {
          no: "1",
          title: "钟南山称今年6月底或是今年疫情高峰？",
          time: "2023.7.16",
          name: "山生",
        },
        {
          no: "2",
          title: "最近AI诈骗盛行？",
          time: "2023.7.22",
          name: "盛强",
        },
        {
          no: "3",
          title: "G7峰会上拜登称美中关系会短时间内缓和，可信吗？",
          time: "2023.7.06",
          name: "钟中",
        },
        {
          no: "4",
          title: "桂林371所学校因暴雨停课？",
          time: "2023.7.12",
          name: "小林",
        },
        {
          no: "5",
          title: "华为研发出量子芯片？",
          time: "2023.7.20",
          name: "小华",
        },
        {
          no: "6",
          title: "oppo终止哲库业务是因为美国的威胁？",
          time: "2023.7.18",
          name: "建北",
        },
        {
          no: "7",
          title: "58同城近期大量裁员？",
          time: "2023.7.18",
          name: "小慧",
        },
        {
          no: "8",
          title: "中亚峰将会使中国-中亚关系开启新纪元",
          time: "2023.7.18",
          name: "泰雅",
        },
        {
          no: "9",
          title: "新冠复阳人数最近特别多？",
          time: "2023.7.18",
          name: "杨阳",
        },
        {
          no: "10",
          title: "微软：中国已批准其收购动视暴雪",
          time: "2023.7.18",
          name: "斗印",
        },
      ],
      dialogTableVisible: false,
    };
  },
  methods: {
    handleButtonClick(row) {
      this.dialogTableVisible = true;
      // 处理按钮点击事件
      console.log("点击了编辑按钮，当前行数据：", row);
    },
      handleButtonJudge(status) {
        const token = sessionStorage.getItem("token");
      console.log("1");
      axios.defaults.headers.common["token"] = ` ${token}`;
      console.log(token);
      const url = "http://124.223.59.64:80/opinion/judge" + status;
      console.log(url);
      axios
        .put(url, token)
        .then((response) => {
          console.log(response);
          response.data.data.forEach((dataItem, index) => {
            this.tableData.push({
              no: index + 1,
              title: dataItem.title,
              time: dataItem.updateTime,
              name: dataItem.nickName,
            });
          });
          if (response.data.code != 1) {
            alert("网络出现问题，请重试!");
            return;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.middle {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
