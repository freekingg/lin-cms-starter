<template>
  <div class="login-container">
    <el-row>
      <el-col :lg="14" :md="11" :sm="24" :xl="14" :xs="24">
        <div style="color: transparent">占位符</div>
      </el-col>
      <el-col :lg="9" :md="12" :sm="24" :xl="9" :xs="24">
        <el-form ref="formRef" class="login-form" label-position="left">
          <div class="title">hello !</div>
          <div class="title-tips">欢迎来到</div>
          <el-form-item prop="username">
            <el-input v-model="account.username" placeholder="请输入用户名" type="text">
              <template #prefix>
                <div class="lefticon"><i class="el-icon-user"></i></div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :key="passwordType"
              ref="passwordRef"
              v-model.trim="account.password"
              placeholder="请输入密码"
              :type="passwordType"
              @keyup.enter="login"
            >
              <template #prefix>
                <div class="lefticon"><i class="el-icon-lock"></i></div>
              </template>
            </el-input>
          </el-form-item>
          <!-- 验证码验证逻辑需自行开发，如不需要验证码功能建议注释 -->

          <el-form-item>
            <el-button class="login-btn" type="primary" @click="login"> 登录 </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :lg="1" :md="1" :sm="24" :xl="1" :xs="24">
        <div style="color: transparent">占位符</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, ref, toRefs, onMounted, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'lin/plugin/axios'
import UserModel from '@/lin/model/user'
import Utils from '@/lin/util/util'
import Config from '@/config'

export default {
  setup() {
    const tag = ''
    const wait = 2000 // 2000ms之内不能重复发起请求
    const loading = ref(false)
    const captchaImage = ref('')
    const store = useStore()
    const router = useRouter()
    const throttleLogin = ref(null)
    const { ctx } = getCurrentInstance()

    const account = reactive({
      username: '',
      password: '',
      captcha: '',
    })

    const state = reactive({
      codeUrl: 'https://www.oschina.net/action/user/captcha',
      passwordType: 'password',
    })
    /**
     * 根据账号密码登录，拿到 token 并储存
     */
    const login = async () => {
      const { username, password, captcha } = account
      try {
        loading.value = true
        await UserModel.getToken(username, password, captcha, tag)
        await getInformation()
        loading.value = false
        router.push(Config.defaultRoute)
        ctx.$message({
          message: '登录成功',
          type: 'success',
        })
      } catch (e) {
        loading.value = false
      }
    }

    /**
     * 获取并更新当前管理员信息
     */
    const getInformation = async () => {
      try {
        // 尝试获取当前用户信息
        const user = await UserModel.getPermissions()
        store.dispatch('setUserAndState', user)
        store.commit('SET_USER_PERMISSIONS', user.permissions)
      } catch (e) {
        console.error(e)
      }
    }

    /**
     * 节流登录
     */
    onMounted(() => {
      throttleLogin.value = Utils.throttle(login, wait)
    })

    return {
      account,
      loading,
      login,
      captchaImage,
      throttleLogin,
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  background: url('../../assets/image/login_images/background.jpg') center center fixed no-repeat;
  background-size: cover;
}

.login-form {
  position: relative;
  max-width: 100%;
  padding: 4.5vh;
  margin: calc((100vh - 555px) / 2) 5vw 5vw;
  overflow: hidden;
  background: url('../../assets/image/login_images/login_form.png');
  background-size: 100% 100%;

  .title {
    font-size: 54px;
    font-weight: 500;
    color: #fff;
  }

  .title-tips {
    margin-top: 29px;
    font-size: 26px;
    font-weight: 400;
    color: #fff;
  }

  .login-btn {
    display: inherit;
    width: 100%;
    height: 50px;
    margin-top: 5px;
    background: #409eff !important;
    border-radius: 8px;
    border: 0;

    &:hover {
      opacity: 0.9;
    }
  }

  .tips {
    margin-bottom: 10px;
    font-size: 14px;
    color: #fff;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      margin: 0 auto 40px auto;
      font-size: 34px;
      font-weight: bold;
      color: #409eff;
      text-align: center;
    }
  }

  // i {
  //   position: absolute;
  //   top: 8px;
  //   left: 15px;
  //   font-size: 16px;
  // }

  .show-password {
    float: right;
    width: 32px;
    height: 32px;
    font-size: 16px;
  }

  :deep() {
    .el-form-item {
      padding-right: 0;
      margin: 20px 0;
      color: #454545;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 2px;

      &__content {
        min-height: 32px;
        line-height: 32px;
      }

      &__error {
        position: absolute;
        top: 100%;
        left: 18px;
        font-size: 12px;
        line-height: 18px;
        color: #ff4d4f;
      }
    }

    .el-input {
      box-sizing: border-box;

      input {
        height: 48px;
        line-height: 48px;
        border: 0;
      }

      &__suffix-inner {
        position: absolute;
        right: 65px;
        cursor: pointer;
      }
    }

    .code {
      position: absolute;
      top: 4px;
      right: 4px;
      cursor: pointer;
      border-radius: 2.5px;
    }
  }
}
.lefticon {
  display: flex;
  align-items: center;
}
</style>
