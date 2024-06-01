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
.font {
  text-align: center;
  /* 文本居中对齐 */
  font-size: 26px;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

#app {
  box-sizing: border-box;
  padding: 20px;
}
</style>