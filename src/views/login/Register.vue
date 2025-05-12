<template>
    <div class="login">
      <el-card class="login_center">
        <template #header>
          <div class="card_header">
            <span>用户注册</span>
          </div>
        </template>
        <el-form :model="loginFormState" :rules="rules" ref="loginFormRef" label-position="top">
          <el-form-item prop="username" label="用户名">
            <el-input
              v-model.trim="loginFormState.username"
              maxlength="32"
              placeholder="请输入用户名"
              clearable
            >
              <template #prefix>
                <icons account="User"></icons>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="account" label="账号">
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
          <el-form-item prop="password" label="密码">
            <el-input
              v-model.trim="loginFormState.password"
              maxlength="16"
              show-password
              placeholder="请输入密码"
              clearable
            >
              <template #prefix>
                <icons account="Lock"></icons>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword" label="确认密码">
            <el-input
              v-model.trim="loginFormState.confirmPassword"
              maxlength="16"
              show-password
              placeholder="请再次输入密码"
              clearable
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
        username: "",
        account: "",
        password: "",
        confirmPassword: "",
        admin: "0",
        register: false,
      });
  
      // 密码校验规则
      const validatePassword = (rule, value, callback) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;
        if (!passwordRegex.test(value)) {
          callback(new Error('密码必须包含大小写字母和数字，长度8-16位'));
        } else {
          // 如果确认密码已输入，则同时校验确认密码
          if (loginFormState.confirmPassword !== '') {
            loginFormRef.value.validateField('confirmPassword');
          }
          callback();
        }
      };

      // 确认密码校验规则
      const validateConfirmPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== loginFormState.password) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      };

      const rules = {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 20, message: "用户名长度为2-20位", trigger: "blur" }
        ],
        account: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { pattern: /^[a-zA-Z0-9_]{5,20}$/, message: "账号只能包含字母、数字和下划线，长度5-20位", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { validator: validatePassword, trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validateConfirmPassword, trigger: "blur" }
        ]
      };
  
      const open4 = () => {
        ElMessage.error("非法登录");
      };
  
      const handleRegister = () => {
        loginFormRef.value.validate((valid) => {
          if (!valid) {
            ElMessage.warning("请正确填写所有必填项");
            return false;
          }
          
          // 显示加载状态
          loginFormState.register = true;
          
          // 构建注册参数
          let params = {
            username: loginFormState.username,
            account: loginFormState.account,
            password: loginFormState.password,
          };
          
          // 发送注册请求
          const url = "http://124.223.59.64:80/user/register";
          axios.post(url, params)
            .then((response) => {
              if (response.data.code === 1) {
                ElMessage.success("注册成功，请登录");
                setTimeout(() => {
                  router.push('/login');
                }, 1500);
              } else {
                ElMessage.error(response.data.msg || "注册失败，请稍后重试");
              }
            })
            .catch((error) => {
              console.error(error);
              ElMessage.error("注册失败，请检查网络连接");
            })
            .finally(() => {
              loginFormState.register = false;
            });
        });
      };
      return {
        loginFormRef,
        loginFormState,
        rules,
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
      width: 450px;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      
      :deep(.el-form-item__label) {
        font-weight: 500;
        padding-bottom: 4px;
      }
      
      :deep(.el-input__wrapper) {
        border-radius: 4px;
        transition: all 0.3s;
        
        &:hover {
          box-shadow: 0 0 0 1px var(--el-color-primary) inset;
        }
      }
      
      :deep(.el-button) {
        height: 44px;
        font-size: 16px;
        border-radius: 4px;
        transition: all 0.3s;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(64, 158, 255, 0.4);
        }
      }
    }
  
    .card_header {
      font-size: 22px;
      font-weight: bold;
      text-align: center;
      padding: 8px 0;
      color: var(--el-color-primary);
    }
  }
  </style>