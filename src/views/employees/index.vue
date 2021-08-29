<template>
  <div class="employees-container">
    <div class="app-container">
      <Pagetools>
        <template #left>
          <span>{{ total }}条数据</span>
        </template>
        <template #right>
          <el-button type="warning" size="small" @click="$refs.UpData.$refs['excel-upload-input'].click()">excel导入</el-button>
          <el-button type="danger" size="small" @click="export_Excel">excel导出</el-button>
          <el-button type="primary" size="small" @click="dialogVisible=true">新增员工</el-button>
        </template>
      </Pagetools>
      <el-card style="margin-top: 10px;">
        <el-table border :data="list">
          <el-table-column label="序号" type="index" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="工号" prop="workNumber" />
          <el-table-column label="聘用形式">
            <template slot-scope="scope">
              {{ scope.row.formOfEmployment===1?'正式':'非正式' }}
            </template>
          </el-table-column>
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry" :formatter="setstring" />
          <el-table-column label="操作" width="280">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click="$router.push('/employees/detail?id='+scope.row.id)"
              >查看</el-button>
              <el-button type="success" size="small">分配角色</el-button>
              <el-button
                type="danger"
                size="small"
                @click="del_empl(scope.row.id, $event)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            ref="pagination"
            background
            :current-page.sync="params.page"
            :page-sizes="[3, 5, 10,total]"
            :page-size.sync="params.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="GetSysUser()"
            @current-change="GetSysUser()"
            @prev-click="GetSysUser()"
            @next-click="GetSysUser()"
          />
        </el-row>
      </el-card>
    </div>
    <el-dialog
      title="提示"
      :visible="dialogVisible"
      width="30%"
      @close="$refs.formData.$refs.form.resetFields()"
    >
      <empDialog
        ref="formData"
        @setemp="add_emp"
      />
    </el-dialog>
    <UpData
      ref="UpData"
      :on-success="on_success"
    />
  </div>
</template>

<script>
import { GetSysUserAPI, DeleteSysUserAPI, PostSysUserBatchAPI } from '@/api'
import empDialog from './empDialog.vue'
import UpData from '@/components/UploadExcel'
import { mapImport, mapExcel } from '@/utils/Export'

export default {
  components: {
    empDialog,
    UpData
  },
  data() {
    return {
      dialogVisible: false,
      params: {
        page: 1,
        size: 3
      },
      total: 0,
      list: []
    }
  },
  computed: {
    // 1. 当前最大的页码
    maxPage() {
      return Math.ceil(this.total / this.params.size)
    },
    // 2. 最后一页是不是满的？
    isLastPageFulled() {
      return this.total % this.params.size === 0
    },
    list_val() {
      const arr = []
      this.list.forEach(item => {
        arr.push(Object.values(item))
      })
      return arr
    }
  },
  // watch: {
  //   total(newval, oldval) {
  //     newval > oldval && oldval !== 0
  //       ? (newval % this.params.pagesize !== 0 ? this.params.page = this.$refs.pagination.internalPageCount + 1
  //         : this.params.page = this.$refs.pagination.internalPageCount)
  //       : (newval % this.params.pagesize === 0 ? this.params.page = this.$refs.pagination.internalPageCount - 1
  //         : this.params.page = this.$refs.pagination.internalPageCount)
  //     this.GetSysUser()
  //     // if (newval > oldval && oldval !== 0) {
  //     //   newval % this.params.pagesize !== 0 ? this.params.page = this.$refs.pagination.internalPageCount + 1 : this.params.page = this.$refs.pagination.internalPageCount
  //     //   this.GetSysRole()
  //     // } else if (newval < oldval && oldval !== 0) {
  //     //   newval % this.params.pagesize === 0 ? this.params.page = this.$refs.pagination.internalPageCount - 1 : this.params.page = this.$refs.pagination.internalPageCount
  //     //   this.GetSysRole()
  //     // }
  //   }
  // },
  created() {
    this.GetSysUser()
  },
  methods: {
    async GetSysUser() {
      const { data: res } = await GetSysUserAPI(this.params)
      this.list = res.rows
      this.total = res.total
    },
    del_empl(val, e) {
      // 点击按钮后elementUI会自动获取焦点，使用enter与空格符会触发点击的按钮的点击事件
      // 解决，添加失去焦点事件即可
      e.target.blur()
      this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await DeleteSysUserAPI(val)
          this.GetSysUser()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    add_emp() {
      this.dialogVisible = false
      if (this.isLastPageFulled) {
        this.params.page = this.maxPage + 1
      } else {
        this.params.page = this.maxPage
      }
      this.GetSysUser()
    },
    async on_success({ header, results }) {
      try {
        await PostSysUserBatchAPI(mapImport(results))
        if (this.isLastPageFulled) {
          this.params.page = this.maxPage + 1
        } else {
          this.params.page = this.maxPage
        }
        this.GetSysUser()
        this.$message('导入成功')
      } catch (err) {
        console.error(err)
        this.$message('导入失败')
      }
    },
    async export_Excel() {
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: mapExcel(), // 表头 必填
          data: this.list_val, // 具体数据 必填
          filename: 'excel-list', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 非必填
        })
      })
    },
    setstring(row, column, cellValue) {
      return cellValue.substring(0, 10)
    }
  }
}
</script>
