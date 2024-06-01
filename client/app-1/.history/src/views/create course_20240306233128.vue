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
          <el-menu-item index="2">My Course</el-menu-item>
        </el-menu>

        <el-avatar icon="el-icon-user" @click="goToProfile"></el-avatar>

      </el-header>


      <el-main>
        <el-row :gutter="20">
          <el-col :span="12" :offset="6">
            <div class="grid-content bg-purple font">
            Create Course
          </div></el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12" offset="6"><div class="grid-content bg-purple">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="Name" prop="name">
                <el-input v-model="ruleForm.name" size="small"></el-input>
              </el-form-item>

              <el-form-item label="Time" required>
                <el-col :span="11">
                  <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="Date" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="date2">
                    <el-time-picker placeholder="Time" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>


              <el-form-item label="Details" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
                <el-button @click="resetForm('ruleForm')">Reset</el-button>
              </el-form-item>
            </el-form>

          </div></el-col>

        </el-row>



      </el-main>
    </el-container>




  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: 'Name Empty', trigger: 'blur' },
        ],
        date1: [
          { type: 'date', required: true, message: 'Date Empty', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: 'Time Empty', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Details Empty', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style>
.font{
  text-align: center; /* 文本居中对齐 */
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
.bg-purple {

}
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
</style>