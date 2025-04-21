<template>
  <div class="centainer">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span style="font-size: 36px">{{ itemTitle }}</span>
          <el-icon style="float: right; font-size: 26px" @click="send()"
            ><Position
          /></el-icon>
        </div>
      </template>
      <span class="image-span">&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span style="font-size: 16px"> 蔡徐坤打篮球</span>
      <!-- <span>{{ itemTitle }}</span> -->
      <span style="float: right">2023-04-19</span>
      <span> &nbsp; &nbsp; &nbsp; &nbsp;信誉值:59</span>
      <br /><br />
      <p>
        <!-- <el-icon><UserFilled /></el-icon>某三甲医院内科医师 -->
      </p>

      <span style="float: right; color: red">93%为真</span>
    </el-card>

    <el-button
      type="primary"
      round
      style="float: right; position: fixed; right: 300px"
      @click="Message()"
    >
      &nbsp; &nbsp;
      <h2>AI 甄别</h2>
      &nbsp; &nbsp;</el-button
    >
    <br />
    <el-card class="box-card" v-if="message">
      <template #header>
        <div class="card-header">
          <div>
            <h2>AI 回答结果：</h2>
          </div>
        </div>
      </template>
      <div  v-if="itemName!=200">
        <!-- {{ itemNo }} -->
      </div>
      <!-- <div v-if="itemName==200">真，该人物的确被造谣。据报道，在2023年8月的一起事件中，开国少将何克希的外孙女石女士公开指责自媒体私自盗用并曲解外公的照片，将他错认为“革命叛徒”。经过搜寻，石女士发现这些涉及外公的视频被22个自媒体账号转载或发布在8个不同的社交平台上，其中最早的视频发布于今年4月。浙江日报报道，何克希为四川峨眉人，1929年加入中国共产党，随后便开始了长达53年的革命生涯。1949年4月，何克希率部参加解放南京的战役。1955年被授予少将军衔和一级独立自由勋章、一级解放勋章。1966年，何克希到浙江工作，担任浙江省政协副主席，直至临终。</div> -->
      <div>真，该人物的确被造谣。据报道，在2023年8月的一起事件中，开国少将何克希的外孙女石女士公开指责自媒体私自盗用并曲解外公的照片，将他错认为“革命叛徒”。经过搜寻，石女士发现这些涉及外公的视频被22个自媒体账号转载或发布在8个不同的社交平台上，其中最早的视频发布于今年4月。浙江日报报道，何克希为四川峨眉人，1929年加入中国共产党，随后便开始了长达53年的革命生涯。1949年4月，何克希率部参加解放南京的战役。1955年被授予少将军衔和一级独立自由勋章、一级解放勋章。1966年，何克希到浙江工作，担任浙江省政协副主席，直至临终。</div>
    </el-card>
  </div>
</template>

<script>
import { ChatDotRound, UserFilled, Position } from "@element-plus/icons";

export default {
  components: {
    UserFilled,
    ChatDotRound,
    Position,
  },
  data() {
    let geturl = window.location.href;

    let getqyinfo = geturl.split("?")[1];
    let getqys = getqyinfo.split("&");
    let itemNo = decodeURI(getqys[0].split("=")[1]);
    let itemTitle = decodeURI(getqys[1].split("=")[1]);
    let itemTime = decodeURI(getqys[2].split("=")[1]);
    let itemName = decodeURI(getqys[3].split("=")[1]);
    if (getqys[4]) {
      var itemId = getqys[4].split("=")[1];
      //  return itemId;
    }
    // let itemId = decodeURI(getqys[4].split("=")[1]);

    const item = {
      title: "二次感染新冠症状会更轻吗?",
      no: 1,
      time: "2023-5-20",
      description: "二次感染新冠症状会更轻吗?",
      name: "里斯",
    };
    return {
      message: false,
      item,
      itemNo,
      itemTime,
      itemTitle,
      itemName,
      itemId,
      flag: false,
    };
  },
  methods: {
    showme() {
      if (this.itemName === "200") {
        this.flag = true;
      }
    },
    // 方法
    Message() {
      setTimeout(() => {
        this.message = !this.message;
      }, 500);
    },

    // send() {
    //   this.$router.push({
    //     path: "/account/news/lastest1",
    //     query: {
    //       itemId: this.item.no,
    //       itemTitle: this.item.title,
    //       itemTiem: this.item.time,
    //       itemName: this.item.name,
    //       itemDescription: this.item.description,
    //     },
    //   });
    // },
  },
  mounted() {
    // 挂载后执行的代码
    this.itemId = this.$route.query.itemId;
    this.itemTitle = this.$route.query.itemTitle;
    this.itemTiem = this.$route.query.itemTiem;
    this.itemName = this.$route.query.itemName;
    this.itemDescription = this.$route.query.itemdescription;
    this.showme();
  },
};
</script>

<style scoped>
.image-span {
  width: 100px;
  height: 100px;
  background-image: url("./image.png");
  background-size: cover;
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

.box-card {
  width: 800px;
  margin: 70px 100px 50px 100px;
}
</style>
