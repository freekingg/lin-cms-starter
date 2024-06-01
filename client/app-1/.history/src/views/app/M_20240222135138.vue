<template>
  <div class="sub-app">
    <div style="width: 100%;height: 100%;">
      <div @click="returnFun()" class="return"></div>

    
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
    case 't6':{
      listAlarmtracing({
        ...queryParams
      }).then(response => {
        dataList.value = response.rows;
        total.value = response.total;
        loading.value = false;
      });
    }
    case 't7':{
      queryUnCkDetailPageList({
        ...queryParams
      }).then(response => {
        dataList.value = response.rows;
        total.value = response.total;
        loading.value = false;
      });
    }
    default:
      queryParams.type = 1;
  }


}

// getList() {
//       this.loading = true;
//       listAccess(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
//         this.accessList = response.rows;
//         this.total = response.total;
//         this.loading = false;
//       });
//     },

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },

]
const currentPage1 = ref(5)
const currentPage2 = ref(5)
const currentPage3 = ref(5)
const currentPage4 = ref(4)
const pageSize2 = ref(100)
const pageSize3 = ref(100)
const pageSize4 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (number) => {
  console.log(`current page: ${val}`)
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
