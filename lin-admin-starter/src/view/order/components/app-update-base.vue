<template>
  <el-form :model="dataForm" :rules="rules" ref="dataFormRef" @keyup.enter="dataFormSubmitHandle()" label-width="120px">
    <el-form-item label="产品" prop="app_id">
      <el-select filterable v-model="dataForm.app_id" placeholder="请选择产品" clearable>
        <el-option v-for="(group, index) in allApps" :key="index" :label="group.name" :value="group.id"> </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="订单状态" prop="status">
      <el-select filterable v-model="dataForm.status" placeholder="请选择" clearable>
        <el-option v-for="(group, index) in allStatus" :key="index" :label="group.label" :value="group.value">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <el-button @click="visible = false">取消</el-button>
  <el-button type="primary" @click="dataFormSubmitHandle()">确定</el-button>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import orderModel from '@/model/order'
import appModel from '@/model/app'
const props = defineProps({
  orderId: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()

const dataForm = reactive({
  id: '',
  name: '',
  pwd: '',
})

const allApps = ref([])
const allStatus = ref([
  {
    label: '已下单',
    value: 1,
  },
  {
    label: '已确认',
    value: 2,
  },
  {
    label: '已发货',
    value: 3,
  },
  {
    label: '未签收',
    value: 4,
  },
  {
    label: '已签收',
    value: 5,
  },
  {
    label: '已回款',
    value: 6,
  },
])

const rules = ref({
  app_id: [{ required: true, trigger: 'change', message: '请输入' }],
})

const init = async () => {
  console.log('init: ');
  visible.value = true
  dataForm.id = ''

  // 重置表单数据
  if (dataFormRef.value) {
    dataFormRef.value.resetFields()
  }
  appModel.getItems({ limit: 999 }).then(result => {
    allApps.value = result.list
  })
  if (props.orderId) {
    getInfo(props.orderId)
  }
}

// 获取信息
const getInfo = async id => {
  const res = await orderModel.getItem(id)
  Object.assign(dataForm, res)
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
