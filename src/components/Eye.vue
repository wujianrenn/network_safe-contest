<template>
  <!-- <el-drawer v-model="drawer2" direction="rtl" :with-header="false">
    <div v-for="item in listData" :key="item.no" class="text-item">
      <el-card style="margin-top: 10px">
        <el-checkbox v-model="checked" :label="item.title" size="large" />
      </el-card>
    </div>

    <template #footer>
      <div style="flex: auto">
        <el-button type="primary" @click="confirmClick"
          >提交<Download
        /></el-button>
      </div>
    </template>
  </el-drawer> -->

  <!-- <input type="file" ref="fileInput" @click="uploadImage" /> -->
  <input type="file" ref="fileInput" @change="handleFileChange" />
  <button @click="uploadImage">上传</button>

  <el-drawer v-model="drawer1" direction="rtl" :with-header="false">
    <!-- 添加上传图片 -->
    <el-upload
      name="file"
      enctype="multipart/form-data"
      action="http://124.223.59.64:80/common/analys"
      list-type="picture-card"
      :auto-upload="false"
      :on-success="handleAvatarSuccess"
      :before-upload="onBeforeUpload"
      ref="upload"
    >
      <el-icon><Plus /></el-icon>

      <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <el-icon><zoom-in /></el-icon>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <el-icon><Download /></el-icon>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
    <!--  -->

    <template #footer>
      <div style="flex: auto">
        <el-button type="primary" @click="confirmClickPicture()"
          >提交</el-button
        >
      </div>
    </template>
  </el-drawer>
  <div class="container">
    <div class="middle">
      <h2 class="title">一辨真假</h2>
      <div style="width: 260px; position: fixed; top: 87px; right: -5px">
        <el-button type="primary" class="select-btn" @click="drawer1 = true">
          选择照片
        </el-button>
        <!-- <el-button type="primary" class="select-btn" @click="drawer2 = true">
          选择文字
        </el-button> -->
      </div>
      <div style="width: 100%; height: 50%">
        <!-- <el-card class="box-card">
          <el-row v-if="showList.length" :gutter="12">
            <el-col
              style="padding-bottom: 10px"
              :span="8"
              v-for="item in showList"
              :key="item.id"
            >
              <el-card shadow="always"> {{ item.value }} </el-card>
            </el-col>
          </el-row>
          <el-empty v-else :image-size="100" />
        </el-card> -->
        <el-input
          v-model="textarea"
          :rows="5"
          type="textarea"
          placeholder="&nbsp;&nbsp;请输入您的问题"
          class="question"
        />
      </div>

      <div style="width: 100%">
        <el-button text @click="start" class="begin" type="primary"
          >&nbsp;&nbsp;开始&nbsp;&nbsp;</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import { proxy } from '../../vite.config.js';
import { ref, toRaw ,getCurrentInstance} from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import md5 from "js-md5";
import { Plus, ZoomIn, Delete, Download } from "@element-plus/icons";
import { useRouter } from "vue-router";

export default {
  components: {
    Plus,
    ZoomIn,
    Delete,
    Download,
  },
  data() {
    const router = useRouter();
    return {
      inputText: "",
      checked: ref([]),
      dialogImageUrl: ref(""),
      dialogVisible: ref(false),
      disabled: ref(false),
      listData: [
        {
          no: "1",
          title: "王思聪打人赔款200万?",
          time: "2022.5.16",
          name: "张三",
        },
        {
          no: "2",
          title: "Tom1",
          time: "2022.5.16",
          name: "张三",
        },
        {
          no: "3",
          title: "Tom2",
          time: "2022.5.16",
          name: "张三",
        },
        {
          no: "4",
          title: "Tom3",
          time: "2022.5.16",
          name: "张三",
        },
      ],
      drawer1: ref(false),
      drawer2: ref(false),
      radio1: ref("Option 1"),
      showList: [],
      encryptedString: "",
      handledURL: "",
      file: null,
      textarea: ref(""),
      router: "",
      selectedFile: null,
    };
  },
  methods: {
    onBeforeUpload(file) {
      this.selectedFile = file; // 更新选中的文件
      console.log(this.selectedFile);
    },
    // // 读取图片文件并转换为Base64格式
    // readFileAsBase64(file) {
    //   return new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.onload = () => resolve(reader.result);
    //     reader.onerror = reject;
    //     reader.readAsDataURL(file);
    //   });
    // },

    // // 生成RSA公钥对
    // generateKeyPair() {
    //   const rsa = new JSEncrypt();
    //   rsa.getKey();
    //   const publicKey = rsa.getPublicKey();
    //   const privateKey = rsa.getPrivateKey();
    //   return { publicKey, privateKey };
    // },

    // // 使用公钥加密数据
    // encryptData(data, publicKey) {
    //   const rsa = new JSEncrypt();
    //   rsa.setPublicKey(publicKey);
    //   const encryptedData = rsa.encrypt(data);
    //   return encryptedData;
    // },

    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    uploadImage() {
      const selectedFile = this.$refs.fileInput.files[0];
      console.log(111, selectedFile);
      let formData = new FormData();
      formData.append("file", selectedFile);
      console.log(2, formData);
      console.log("FormData entries:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
      const token = sessionStorage.getItem("token");
      axios.defaults.headers.common["token"] = ` ${token}`;
      axios
        .post("http://124.223.59.64:80/common/analyse", formData, token)
        .then((response) => {
          console.log(response);
          const data = response.data.data[0];
          console.log('data.id:',data.id)
          this.$router.push({
          path: "/account/detail",
            query: {
              itemContent: data.content,
              itemTitle: data.title,
            // itemUserId: data.userId,
              itemTime: data.time,
              itemStatus: response.status,
              itemId : data.id,
          },
          params: {},
        });
        });
    },

    confirmClickPicture() {
      ElMessageBox.confirm(` 确认提交 ?`)
        .then(() => {
          console.log(111);
          console.log(44, this.selectedFile);
          ff.append("file", file);
          console.log("11111",ff);

          const boundary = Math.random().toString().slice(2);
          const token = sessionStorage.getItem("token");
          axios.defaults.headers.common["token"] = ` ${token}`;
          const url = `http://124.223.59.64:80/common/analyse`;
          axios({
            method: "post",
            url,
           ff ,token ,
          })
            .then((response) => {
              const publicKey = response.data.publicKey;
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
          drawer2.value = false;
        })
        .catch(() => {
          // catch error
        });
      setTimeout(() => {
        this.$router.push("/account/answer");
      }, 1000);
    },

    handleRemove(file) {
      console.log(toRaw(file));
    },

    handlePictureCardPreview(file) {
      const url = file.url.split("blob:")[1];
      this.dialogImageUrl = url;
      this.dialogVisible = true;
      this.file = file;
    },

    handleDownload(file) {
      const url = file.url.split("blob:")[1];
      console.log(url);
      this.dialogImageUrl = url;
      this.dialogVisible = true;
      const f = toRaw(file);
      console.log(f);
      this.handledURL = md5(this.dialogImageUrl);
      console.log(this.handledURL);

      this.selectedFile = f; // 更新选中的文件
      console.log(this.selectedFile);
    },

    handleCheckedChange() {
      toRaw(this.checked).forEach((item, index) => {
        this.showList.push({
          id: index,
          value: item,
        });
      });
      this.showList = [...new Set(this.showList)];
    },

    confirmClick() {
      ElMessageBox.confirm(` 确认提交 ?`)
        .then(() => {
          drawer2.value = false;
          handleCheckedChange();
        })
        .catch(() => {
          // catch error
        });
    },

    start() {
      // 检查文本是否为空
      if (!this.textarea || !this.textarea.trim()) {
        ElMessage.warning('请输入需要检测的舆情内容');
        return;
      }

      // 显示加载提示
      const loadingInstance = ElMessageBox.alert("", "正在检测中，请稍候...", {
        confirmButtonText: "OK",
        showConfirmButton: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
      });

      console.log('检测内容:', this.textarea);
      const token = sessionStorage.getItem("token");
      
      // 检查token是否存在
      if (!token) {
        ElMessageBox.close();
        ElMessage.warning('请先登录');
        return;
      }
      
      axios.defaults.headers.common["token"] = `${token}`;
      
      axios
        .post(
          'http://124.223.59.64:8083/checkNews',
          { "news": this.textarea, token },
          {headers: {
            "AUTHORIZATION": "18e9e259-8c8a-438b-aa33-a2ef6fdff16c"
          }}
        )
        .then((response) => {
          // 关闭加载提示
          ElMessageBox.close();
          
          console.log('检测结果:', response);
          
          // 显示结果提示
          ElMessageBox.alert(
            response.data.raw_response || "检测完成", 
            `${response.data.check_status || "舆情检测结果"}`, 
            {
              confirmButtonText: "查看详情",
              callback: () => {
                // 正确获取content-length头部
                const contentLength = response.headers['content-length'] || '';
                
                // 跳转到详情页面
                this.$router.push({
                  path: "/account/detail",
                  query: {
                    status: response.data.check_status || '',
                    title: this.textarea || '',
                    header: contentLength,
                    type: response.request.statusText || '',
                    content: response.data.raw_response || '',
                  }
                });
              }
            }
          );
        })
        .catch((error) => {
          // 关闭加载提示
          ElMessageBox.close();
          
          console.error('检测失败:', error);
          
          // 显示错误提示
          ElMessageBox.alert(
            error.message || "网络错误，请稍后再试", 
            "检测失败", 
            {
              confirmButtonText: "确定",
              type: "error"
            }
          );
        });
    },
  },
};
</script>

<style scoped>
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
