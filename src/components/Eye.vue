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
  <input type="file" ref="fileInput" @change="handleFileChange"/>
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
        <el-button
          type="primary"
          class="select-btn"
          @click="(drawer1 = true)"
        >
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
import { ref, toRaw } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import md5 from "js-md5";
import { Plus , ZoomIn, Delete, Download} from "@element-plus/icons";
import { useRouter } from "vue-router";

export default {
  components: {
    Plus,ZoomIn,Delete,Download
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
      router: '',
      selectedFile: null,
    };
  },
  methods: {
    onBeforeUpload(file) {
      this.selectedFile = file; // 更新选中的文件
      console.log(this.selectedFile)
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
      console.log(111,selectedFile)
      let formData = new FormData();
      formData.set("file", selectedFile)
      console.log(2,formData.entries[1])
      console.log("FormData entries:");
      for (let pair of formData.entries()) {
          console.log(pair[0], pair[1]);
      }

      axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
      const token = sessionStorage.getItem("token");
      axios.defaults.headers.common["token"] = ` ${token}`;
      axios
        .post("http://124.223.59.64:80/common/analyse", selectedFile, token)
        .then((response) => {
          console.log(response)
          console.log(111)
        });
    },

    // onBeforeUpload(file) {
    //   console.log(223, file);
    // },

    confirmClickPicture() {
      ElMessageBox.confirm(` 确认提交 ?`)
        .then(() => {
          console.log(111)
          console.log(44, this.selectedFile);
          // let ff = new FormData();
          ff.append("file", file);
          // f.raw.header.Content-Type = 'multipart/form-data'
          console.log("11111");
          

          const boundary = Math.random().toString().slice(2);
          const token = sessionStorage.getItem("token");
          axios.defaults.headers.common["token"] = ` ${token}`;
          const url = `http://124.223.59.64:80/common/analyse`;
          // axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
          axios({
            method: "post",
            url,
            data: { ff, token },
            //name: "file",
            headers: {
              "Content-Type": "multipart/form-data",
              // "boundary": `${boundary}`,
            },
            dataType: "json",
          })
            .then((response) => {
              const publicKey = response.data.publicKey;
              console.log(response.data);
              // sessionStorage.setItem('token',res.token)
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
        this.$router.push('/account/answer');
      }, 2000);
        
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
      console.log(url)
      this.dialogImageUrl = url;
      this.dialogVisible = true;
      const f = toRaw(file);
      console.log(f)
      this.handledURL = md5(this.dialogImageUrl);
      console.log(this.handledURL);

      this.selectedFile = f; // 更新选中的文件
      console.log(this.selectedFile)
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
      console.log(this.textarea);

      // axios.defaults.headers.common["token"] = ` ${token}`;
      // const token = "18e9e259-8c8a-438b-aa33-a2ef6fdff16c";
      // axios.defaults.headers.common["AUTHORIZATION"] = token;

      const token = sessionStorage.getItem("token");
      axios.defaults.headers.common["token"] = ` ${token}`;
      // const url = "/checkNews/";
      let url = 'http://124.223.59.64:8083/checkNews'
      // const url = proxy.target + '/checkNews';
      console.log(url);
      const textarea = {
        news: this.textarea,
      };
      axios
        .post(
          url,
          textarea,
          token,
          // {
          // headers: {
          //   "Content-Type": "text/plain"
          // }}
        )
        .then((response) => {
          // console.log(response.data.data.check_status);
          // console.log(response.data.data.raw_response);
          console.log(111);
          ElMessageBox.alert("此舆情为真", "Title", {
            confirmButtonText: "OK",
            callback: (action) => {
              ElMessage({
                type: "info",
                message: `action: ${action}`,
              });
            },
          });
          if (response.data.code != 1) {
            alert("网络出现问题，请重试!");
            return;
          }
        })
        .catch((error) => {
          console.error(1, error);
        });

      ElMessageBox.alert("", "提交成功", {
        confirmButtonText: "OK",
        callback: () => {
          ElMessage({
            type: "success",
            message: `鉴别完成`,
          });
          this.$router.push('/account/answer' );
        },
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
