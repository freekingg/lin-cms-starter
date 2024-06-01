<template>
  <div class="sub-app">
    <div style="width: 100%;height: 100%;">
      <div @click="returnFun()" class="return"></div>

      <el-table element-loading-background="rgba(0, 0, 0, 0.6)" v-loading="loading" :data="dataList" style="width: 100%"
        row-class-name="table-td-class" height="400" header-row-class-name="table-td-class" class="table-td-class">
        <template v-if="key == 't1'">

          <el-table-column label="设备名称" align="center" prop="deviceName" />
          <el-table-column label="位置" align="center" prop="location" />
          <el-table-column label="进出时间" align="center" prop="accessTime" width="180">
            <template #default="scope">
              <!-- {{ scope.row }} -->
              <span>{{ parseTime(scope.row.accessTime, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="进出人" align="center" prop="name" />
          <el-table-column label="进出方式" align="center" prop="type">
            <template #default="scope">

              <dict-tag :options="dict.type.report_access_event" :value="scope.row.type" />
            </template>
          </el-table-column>

        </template>
        <template v-else-if="key == 't2'">

          <el-table-column label="安全门" align="center" prop="deviceName" width="120" sortable="custom"
            :sort-orders="['descending', 'ascending']">
            <template #default="scope">
              {{ scope.row.deviceName }}
            </template>
          </el-table-column>

          <el-table-column label="RFID" align="center" prop="rfid" width="148" />



          <el-table-column label="档号" align="center" prop="dh" width="150">
            <template #default="scope">
              <!--RFID关联类型 1；档案盒 2：设备-->
              <span v-if="scope.row.rfidType == 1" v-text="scope.row.dh"></span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column label="题名" align="center" prop="tm" width="200">
            <template #default="scope">
              <!--RFID关联类型 1；档案盒 2：设备-->
              <span v-if="scope.row.rfidType == 1" v-text="scope.row.tm"></span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column label="存放位置" align="center" prop="dawz" width="230">
            <template #default="scope">
              <!--RFID关联类型 1；档案盒 2：设备-->
              <span v-if="scope.row.rfidType == 1" v-text="scope.row.dawz"></span>
              <span v-else>/</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="进出时间" prop="createTime" width="160" sortable="custom"
            :sort-orders="['descending', 'ascending']">
            <template #default="scope">
              <!--<span>{{  parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>-->
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="许可类型" align="center" prop="xukeleixing" width="100" sortable="custom"
            :sort-orders="['descending', 'ascending']">
            <template #default="scope">
              <dict-tag :options="dict.type.access_permit" :value="scope.row.xukeleixing" />
            </template>
          </el-table-column>
          <el-table-column label="处理状态" align="center" prop="handleStatus" width="100" sortable="custom"
            :sort-orders="['descending', 'ascending']">
            <template #default="scope">
              <dict-tag :options="dict.type.handle_status" :value="scope.row.handleStatus" />
            </template>
          </el-table-column>

        </template>
        <template v-else-if="key == 't3'">
          <el-table-column label="盘点任务号" align="center" prop="ordernum" width="110" sortable='custom'
            :sort-orders="['descending', 'ascending']" />
          <el-table-column label="盘点位置" align="center" prop="shelfPlace" width="250" />
          <!--<el-table-column label="架签" align="center" prop="shelfRfid" width="120"/>-->
          <el-table-column label="架签" align="center" prop="shelfRfid" width="120">
            <template #default="scope">
              <!--盘点类型 0：精盘 1：粗盘-->
              <span v-if="scope.row.checkType == 0" v-text="scope.row.shelfRfid"></span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column label="总上架盒数" align="center" prop="boxNum" width="240">
            <template #default="scope">
              <span style="padding-right: 10px">{{ scope.row.boxNum }}</span>(在库:{{ scope.row.zkBoxNum }}盒,不在库:{{
                scope.row.notZkBoxNum }}盒)
            </template>
          </el-table-column>
          <el-table-column label="在库匹配盒数(正常)" align="center" prop="matchBoxNum" width="110" />
          <el-table-column label="在库缺失盒数(异常)" align="center" prop="lossBoxNum" width="110" />
          <el-table-column label="不在库匹配盒数(异常)" align="center" prop="matchButNotZkBoxNum" width="120" />
          <el-table-column label="不在库而未匹配盒数(正常)" align="center" prop="loanedBoxNum" width="150" />
          <el-table-column label="预期外盒数(异常)" align="center" prop="unexpectedBoxNum" width="90">
            <template #default="scope">
              <!--盘点类型 0：精盘 1：粗盘-->
              <span v-if="scope.row.checkType == 0" v-text="scope.row.unexpectedBoxNum"></span>
              <span v-else>/</span>
            </template>
          </el-table-column>
          <el-table-column label="问题描述" align="center" prop="remark" width="300" />
          <el-table-column label="创建时间" align="center" prop="createTime" width="156" sortable="custom"
            :sort-orders="['descending', 'ascending']">
            <template #default="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="盘点类型" align="center" prop="checkType" width="98" sortable="custom"
            :sort-orders="['descending', 'ascending']">
            <template #default="scope">
              <dict-tag :options="dict.type.p_check_type_flag" :value="scope.row.checkType" />
            </template>
          </el-table-column>
          <el-table-column label="盘点结果" align="center" prop="checkResult" width="80">
            <template #default="scope">
              <dict-tag :options="dict.type.p_check_unit_flag" :value="scope.row.checkResult" />
            </template>
          </el-table-column>


        </template>
        <template v-else-if="key == 't4'">

          <el-table-column align="center" label="操作类型" prop="operaType" width="74">
            <template #default="scope">
              <dict-tag :options="dict.type.rec_shangxiajia_type" :value="scope.row.operaType" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="档案类型" prop="danganleixing" width="140" />
          <el-table-column align="center" label="rfid" prop="rfid" width="146" />
          <el-table-column align="center" label="档号" prop="dh" width="180" />
          <el-table-column align="center" label="题名" prop="tm" />
          <el-table-column align="center" label="位置" prop="storeDesc" width="240" />
          <el-table-column align="center" label="记录时间" prop="createTime" width="152" sortable="custom"
            :sort-orders="['descending', 'ascending']">
            <template #default="scope">
              <!--<span>{{  parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>-->
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>

        </template>
        <template v-else-if="key == 't5'">
          <el-table-column label="操作类型" align="center" prop="bindType" width="80">
            <template #default="scope">
              <dict-tag :options="dict.type.rfid_bind_type" :value="scope.row.bindType" />
            </template>
          </el-table-column>
          <el-table-column label="档案类型" align="center" prop="danganleixing" width="140" />
          <el-table-column label="rfid" align="center" prop="rfid" width="160" />
          <el-table-column label="档号" align="center" prop="dh" width="200" />
          <el-table-column label="题名" align="center" prop="tm" />
          <el-table-column label="记录时间" align="center" prop="createTime" width="160" sortable="custom"
            :sort-orders="['descending', 'ascending']">
            <template #default="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
        </template>
        <template v-else="key == 't6'">
          <el-table-column label="设备类型" align="center" prop="devictType" />
          <el-table-column label="设备名称" align="center" prop="deviceName" />
          <el-table-column label="报警时间" align="center" prop="alarmTime" width="180">
            <template #default="scope">
              <span>{{ parseTime(scope.row.alarmTime, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="监控名称" align="center" prop="monitorName" />
          <el-table-column label="报警信息描述" align="center" prop="alarmRecord" />
        </template>
        <template v-else="key == 't7'">

          <el-table-column align="center" label="出库单号" prop="ordernum" width="140" />
          
          <el-table-column align="center" label="档案类型" prop="danganleixing" width="140" />
          <el-table-column align="center" label="rfid" prop="rfid" width="146" />
          <el-table-column align="center" label="档号" prop="dh" width="180" />
          <el-table-column align="center" label="题名" prop="tm" />
          <el-table-column align="center" label="存储区域类型" prop="storeType">-->
             <template slot-scope="scope">
                 <dict-tag :options="dict.type.area_type" :value="scope.row.storeType"/>
             </template>
          </el-table-column>
          <el-table-column align="center" label="位置" prop="storeDesc" width="240" />
          <el-table-column align="center" label="记录时间" prop="createTime" width="152" sortable="custom"
            :sort-orders="['descending', 'ascending']" />
    
        </template>
      </el-table>

      <div class="demo-pagination-block">
        <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize" @pagination="getList" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, provide, getCurrentInstance, onMounted } from 'vue';
import { listDoor } from "@/api/report/security/door";
import { listAccess } from "@/api/report/security/access";
import { useRoute, useRouter } from 'vue-router'
import {
  listPandianunit,

} from "@/api/archives/record/pandianunit";
import {
  listDanganshangxiajia,

} from "@/api/archives/record/danganshangxiajia";
import { listRfidbind } from "@/api/archives/record/rfidbind";
import { listAlarmtracing } from "@/api/report/security/alarmtracing";
import { queryUnCkDetailPageList } from "@/api/archives/record/ckdetail";
// ordernum
// danganleixing
// rfid
// dh
// tm
// storeType
// storeId
// storeUnitId
// storeDesc
// createTime

const areaId = 96;
const { proxy } = getCurrentInstance();

const dict = proxy.useDict("report_access_event", 'access_permit', 'handle_status', 'rfid_type', 'rfid_bind_type', 'p_check_unit_flag', 'p_check_type_flag', 'area_type', 'rec_shangxiajia_type');

const router = useRouter();


const route = useRoute();
const key = ref(route.query.key)
const loading = ref(false)
const total = ref(0);
const queryParams = reactive({
  pageNum: 1,
  pageSize: 5,
})
const dataList = ref([]);
onMounted(() => {
  getList()

})

function returnFun() {
  router.back()
}

function getList() {
  loading.value = true;

  switch (key.value) {
    case 't1':
      listAccess({
        ...queryParams
      }).then(response => {
        dataList.value = response.rows;
        total.value = response.total;
        loading.value = false;
      });
      break;
    case 't2':
      listDoor({
        ...queryParams
      }).then(response => {
        dataList.value = response.rows;
        total.value = response.total;
        loading.value = false;
      });
      break;
    case 't3':
      listPandianunit({
        ...queryParams
      }).then(response => {
        dataList.value = response.rows;
        total.value = response.total;
        loading.value = false;
      });
      break;
    case 't4':
      listDanganshangxiajia({
        ...queryParams
      }).then(response => {
        dataList.value = response.rows;
        total.value = response.total;
        loading.value = false;
      });

      break;
    case 't5':
      listRfidbind({
        ...queryParams
      }).then(response => {
        dataList.value = response.rows;
        total.value = response.total;
        loading.value = false;
      });

      break;
    case 't6': {
      listAlarmtracing({
        ...queryParams
      }).then(response => {
        dataList.value = response.rows;
        total.value = response.total;
        loading.value = false;
      });
      break
    }
    case 't7': {
      queryUnCkDetailPageList({
        ...queryParams,
        areaId: areaId
      }).then(response => {
        dataList.value = response.rows;
        total.value = response.total;
        loading.value = false;
      });
      break;
    }
    default:
      queryParams.type = 1;
  }


}


</script>
<style></style>
<style scoped lang="scss">
@import 'scss/base';

.return {

  width: 50px;
  height: 50px;
  position: absolute;
  top: 30px;
  right: 20px;
  background-image: url('@/assets/images/app/return.png');

  background-repeat: no-repeat;
}

.sub-app {
  background-color: rgba(0, 40, 105, 0.6) !important;
}

:deep(.table-td-class) {

  color: #00aaef !important;
  background-color: rgba(0, 40, 105, 0.6) !important;
  border: 1px solid rgba(1, 44, 136, 0.6) !important;

  td {
    border: 1px solid rgba(1, 44, 136, 0.6) !important;
  }
}

:deep(.el-table__header) {
  color: #00aaef !important;
  background-color: rgba(0, 40, 105, 0.6) !important;

  th {
    background-color: rgba(0, 40, 105, 0.6) !important;
    border: 1px solid rgba(1, 44, 136, 0.6) !important;
  }
}

:deep(.el-table__inner-wrapper)::before {
  content: "";
  position: absolute;
  background-color: var(--el-table-border-color);
  z-index: -1;
}

:deep(.el-pager) {
  li {
    color: #fff;
    background-color: rgba(0, 40, 105, 0.6) !important;
  }


}


:deep(.pagination-container) {

  .btn-prev,
  .btn-next {
    color: #fff;
    background-color: rgba(0, 40, 105, 0.6) !important;
  }

  .is-first,
  .el-pagination__jump {
    color: #fff;
  }
}

:deep(tr):hover> {
  td.el-table__cell {
    background-color: rgba(0, 170, 240, 0.2) !important;

  }

}
</style>
