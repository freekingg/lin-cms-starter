<template>
  <div id="app">

    <el-container>
      <el-header style="background-color: #1372e5; display: flex; justify-content: space-between; align-items: center;">
        <el-menu
            default-active="2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#1372e5"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-menu-item index="1">Dashboard</el-menu-item>
          <el-menu-item index="2" to="/index">My Course</el-menu-item>
        </el-menu>

        <el-avatar icon="el-icon-user" @click="goToProfile"></el-avatar>

      </el-header>
    </el-container>

    <el-container>
      <el-aside style="overflow: hidden; min-height: 100vh; background-color: #545c64; width: 250px">
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
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
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <div class="icon-with-text">
                <el-button type="text" icon="el-icon-document" class="full-size-icon icon-black"></el-button>
                <div>Assignment</div>
              </div>
            </div>
          </el-col>

          <el-col :span="6">
            <div class="grid-content bg-purple">
              <div class="icon-with-text">
                <el-button type="text" icon="el-icon-edit" class="full-size-icon icon-black"></el-button>
                <div>Exam</div>
              </div>
            </div>
          </el-col>

          <el-col :span="6">
            <div class="grid-content bg-purple">
              <div class="icon-with-text">
                <el-button type="text" icon="el-icon-chat-dot-round" class="full-size-icon icon-black"></el-button>
                <div>Forum</div>
              </div>
            </div>
          </el-col>

          <el-col :span="6">
            <div class="grid-content bg-purple">
              <div class="icon-with-text">
                <el-button type="text" icon="el-icon-folder" class="full-size-icon icon-black"></el-button>
                <div>Material</div>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <div class="icon-with-text">
                <el-button type="text" icon="el-icon-suitcase" class="full-size-icon icon-black"></el-button>
                <div>Course Details</div>
              </div>
            </div>
          </el-col>

          <el-col :span="6">
            <div class="grid-content bg-purple">
              <div class="icon-with-text">
                <el-button type="text" icon="el-icon-user" class="full-size-icon icon-black"></el-button>
                <div>Student</div>
              </div>
            </div>
          </el-col>

          <el-col :span="6">
            <div class="grid-content bg-purple">
              <div class="icon-with-text">
                <el-button type="text" icon="el-icon-monitor" class="full-size-icon icon-black"></el-button>
                <div>Online Course</div>
              </div>
            </div>
          </el-col>

        </el-row>


      </el-main>
    </el-container>


  </div>
</template>

<script>

</script>

<style>
.el-menu{
  border-right: none !important;
}

.icon-black {
  color: black !important; /* 设置图标颜色为黑色 */
}

.icon-with-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.full-size-icon {
  font-size: 130px !important; /* 调整这个值来改变图标大小 */
}

.full-size-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 确保按钮填满整个布局 */
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
  min-height: 200px; /* 或根据需要调整 */
}
.row-bg {
  padding: 10px 0;
  background-color: #1c1ca8;
}
</style>