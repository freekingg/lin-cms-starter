<template>
  <div class="login">

    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">{{ title }}</h3>
      <el-form-item label="账    号" prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
        </el-input>
      </el-form-item>
      <el-form-item label="密    码" prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码">
        </el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 63%"
          @keyup.enter.native="handleLogin">

        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img" />
        </div>
      </el-form-item>


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
import { encrypt, decrypt, getRandomAesKey, encryptByAES, decryptByAES } from '@/utils/jsencrypt'
import { userStore } from '@/store'
import { useRouter ,useRoute} from "vue-router";                               

import Cookies from "js-cookie";
const loading = ref(false);
const codeUrl = ref("");
const captchaEnabled = ref(true);
const title = ref(import.meta.env.VITE_APP_TITLE)
const loginFormRef = ref(null);
const user = userStore()
const router = useRouter();
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
  username: 'admin',
  password: '11``qqq',
  rememberMe: true
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
  loginFormRef.value.validate(valid => {
    if (valid) {

      loading.value = true;
      console.log(user
      )

      Cookies.set("username", loginForm.username, { expires: 30 });
      Cookies.set("password", encrypt(loginForm.password), { expires: 30 });
      const route = useRoute();
      console.log(route)
      const redirect = decodeURIComponent(route.query.redirect)
      user.Login(loginForm).then(() => {
        console.log(666)
       
        if(redirect){
          const pathname = redirect.startsWith("/app") ? 'app' :'/'
          router.push({ path:  "/" +pathname}).catch(()=>{});
        }else{
          router.push({ path:  "/app" }).catch(()=>{});
        }

        //        router.push({ path: this.redirect || "/app" }).catch(()=>{});
      }).catch(() => {
        console.log(777)
        loading.value = false;
        getCode()
      });
      // if (this.loginForm.rememberMe) {

      // } else {
      //   Cookies.remove("username");
      //   Cookies.remove("password");
      //   Cookies.remove('rememberMe');
      // }
      // this.$store.dispatch("Login", this.loginForm).then(() => {
      //     //登录成功后
      //     if(this.$store.getters.enableEncrypt){//若启用了加密，需要与服务端交换加密秘钥
      //         //与服务端交换秘钥
      //         switchNewAesKey().then(()=>{
      //             this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
      //         }).catch(()=>{
      //             this.loading = false;
      //         })
      //     }else {
        // this.redirect ||
        //this.$router.push({ path: this.redirect || "/app" }).catch(()=>{});
      //         this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
      //     }
      // }).catch(() => {
      //   this.loading = false;
      //   if (this.captchaEnabled) {
      //     this.getCode();
      //   }
      // });
    }
    //       });
  });
}
// import Cookies from "js-cookie";
// 
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
