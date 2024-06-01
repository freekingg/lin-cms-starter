import request from '@/utils/request'
import store from '@/store/indaex'
import { encrypt, getRandomAesKey, serverPublicKey } from '@/utils/jsencrypt'

// 登录方法
export function login(username, password, code, uuid) {
  return request({
    url: '/auth/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: { username, password, code, uuid }
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/auth/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 刷新方法
export function refreshToken() {
  return request({
    url: '/auth/refresh',
    method: 'post'
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/system/user/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'delete'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/code',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}

// 获取公钥
export function getSafeMode() {
    return request({
        url: '/safeMode',
        headers: {
            isToken: false
        },
        method: 'get',
        timeout: 20000
    })
}

// 将加密后的aes秘钥通知给服务端
export function switchNewAesKey() {
    //生成新的随机的aes秘钥
    let randomAesKey=getRandomAesKey();
    //对生成的随机秘钥使用公钥进行加密
    // let encryptedAesKey = encrypt(randomAesKey, store.getters.pubKey);
    let encryptedAesKey = encrypt(randomAesKey, serverPublicKey);
    //请求数据
    let data={
        "switchAesKey":encryptedAesKey
    };
    return new Promise((resolve, reject)=>{
        request({
            url: '/auth/switchAesKey',
            headers: {
                enableEncrypt: false
            },
            method: 'post',
            data: data
        }).then(resp=>{//交换成功
            //保存aes秘钥
            store.commit("SET_AES_KEY", randomAesKey);
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
}

