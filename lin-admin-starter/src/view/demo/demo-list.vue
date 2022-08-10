<template>
  <div class="k-container">
    <div class="k-header">
      <el-form inline label-width="49px" :model="queryForm" @submit.prevent>
        <el-form-item label="标题">
          <el-input v-model="queryForm.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item>
          <el-button :icon="Search" native-type="submit" type="primary" @click="getDataList"> 查询 </el-button>
          <el-button :icon="Plus" native-type="submit" type="success" @click="addOrUpdateHandle"> 添加 </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <el-table :data="mixinData.dataList" border v-loading="mixinData.dataListLoading">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="title" label="书名"></el-table-column>
      <el-table-column prop="author" label="作者"></el-table-column>
      <el-table-column label="操作" fixed="right" width="275">
        <template #default="scope">
          <el-button plain size="small" type="primary" @click="addOrUpdateHandle(scope.row)">编辑</el-button>
          <el-button
            plain
            size="small"
            type="danger"
            @click="deleteHandle(scope.row.id)"
            v-permission="{ permission: '删除图书', type: 'disabled' }"
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
    <add-or-update
      :addOrUpdateVisible="mixinData.addOrUpdateVisible"
      :params="mixinData.addOrUpdateParams"
      @on-visible="onVisibleHandle"
      @fetch-data="getDataList"
    >
    </add-or-update>
  </div>
</template>

<script>
import { onMounted, toRefs, reactive } from 'vue'
import { Search, Plus } from '@element-plus/icons-vue'
import useViewModule from '@/lin/hook/view-module'
import bookModel from '@/model/book'
import AddOrUpdate from './components/demo-add-or-update'

export default {
  components: {
    AddOrUpdate,
  },
  setup() {
    const mixinViewData = reactive({
      apiModal: bookModel,
      getDataListIsPage: true,
      createdIsNeed: true,
      queryForm: {},
    })
    const {
      mixinData,
      getDataList,
      addOrUpdateHandle,
      onVisibleHandle,
      deleteHandle,
      pageSizeChangeHandle,
      pageCurrentChangeHandle,
    } = useViewModule(mixinViewData)

    onMounted(() => {
    })

    return {
      ...toRefs(mixinViewData),
      getDataList,
      mixinData,
      addOrUpdateHandle,
      onVisibleHandle,
      deleteHandle,
      pageSizeChangeHandle,
      pageCurrentChangeHandle,
      Search,
      Plus,
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
</style>
