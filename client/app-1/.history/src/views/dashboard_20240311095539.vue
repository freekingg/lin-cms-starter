<template>
  <div class="navbar">
      <div>
        <span class="nav-item">Dashboard</span>
        <span class="nav-item selected">My course</span>
      </div>
      <div>
        <span class="nav-item">icon</span>
      </div>
    </div>

    <div class="main-content">
      <div class="card">
        <div class="card-header">Timeline</div>
        <div class="card-content">test</div>
      </div>

      <div class="card">
        <div class="card-header">Course overview</div>
        <div class="card-content">test</div>
      </div>
    </div>

</template>

<script setup>
import { ref,reactive } from 'vue'
import { ElMessage as Message, ElMessageBox as MessageBox } from 'element-plus'
import {getUser,updateUser} from '../api/user'




const ruleForm = reactive({})
function resetForm() {
  Object.assign(ruleForm, {
    name: '',
    date1: '',
    date2: '',
    desc: ''
  })
}
function getUserInfo(){
  getUser(localStorage.getItem('token')).then(res=>{
    Object.assign(ruleForm, res.data)

  })
}
getUserInfo();

function updateUserInfo(){
  updateUser(ruleForm).then(res=>{
    Message.success('update success')
    updateUserInfo();
  })
}
</script>

<style lang="scss" scoped>
   .navbar {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        padding: 10px;
        background-color: #296bef;
      }

      .main-content {
        display: flex;
        justify-content: space-around;
        padding: 20px;
      }

      .card {
        width: 40%;
        border: 1px solid #fff;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      }

      .card-header {
        font-size: 14px;
        background-color: #4caf50; /* 绿色背景 */
        color: white; /* 白色文本 */
        padding: 10px;
        margin-bottom: 15px; /* 添加一些底部边距 */
      }

      .card-content {
        background-color: #f8f8f8; /* 浅灰色背景 */
        color: black; /* 黑色文本 */
        padding: 10px;
      }

      .nav-item {
        margin-right: 10px;
        cursor: pointer;
      }
</style>