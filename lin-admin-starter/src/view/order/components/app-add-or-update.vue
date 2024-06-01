<template>
  <el-dialog v-model="dialogFormVisible" :title="title" width="500px" @close="close">
    <el-form ref="dataFormRef" label-width="80px" :model="dataForm" :rules="rules">
      <el-form-item label="产品" prop="app_id">
        <el-select filterable v-model="dataForm.app_id" placeholder="请选择产品" clearable>
          <el-option v-for="(group, index) in allApps" :key="index" :label="group.name" :value="group.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model.trim="dataForm.config.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model.trim="dataForm.config.phone" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="dataForm.config.address" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="商品数量" prop="quantity">
        <el-input v-model.trim="dataForm.config.quantity" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="金额" prop="amount">
        <el-input v-model.trim="dataForm.config.amount" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="备注" prop="summary">
        <el-input type="textarea" v-model.trim="dataForm.summary" />
      </el-form-item>
      <el-form-item label="订单状态" prop="status">
        <el-select filterable v-model="dataForm.status" placeholder="请选择" clearable>
          <el-option v-for="(group, index) in allStatus" :key="index" :label="group.label" :value="group.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { toRefs, reactive, watch, nextTick,ref } from 'vue'
import orderModel from '@/model/order'
import appModel from '@/model/app'
import { ElMessage } from 'element-plus'

export default {
  emits: ['fetch-data', 'on-visible'],
  props: {
    addOrUpdateVisible: {
      type: Boolean,
      default: true,
    },
    params: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const allApps = ref([])
    const allStatus = ref([
      {
        label:'已下单',
        value:1
      },
      {
        label:'已确认',
        value:2
      },
      {
        label:'已发货',
        value:3
      },
      {
        label:'未签收',
        value:4
      },
      {
        label:'已签收',
        value:5
      },
      {
        label:'已回款',
        value:6
      },
    ])
    const state = reactive({
      dataFormRef: null,
      dataForm: {
        name: '',
        summary: '',
        url: '',
        config:{},
      },
      rules: {
        app_id: [{ required: true, trigger: 'change', message: '请输入' }],
      },
      title: '',
      dialogFormVisible: false,
    })

    watch(
      () => props.addOrUpdateVisible,
      newValue => {
        state.dialogFormVisible = newValue
        if (state.dialogFormVisible) {
          nextTick(() => {
            appModel.getItems({limit:999}).then((result) => {
              allApps.value = result.list
            })
            if (props.params.id) {
              state.title = '编辑'
              getInfo()
            } else {
              state.title = '添加'
            }
          })
        }
      },
    )

    // 获取信息
    const getInfo = async () => {
      const res = await orderModel.getItem(props.params.id)
      if(!res.config){
        res.config = {}
      }
      res.app_id = res.app.id
      console.log('res: ', res);
      state.dataForm = res
    }

    const close = () => {
      state.dataFormRef.resetFields()
      // state.dataForm = {
      //   title: '',
      //   author: '',
      // }
      state.dialogFormVisible = false
      emit('on-visible', false)
    }
    const dataFormSubmitHandle = () => {
      state.dataFormRef.validate(async valid => {
        if (valid) {
          let res = {}
          if (props.params.id) {
            res = await orderModel.editItem(props.params.id, state.dataForm)
          } else {
            res = await orderModel.createItem(state.dataForm)
          }
          if (res.code < window.MAX_SUCCESS_CODE) {
            ElMessage.success(`${res.message}`)
          }
          emit('fetch-data')
          close()
        }
      })
    }

    return {
      ...toRefs(state),
      allApps,
      allStatus,
      close,
      dataFormSubmitHandle,
    }
  },
}
</script>
