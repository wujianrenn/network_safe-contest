<template>
  <div class="centainer">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span style="font-size: 24px">{{ itemTitle }}</span>
        </div>
      </template>
      <!-- <p>具体内容</p> -->
      <p>{{ itemDescription }}</p>
    </el-card>

    <div>
      <h2 class="demonstration">请侦探在下方对该事件的真实性进行投票</h2>
      <br>
      <div class="slider-demo-block">
        <span class="distance_right">真</span>
        <el-slider v-model="value1" />
        <span class="distance_left">假</span>
      </div>
    </div>
    <h2>评论区</h2>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="image-span">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span style="font-size: 24px"> 阿丽会把脉</span>
          <span> &nbsp; &nbsp; &nbsp; &nbsp;信誉值:59</span>
          <p>
            <el-icon><UserFilled /></el-icon>某三甲医院内科医师
          </p>
          <span style="float: right">2023-04-19</span>
        </div>
      </template>
      <p>
        二次感染者指第二次感染新型冠状病毒患者，第二次感染新型冠状病毒后症状可能会更轻，也有可能会更重，具体情况需因人而异。
        新型冠状病毒是目前临床上发病率较高的一种疾病，这种疾病具有较强的传染性，可以通过呼吸道经飞沫传播、直接接触传播、气溶胶传播等。如果第一次感染了新型冠状病毒，在日常生活中没有做好自身防护，也会引起第二次感染新型冠状病毒。因为每个惠者的个人体质不同，所以第二次感染新型冠状病毒后病情的轻重以及症状也会不同，个人体质较强的患者，可能症状比较轻，只会出现轻微的身体不话感，但是如果患者的个人体质较差，并且有严重的基础疾病，可能第二次感染后症状会更加严重，容易引起呼吸困难等较为严重的症状
        所以在日常生活中要做好自身防护，正确佩戴口罩，外出回家后要勤洗手，定期对物品消毒，能够降低第二次感染新型冠状病毒的几率
      </p>
    </el-card>
  </div>
</template>

<script>
import { ChatDotRound, UserFilled } from "@element-plus/icons";
import { ref } from "vue";

export default {
  components: {
    UserFilled,
    ChatDotRound,
  },
  data() {
    return {
      value1: ref(93),
      itemId: null,
      itemTitle: null,
      itemTiem: null,
      itemName: null,
      itemDescription: null,
    };
  },
  methods: {
    // 方法
  },
  mounted() {
    // 挂载后执行的代码
    this.itemId = this.$route.query.itemId;
    this.itemTitle = this.$route.query.itemTitle;
    this.itemTiem = this.$route.query.itemTiem;
    this.itemName = this.$route.query.itemName;
    this.itemDescription = this.$route.query.itemDescription;
  },
};
</script>

<style scoped>
.image-span {
  width: 100px;
  height: 100px;
  background-image: url("../../answer/image.png");
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
  /* overflow: hidden; */
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
