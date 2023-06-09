<template>
  <el-row class="user" :gutter="16">
    <el-col :sm="24" :md="8" :lg="6">
      <el-card shadow="hover" style="margin-bottom: 16px">
        <div class="user_left">
          <img class="avatar" src="@/assets/img/admin.png" draggable="false" />
          <p class="user_name">昵称</p>
          <!-- 个人信息 -->
          <div class="line">
            <Icons name="message" />
            <span>Gmail</span>
          </div>
          <div class="line">
            <Icons name="location-information" />
            <span>地址</span>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :sm="24" :md="16" :lg="18">
      <el-card shadow="hover">
        <template #header>
          <span>信息设置</span>
        </template>
        <el-form
          class="user_right"
          :model="userState"
          :rules="rules"
          ref="userFormRef"
          label-width="96px"
        >
          <el-form-item label="昵称" prop="nickname">
            <el-input
              :disabled="btnStatus"
              v-model.trim="userState.nickname"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="生日" prop="birth">
            <el-input v-model.trim="userState.birth" clearable></el-input>
          </el-form-item>

          <!-- <el-form-item label="邮箱" prop="email">
                        <el-input v-model.trim="userState.email" clearable></el-input>
                    </el-form-item> -->
          <el-form-item label="性别" prop="gender">
            <el-input v-model.trim="userState.gender" clearable></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="number">
            <el-input v-model.trim="userState.number" clearable></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model.trim="userState.address" clearable></el-input>
          </el-form-item>
          <el-form-item label="微信号" prop="wx">
            <el-input v-model.trim="userState.wx" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleClick('reset')">重置</el-button>
            <el-button type="primary" @click="handleClick('save')">{{
              isSave
            }}</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
import { reactive, ref } from "vue";
import { ElNotification } from "element-plus";

export default {
  setup() {
    const userFormRef = ref();
    const userState = reactive({ nickname: "", gender: "", number: "" });
    const rules = {
      nickname: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
      email: [
        { required: true, message: "邮箱不能为空", trigger: "blur" },
        { type: "email", message: "邮箱格式有误", trigger: "blur" },
      ],
    };
    let btnStatus = false;
    let isSave = "保存";

    const handleClick = (type) => {
      btnStatus = !btnStatus;
      isSave = "修改";
      if (type === "reset") {
        userFormRef.value.resetFields();
        return;
      }
      userFormRef.value.validate((valid) => {
        if (!valid) {
          return false;
        }
        const token = sessionStorage.getItem("token");
        console.log("1");
        axios.defaults.headers.common["token"] = ` ${token}`;
        const url = "http://124.223.59.64:80/person/add";
        console.log(url);
        axios
          .post(url, token, userState)
          .then((response) => {
            console.log(response.data);
            if (response.data.code != 1) {
              alert("网络出现问题，请重试!");
              return;
            }
            // sessionStorage.setItem('token',res.token)
          })
          .catch((error) => {
            console.error(error);
          });
        console.log("3");

        ElNotification.success({
          title: "提交成功",
          message: "个人信息已修改",
          offset: 80,
        });
      });
    };
    return { userFormRef, userState, rules, btnStatus, handleClick, isSave };
  },
};
</script>

<style lang="scss" scoped>
.user_left {
  padding-top: 20px;
  .avatar {
    margin: 0 auto;
    display: block;
    width: 128px;
    height: 128px;
    border-radius: 50%;
  }

  .user_name {
    padding: 16px 0;
    font-size: 20px;
    line-height: 2;
    text-align: center;
  }

  .line {
    color: #555;
    line-height: 32px;
    i {
      margin-right: 8px;
      font-size: 18px;
    }
  }
}

.user_right {
  padding-right: 16px;
}

.el-input {
  width: 500px;
}
</style>
