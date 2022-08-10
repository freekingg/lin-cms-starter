<template>
  <el-dialog v-model="dialogFormVisible" :title="title" width="500px" @close="close">
    <el-form ref="dataFormRef" label-width="80px" :model="dataForm" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model.trim="dataForm.title" />
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model.trim="dataForm.author" />
      </el-form-item>
      <el-form-item label="简介" prop="summary">
        <el-input v-model.trim="dataForm.summary" />
      </el-form-item>
      <el-form-item label="封面" prop="image">
        <el-input v-model.trim="dataForm.image" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { toRefs, reactive, watch, nextTick } from 'vue'
import bookModel from '@/model/book'
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
        title: '',
        author: '',
      },
      rules: {
        title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
        author: [{ required: true, trigger: 'blur', message: '请输入作者' }],
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
      const res = await bookModel.getBook(props.params.id)
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
            res = await bookModel.editBook(props.params.id, state.dataForm)
          } else {
            res = await bookModel.createBook(state.dataForm)
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
      close,
      dataFormSubmitHandle,
    }
  },
}
</script>
