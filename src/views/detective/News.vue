<template class="one">
  <el-space wrap class="btn">
    <el-button type="primary" @click="($event) => $router.push('./upload')" class="leftbtn"
      >舆情上传</el-button>
    <el-button type="primary" @click="reCord" class="rightbtn">上传记录</el-button>
    </el-space>
<hr>

<span style="font-size: 24px; position: relative; top: 70px; left: 100px;">最新发布 </span>
  <div class="centainer">
    <!-- <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span style="font-size: 24px">近期舆情记录</span>
         <span style="font-size: 24px">近期舆情记录</span>
        </div>
      </template>
      <ul @click="drawer = true">
        <li
          v-for="item in listData"
          :key="item.no"
          class="text-item"
          @click="handleItemClick(item)"
        >
        <span style="margin-right: 100px;">{{ item.no }}</span> 
        <span>{{ item.title }}</span>
        </li>
      </ul> -->

    <!-- 抽屉效果 -->
    <!-- <el-drawer v-if="drawerVisible" :visible.sync="drawerVisible" v-model="drawer" title="I am the title" :with-header="false">
                
                  <h2>{{ selectedData.no }}</h2>
                  <p>{{ selectedData.description  }}</p>

                  <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span>认为此舆情为假</span>
                    <el-button class="button" text>Operation button</el-button>
                  </div>
                </template>
                <div>
                  <p>昵称：王小北</p>
                  <p>时间：2023.5.21</p>
                  <p>信任值：85</p>
                </div>
              </el-card>

                </el-drawer> -->
    <!-- </el-card> -->
    <div class="card-container">
      <!-- <el-scrollbar height="700px"> -->
      <el-row>
        <el-row
          v-for="item in listData"
          :key="item.no"
          class="text-item"
          @click="handleItemClick(item)"
        >
          <el-card :body-style="{ padding: '0px' }" class="card" shadow="hover">
            <div class="card-content">
              <!-- <el-empty description="description" class="image" /> -->
              <!-- <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            /> -->
              <div class="text-content">
                <ul @click="drawer = true">
                  <li>
                    <!-- <span style="margin-right: 100px">{{ item.no }}</span> -->
                    <h2 style="padding-top: 5px;">{{ item.title }}</h2>
                  </li>
                </ul>
                <div class="bottom">
                  <span style="padding-right: 20px;"> {{ item.name }}</span>
                  <span>信誉值：{{ 64 }}</span>
                  <span style="  float: right;">{{item.time}}</span>
                </div>
              </div>
            </div>
          </el-card>
        </el-row>
      </el-row>
    <!-- </el-scrollbar> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  // name: 'News', // 组件名称
  data() {
    const listData = [
      {
        no: "1",
        title: "二次感染新冠症状会更轻吗?",
        time: "2023.5.16",
        name: "王涛",
        description: "二次感染新冠症状会更轻吗?",
      },
      {
        no: "2",
        title: "钟南山称今年6月底或是今年疫情高峰？",
        time: "2023.5.16",
        name: "里斯",
        description: "Description 2",
      },
      {
        no: "3",
        title: "最近AI诈骗盛行？",
        time: "2023.5.16",
        name: "张旭",
        description: "Description 3",
      },
      {
        no: "4",
        title: "桂林371所学校因暴雨停课？",
        time: "2023.5.16",
        name: "周琦",
        description: "Description 4",
      },
      {
        no: "5",
        title: "华为研发出量子芯片？",
        time: "2023.5.16",
        name: "张三",
        description: "Description 5",
      },
      {
        no: "6",
        title: "58同城近期大量裁员？",
        time: "2023.5.16",
        name: "张三",
      },
    ];
    return {
      listData,
      drawer: ref(false),
      drawerVisible: false,
      selectedData: {},
    };
  },
  methods: {
    handleItemClick(item) {
      // 在这里执行对应的函数，传入点击的具体数据
      console.log("Clicked item:", item);
      //       // 点击列表项时保存对应的数据项
      //       this.selectedData = item;
      // // 打开抽屉组件
      // this.drawerVisible = true;
      // 使用编程式导航将用户导航到新页面
      this.$router.push({
        path: "./news/lastest" + item.no,
        query: {
          itemId: item.no,
          itemTitle: item.title,
          itemTiem: item.time,
          itemName: item.name,
          itemDescription: item.description,
        },
      });
    },
    // 方法
    reCord() {
      this.$router.push("./record");
      const token = sessionStorage.getItem("token");
      axios.defaults.headers.common["token"] = ` ${token}`;
      const url = "http://124.223.59.64:80/opinion/alone";
      console.log(url);
      axios
        .get(url, token)
        .then((response) => {
          console.log(response.data);
          response.data.data.forEach((dataItem, index) => {
            this.listData.push({
              no: index + 1,
              title: dataItem.title,
              time: dataItem.updateTime,
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
  },
  mounted() {
    // 挂载后执行的代码
  },
};
</script>

<style scoped>
.one {
  position: absolute;
}
.btn {
  margin-left: 80px;
  /* padding-top: 50px; */

}

.leftbtn {
  height: 50px;
  font-size: large;
}
.rightbtn {
  margin-left: 750px;
  height: 50px;
  font-size: large;
} 

.card-container {
  display: flex;
    align-items: center;
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  padding-top: 50px;
  padding-right: 30px;
}



.image {
  width: 40%;
  height: 170px;
}

.card {
  height: 160px;
  flex: 1;
  margin-right: 10px;
  width: 700px;
  justify-content: space-between;
}

.card-content {
  /* padding-left: 40%; */
}

.text-content {
  flex: 1; /* 让文本内容占据剩余的可用空间 */
  padding: 14px;
}

ul li {
  list-style: none;
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
  margin: auto;
}
.centainer {
  width: 100%;
  height: 1200px;
  background-color: rgb(240, 240, 249);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4%;
}

.top {
  /* float: left; */
  width: 100%;
  display: flex; /* 或者 inline-flex */
}

.left {
  margin: 50px 320px;
}

.right {
  margin: 50px 10px;
}

.mid {
  border: 1px solid black;
  width: 850px; /* 设置div宽度 */
  height: 330px;
  margin: 10px 200px;
}

.first {
  border-bottom: 1px solid black;
  height: 165px;
}

.f1 {
  width: 80%;
  background-color: blueviolet;
  float: left;
  height: 165px;
  /* margin-top: 5px; */
}

.photo {
  width: 20%;
  background-color: rgba(153, 24, 227, 0.587);
  float: right;
  height: 165px;
}

.one {
  margin-top: 10px;
  margin-left: 10px;
}

.love {
  position: relative;
  top: 72px;
  left: 580px;
}

.people {
  position: relative;
  top: 75px;
  left: 20px;
  /* width: 100px; */
  display: inline-block;
}

.time {
  position: relative;
  top: 75px;
  left: 90px;
  display: inline-block;
}

.middle {
  /* position: relative; */
  right: 160px;
  width: 100%;
  /* height: 100%; */
}
.text-item {
  margin-bottom: 20px;
  font-size: 20px;
  padding-left: 240px;
}
</style>
