<template>
  <el-card shadow="never" class="index">
    <template #header>
      <div class="card_header">
        <b>具体舆情</b>
      </div>
    </template>
    <br />
    <div class="centainer">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span style="font-size: 24px">{{ itemTitle }}</span>
          </div>
        </template>
        <!-- <p>具体内容</p> -->
        <p>{{ itemName }}</p>
        <span style="float: right">{{ itemTime }}</span>
        <br>
        <h3>详情：{{ itemId }}</h3>
        <span>{{ itemContent }}</span>
      </el-card>

      <div>
        <el-button
          v-for="button in buttons"
          :key="button.text"
          :type="button.type"
          text
          style="float: right"
          @click="answer()"
          >{{ button.text }}</el-button
        >
        <h2 class="demonstration">请侦探在下方对该事件的真实性进行投票</h2>
        <br />
        <div class="slider-demo-block">
          <span class="distance_right">真</span>
          <el-slider v-model="value1" />
          <span class="distance_left">假</span>
        </div>
      </div>
      <h2>评论区</h2>
      <el-button @click="handleButtonClick()">评论区</el-button>

      <el-row v-for="item in listData">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span class="image-span">&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span style="font-size: 24px">
                阿丽会把脉 {{ item.itemName }}</span
              >
              <span>信誉值:59</span>
              <p>
                <el-icon><UserFilled /></el-icon>某三甲医院内科医师
              </p>
              <span style="float: right">{{ item.time }}</span>
            </div>
          </template>
          <!-- {{ item.commented }} -->
          <div>真，该人物的确被造谣。据报道，在2023年8月的一起事件中，开国少将何克希的外孙女石女士公开指责自媒体私自盗用并曲解外公的照片，将他错认为“革命叛徒”。经过搜寻，石女士发现这些涉及外公的视频被22个自媒体账号转载或发布在8个不同的社交平台上，其中最早的视频发布于今年4月。浙江日报报道，何克希为四川峨眉人，1929年加入中国共产党，随后便开始了长达53年的革命生涯。1949年4月，何克希率部参加解放南京的战役。1955年被授予少将军衔和一级独立自由勋章、一级解放勋章。1966年，何克希到浙江工作，担任浙江省政协副主席，直至临终。</div>
        </el-card>
      </el-row>

      <div class="page-container">
        <el-input v-model="input" placeholder="添加评论" class="fixed-input" />
        <el-button
          type="primary"
          :icon="Plus"
          class="add"
          circle
          @click="addComment"
        />
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref, onMounted, toRaw, reactive } from "vue";
import { ChatDotRound, UserFilled, Plus } from "@element-plus/icons";
import { createRouter, createWebHistory } from 'vue-router';
import axios from "axios";
import { useRouter } from "vue-router";

const components = {
  UserFilled,
  ChatDotRound,
};
const router = useRouter();
const buttons = [{ type: "primary", text: "AI甄别" }];

let geturl = window.location.href;

let getqyinfo = geturl.split("?")[1];
let getqys = getqyinfo.split("&");
let itemContent = decodeURI(getqys[0].split("=")[1]);
let itemTitle = decodeURI(getqys[1].split("=")[1]);
let itemTime = getqys[2].split("=")[1];
let itemName = decodeURI(getqys[3].split("=")[1]);

if(getqys[4])
 { 
   var itemId=getqys[4].split("=")[1];
  //  return itemId;
}
if (getqys[5]) {
  let itemIds = decodeURI(getqys[5].split("=")[1]);
}

// let itemId = decodeURI(getqys[4].split("=")[1]);

const value1 = ref(93);
const listData = ref([]);

const input = ref("");

const answer = () => {
  router.push({
    path: "/account/answer",
    query: {
      itemContent: itemContent,
      itemName: itemName,
      itemId: decodeURI(itemId),
      itemTitle: itemTitle,
      itemTime: itemTime,

    },
    params: {},
  });
};

const addComment = () => {
  const comments = input.value; // 获取输入框的值
  console.log("Added comment:", comments);
  const commend = reactive({
    commented: comments,
    opinionId: itemId,
    userId: "414",
  });
  const url = "http://124.223.59.64:80/comment/add";
  console.log(url);
  axios.defaults.headers.common["Content-Type"] = "application/json";
  const token = sessionStorage.getItem("token");
  axios.defaults.headers.common["token"] = ` ${token}`;
  axios
    .post(url, commend, token)
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
};

const handleButtonClick = async () => {
  const token = sessionStorage.getItem("token");
  axios.defaults.headers.common["token"] = ` ${token}`;
  const url = "http://124.223.59.64:80/comment/list/" + itemId;
  // const url = "http://124.223.59.64:80/comment/list";
  try {
    const response = await axios.get(url);
    console.log(response, 2);
    response.data.data.forEach((dataItem) => {
      listData.value.push({
        commented: dataItem.commented,
        time: dataItem.updateTime,
        id: dataItem.userId,
      });
    });
    console.log(toRaw(listData.value), "111");
    if (response.data.code !== 1) {
      alert("网络出现问题，请重试!");
      return;
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  handleButtonClick();
});
</script>

<style scoped>
.add {
  position: fixed;
  bottom: 0;
  left: 76%;
  transform: translateX(-10%);
  /* transform: translateY(-170%); */
}
.page-container {
  position: relative;
  /* min-height: 100vh; 确保页面高度至少为视口高度 */
}

.fixed-input {
  position: fixed;
  bottom: 0;
  left: 30%;
  /* transform: translateX(-10%); */
  /* transform: translateY(-100%); */
  width: 700px;
  height: 50px;
}

.card_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.image-span {
  width: 100px;
  height: 100px;
  background-image: url("../../answer/image.png");
  background-size: cover;
}
.centainer {
  width: 90%;
  /* height: calc(100vh - 284px); */
  background-color: rgb(240, 240, 249);
  /* display: flex; */
  /* justify-content: space-between; */
  align-items: center;
  border-radius: 4%;
  padding: 20px 50px 0px 40px;
}

.box-card {
  width: 800px;
  margin: 10px 100px 50px 100px;
}

.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block {
  margin-top: 0;
  margin-left: 12px;
}
.el-slider {
  width: 700px;
}
.slider-demo-block {
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}

.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}

.distance_right {
  margin-left: 100px;
  margin-right: 50px;
}
.distance_left {
  margin-left: 50px;
}
</style>
