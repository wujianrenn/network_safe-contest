<template>
  <div class="login">
    <h1 class="login-title">舆情分析系统的开发与应用</h1>
    <el-card class="login_center">
      <template #header>
        <div class="card_header">
          <span>用户登录</span>
        </div>
      </template>
      <el-form :model="loginFormState" :rules="rules" ref="loginFormRef">
        <el-form-item prop="account">
          <el-input
            v-model.trim="loginFormState.account"
            maxlength="32"
            placeholder="请输入账号"
            clearable
          >
            <template #prefix>
              <icons account="User"></icons>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model.trim="loginFormState.password"
            maxlength="16"
            show-password
            placeholder="请输入密码"
            clearable
            @keyup.enter.exact="handleLogin"
          >
            <template #prefix>
              <icons account="Lock"></icons>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked3" label="是否为管理人员" @click="handleCheckboxClick" />
          <el-button
            type="primary"
            style="width: 100%"
            :loading="loginFormState.loading"
            @click="handleLogin"
            >登 录</el-button
          >
          <br /><br />
          <el-button
            type="primary"
            style="width: 100%"
            :loading="loginFormState.register"
            @click="handleRegister"
            >注 册</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { encode } from "js-base64";
import Icons from "../../components/Icons.vue";
import axios from "axios";

export default {
  components: { Icons },
  setup() {
    const checked3 = ref(false);
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const store = useStore();
    const loginFormRef = ref();

    //把需要进行确认的信息装入一个对象里
    const loginFormState = reactive({
      account: "",
      password: "",
      admin: "0",
    });

    const handleCheckboxClick = () => {
      loginFormState.admin = "1";
    };

    const rules = {
      account: [{ required: true, message: "账号不能为空", trigger: "blur" }],
      password: [
        { required: true, message: "密码不能为空", trigger: "blur" },
        { min: 5, max: 16, message: "密码长度为5-16位", trigger: "blur" },
      ],
    };

    const open4 = () => {
      ElMessage.error("非法登录");
    };

    const handleLogin = () => {
      console.log("1");
      loginFormRef.value.validate((valid) => {
        if (!valid) {
          return false;
        }
        let params = {
          account: loginFormState.account,
          password: loginFormState.password,
        };

        setTimeout(() => {
          let users = {
            role: loginFormState.admin === "1" ? "admin" : "user",
            useraccount: loginFormState.account,
          };
          Object.assign(params, users);
          sessionStorage.setItem("jwt", encode(JSON.stringify(params)));
          store.dispatch("setUser", params);
          loginFormState.loading = false;

          const url = "http://124.223.59.64:80/user/login";
          axios
            .post(url, loginFormState)
            .then((response) => {
              console.log(response.data);
              if (response.data.code === 1) {
                sessionStorage.setItem("token", response.data.data.token);
                console.log(response.data.data.token);
                console.log("登录成功");
              } else {
                console.log("登录失败");
                alert("登录失败");
                console.log(loginFormState.admin)
                open4();
                router.replace("/login");
              }
            })
            .catch((error) => {
              console.error(error);
            });

          if (loginFormState.account === "admin") {
            router.replace("/contor/show");
          } else {
            router.replace("/account");
          }
        }, 1000);
      });
    };

    const confirmClick = () => {
      console.log("2");
      const ul = "http://124.223.59.64:80/common/getPublic";

      const token = sessionStorage.getItem("token");
      const type = 1;
      axios.defaults.headers.common["token"] = ` ${token}`;

      axios
        .get(ul, token)
        .then((response) => {
          console.log(response.data);
          if (response.data.code === 1) {
            sessionStorage.setItem("publicKey", response.data.data);
            console.log(sessionStorage.getItem("publicKey"));
            console.log("加密成功");
            // console.log(response.data.data.token)
          } else {
            console.log("加密失败");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const handleRegister = () => {
      console.log("happy!1");
      router.push('/register')
    };
    return {
      loginFormRef,
      loginFormState,
      rules,
      handleLogin,
      handleRegister,
      open4,
      handleCheckboxClick,
    };
  },
};
</script>

<style lang="scss" scoped>
:deep(.login-title) {
  color: white;
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  margin: 50px 0 20px 0;
  padding: 20px 0 0 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  width: 100%;
  z-index: 1;
}

.login {
  width: 100vw;
  min-height: 100vh;
  background-image: url("../../assets/img/login.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
  position: relative;
  .login_center {
    width: 400px;
    margin: 100px auto 0;
  }

  .card_header {
    font-size: 18px;
    text-align: center;
  }
}
</style>
