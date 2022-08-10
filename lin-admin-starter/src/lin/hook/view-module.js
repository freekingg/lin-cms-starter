import { reactive, onMounted, toRefs } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

export default function (source = {}) {
  const data = reactive({
    createdIsNeed: true, // 此页面是否在 进入 时，调用查询数据列表接口？
    apiModal: '', // 接口Modal,用于操作数据请求
    getDataListIsPage: false, // 数据列表接口，是否需要分页？
    deleteURL: '', // 删除接口，API地址
    queryForm: {}, // 查询条件
    dataList: [], // 数据列表
    page: 1, // 当前页码
    layout: 'total, sizes, prev, pager, next, jumper', // 页码布局
    pageSize: [10, 20, 50, 100], // 页码分页
    limit: 10, // 每页数
    total: 0, // 总条数
    dataListLoading: false, // 数据列表，loading状态
    dataListSelections: [], // 数据列表，多选项
    addOrUpdateVisible: false, // 新增／更新，弹窗visible状态
    addOrUpdateParams: {}, // 新增／更新，弹窗传入的值
    ...source,
  })

  const state = reactive(data)

  onMounted(() => {
    if (state.createdIsNeed) {
      getDataList()
    }
  })

  // 获取列表数据
  const getDataList = async () => {
    const { apiModal, queryForm } = state
    if (apiModal) {
      try {
        state.dataListLoading = true
        const res = await apiModal.getItems({ page: state.page - 1, limit: state.limit, ...queryForm })
        state.dataList = res.list || res || []
        state.total = res.total || 0
        state.dataListLoading = false
      } catch (error) {
        console.log('error: ', error)
        state.dataListLoading = false
      }
    }
  }

  // 新增 / 修改监听
  const onVisibleHandle = async visible => {
    state.addOrUpdateVisible = visible
  }

  // 新增 / 修改 弹窗打开
  const addOrUpdateHandle = async params => {
    state.addOrUpdateVisible = true
    state.addOrUpdateParams = params
  }

  // 分页, 每页条数
  const pageSizeChangeHandle = async val => {
    state.page = 1
    state.limit = val
    getDataList()
  }

  // 分页, 当前页
  const pageCurrentChangeHandle = async val => {
    state.page = val
    getDataList()
  }

  // 删除确认框
  const deleteHandle = async id => {
    ElMessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      const res = await state.apiModal.deleteItem(id)
      if (res.code < window.MAX_SUCCESS_CODE) {
        getDataList()
        ElMessage.success(`${res.message}`)
      }
    })
  }

  return {
    mixinData: state,
    getDataList,
    addOrUpdateHandle,
    onVisibleHandle,
    deleteHandle,
    pageSizeChangeHandle,
    pageCurrentChangeHandle,
  }
}
