<template>
  <div class="container">
    <el-drawer v-model="drawer" size="80%">
      <template #header>
        <h2>详情</h2>
      </template>
      <template #default>
        <div>
          <el-descriptions :title="dataForm.name + '详情'" border>
            <el-descriptions-item label="名称" :span="3">{{ dataForm.name }}</el-descriptions-item>
            <el-descriptions-item label="APP ID" :span="2">{{ dataForm.summary }}</el-descriptions-item>
            <el-descriptions-item label="备注" :span="1">{{ dataForm.summary }}</el-descriptions-item>
            <el-descriptions-item label="时间">{{ dataForm.create_time }}</el-descriptions-item>
          </el-descriptions>
        </div>
        <el-radio-group v-model="tab" style="margin-top: 30px" @change="tabHandle">
          <el-radio-button label="base">基本信息</el-radio-button>
          <el-radio-button label="paymentmethods">证书&包名</el-radio-button>
          <el-radio-button label="loginlog">APP打包</el-radio-button>
        </el-radio-group>
        <div class="content">
          <template v-if="tab === 'base'">
            <base-config-form ref="baseConfigFormRef"></base-config-form>
          </template>
        </div>
      </template>
      <!-- <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="confirmClick">Close</el-button>
        </div>
      </template> -->
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import { Edit, Wallet, User, Lock, Flag } from '@element-plus/icons-vue'
import BaseConfigForm from './app-update-base.vue'
import appModel from '@/model/app'
const drawer = ref(false)
const tab = ref('base')
const emit = defineEmits(['refreshDataList'])

const props = defineProps({
  sub: {
    type: Boolean,
    default: false,
  },
})

const dataForm = reactive({
  id: '',
  name: '',
  channelCode: '',
  referralCode: '',
  balance: '',
  bounty: '',
  commission: '',
  levelId: '',
  flagIds: '',
  status: 1,
  puname: '',
})

const init = row => {
  drawer.value = true

  if (row.id) {
    getInfo(row.id)
  }
}

// 获取信息
const getInfo = async id => {
  const res = await appModel.getItem(id)
  Object.assign(dataForm, res)
}

const confirmClick = () => {
  drawer.value = false
}

const baseConfigFormRef = ref('')
const tabHandle = async val => {
  const emeu = {
    base: baseConfigFormRef.value,
  }
  await nextTick()
  emeu[val].init(dataForm)
}

const addKey = ref(0)
const memberDetailRef = ref()
const memberDetailHandle = row => {
  let pid = ''
  if (row.pids) {
    let arr = row.pids.split(',')
    if (arr.length) {
      pid = arr[arr.length - 1]
    }
  }
  if (!+pid) return

  addKey.value++
  nextTick(() => {
    let info = {
      ...row,
      memberId: pid,
      sub: true,
    }
    memberDetailRef.value.init(info)
  })
}

const updateStatusRef = ref()
const updatePwdRef = ref()
const updateBalanceRef = ref()
const updateFlagRef = ref()
const moreCommandHandle = (command, id) => {
  nextTick(() => {
    if (command === 'updateStatus') {
      updateStatusRef.value.init(id)
    }
    if (command === 'updatePwd') {
      updatePwdRef.value.init(id)
    }
    if (command === 'updateBalance') {
      updateBalanceRef.value.init(id)
    }
    if (command === 'updateFlag') {
      updateFlagRef.value.init(id)
    }
  })
}

const refreshDataListHandle = () => {
  emit('refreshDataList')
}

defineExpose({
  init,
})
</script>

<style lang="scss" scoped>
.container :deep(.el-drawer__header) {
  margin-bottom: 0;
}
.content {
  margin-top: 20px;

}
</style>
