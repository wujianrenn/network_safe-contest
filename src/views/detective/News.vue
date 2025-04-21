<template class="one">
  <div class="news-btn-bar">
  <el-button
    type="primary"
    @click="($event) => $router.push('./upload')"
    class="leftbtn"
    >舆情上传</el-button
  >
  <el-button type="primary" @click="reCord" class="rightbtn"
    >上传记录</el-button
  >
</div>
  <hr />

  <!-- <button @click="btn">测试</button> -->
  <span style="font-size: 24px; position: relative; top: 70px; left: 100px"
    >最新发布
  </span>
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
          v-for="item in listData.reverse()"
          :key="item.no"
          class="text-item"
          @click="handleItemClick(item)"
        >
          <el-card :body-style="{ padding: '0px' }" class="card" shadow="hover">
            <div class="card-content">
              <div class="text-content">
                <ul @click="drawer = true">
                  <li>
                    <h2 style="padding-top: 5px">{{ item.title }}</h2>
                    <span :style="{ color: changeColor }" class="startnumber">{{
                      startNumber
                    }}</span>
                    <span
                      style="float: right; margin-right: 20px"
                      @click="good(item)"
                    >
                      <img
                        :src="
                          item.liked
                            ? 'https://tse1-mm.cn.bing.net/th/id/OIP-C.JPL7jGmZwXlhWiDpEEilJwHaFo?w=278&h=211&c=7&r=0&o=5&dpr=1.5&pid=1.7'
                            : 'https://img.51miz.com/preview/element/00/01/04/61/E-1046130-B357714A.jpg'
                        "
                        alt=""
                        width="26"
                        height="24"
                      />
                    </span>
                  </li>
                </ul>
                <div class="bottom">
                  <span style="padding-right: 20px"> {{ item.name }}</span>
                  <span>信誉值：{{ 64 }}</span>
                  <span style="float: right">{{ item.time }}</span>
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
import { ref, toRaw } from "vue";

export default {
  // name: 'News', // 组件名称
  data() {
    const listData = [
      // {
      //   no: "1",
      //   title: "二次感染新冠症状会更轻吗?",
      //   time: "2023.5.16",
      //   name: "王涛",
      //   description: "二次感染新冠症状会更轻吗?",
      // },
      // {
      //   no: "2",
      //   title: "钟南山称今年6月底或是今年疫情高峰？",
      //   time: "2023.5.16",
      //   name: "里斯",
      //   description: "Description 2",
      // },
      // {
      //   no: "3",
      //   title: "最近AI诈骗盛行？",
      //   time: "2023.5.16",
      //   name: "张旭",
      //   description: "Description 3",
      // },
      // {
      //   no: "4",
      //   title: "桂林371所学校因暴雨停课？",
      //   time: "2023.5.16",
      //   name: "周琦",
      //   description: "Description 4",
      // },
      // {
      //   no: "5",
      //   title: "华为研发出量子芯片？",
      //   time: "2023.5.16",
      //   name: "张三",
      //   description: "Description 5",
      // },
      // {
      //   no: "6",
      //   title: "58同城近期大量裁员？",
      //   time: "2023.5.16",
      //   name: "张三",
      // },
    ];
    return {
      listData,
      drawer: ref(false),
      drawerVisible: false,
      selectedData: {},
      startNumber: 0,
      imgSrc:
        "https://img.51miz.com/preview/element/00/01/04/61/E-1046130-B357714A.jpg",
      clicked: false,
      changeColor: "black",
      change: false,
    };
  },
  methods: {
    async handleButtonClick() {
      try {
        const token = sessionStorage.getItem("token");
        axios.defaults.headers.common["token"] = ` ${token}`;
        console.log(token);
        const url = "http://124.223.59.64:80/opinion/list0";
        console.log(url);

        const response = await axios.get(url);
        console.log(response);

        response.data.data.forEach((dataItem, index) => {
          this.listData.push({
            no: index + 1,
            id: dataItem.id,
            title: dataItem.title,
            time: dataItem.updateTime,
            name: dataItem.nickName,
            content: dataItem.content,
            liked: false, // Add this property
          });
          console.log(dataItem)
        });
        if (response.data.code != 1) {
          alert("网络出现问题，请重试!");
          return;
        }
      } catch (error) {
        console.error(error);
      }
    },

    //测试接口
    // btn() {
    //   const token = sessionStorage.getItem("token");
    //   axios.defaults.headers.common["token"] = ` ${token}`
    //   const opinionId = 1692203898625900546
    //   const value = 1;
    //   const url = "http://124.223.59.64:80/opinion/like/" + ` ${opinionId}/${value}`;
    //   console.log(url);
    //   axios
    //     .put(url,token)
    //     .then((response) => {
    //       console.log(response.data);
    //       console.log('点赞成功！')
    //       if (response.data.code != 1) {
    //         alert("网络出现问题，请重试!");
    //         return;
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },
    

    good(item) {
      // this.startNumber = this.startNumber +
      item.liked = !item.liked;

      console.log("item.id:", item.id);
      const id = item.id;

      let value = 0;
      if (!this.clicked) {
        this.imgSrc =
          "https://tse1-mm.cn.bing.net/th/id/OIP-C.JPL7jGmZwXlhWiDpEEilJwHaFo?w=278&h=211&c=7&r=0&o=5&dpr=1.5&pid=1.7";
      } else {
        this.imgSrc =
          "https://img.51miz.com/preview/element/00/01/04/61/E-1046130-B357714A.jpg";
      }
      this.clicked = !this.clicked;

      const opinionid = 123;
      if (!this.change) {
        // this.changeColor = "red";
        // this.startNumber = this.startNumber + 1;
        value = 1;
      } else {
        // this.changeColor = "black";
        // this.startNumber = this.startNumber - 1;
        value = 0;
      }
      this.change = !this.change;

      //接口
      const startNumber = this.startNumber;
      const token = sessionStorage.getItem("token");
      axios.defaults.headers.common["token"] = ` ${token}`;
      const opinionId = id;
      const url = "http://124.223.59.64:80/opinion/like" + `/${id}/${value}`;
      console.log(url);
      console.log("opinionId:", opinionId);
      axios
        .put(url,token)
        .then((response) => {
          console.log('data:',response.data);
          if (response.data.code != 1) {
            alert("网络出现问题，请重试!");
            return;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    handleItemClick(items) {
      console.log("Clicked item:", items);
      const item = toRaw(items);
      console.log("item:", item);
      console.log('item.content:',item.content)
      //       // 点击列表项时保存对应的数据项
      //       this.selectedData = item;
      // // 打开抽屉组件
      // this.drawerVisible = true;
      // 使用编程式导航将用户导航到新页面

      setTimeout(() => {
        console.log('content:',item.content);
        this.$router.push({
          // path: "/account/detail",
          path: "/account/detail",
          query: {
            itemNo: item.content,
            itemTitle: item.title,
            itemTime: item.time,
            itemName: item.name,
            itemId: item.id,
          },
          params: {},
        });
      }, 1500);
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
    this.handleButtonClick();
  },
};
</script>

<style scoped>
.startnumber {
  float: right;
  font-size: 8px;
}
.one {
  position: absolute;
}
.news-btn-bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 32px 0 16px 0;
  flex-wrap: wrap;
  gap: 16px;
}
@media (max-width: 600px) {
  .news-btn-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  .leftbtn, .rightbtn {
    width: 100%;
    margin-left: 0 !important;
  }
}


.leftbtn {
  height: 50px;
  font-size: large;
}
.rightbtn {
  height: 50px;
  font-size: large;
  /* margin-left: 750px; 移除固定宽度，交由flex布局控制 */
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
  /* height: 1200px; */
  background-color: rgb(240, 240, 249);
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-radius: 1%; */
  margin-top: 20px;
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

.one {
  margin-top: 10px;
  margin-left: 10px;
}

.time {
  position: relative;
  top: 75px;
  left: 90px;
  display: inline-block;
}
.text-item {
  margin-bottom: 20px;
  font-size: 18px;
  padding-left: 240px;
}
</style>
