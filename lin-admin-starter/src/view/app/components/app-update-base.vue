<template>
  <el-card class="box-card">
    <el-form
      :model="dataForm"
      :rules="rules"
      ref="dataFormRef"
      @keyup.enter="dataFormSubmitHandle()"
      label-width="120px"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name"></el-input>
      </el-form-item>
      <el-form-item label="域名" prop="pwd">
        <el-input v-model="dataForm.pwd" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="B面域名">
        <el-switch v-model="dataForm.delivery" />
      </el-form-item>
      <el-form-item label="B面域名" prop="pwd">
        <el-input v-model="dataForm.pwd" type="password" placeholder="密码"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="visible = false">取消</el-button>
    <el-button type="primary" @click="dataFormSubmitHandle()">确定</el-button>
  </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()

const dataForm = reactive({
  id: '',
  name: '',
  pwd: '',
})

const rules = ref({})

const init = id => {
  visible.value = true
  dataForm.id = ''

  // 重置表单数据
  if (dataFormRef.value) {
    dataFormRef.value.resetFields()
  }

  if (id) {
    getInfo(id)
  }
}

// 获取信息
const getInfo = id => {
  // baseService.get("/member/member/" + id).then((res) => {
  //   Object.assign(dataForm, res.data);
  // });
}

// 表单提交
const dataFormSubmitHandle = () => {
  dataFormRef.value.validate(valid => {
    if (!valid) {
      return false
    }
    // baseService.put(`/member/member/pwd/${dataForm.id}/?pwd=${dataForm.pwd}`).then((res) => {
    //   ElMessage.success({
    //     message: t("prompt.success"),
    //     duration: 500,
    //     onClose: () => {
    //       visible.value = false;
    //       emit("refreshDataList");
    //     }
    //   });
    // });
  })
}

defineExpose({
  init,
})
</script>

<style scoped>
.box-card {
  padding: 20px 10px;
}
</style>
