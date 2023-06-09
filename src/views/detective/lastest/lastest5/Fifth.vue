<template>
    <div class="centainer">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span style="font-size: 24px">{{ itemTitle }}</span>
          </div>
        </template>
        <p>具体内容</p>
        <p>{{ itemDescription }}</p>
      </el-card>
  
      <h2>评论区</h2>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span style="font-size: 24px"> 阿丽会把脉</span>
            <span> &nbsp; &nbsp; &nbsp; &nbsp;信誉值:59</span>
            <p><el-icon><UserFilled /></el-icon>某三甲医院内科医师</p>
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
  import { ChatDotRound , UserFilled} from "@element-plus/icons";
  export default {
  
      components: {
          UserFilled,ChatDotRound
      },
    data() {
      return {
        itemId: null,
        itemTitle: null,
        itemTiem: null,
          itemName: null,
          itemdescription:null,
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
        this.itemDescription = this.$route.query.itemdescription;
    },
  };
  </script>
  
  <style scoped>
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
  </style>
  