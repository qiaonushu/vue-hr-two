<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click.native="setRole(false)"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="list">
              <el-table-column width="120" label="序号" type="index" :index="typeIndex" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label=" 操作">
                <template slot-scope="scope">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click.native="setRole(scope.row,scope)">编辑</el-button>
                  <!-- scope.row.id -->
                  <el-button size="small" type="danger" @click.native="DeleteSysRole(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination
                ref="pagination"
                background
                :page-sizes="[1,2,3,total]"
                :page-size.sync="params.pagesize"
                :current-page.sync="params.page"
                layout="sizes,prev, pager, next, jumper"
                :total="total"
                @current-change="GetSysRole"
                @prev-click="GetSysRole"
                @next-click="GetSysRole"
                @size-change="GetSysRole"
              />
              <!-- current-page -->
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      @close="clear"
    >
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="角色名称">
          <el-input v-model="form.name" prop="name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="form.description" prop="description" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { GetSysRoleAPI, DeleteSysRoleAPI, PostSysRoleAPI, PutSysRoleAPI } from '@/api'
export default {
  data() {
    return {
      count: 10,
      list: [],
      total: 0,
      params: {
        pagesize: 2,
        page: 1
      },
      dialogVisible: false,
      setstate: '',
      form: {
        name: '',
        description: '',
        id: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      }

    }
  },
  watch: {
    total(newval, oldval) {
      newval > oldval && oldval !== 0 ? (newval % this.params.pagesize !== 0 ? this.params.page = this.$refs.pagination.internalPageCount + 1 : this.params.page = this.$refs.pagination.internalPageCount) : (newval % this.params.pagesize === 0 ? this.params.page = this.$refs.pagination.internalPageCount - 1 : this.params.page = this.$refs.pagination.internalPageCount)
      this.GetSysRole()
      // if (newval > oldval && oldval !== 0) {
      //   newval % this.params.pagesize !== 0 ? this.params.page = this.$refs.pagination.internalPageCount + 1 : this.params.page = this.$refs.pagination.internalPageCount
      //   this.GetSysRole()
      // } else if (newval < oldval && oldval !== 0) {
      //   newval % this.params.pagesize === 0 ? this.params.page = this.$refs.pagination.internalPageCount - 1 : this.params.page = this.$refs.pagination.internalPageCount
      //   this.GetSysRole()
      // }
    }
  },
  created() {
    this.GetSysRole()
  },
  methods: {
    // 获取分页角色
    async GetSysRole() {
      try {
        const { data: res } = await GetSysRoleAPI(this.params)
        this.total = res.total
        this.list = res.rows
      } catch (err) {
        console.error(err)
      }
    },
    // 删除角色
    async DeleteSysRole(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await DeleteSysRoleAPI(id)
        this.GetSysRole()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 点击页码重新发送请求
    // 添加角色
    async PostSysRole() {
      await PostSysRoleAPI(this.form)
    },
    // 编辑角色
    async PutSysRole() {
      await PutSysRoleAPI(this.form)
    },
    // async PutSysRole() {
    //   const { data: res } = await PutSysRoleAPI()
    //   console.log(res)
    // },
    // 获取角色详情
    // async  GetRoleDetails(id) {
    //   const { data: res } = await GetRoleDetailsAPI(id)
    //   console.log(res)
    //   this.form = res
    // },
    // 根据数值分辨是添加还是编辑
    setRole(state, e) {
      console.log(e)
      this.dialogVisible = true
      if (state) {
        this.setstate = true
        this.form = state
      } else {
        this.setstate = false
      }
    },
    // 添加与编辑的弹框
    addRole() {
      this.$refs.ruleForm.validate(callback => {
        if (callback) {
          this.setstate ? this.PutSysRole() : this.PostSysRole()
          this.GetSysRole()
          this.dialogVisible = false
        } else {
          this.$message('请输入正确信息')
        }
      })
    },
    clear() {
      this.$refs.ruleForm.resetFields()
      this.form = {
        name: '',
        description: '',
        id: ''
      }
    },
    typeIndex(num) {
      const aaa = this.params.page * this.params.pagesize + num - (this.params.pagesize - 1)
      return this.params.page > 1 ? aaa : num + 1
    }
  }
}
</script>

<style>

</style>
