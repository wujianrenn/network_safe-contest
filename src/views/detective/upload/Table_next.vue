<template>
  <div class="centainer">
    <!-- 这里是模板内容 -->
    <el-form :model="form" label-width="100px">
      <el-form-item class="item" label="舆情标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="舆情类型">
        <el-select v-model="form.type" placeholder="请选择舆情类型">
          <el-option label="娱乐明星" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="发生地点">
        <el-select v-model="form.region" placeholder="请选择发生地点">
          <el-option label="陕西省" value="shannxi" />
          <el-option label="北京市" value="beijing" />
          <el-option label="上海市" value="shanghai" />
        </el-select>
      </el-form-item>
      <el-form-item class="item" label="舆情内容">
        <!-- <textarea  v-model="form.desc" name="" id="" cols="300" rows="10"></textarea> -->
        <el-input v-model="form.content" type="textarea" :rows="6" />
      </el-form-item>
      <el-form-item class="item" label="得知源头">
        <el-input v-model="form.desc" type="textarea" :rows="6" />
      </el-form-item>
      <div class="center">
        <el-form-item>
          <el-button type="primary" @click="onSubmit"
            >&nbsp; &nbsp;提交&nbsp;&nbsp;
          </el-button>
          <el-button> &nbsp;&nbsp;取消&nbsp;&nbsp; </el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- 结束位置 -->
  </div>
</template>

<!-- <script>
  export default {
    // name: 'News', // 组件名称
    data() {
      return {
        // 数据
        
      }
    },
    methods: {
      // 方法
    },
  }
  </script> -->

<script>
import { reactive } from "vue";
import { ElNotification } from "element-plus";
import axios from "axios";

export default {
  name: "News",
  setup() {
    const form = reactive({
      title: "",
      source: "",
      date1: "",
      date2: "",
      type: [],
      resource: "",
      desc: "",
      content: "",
      id: "123",
    });

    const token = sessionStorage.getItem("token");
    console.log("1");
    axios.defaults.headers.common["token"] = ` ${token}`;

    const onSubmit = () => {
      const url = "http://124.223.59.64:80/opinion/add";
      axios
        .post(url, form, token)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      ElNotification.success({
        title: "提交成功",
        message: "请等待管理员的审核，审核通过后发布",
        offset: 80,
      });
    };

    return {
      form,
      onSubmit,
    };
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
  padding: 90px 100px 20px 30px;
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
</style>
