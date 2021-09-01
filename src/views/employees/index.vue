<template>
  <div class="employees-container">
    <div class="app-container">
      <Pagetools>
        <template #left>
          <span>{{ total }}条数据</span>
        </template>
        <template #right>
          <el-button
            v-if="$store.state.user.userInfo.roles.points&&$store.state.user.userInfo.roles.points.includes('import_excel')"
            type="warning"
            size="small"
            @click="$refs.UpData.$refs['excel-upload-input'].click()"
          >excel导入</el-button>
          <el-button
            v-if="$store.state.user.userInfo.roles.points&&$store.state.user.userInfo.roles.points.includes('export_excel')"
            type="danger"
            size="small"
            @click="export_Excel"
          >excel导出</el-button>
          <el-button type="primary" size="small" @click="setdialog=true">新增员工</el-button>
        </template>
      </Pagetools>
      <el-card style="margin-top: 10px;">
        <el-table border :data="list">
          <el-table-column label="序号" type="index" :index="typeIndex" />
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
              <el-button type="success" size="small" @click="assignrole(scope.row.id)">分配角色</el-button>
              <el-button
                v-if="$store.state.user.userInfo.roles.points&&$store.state.user.userInfo.roles.points.includes('del_employee')"
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
            @size-change="getSysUser()"
            @current-change="getSysUser()"
            @prev-click="getSysUser()"
            @next-click="getSysUser()"
          />
        </el-row>
      </el-card>
    </div>
    <!-- 添加与设置弹出框 -->
    <el-dialog
      title="提示"
      :visible="setdialog"
      width="30%"
      :before-close="handleClose"
      @close="$refs.formData.$refs.form.resetFields()"
    >
      <setRole ref="formData" @setemp="add_emp" />
    </el-dialog>
    <!-- 分配角色弹出框 -->
    <el-dialog
      title="分配角色"
      :visible="assigndialog"
      width="30%"
      :before-close="handleClose"
    >
      <assignRole :id="is_id" @close="dialogclose" />
    </el-dialog>

    <!-- 导入组件 -->
    <UpData ref="UpData" :on-success="on_success" />
  </div>
</template>

<script>
import { GetSysUserAPI, DeleteSysUserAPI, PostSysUserBatchAPI } from '@/api'
import setRole from './dialog/setRole.vue'
import assignRole from './dialog/assignRole.vue'
import UpData from '@/components/UploadExcel'
import { mapImport, mapExcel } from '@/utils/Export'

export default {
  components: {
    setRole,
    assignRole,
    UpData
  },
  data() {
    return {
      setdialog: false,
      assigndialog: false,
      total: 0,
      is_id: '',
      params: {
        page: 1,
        size: 3
      },
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
  //     this.getSysUser()
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
    // 获取员工列表
    this.getSysUser()
  },
  methods: {
    // 获取员工列表接口
    async getSysUser() {
      const { data: res } = await GetSysUserAPI(this.params)
      this.list = res.rows
      this.total = res.total
    },
    // 删除员工
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
          // 删除员工接口
          await DeleteSysUserAPI(val)
          this.getSysUser()
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
    // 新增员工
    add_emp() {
      this.setdialog = false
      if (this.isLastPageFulled) {
        this.params.page = this.maxPage + 1
      } else {
        this.params.page = this.maxPage
      }
      this.getSysUser()
    },
    // 导入成功的回调函数
    async on_success({ header, results }) {
      try {
        await PostSysUserBatchAPI(mapImport(results))
        if (this.isLastPageFulled) {
          this.params.page = this.maxPage + 1
        } else {
          this.params.page = this.maxPage
        }
        this.getSysUser()
        this.$message('导入成功')
      } catch (err) {
        console.error(err)
        this.$message('导入失败')
      }
    },
    // 导出
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
    // 时间日期的修改
    setstring(row, column, cellValue) {
      return cellValue.substring(0, 10)
    },
    // 页面索引值计算
    typeIndex(num) {
      const index = this.params.page * this.params.size + num - (this.params.size - 1)
      return this.params.page > 1 ? index : num + 1
    },
    // 关闭弹框
    handleClose() {
      this.assigndialog = false
      this.setdialog = false
    },
    // 分配角色
    assignrole(id) {
      this.assigndialog = true
      this.is_id = id
    },
    // 关闭弹窗
    dialogclose() {
      this.assigndialog = false
    }
  }
}
</script>
