<template>
  <div class="k-container">
    <div class="k-header">
      <el-form inline :model="queryForm" @submit.prevent>
        <el-form-item label="业务员">
          <el-input v-model="queryForm.salesman" placeholder="请输入" clearable />
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker
            v-model="queryDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            popper-class="date-box"
            @change="handleDateChange"
            :shortcuts="shortcuts"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button :icon="Search" native-type="submit" type="primary" @click="getDataList"> 查询 </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <el-table :data="mixinData.dataList" border v-loading="mixinData.dataListLoading" size="medium">
      <el-table-column prop="date" label="下单时间" width="160"></el-table-column>
      <el-table-column prop="salesman" label="业务员" width="100"></el-table-column>
      <el-table-column prop="total_count" label="订单数量" width="100"></el-table-column>
      <el-table-column prop="total_price" label="待提交" width="100">
        <template #default="scope">
          <div style="display: block; color: red">
            <div>{{ scope.row.status_0_count }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="total_price" label="待确认" width="100">
        <template #default="scope">
          <div style="display: block; color: red">
            <div>{{ scope.row.status_1_count }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="total_price" label="已确认" width="100">
        <template #default="scope">
          <div style="display: block; color: green">
            <div>{{ scope.row.status_2_count }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="total_price" label="已发货" width="100">
        <template #default="scope">
          <div style="display: block; color: green">
            <div>{{ scope.row.status_3_count }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="total_price" label="已签收" width="100">
        <template #default="scope">
          <div style="display: block; color: green">
            <div>{{ scope.row.status_4_count }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="total_price" label="未签收" width="100">
        <template #default="scope">
          <div style="display: block; color: green">
            <div>{{ scope.row.status_5_count }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="total_price" label="已回款" width="100">
        <template #default="scope">
          <div style="display: block; color: green">
            <div>{{ scope.row.status_6_count }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="total_price" label="订单金额(国外货币)"></el-table-column>
      <el-table-column prop="total_price" label="订单金额(人民币)">
        <template #default="scope">
          <div style="display: block">
            <div>{{ (scope.row.total_price * 1.93).toFixed(2) }}</div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-pagination
      background
      :current-page="mixinData.page"
      :layout="mixinData.layout"
      :page-sizes="mixinData.pageSize"
      :page-size="mixinData.limit"
      :total="mixinData.total"
      @current-change="pageCurrentChangeHandle"
      @size-change="pageSizeChangeHandle"
    /> -->

    <!-- 编辑页面 -->
    <!-- <add-or-update
      :addOrUpdateVisible="mixinData.addOrUpdateVisible"
      :params="mixinData.addOrUpdateParams"
      @on-visible="onVisibleHandle"
      @fetch-data="getDataList"
    >
    </add-or-update> -->

    <config-detail-drawer
      ref="configDetailRef"
      :key="addKey"
      :addOrUpdateVisible="mixinData.addOrUpdateVisible"
      :params="mixinData.addOrUpdateParams"
      @on-visible="onVisibleHandle"
      @fetch-data="getDataList"
    ></config-detail-drawer>
  </div>
</template>

<script>
import { onMounted, toRefs, reactive, ref, nextTick } from 'vue'
import { Search, Plus } from '@element-plus/icons-vue'
import useViewModule from '@/lin/hook/view-module'
import statisticsModel from '@/model/statistics'
import AddOrUpdate from './components/app-add-or-update'
import LinDatePicker from '@/component/base/date-picker/lin-date-picker'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import ConfigDetailDrawer from '@/view/order/components/config-detail-drawer.vue'

export default {
  components: {
    AddOrUpdate,
    ConfigDetailDrawer,
    LinDatePicker,
  },
  setup() {
    const mixinViewData = reactive({
      apiModal: statisticsModel,
      getDataListIsPage: false,
      createdIsNeed: false,
      queryForm: {},
      limit: 50,
    })
    const { mixinData, getDataList, addOrUpdateHandle, deleteHandle, pageSizeChangeHandle, pageCurrentChangeHandle } =
      useViewModule(mixinViewData)

    const onVisibleHandle = value => {
      mixinData.addOrUpdateVisible = value
    }

    const queryDate = ref([])
    onMounted(() => {
      const today = new Date()
      const lastWeek = new Date()
      lastWeek.setDate(today.getDate() - 6) // 设置为最近一周的开始日期
      queryDate.value = [lastWeek, today] // 设置默认日期范围
      mixinViewData.queryForm.start =dayjs(lastWeek).format('YYYY-MM-DD HH:mm:ss')
      mixinViewData.queryForm.end = dayjs(today).format('YYYY-MM-DD HH:mm:ss')
      getDataList()
    })

    const shortcuts = [
      {
        text: '最近一周',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        })(),
      },
    ]

    const handleDateChange = date => {
      if (date) {
        mixinViewData.queryForm.start = dayjs(date[0]).format('YYYY-MM-DD HH:mm:ss')
        mixinViewData.queryForm.end = dayjs(date[1]).format('YYYY-MM-DD HH:mm:ss')
      } else {
        mixinViewData.queryForm.start = ''
        mixinViewData.queryForm.end = ''
      }
    }

    const exportHandle = async () => {
      const res = await orderModel.exportItem(mixinViewData.queryForm)
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'exported_data.xlsx'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    }

    const addKey = ref(0)
    const configDetailRef = ref()
    const configUpdateHandle = (row = {}) => {
      addKey.value++
      nextTick(() => {
        mixinData.addOrUpdateParams = row
        mixinData.addOrUpdateVisible = true
      })
    }

    const editItem = async item => {
      if (item.id) {
        const res = await orderModel.editItem(item.id, item)
        if (res.code < window.MAX_SUCCESS_CODE) {
          ElMessage.success(`${res.message}`)
          getDataList()
        }
      }
    }
    return {
      ...toRefs(mixinViewData),
      getDataList,
      editItem,
      exportHandle,
      mixinData,
      shortcuts,
      queryDate,
      addOrUpdateHandle,
      onVisibleHandle,
      deleteHandle,
      pageSizeChangeHandle,
      pageCurrentChangeHandle,
      Search,
      handleDateChange,
      Plus,
      addKey,
      configUpdateHandle,
      configDetailRef,
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}

.c1 :deep(.el-input__inner) {
  color: #e63415;
}
.c2 :deep(.el-input__inner) {
  color: #4167f0;
}
.c3 :deep(.el-input__inner) {
  color: #1ec79d;
}
.c4 :deep(.el-input__inner) {
  color: #e63415;
}
.c5 :deep(.el-input__inner) {
  color: #4167f0;
}
</style>
