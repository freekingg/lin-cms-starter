<template>
  <div class="login">

    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">{{ title }}</h3>
      <!-- <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">

        </el-input>
      </el-form-item> -->
      <el-form-item label="账号" prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off"  />
      </el-form-item>
      <!-- <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码"
          @keyup.enter.native="handleLogin">

        </el-input>
      </el-form-item> -->
      <!-- <el-form-item prop="code" v-if="captchaEnabled">
        <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 63%"
          @keyup.enter.native="handleLogin">

        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img" />
        </div>
      </el-form-item> -->
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>

      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <!--<span>Copyright © 2018-2022 ruoyi.vip All Rights Reserved.</span>-->
    </div>
  </div>
</template>

<script setup>
import { getCodeImg, getSafeMode, switchNewAesKey } from "@/api/login";
import { reactive, ref, onMounted } from "vue";
const loading = ref(false);
const codeUrl = ref("");
const captchaEnabled = ref(true);
const title = ref(import.meta.env.VITE_APP_TITLE)

const loginRules = reactive({
  username: [
    { required: true, trigger: "blur", message: "请输入您的账号" }
  ],
  password: [
    { required: true, trigger: "blur", message: "请输入您的密码" }
  ],
  code: [{ required: true, trigger: "change", message: "请输入验证码" }]
});
const loginForm = reactive({
  username: '',
  password: '',
});


onMounted(() => {
  getCode();
  // getCookie();
  // getSafeMode();
});

function getCode() {
  getCodeImg().then(res => {
    captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled;
    if (captchaEnabled) {
      codeUrl.value = "data:image/gif;base64," + res.img;
      loginForm.uuid = res.uuid;
    }
  });
}

//     getCode() {

//     },
function handleLogin() {

}
// import Cookies from "js-cookie";
// import { encrypt, decrypt, getRandomAesKey,encryptByAES,decryptByAES } from '@/utils/jsencrypt'
// import store from "@/store";

// export default {
//   name: "Login",
//   data() {
//     return {
//       title:process.env.VUE_APP_TITLE,
//       codeUrl: "",
//       loginForm: {

//         username: "",
//         password: "",
//         // username: "admin",
//         // password: "11``qqq",
//         rememberMe: false,
//         code: "",
//         uuid: ""
//       },

//       loading: false,
//       // 验证码开关
//       captchaEnabled: true,
//       // 注册开关
//       register: false,
//       redirect: undefined
//     };
//   },
//   watch: {
//     $route: {
//       handler: function(route) {
//         this.redirect = route.query && route.query.redirect;
//       },
//       immediate: true
//     }
//   },
//   created() {
//     this.getCode();
//     this.getCookie();
//     this.getSafeMode();
//   },
//   methods: {
//     getCode() {
//       getCodeImg().then(res => {
//         this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled;
//         if (this.captchaEnabled) {
//           this.codeUrl = "data:image/gif;base64," + res.img;
//           this.loginForm.uuid = res.uuid;
//         }
//       });
//     },
//     getSafeMode(){
//         getSafeMode().then(res => {
//             // console.log("pubKey",res)
//             // //保存公钥
//             // this.$store.commit("SET_PUBKEY", res.data.pubKey);
//             //保存是否启用加密
//             this.$store.commit("SET_ENABLE_ENCRYPT", res.data.enableEncrypt);
//         })
//     },
//     getCookie() {
//       const username = Cookies.get("username");
//       const password = Cookies.get("password");
//       const rememberMe = Cookies.get('rememberMe')
//       this.loginForm = {
//         username: username === undefined ? this.loginForm.username : username,
//         password: password === undefined ? this.loginForm.password : decrypt(password),
//         rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
//       };
//     },
//     handleLogin() {
//       this.$refs.loginForm.validate(valid => {
//         if (valid) {
//           this.loading = true;
//           if (this.loginForm.rememberMe) {
//             Cookies.set("username", this.loginForm.username, { expires: 30 });
//             Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
//             Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
//           } else {
//             Cookies.remove("username");
//             Cookies.remove("password");
//             Cookies.remove('rememberMe');
//           }
//           this.$store.dispatch("Login", this.loginForm).then(() => {
//               //登录成功后
//               if(this.$store.getters.enableEncrypt){//若启用了加密，需要与服务端交换加密秘钥
//                   //与服务端交换秘钥
//                   switchNewAesKey().then(()=>{
//                       this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
//                   }).catch(()=>{
//                       this.loading = false;
//                   })
//               }else {
//                   this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
//               }
//           }).catch(() => {
//             this.loading = false;
//             if (this.captchaEnabled) {
//               this.getCode();
//             }
//           });
//         }
//       });
//     }
//   }
// };
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  //background-image: url("@/assets/images/large/left_top_lan.png");
  background-image: url("@/assets/images/login-background.jpg");
  background-size: cover;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  box-sizing: border-box;
  width: 400px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 38px;

    input {
      height: 38px;
    }
  }

  margin-left: 26%;

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }

  /*设置按钮的颜色*/
  button {
    background-color: #01A19F;
  }

  /*按钮鼠标经过的时候的颜色*/
  button:hover,
  button:focus {
    background: #018583;
    border-color: #018583;
    color: #FFFFFF;
  }


  .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #01A19F;
    border-color: #01A19F;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 38px;
}
</style>
