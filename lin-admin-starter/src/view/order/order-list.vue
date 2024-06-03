<template>
  <div class="k-container">
    <div class="k-header">
      <el-form inline :model="queryForm" @submit.prevent>
        <el-form-item label="手机号">
          <el-input v-model="queryForm.user_phone" placeholder="请输入手机号" clearable />
        </el-form-item>

        <el-form-item label="状态">
          <el-select filterable v-model="queryForm.status" placeholder="请选择状态" clearable>
            <el-option v-for="(item, index) in allStatus" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <lin-date-picker @dateChange="handleDateChange" ref="searchDateDom" class="date"> </lin-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button :icon="Search" native-type="submit" type="primary" @click="getDataList"> 查询 </el-button>
          <el-button
            :icon="Plus"
            native-type="submit"
            type="success"
            @click="configUpdateHandle()"
            v-permission="{ permission: '创建订单', type: 'disabled' }"
          >
            添加
          </el-button>
          <el-button native-type="submit" type="info" @click="exportHandle()"> 导出 </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <el-table :data="mixinData.dataList" border v-loading="mixinData.dataListLoading" size="mini">
      <el-table-column prop="create_time" label="下单时间" width="168"></el-table-column>
      <el-table-column prop="salesman" label="业务员" width="100"></el-table-column>
      <el-table-column label="状态" width="150">
        <template #default="scope">
          <div :class="matchStatusClass(scope.row.status)">
            <el-select v-model="scope.row.status" placeholder="Select" @change="editItem(scope.row)">
              <el-option v-for="item in allStatus" :key="item.value" :label="item.label" :value="item.value">
                <div class="flex items-center">
                  <el-tag :color="item.color" style="margin-right: 8px" size="small" />
                  <span :style="{ color: item.color }">{{ item.label }}</span>
                </div>
              </el-option>
              <template #tag>
                <el-tag v-for="color in value" :key="color" :color="color" />
              </template>
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="summary" label="备注"></el-table-column>
      <el-table-column prop="fb_name" label="FB用户名" min-width="100"></el-table-column>
      <el-table-column label="收货信息" width="280">
        <template #default="scope">
          <div style="display: block">
            <div>用户姓名: {{ scope.row.user_name || '-' }}</div>
            <div @click="copyHandle(scope.row.user_phone)">用户手机: {{ scope.row.user_phone || '-' }}</div>
            <div @click="copyHandle(scope.row.user_address)">地址: {{ scope.row.user_address || '-' }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="收货省/市" width="180">
        <template #default="scope">
          <div style="display: block">
            <div>省份: {{ scope.row.user_province || '-' }}</div>
            <div>城市: {{ scope.row.user_city || '-' }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="app.name" label="商品"></el-table-column>
      <el-table-column label="规格" width="100">
        <template #default="scope">
          <div style="display: block">
            <div>{{ scope.row.sku }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="金额" width="100">
        <template #default="scope">
          <div style="display: block">
            <div>{{ scope.row.price }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="数量"></el-table-column>
      <el-table-column prop="inter_express_no" label="国际单号"></el-table-column>

      <el-table-column prop="country" label="国家" min-width="100"></el-table-column>
      <el-table-column prop="summary" label="订单留言"></el-table-column>
      <el-table-column label="操作" fixed="right" width="210">
        <template #default="scope">
          <el-button
            plain
            size="small"
            type="success"
            v-permission="{ permission: '修改订单', type: 'disabled' }"
            @click="configUpdateHandle(scope.row)"
            >编辑</el-button
          >
          <el-button
            plain
            size="small"
            :loading="faHuoLoading"
            type="primary"
            v-permission="{ permission: '发货', type: 'disabled' }"
            @click="faHuoHandle(scope.row)"
            >发货</el-button
          >
          <el-button
            plain
            size="small"
            type="danger"
            @click="deleteHandle(scope.row.id)"
            v-permission="{ permission: '删除订单', type: 'disabled' }"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      :current-page="mixinData.page"
      :layout="mixinData.layout"
      :page-sizes="mixinData.pageSize"
      :page-size="mixinData.limit"
      :total="mixinData.total"
      @current-change="pageCurrentChangeHandle"
      @size-change="pageSizeChangeHandle"
    />

    <!-- 编辑页面 -->
    <!-- <add-or-update
      :addOrUpdateVisible="mixinData.addOrUpdateVisible"
      :params="mixinData.addOrUpdateParams"
      @on-visible="onVisibleHandle"
      @fetch-data="getDataList"
    >
    </add-or-update> -->

    <el-dialog v-model="dialogSkusVisible" title="发货信息">
      <div>
        <el-input v-model="skuForm" type="textarea" :autosize="{ minRows: 7, maxRows: 15 }" />
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogSkusVisible = false" :loading="faHuoLoading">Cancel</el-button>
          <el-button type="primary" @click="fahuo2Handle" :loading="faHuoLoading"> Confirm </el-button>
        </div>
      </template>
    </el-dialog>

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
import _axios, { get, put, _delete } from '@/lin/plugin/axios'
import { onMounted, toRefs, reactive, ref, nextTick } from 'vue'
import { Search, Plus } from '@element-plus/icons-vue'
import useViewModule from '@/lin/hook/view-module'
import orderModel from '@/model/order'
import AddOrUpdate from './components/app-add-or-update'
import LinDatePicker from '@/component/base/date-picker/lin-date-picker'
import { ElMessage, ElMessageBox } from 'element-plus'
import dayjs from 'dayjs'
import Utils from '@/lin/util/util'
import ConfigDetailDrawer from '@/view/order/components/config-detail-drawer.vue'

export default {
  components: {
    AddOrUpdate,
    ConfigDetailDrawer,
    LinDatePicker,
  },
  setup() {
    const mixinViewData = reactive({
      apiModal: orderModel,
      getDataListIsPage: true,
      createdIsNeed: true,
      queryForm: {},
      limit: 50,
    })
    const { mixinData, getDataList, addOrUpdateHandle, deleteHandle, pageSizeChangeHandle, pageCurrentChangeHandle } =
      useViewModule(mixinViewData)

    const onVisibleHandle = value => {
      mixinData.addOrUpdateVisible = value
    }

    onMounted(() => {})

    const copyHandle = v => {
      Utils.copyToClipboard(v).then(() => {
        ElMessage.success(`已复制`)
      })
    }

    const dialogSkusVisible = ref(false)
    const skuForm = ref()
    const defaultTime = ref([new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)])

    const handleDateChange = date => {
      console.log('date: ', date)
      if (date) {
        mixinViewData.queryForm.start = dayjs(date[0]).format('YYYY-MM-DD HH:mm:ss')
        mixinViewData.queryForm.end = dayjs(date[1]).format('YYYY-MM-DD HH:mm:ss')
        console.log(mixinViewData.queryForm)
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

    const matchStatusClass = status => {
      // primary success warning danger info
      // 匹配不到默认色
      return {
        0: 'c0',
        1: 'c1',
        2: 'c2',
        3: 'c3',
        4: 'c4',
        5: 'c5',
      }[status]
    }

    const allStatus = ref([
      {
        label: '待提交',
        value: 0,
        color: '#f504c2',
      },
      {
        label: '待确认',
        value: 1,
        color: '#E63415',
      },
      {
        label: '已确认',
        value: 2,
        color: '#4167F0',
      },
      {
        label: '已发货',
        value: 3,
        color: 'green',
      },
      {
        label: '已签收',
        value: 4,
        color: '#1EC79D',
      },
      {
        label: '未签收',
        value: 5,
        color: '#E63415',
      },
      {
        label: '已回款',
        value: 6,
        color: '#4167F0',
      },
      {
        label: '已放弃',
        value: 7,
        color: '#c8c9cc',
      },
    ])

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

    const activeRow = ref({})
    const outboundHandle = () => {
      let row = activeRow.value
      function getFormattedDate() {
        const today = new Date()
        const year = today.getFullYear()
        const month = String(today.getMonth() + 1).padStart(2, '0')
        const day = String(today.getDate()).padStart(2, '0')
        return `WPZD`
      }

      let skus = []
      if(skuForm.value){
        skus = JSON.parse(skuForm.value)
      }

      let data = {
        api_key: 'cd64ddf746489da0716818bd8b68a65f640004',
        warehouse: 'ccdb60069df22b045f7648af732bd631952743',
        orders_channel: '08503d9c697a48a08b264576deb87460231013',
        orders_order_no: `WPZD${row.id}`,
        orders_product_cn_name: row.app.name,
        orders_product_en_name: 'underwear',
        orders_declared_value: (+row.price * 0.27 * 0.3).toFixed(2),
        orders_declared_currency: 'USD',
        orders_cod_value: row.price,
        orders_remark: row.order_summary,
        orders_cod_currency: 'SAR',
        orders_consignee_name: row.user_name,
        orders_consignee_tel: row.user_phone,
        orders_consignee_address: row.user_address,
        orders_consignee_province: row.user_province,
        orders_consignee_city: row.user_city,
        orders_cust_declared_weight: '1',
        orders_consignee_country_2_code: 'SA',
        orders_product_hs_code: '6107110000',
        orders_product_hs_code: '6107110000',
        orders_goods_type: 'GC',
        freight_payment_terms: 'PP',
        orders_package_pcs: '1',
        orders_picking_remark: '',
        products: skus,
      }
      return _axios({
        method: 'post',
        url: 'v1/order/outbound/create',
        data,
      })
    }
    const faHuoLoading = ref(false)
    const faHuoHandle = async item => {
      dialogSkusVisible.value = true
      if (item.config?.skus) {
        skuForm.value = item.config.skus
      } else {
        skuForm.value = ''
      }

      activeRow.value = item

      return

      ElMessageBox.confirm('请确认发货信息是否准确无误, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async result => {
        faHuoLoading.value = true
        try {
          const res = await outboundHandle(item)
          console.log('res: ', res)
          if (res.error == 0) {
            ElMessage.success(`${res.msg}`)
          } else {
            ElMessage.error({
              message: `${res.message}`,
              duration: 6000,
            })
            console.log('下单错误', res.message)
          }
          faHuoLoading.value = false
        } catch (error) {
          faHuoLoading.value = false
          console.log('error: ', error)
        }
      })
    }
    const fahuo2Handle = async () => {
      faHuoLoading.value = true
      let item = activeRow.value
      try {
        const res = await outboundHandle(item)
        console.log('res: ', res)
        if (res.error == 0) {
          ElMessage.success(`${res.msg}`)
        } else {
          ElMessage.error({
            message: `${res.msg}`,
            duration: 6000,
          })
          console.log('下单错误', res.message)
        }
        faHuoLoading.value = false
        dialogSkusVisible.value = false
      } catch (error) {
        faHuoLoading.value = false
        console.log('error: ', error)
      }
    }
    return {
      ...toRefs(mixinViewData),
      getDataList,
      faHuoHandle,
      fahuo2Handle,
      editItem,
      exportHandle,
      mixinData,
      defaultTime,
      addOrUpdateHandle,
      onVisibleHandle,
      matchStatusClass,
      allStatus,
      copyHandle,
      deleteHandle,
      skuForm,
      dialogSkusVisible,
      pageSizeChangeHandle,
      pageCurrentChangeHandle,
      Search,
      faHuoLoading,
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
.c0 :deep(.el-input__inner) {
  color: #f504c2;
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
