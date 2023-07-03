<template>
    <div class="login">
      <el-card class="login_center">
        <template #header>
          <div class="card_header">
            <span>用户注册</span>
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

          <el-form-item prop="phone">
            <el-input
              v-model.trim="loginFormState.phone"
              maxlength="16"
              show-phone
              placeholder="请输入电话号码"
              clearable
              @keyup.enter.exact="handleLogin"
            >
              <template #prefix>
                <icons account="Lock"></icons>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="email">
            <el-input
              v-model.trim="loginFormState.email"
              maxlength="16"
              show-email
              placeholder="请输入邮箱"
              clearable
              @keyup.enter.exact="handleLogin"
            >
              <template #prefix>
                <icons account="Lock"></icons>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="address">
            <el-input
              v-model.trim="loginFormState.address"
              maxlength="16"
              show-address
              placeholder="请输入地址"
              clearable
              @keyup.enter.exact="handleLogin"
            >
              <template #prefix>
                <icons account="Lock"></icons>
              </template>
            </el-input>
          </el-form-item>
          
          <el-form-item>
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
                phone: loginFormState.phone,
                email: loginFormState.email,
                address:loginFormState.address,
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
                  open4();
                  router.replace("/login");
                }
              })
              .catch((error) => {
                console.error(error);
              });
  
            if (loginFormState.account === "admin") {
              router.replace("contor/show");
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
        console.log("happy!");
        let params = {
          account: loginFormState.account,
          password: loginFormState.password,
        };
      };
      return {
        loginFormRef,
        loginFormState,
        rules,
        handleLogin,
        handleRegister,
        open4,
      };
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .login {
    width: 100vw;
    height: 100vh;
    background-image: url("../../assets/img/login_new.png");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    .login_center {
      width: 396px;
      height: auto;
    }
  
    .card_header {
      font-size: 18px;
      text-align: center;
    }
  }
  </style>
  