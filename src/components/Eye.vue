<template>
  <div class="container">
    <div class="middle">
      <h2 class="title">一辨真假</h2>
      
      <!-- 操作按钮组 -->
      <div class="action-buttons">
        <el-button 
          type="primary" 
          @click="startAnalysis" 
          :loading="isAnalyzing"
          :disabled="!textarea || !textarea.trim()"
        >
          {{ isAnalyzing ? '分析中...' : '开始分析' }}
        </el-button>
        <el-button 
          :type="showIframe ? 'danger' : 'primary'"
          @click="toggleIframe"
        >
          {{ showIframe ? '关闭分析面板' : '打开分析面板' }}
        </el-button>
      </div>
      
      <!-- 内容输入区 -->
      <div class="content-area">
        <el-input
          v-model="textarea"
          :rows="8"
          type="textarea"
          placeholder="请输入您要分析的内容"
          class="question"
        />
      </div>
      
      <!-- 本地开发服务器iframe -->
      <div v-if="showIframe" class="iframe-container">
        <iframe 
          src="http://localhost:5173" 
          frameborder="0" 
          class="embedded-iframe"
        ></iframe>
      </div>
      
      <!-- DeepSeek API 密钥输入框 -->
      <el-dialog
        v-model="showApiKeyDialog"
        title="输入 DeepSeek API 密钥"
        width="500px"
        :close-on-click-modal="false"
        :show-close="false"
      >
        <el-input
          v-model="apiKey"
          placeholder="请输入您的 DeepSeek API 密钥"
          show-password
          @keyup.enter="saveApiKey"
        />
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="apiKey = ''; showApiKeyDialog = false">取消</el-button>
            <el-button type="primary" @click="saveApiKey">保存</el-button>
          </span>
        </template>
      </el-dialog>
      
      <!-- 分析结果对话框 -->
      <el-dialog
        v-model="showResult"
        title="分析结果"
        width="70%"
        :close-on-click-modal="false"
      >
        <div class="analysis-result" v-html="analysisResult"></div>
        <template #footer>
          <el-button @click="showResult = false">关闭</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

export default {
  name: 'Eye',
  setup() {
    const textarea = ref('');
    const showResult = ref(false);
    const analysisResult = ref('');
    const isAnalyzing = ref(false);
    const apiKey = ref(localStorage.getItem('deepseek_api_key') || '');
    const showApiKeyDialog = ref(false);
    const showIframe = ref(false);

    const toggleIframe = () => {
      showIframe.value = !showIframe.value;
    };

    const saveApiKey = () => {
      if (apiKey.value) {
        localStorage.setItem('deepseek_api_key', apiKey.value);
        showApiKeyDialog.value = false;
        ElMessage.success('API 密钥已保存');
        startAnalysis();
      } else {
        ElMessage.warning('请输入有效的 API 密钥');
      }
    };

    const startAnalysis = async () => {
      // 检查 API 密钥
      if (!apiKey.value) {
        showApiKeyDialog.value = true;
        return;
      }
      
      if (!textarea.value || !textarea.value.trim()) {
        ElMessage.warning('请输入要分析的内容');
        return;
      }

      isAnalyzing.value = true;
      
      try {
        // 调用 DeepSeek API
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey.value}`
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              {
                role: 'user',
                content: textarea.value
              }
            ],
            temperature: 0.7,
            max_tokens: 2000
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'API 请求失败');
        }

        const data = await response.json();
        analysisResult.value = data.choices?.[0]?.message?.content || '未获取到有效回复';
        showResult.value = true;
        
      } catch (error) {
        console.error('分析出错:', error);
        ElMessage.error(`分析失败: ${error.message}`);
      } finally {
        isAnalyzing.value = false;
      }
    };

    return {
      textarea,
      showResult,
      analysisResult,
      isAnalyzing,
      apiKey,
      showApiKeyDialog,
      showIframe,
      toggleIframe,
      saveApiKey,
      startAnalysis
    };
  }
};
</script>

<style scoped>
.iframe-container {
  width: 100%;
  height: 500px;
  margin: 20px 0;
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
}

.embedded-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.begin {
  width: 10%;
  padding: 12px 0;
  font-size: 16px;
}

/* 保留原有的样式 */
.question {
  width: 700px;
  height: 100px;
}

.card-header {
  height: 26px;
}
/* 样式表 */
.text {
  font-size: 14px;
}
.select-btn {
  margin: 0 16px 10px 0;
}
.item {
  padding: 18px 0;
}
.box-card {
  width: 900px;
  margin: auto;
}
.container {
  width: 100%;
  height: calc(100vh - 284px);
  background-color: rgb(240, 240, 249);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4%;
}

.middle {
  width: 100%;
  height: 100%;
  text-align: center;
}

.title {
  margin: 60px 0;
}

.area {
  resize: none;
  height: 30vh; /* 将高度设置为屏幕高度的50% */
  width: 60%;
  border-radius: 4%;
  justify-content: space-between;
  align-items: center;
}

.begin {
  margin-top: 90px;
  margin: auto;
}

.detail {
  height: 500px;
  width: 160px;
  background-color: red;
}
</style>
