<template>
  <el-dialog v-model="dialogFormVisible" :title="title" width="500px" @close="close">
    <el-form ref="dataFormRef" label-width="80px" :model="dataForm" :rules="rules">
      <el-form-item label="名称" prop="name">
        <el-input v-model.trim="dataForm.name" />
      </el-form-item>
      <div style="text-align: center; margin-bottom: 5px">
        <el-button size="small" @click="addSkuHandle">+sku</el-button>
      </div>
      <el-form-item label="规格" required>
        <template v-for="(item, index) in skus" :key="index">
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-input v-model.trim="item.name" />
            </el-form-item>
          </el-col>
          <span class="text-gray-500" style="padding: 0 6px">-</span>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-input v-model.trim="item.value" />
            </el-form-item>
          </el-col>
        </template>
      </el-form-item>

      <el-form-item label="网站 " prop="url">
        <el-input v-model.trim="dataForm.url" placeholder="请输入网站" />
      </el-form-item>
      <el-form-item label="备注" prop="summary">
        <el-input type="textarea" v-model.trim="dataForm.summary" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { toRefs, reactive, watch, nextTick, ref } from 'vue'
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
    const state = reactive({
      dataFormRef: null,
      dataForm: {
        name: '',
        summary: '',
        url: '',
        config: {},
      },
      rules: {
        name: [{ required: true, trigger: 'blur', message: '请输入标题' }],
        url: [{ required: true, trigger: 'blur', message: '请输入网站' }],
      },
      title: '',
      dialogFormVisible: false,
    })

    const skus = ref([{ name: '', value: '' }])

    const addSkuHandle = () => {
      skus.value.push({ name: '', value: '' })
    }

    watch(
      () => props.addOrUpdateVisible,
      newValue => {
        state.dialogFormVisible = newValue
        if (state.dialogFormVisible) {
          nextTick(() => {
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
      const res = await appModel.getItem(props.params.id)
      console.log('res: ', res)
      state.dataForm = res
      if (!state.dataForm.config) {
        state.dataForm.config = {}
        skus.value = [{ name: '', value: '' }]
      } else {
        skus.value = state.dataForm.config.skus
      }
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

          state.dataForm.config.skus = skus.value
          console.log('state.dataForm: ', state.dataForm)
          if (props.params.id) {
            res = await appModel.editItem(props.params.id, state.dataForm)
          } else {
            res = await appModel.createItem(state.dataForm)
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
      skus,
      addSkuHandle,
      close,
      dataFormSubmitHandle,
    }
  },
}
</script>
