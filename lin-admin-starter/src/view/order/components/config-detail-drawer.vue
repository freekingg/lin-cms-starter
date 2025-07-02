<template>
  <div class="container">
    <el-drawer v-model="dialogFormVisible" size="80%" @close="close">
      <template #header>
        <h2>{{ title }}</h2>
      </template>
      <template #default>
        <div class="content">
          <el-form :model="dataForm" :rules="rules" ref="dataFormRef" label-width="120px">
            <el-row>
              <el-col :span="4">
                <el-form-item label="产品" prop="app_id">
                  <el-select filterable v-model="dataForm.app_id" placeholder="请选择产品" clearable>
                    <el-option v-for="(group, index) in allApps" :key="index" :label="group.name" :value="group.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="国家" prop="country">
                  <el-select filterable v-model="dataForm.country" placeholder="请选择" clearable>
                    <el-option
                      v-for="(group, index) in countrys"
                      :key="index"
                      :label="group.label"
                      :value="group.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="4">
                <el-form-item label="订单状态" prop="status">
                  <el-select filterable v-model="dataForm.status" placeholder="请选择" clearable>
                    <el-option
                      v-for="(group, index) in allStatus"
                      :key="index"
                      :label="group.label"
                      :value="group.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="物流商" prop="courier">
                  <el-select filterable v-model="dataForm.courier" placeholder="请选择" clearable>
                    <el-option
                      v-for="(group, index) in couriers"
                      :key="index"
                      :label="group.label"
                      :value="group.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="规格" prop="sku">
              <!-- <el-input v-model.trim="dataForm.sku" /> -->
              <el-select filterable v-model="dataForm.sku" placeholder="sku" clearable @change="skuChange">
                <el-option v-for="(group, index) in skus" :key="index" :label="group.label" :value="group.value">
                </el-option>
              </el-select>
              <el-button size="small" style="margin-left: 4px" @click="showSkusHandle">详情</el-button>
            </el-form-item>
            <el-form-item label="数量" prop="quantity">
              <el-input v-model.trim="dataForm.quantity" type="number" />
            </el-form-item>
            <el-form-item label="FB用户名" prop="fb_name">
              <el-input v-model.trim="dataForm.fb_name" />
            </el-form-item>
            <el-form-item label="用户姓名" prop="user_name">
              <el-input v-model.trim="dataForm.user_name" />
            </el-form-item>
            <el-form-item label="用户手机" prop="user_phone">
              <el-input v-model.trim="dataForm.user_phone" />
            </el-form-item>
            <el-form-item label="收货地址" prop="user_address">
              <el-input v-model.trim="dataForm.user_address" />
            </el-form-item>
            <el-form-item label="收货省份" prop="user_province">
              <el-input v-model.trim="dataForm.user_province" />
            </el-form-item>
            <el-form-item label="收货城市" prop="user_city">
              <el-input v-model.trim="dataForm.user_city" />
            </el-form-item>
            <el-form-item label="采购订单号" prop="purchase_no">
              <el-input v-model.trim="dataForm.purchase_no" />
            </el-form-item>
            <el-form-item label="国际快递单号" prop="inter_express_no">
              <el-input v-model.trim="dataForm.inter_express_no" />
            </el-form-item>

            <el-form-item label="售价" prop="price">
              <el-input v-model.trim="dataForm.price" />
            </el-form-item>

            <el-form-item label="备注" prop="summary">
              <el-input type="textarea" v-model="dataForm.summary" />
            </el-form-item>
            <el-form-item label="订单留言" prop="order_summary">
              <el-input type="textarea" v-model="dataForm.order_summary" />
            </el-form-item>
            <el-form-item label="订单时间" prop="order_summary">
              <el-date-picker v-model="dataForm.create_time" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="dataFormSubmitHandle">确 定</el-button>
        </div>
      </template>
    </el-drawer>

    <el-dialog v-model="dialogSkusVisible" title="发货信息">
      <div>
        <el-input v-model="skuForm" type="textarea" :autosize="{ minRows: 7, maxRows: 15 }" />
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogSkusVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogSkusVisible = false"> Confirm </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { toRefs, reactive, watch, nextTick, ref } from 'vue'
import { Edit, Wallet, User, Lock, Flag } from '@element-plus/icons-vue'
import orderModel from '@/model/order'
import { ElMessage } from 'element-plus'

import appModel from '@/model/app'
const drawer = ref(false)
const dialogSkusVisible = ref(false)
const emit = defineEmits(['fetch-data', 'on-visible'])

const props = defineProps({
  addOrUpdateVisible: {
    type: Boolean,
    default: true,
  },
  params: {
    type: Object,
    default: () => {},
  },
})

watch(
  () => props.addOrUpdateVisible,
  newValue => {
    dialogFormVisible.value = newValue
    if (dialogFormVisible.value) {
      nextTick(() => {
        appModel.getItems({ limit: 999 }).then(result => {
          allApps.value = result.list
          dataForm.app_id = allApps.value[0]['id']
        })

        if (props.params.id) {
          title.value = '编辑'
          getInfo()
        } else {
          createSkus()
          title.value = '添加'
          if(!dataForm.config.skus){
            dataForm.config.skus = []
          }
          // if (res.config.skus) {
            // skuForm.value = res.config.skus
          // }
        }
      })
    }
  },
)
const dataFormRef = ref()
const title = ref('')
const dialogFormVisible = ref(false)
const allApps = ref([])
const couriers = ref([
  {
    label: '一叁玖',
    value: '1',
  },
])
const countrys = ref([
  {
    label: '沙特',
    value: 'SA',
  },
  {
    label: '阿联酋',
    value: 'AE',
  },
])

const skus = ref([
  {
    label: 'M',
    value: 'M',
  },
  {
    label: 'L',
    value: 'L',
  },
  {
    label: 'XL',
    value: 'XL',
  },
  {
    label: 'XXL',
    value: 'XXL',
  },
  {
    label: 'XXXL',
    value: 'XXXL',
  },
])

let skuemus = [
  'UNDERWEAR-1-SHENHUISE-',
  'UNDERWEAR-1-QIANHUISE-',
  'UNDERWEAR-1-LVSE-',
  'UNDERWEAR-1-HEISE-',
  'UNDERWEAR-1-HUANGSE-',
]
const skuForm = ref('')
const createSkus = () => {
  let size = dataForm.sku
  let skus = skuemus.map((item, index) => {
    return {
      sku: `${item}${size}`,
      quantity: index === 0 ? 2 : 1,
    }
  })
  skuForm.value = JSON.stringify(skus, null, 4)
}

const skuChange = ()=>{
  createSkus()
}

const showSkusHandle = () => {
  dialogSkusVisible.value = true
}

const allStatus = ref([
  {
    label: '待提交',
    value: 0,
  },
  {
    label: '待确认',
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
    label: '已签收',
    value: 4,
  },
  {
    label: '未签收',
    value: 5,
  },
  {
    label: '已回款',
    value: 6,
  },
  {
    label: '已放弃',
    value: 7,
  },
])

const dataForm = reactive({
  id: '',
  name: '',
  courier: '1',
  country: 'SA',
  fb_name: '',
  inter_express_no: '',
  status: 0,
  user_name: '',
  user_phone: '',
  user_address: '',
  user_province: '',
  user_city: '',
  payment: '',
  sku: 'XL',
  quantity: 6,
  price: '79',
  cost: '',
  cost: '',
  summary: '',
  config:{},
  order_summary: '',
  app_id: '',
  create_time: '',
})

const rules = ref({
  app_id: [{ required: true, trigger: 'change', message: '必填项' }],
  status: [{ required: true, trigger: 'change', message: '必填项' }],
  courier: [{ required: true, trigger: 'change', message: '必填项' }],
  country: [{ required: true, trigger: 'change', message: '必填项' }],
  user_phone: [{ required: true, trigger: 'blur', message: '必填项' }],
})

// 获取信息
const getInfo = async id => {
  const res = await orderModel.getItem(props.params.id)
  if (!res.config) {
    res.config = {
      skus: skuForm.value,
    }
  } else {
    if (res.config.skus) {
      skuForm.value = res.config.skus
    }
  }
  Object.assign(dataForm, res)
}

const close = () => {
  dataFormRef.value.resetFields()
  dialogFormVisible.value = false
  emit('on-visible', false)
}
const dataFormSubmitHandle = () => {
  dataFormRef.value.validate(async valid => {
    if (valid) {
      let res = {}

      dataForm.config.skus = skuForm.value
      if (props.params.id) {
        res = await orderModel.editItem(props.params.id, dataForm)
      } else {
        res = await orderModel.createItem(dataForm)
      }
      if (res.code < window.MAX_SUCCESS_CODE) {
        ElMessage.success(`${res.message}`)
      }
      emit('fetch-data')
      close()
    }
  })
}
</script>

<style lang="scss" scoped>
.container :deep(.el-drawer__header) {
  margin-bottom: 0;
}
.content {
  margin-top: 20px;
}
</style>
