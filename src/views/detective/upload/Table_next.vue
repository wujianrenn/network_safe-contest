<template>
  <div class="centainer">
    <div class="form-wrapper">
      <el-form :model="form" label-width="100px">
        <el-form-item class="form-item" label="舆情标题">
          <el-input v-model="form.title" class="input-with-hover" />
        </el-form-item>
        
        <el-form-item class="form-item" label="舆情类型">
          <el-select 
            v-model="form.opinion_type" 
            placeholder="请选择舆情类型"
            class="select-with-hover"
          >
            <el-option label="企业舆情" value="company" />
            <el-option label="校园舆情" value="school" />
            <el-option label="社会舆情" value="local" />
            <el-option label="政治舆情" value="politics" />
            <el-option label="体育舆情" value="pe" />
            <el-option label="经济舆情" value="eco" />
          </el-select>
        </el-form-item>
        
        <el-form-item class="form-item" label="舆情内容">
          <el-input 
            v-model="form.content" 
            type="textarea" 
            :rows="3" 
            class="textarea-with-hover"
          />
        </el-form-item>
        
        <el-form-item class="form-item" label="得知源头">
          <el-input 
            v-model="form.resource" 
            type="textarea" 
            :rows="3" 
            class="textarea-with-hover"
          />
        </el-form-item>
        
        <div class="button-group">
          <el-button 
            type="primary" 
            @click="onSubmit"
            class="hover-button"
          >提交</el-button>
          <el-button class="hover-button">取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { ElNotification } from "element-plus";
import axios from "axios";

export default {
  name: "News",
  setup() {
    const form = reactive({
      title: "",
      opinion_type: " ",
      // region:" ",
      resource: "",
      content: "",
      // id: "123",
      state:0,
    });

    const token = sessionStorage.getItem("token");
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
  width: 100%;
  padding: 5px 0;
}

.form-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 10vh; /* 添加顶部间距，15%的视口高度 */
}

.form-wrapper .el-form {
  width: 100%;
  max-width: 850px;
}

.form-item {
  margin-bottom: 16px;
}

/* 输入框悬浮效果 */
.input-with-hover,
.select-with-hover,
.textarea-with-hover {
  transition: all 0.3s ease;
  width: 100%;
  font-size: 16px;
}

/* 表单标签样式 */
:deep(.el-form-item__label) {
  font-size: 16px;
  font-weight: 500;
}

.input-with-hover:hover,
.select-with-hover:hover,
.textarea-with-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.1);
}

.input-with-hover:focus-within,
.select-with-hover:focus-within,
.textarea-with-hover:focus-within {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
}

/* 按钮组样式 */
.button-group {
  display: flex;
  justify-content: center;
  margin-top: 10%;
  gap: 30px;
}

/* 按钮悬浮效果 */
.hover-button {
  min-width: 140px;
  padding: 12px 25px;
  font-size: 16px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.hover-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(64, 158, 255, 0.25);
}

/* 响应式布局 */
@media (max-width: 768px) {
  .form-wrapper .el-form {
    max-width: 95%;
    padding: 0 10px;
  }
  
  .button-group {
    flex-direction: column;
    align-items: center;
  }
  
  .hover-button {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
