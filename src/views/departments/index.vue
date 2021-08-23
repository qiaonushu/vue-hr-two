<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 具体页面结构 -->
        <!-- 用一个行列布局 -->
        <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
          <el-col :span="20">
            <svg-icon icon-class="home" /><span>{{ company.name }}</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <!-- 两个内容 -->
              <el-col>负责人</el-col>              <!-- 下拉菜单 element -->
              <el-col>
                <el-dropdown>
                  <span>
                    操作<i class="el-icon-arrow-down" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="setCompany('',false)">添加子部门</el-dropdown-item>
                    <el-dropdown-item @click.native="setCompany(company.id,true)">编辑部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-tree
          :data="list"
          default-expand-all
          icon-class="null"
        >
          <!-- :default-expand-all="true" -->
          <template #default="{ data,node }">
            <el-row
              type="flex"
              justify="space-between"
              align="middle"
              style="height: 40px; width: 100%;"
            >
              <el-col :span="20">
                <svg-icon
                  v-if="data.children.length !== 0"
                  :icon-class="node.expanded ? 'sub' : 'add'"
                />
                <svg-icon v-else icon-class="angel" />
                <span>{{ data.name }}</span>
              </el-col>
              <el-col :span="4">
                <el-row type="flex" justify="end">
                  <!-- 两个内容 -->
                  <el-col>{{ data.manager }}</el-col>
                  <el-col>
                    <!-- 下拉菜单 element -->
                    <el-dropdown>
                      <span> 操作<i class="el-icon-arrow-down" /> </span>
                      <!-- 下拉菜单 -->
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="setCompany(data.id,false)">添加子部门</el-dropdown-item>
                        <el-dropdown-item @click.native="setCompany(data.id,true)">编辑部门</el-dropdown-item>
                        <el-dropdown-item v-if="data.children.length===0" @click.native="DeleteDepartment(data.id)">删除部门</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-tree>
      </el-card>
    </div>
    <el-dialog
      :title="is_company?'修改':'添加'"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="showDialog"
      @close="closeDialog"
    >
      <depDialog :id="pid" ref="depDialog" :set="is_company" :com-list="comList" @success="Company" />
    </el-dialog>
  </div>
</template>

<script>
import { GetDepartmentAPI, DeleteDepartmentAPI } from '@/api'
import { fn } from '@/utils/tree'
import depDialog from './deptDialog'

export default {
  components: {
    depDialog
  },
  data() {
    return {
      company: {},
      // 依赖一份树形数据
      list: [],
      showDialog: false,
      pid: '',
      is_company: false,
      comList: [],
      treeState: true
    }
  },
  created() {
    this.GetDepartment()
  },
  methods: {
    async GetDepartment() {
      try {
        const { data: res } = await GetDepartmentAPI()
        this.comList = res.depts
        this.company = res.depts.shift()
        this.list = fn(res.depts)
      } catch (err) {
        console.error(err)
      }
    },
    setCompany(id, state) {
      this.pid = id
      this.is_company = state
      this.showDialog = true
    },
    Company(state) {
      this.showDialog = false
      if (state) this.GetDepartment()
    },
    // 删除部门事件
    DeleteDepartment(id) {
      this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await DeleteDepartmentAPI(id)
        this.GetDepartment()
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
    closeDialog() {
      this.$refs.depDialog.$refs.form.resetFields()
    }
  }
}
</script>

<style>

</style>
