<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button size="small">添加权限</el-button>
        </div>
        <el-table>
          <el-table-column label="名称" />
          <el-table-column label="标识" />
          <el-table-column label="描述" />
          <el-table-column label="操作">
            <template>
              <!-- 如果type==1(页面级别的)，才显示添加，如果type=2就没有添加按钮 -->
              <el-button type="text">添加</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- 添加权限-对话框 -->
    <el-dialog title="添加权限">
      <el-form ref="form" label-width="100px">
        <el-form-item label="权限名称">
          <el-input />
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input />
        </el-form-item>
        <el-form-item label="权限启用">
          <el-switch />
        </el-form-item>
        <el-form-item>
          <el-button>取消</el-button>
          <el-button>确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
}
</script>
