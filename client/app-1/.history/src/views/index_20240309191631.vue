<template>
  <div id="app">

    <el-container>
      <el-header style="background-color: #1372e5; display: flex; justify-content: space-between; align-items: center;">
        <el-menu default-active="2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          background-color="#1372e5" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="1">
            <router-link to="/dashboard">Dashboard</router-link>
          </el-menu-item>
          <el-menu-item index="2">My Course</el-menu-item>
        </el-menu>

        <el-avatar icon="el-icon-user" @click="goToProfile"></el-avatar>

      </el-header>
    </el-container>

    <el-container>
      <el-aside style="overflow: hidden; min-height: 100vh; background-color: #545c64; width: 250px">
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">COURSE1</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">COURSE2</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">COURSE3</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-plus"></i>
            <span slot="title">Create Course</span>
          </el-menu-item>

        </el-menu>
      </el-aside>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="12" :offset="6">
            <div class="grid-content bg-purple font">
              Create Course
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">

          <el-col :span="24">
            <el-form :model="ruleForm" ref="ruleFormRef" label-width="100px" class="demo-ruleForm">
              <el-form-item label="Name" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>

              <el-form-item label="Time" required>
                <el-col :span="11">
                  <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="Date" v-model="ruleForm.date1"
                      style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="date2">
                    <el-time-picker placeholder="Time" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>

      </el-main>
    </el-container>


  </div>
</template>

<script>
const { default: router } = require('@/router');


</script>

<style>
.el-menu {
  border-right: none !important;
}

.icon-black {
  color: black !important;
  /* 设置图标颜色为黑色 */
}

.icon-with-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.full-size-icon {
  font-size: 130px !important;
  /* 调整这个值来改变图标大小 */
}

.full-size-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* 确保按钮填满整个布局 */
  width: 100%;
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

.bg-purple {
  background: #d7d0d0;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  min-height: 200px;
  /* 或根据需要调整 */
}

.row-bg {
  padding: 10px 0;
  background-color: #1c1ca8;
}
</style>