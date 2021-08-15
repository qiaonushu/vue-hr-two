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
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="list">
              <el-table-column label="序号" width="120" type="index" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column
                label="描述"
                prop="description"
              />
              <el-table-column
                label="
                操作"
              >
                <template>
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary">编辑</el-button>
                  <el-button size="small" type="danger">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination layout="prev,pager,next" />
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <el-pagination
          background
          hide-on-single-page
          :page-size.sync="params.pagesize"
          layout="prev, pager, next"
          :total="total"
          @current-change="GetSysRole"
          @prev-click="pageChange(true)"
          @next-click="pageChange(false)"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import { GetSysRoleAPI } from '@/api'

export default {
  data() {
    return {
      list: [],
      total: 0,
      params: {
        pagesize: 2,
        page: 1
      }
    }
  },
  created() {
    this.GetSysRole()
  },
  methods: {
    async GetSysRole() {
      try {
        const { data: res } = await GetSysRoleAPI(this.params)
        this.total = res.total
        this.list = res.rows
      } catch (err) {
        console.error(err)
      }
    },
    pageChange(state) {
      if (state) {
        this.params.page--
      } else {
        this.params.page++
      }
    }
  }
}
</script>

<style>

</style>
