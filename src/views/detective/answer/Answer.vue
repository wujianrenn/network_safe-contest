<template>
  <div class="centainer">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span style="font-size: 36px">{{ item.title }}</span>
          <el-icon style="float: right; font-size: 26px" @click="send()"
            ><Position
          /></el-icon>
        </div>
      </template>
      <span class="image-span">&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span style="font-size: 16px"> 蔡徐坤打篮球</span>
      <span style="float: right">2023-04-19</span>
      <span> &nbsp; &nbsp; &nbsp; &nbsp;信誉值:59</span>
      <br /><br />
      <p>
        <!-- <el-icon><UserFilled /></el-icon>某三甲医院内科医师 -->
      </p>

      <span style="float: right; color: red">93%为真 </span>
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
      <div>
        <p>
          通常情况下，二次感染新冠病毒的症状可能会较初次感染时轻微。这是因为二次感染时，身体已经产生了针对病毒的免疫反应，包括细胞免疫和体液免疫。这些免疫反应可以更快速地应对病毒，并减轻疾病的严重程度。
        </p>
        <p>
          另外，如果病毒株发生变异，尤其是对抗已有免疫的变异，可能会影响二次感染的严重程度。新冠病毒的变异会导致病毒蛋白结构的改变，可能使病毒更具传染性或逃避免疫反应。在这种情况下，二次感染的症状可能与初次感染相近甚至更严重。
        </p>
        <p>
          然而，需要强调的是，每个人的免疫系统和疾病反应都有所不同。即使是二次感染，仍有可能出现较重的症状，尤其是对于某些特定的个体，如免疫系统受损或存在其他健康问题的人。
        </p>
        <p>
          综上所述，虽然一般情况下二次感染新冠病毒的症状可能较轻，但具体情况仍取决于个体的免疫状态以及病毒的变异情况。无论是初次感染还是二次感染，都需要保持警惕，并采取适当的防护措施，如遵循卫生指南、戴口罩、勤洗手、保持社交距离等，以减少感染和传播的风险。
        </p>
      </div>
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
    };
  },
  methods: {
    // 方法
    Message() {
      setTimeout(() => {
        this.message = !this.message;
      }, 500);
    },

    send() {
      this.$router.push({
        path: "/account/news/lastest1",
        query: {
          itemId: this.item.no,
          itemTitle: this.item.title,
          itemTiem: this.item.time,
          itemName: this.item.name,
          itemDescription: this.item.description,
        },
      });
    },
  },
  mounted() {
    // 挂载后执行的代码
    this.itemId = this.$route.query.itemId;
    this.itemTitle = this.$route.query.itemTitle;
    this.itemTiem = this.$route.query.itemTiem;
    this.itemName = this.$route.query.itemName;
    this.itemDescription = this.$route.query.itemdescription;
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
