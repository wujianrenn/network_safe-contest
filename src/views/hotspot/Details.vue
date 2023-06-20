<template>
  <div class="centainer">
    <div class="search">
      <input type="ltext" name="" id="" class="content" v-model="ltext" />
      <el-button size="large" :icon="Search" round @click="start"
        >搜索</el-button
      >
    </div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span style="font-size: 24px">排名</span>
          <span style="font-size: 24px; margin-right: 100px; ">舆情名称</span>
          <span style="font-size: 24px; float: right;">舆情热度</span>
        </div>
      </template>
      <div v-for="item in listData" :key="item.no" class="ltext-item">
       <span style="margin-right: 200px;">{{ item.no }}</span> 
        <span>{{ item.title }}</span>
        <!-- <span :style="{ color: changeColor }" class="startnumber">{{
          startNumber
        }}</span> -->
        <span style="float: right; margin-right: 20px;" @click="good">
          <span v-if="item.no<2"><img src="./fire.png" alt="" width="26" height="24"  v-for="index in 1"/></span>
          <span v-if="item.no<8"><img src="./fire.png" alt="" width="26" height="24"  v-for="index in 3"/></span>
          <span v-else="item.no<10"><img src="./fire.png" alt="" width="26" height="24"  v-for="index in 2"/></span>
          <!-- <img :src="imgSrc" alt="" width="26" height="24"> -->
          <img src="./fire.png" alt="" width="26" height="24" />
        </span>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
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
      {
        no: "7",
        title: "58同城近期大量裁员？",
        time: "2022.5.16",
        name: "张三",
      },
      {
        no: "8",
        title: "新冠复阳人数最近特别多？",
        time: "2022.5.16",
        name: "张三",
      },
      {
        no: "9",
        title: "中亚峰将会使中国-中亚关系开启新纪元",
        time: "2022.5.16",
        name: "张三",
      },
      {
        no: "10",
        title: "微软：中国已批准其收购动视暴雪",
        time: "2022.5.16",
        name: "张三",
      },
    ];
    return {
      ltext: "",
      listData,
      startNumber: 1000,
      imgSrc: "./爱心.png",
      clicked: false,
      changeColor: "black",
      change: false,
    };
  },
  methods: {
    start() {
      const token = sessionStorage.getItem("token");
      axios.defaults.headers.common["token"] = ` ${token}`;

      const text = this.ltext;
      const url = `http://124.223.59.64:80/common/search/` + text;
      console.log(url);
      console.log("2");
      console.log(this.ltext);
      console.log("3");
      axios
        .get(url, token)
        .then((response) => {
          console.log(response.data);
          ElMessageBox.alert(
            response.data.data[0].content,
            response.data.data[0].title,
            {
              confirmButtonText: "OK",
              callback: () => {
                ElMessage({
                  type: "success",
                  message: `查询成功`,
                });
              },
            }
          );
        })
        .catch((error) => {
          console.error(error);
        });
    },
    good() {
      this.startNumber = this.startNumber + 1;
      if (!this.clicked) {
        this.imgSrc = "./爱心 (1).png";
      } else {
        this.imgSrc = "./爱心.png";
      }
      this.clicked = !this.clicked;

      let value = 0;
      const opinionid = 123;
      if (!this.change) {
        this.changeColor = "fire";
        value = 1;
      } else {
        this.changeColor = "black";
        value = 0;
      }
      this.change = !this.change;

      const startNumber = this.startNumber;
      const token = sessionStorage.getItem("token");
      axios.defaults.headers.common["token"] = ` ${token}`;
      const url = "http://124.223.59.64:80/opinion/like";
      axios
        .put(url, token, value, opinionid)
        .then((response) => {
          console.log(response.data);
          // console.log()
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
  },
};
</script>

<style scoped>
.startnumber {
  float: right;
  font-size: 8px;
}
.ltext-item {
  margin-top: 20px;
}
.ltext-item:first-child {
  margin-top: 0px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ltext {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 900px;
  margin: 50px 90px;
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

.item {
  width: 800px;
}

.center {
  margin: 130px 100px 10px 300px;
}

.el-button {
  margin-right: 30px;
}

.search {
  margin: 0 100px;
  margin-top: 50px;
  position: relative;
  bottom: -10px;
  left: 90px;
}

.content {
  height: 30px;
  width: 500px;
  border-radius: 12px;
  margin-right: 15px;
  padding: 5px 5px 5px 15px;
}
</style>
