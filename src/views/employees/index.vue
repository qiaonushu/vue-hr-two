<template>
  <div class="employees-container">
    <div class="app-container">
      <Pagetools>
        <template #left>
          <span>{{ total }}条数据</span>
        </template>
        <template #right>
          <el-button type="warning" size="small">excel导入</el-button>
          <el-button type="danger" size="small">excel导出</el-button>
          <el-button type="primary" size="small">新增员工</el-button>
        </template>
      </Pagetools>
      <el-card style="margin-top: 10px;">
        <el-table border :data="list">
          <el-table-column label="序号" type="index" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="工号" prop="workNumber" />
          <el-table-column ref="a" label="聘用形式" prop="formOfEmployment" />
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry" />
          <el-table-column label="操作" width="280">
            <template slot-scope="scope">
              <el-button type="primary" size="small">查看</el-button>
              <el-button type="success" size="small">分配角色</el-button>
              <el-button type="danger" size="small" @click="del_empl(scope.row.id,$event)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            background
            :current-page.sync="params.page"
            :page-sizes="[3,5,10]"
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
  </div>
</template>

<script>
import { GetSysUserAPI } from '@/api'

export default {
  data() {
    return {
      params: {
        page: 1,
        size: 3
      },
      total: 0,
      list: []
    }
  },
  computed: {
  },
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
      }).then(() => {
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
    }
  }
}
</script>

<style>

</style>
