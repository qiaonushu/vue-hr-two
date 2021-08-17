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
                @click.native=" dialogVisible=true"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="list">
              <el-table-column label="序号" width="120" type="index" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label=" 操作">
                <template slot-scope="scope">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary">编辑</el-button>
                  <el-button size="small" type="danger" @click.native="DeleteSysRole(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination
                background
                hide-on-single-page
                :page-size.sync="params.pagesize"
                layout="prev, pager, next"
                :total="total"
                @current-change="pageChange($event,0)"
                @prev-click="pageChange($event,1)"
                @next-click="pageChange($event,2)"
              />
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="角色名称">
          <el-input v-model="form.name" prop="name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="form.region" prop="region" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { GetSysRoleAPI, DeleteSysRoleAPI } from '@/api'

export default {
  data() {
    return {
      list: [],
      total: 0,
      params: {
        pagesize: 2,
        page: 1
      },
      dialogVisible: false,
      form: {
        name: '',
        region: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      }

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
      try {
        await DeleteSysRoleAPI(id)
        this.$message('删除成功')
        this.GetSysRole()
      } catch (err) {
        console.error(err)
        this.$message('删除失败')
      }
    },
    // 点击页码重新发送请求
    pageChange(e, state) {
      this.params.page = e
      if (state === 0) {
        this.GetSysRole()
      } else if (state === 1) {
        this.GetSysRole()
      } else if (state === 2) {
        this.GetSysRole()
      }
    }
  }
}
</script>

<style>

</style>
