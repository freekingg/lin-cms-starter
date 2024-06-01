<template>
  <div id="app">

    <el-container>
      <el-header style="background-color: #1372e5; display: flex; justify-content: space-between; align-items: center;">
        <el-menu
            default-active="2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#1372e5"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-menu-item index="1">Dashboard</el-menu-item>
          <el-menu-item index="2">My Course</el-menu-item>
        </el-menu>

        <el-avatar icon="el-icon-user" @click="goToProfile"></el-avatar>

      </el-header>


      <el-main>
        <el-row :gutter="20">
          <el-col :span="12" :offset="6">
            <div class="grid-content bg-purple font">
              Student Management
            </div></el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12" offset="6"><div class="grid-content bg-purple">
            <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
              <el-table-column
                  label="ID"
                  prop="ID">
              </el-table-column>
              <el-table-column
                  label="Email"
                  prop="Email">
              </el-table-column>
              <el-table-column
                  label="Name"
                  prop="name">
              </el-table-column>
              <el-table-column
                  align="right">
                <template slot="header" slot-scope="scope">
                  <el-input
                      v-model="search"
                      size="mini"
                      placeholder="Search"/>
                </template>
                <template slot-scope="scope">
                  <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                  <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
              </el-table-column>
            </el-table>

          </div></el-col>

        </el-row>

        <el-row :gutter="20">

          <el-col :span="6" :offset="15"><div class="grid-content bg-purple">
            <el-button type="primary" icon="el-icon-plus">ADD</el-button>
            <el-button type="primary" icon="el-icon-back">BACK</el-button>

          </div></el-col>
        </el-row>



      </el-main>
    </el-container>




  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        ID: '1',
        Email:'1@123.com',
        name: 'A',

      }, {
        ID: '2',
        Email:'2@123.com',
        name: 'B',

      }, {
        ID: '3',
        Email:'3@123.com',
        name: 'C',

      }, {
        ID: '4',
        Email:'4@123.com',
        name: 'D',

      }],
      search: ''
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
}
</script>

<style>
.font{
  text-align: center; /* 文本居中对齐 */
  font-size: 26px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {

}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>