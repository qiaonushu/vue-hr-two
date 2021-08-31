<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button type="primary" size="small" @click="addPms(1,'0')">添加权限</el-button>
        </div>
        <el-table border :data="list" row-key="id">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.type===1" type="text" @click="addPms(2,scope.row.id)">添加</el-button>
              <el-button type="text" @click="setPms(scope.row.id)">编辑</el-button>
              <el-button type="text" @click="delPms(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- 添加权限-对话框 -->
    <el-dialog
      :title="isEdit?'编辑权限':'添加权限'"
      :visible.sync="dialogVisible"
      @close="clear"
    >
      <el-form ref="form" label-width="100px" :model="form" :rules="rules">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="form.code" />
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item label="权限启用">
          <el-switch
            v-model="form.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible=false">取消</el-button>
          <el-button @click="determine">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { GetSysPermissionAPI, DeletePermissionAPI, PostSysPermissionAPI, GetPermissionAPI, PutPermissionAPI } from '@/api'
import { fn } from '@/utils/tree'

export default {
  data() {
    const validate_name = (rule, value, callback) => {
      const comListname = this.comList.filter(item => item.pid === this.form.pid).some(item => item.name === value)
      comListname ? callback(new Error('权限名称重复')) : callback()
    }
    const validate_code = (rule, value, callback) => {
      const comListcode = this.comList.filter(item => item.pid === this.form.pid).some(item => item.code === value)
      comListcode ? callback(new Error('权限标识重复')) : callback()
    }
    return {
      list: [],
      comList: [],
      dialogVisible: false,
      form: {
        enVisible: 0,
        name: '',
        code: '',
        description: ''
      },
      isEdit: false,
      rules: {
        name: [
          { required: true, trigger: 'blur', message: '请输入权限名称' },
          { min: 1, max: 10, trigger: 'blur', message: '权限名称为1~10个字符' },
          { validator: validate_name, trigger: 'blur' }
        ],
        code: [
          { required: true, trigger: 'blur', message: '请输入权限标识' },
          { validator: validate_code, trigger: 'blur' }
        ],
        description: [
          { required: true, trigger: 'blur', message: '请输入权限介绍' },
          { min: 1, max: 50, trigger: 'blur', message: '权限介绍为1~50个字符' }
        ]
      }
    }
  },
  created() {
    this.getSysPermission()
  },
  methods: {
    // 获取全部权限接口
    async getSysPermission() {
      const { data: res } = await GetSysPermissionAPI()
      const arr = res.map(item => {
        item.name = item.name.trim()
        return item
      })
      this.comList = [...arr]
      this.list = fn(arr)
    },
    // 添加权限接口
    async postSysPermission() {
      await PostSysPermissionAPI(this.form)
    },
    // 获取权限点详情接口
    async getPermission(id) {
      const { data: res } = await GetPermissionAPI(id)
      this.form = res
    },
    // 更新权限点详情接口
    async putPermission() {
      await PutPermissionAPI(this.form)
    },
    // 添加权限
    addPms(type, pid) {
      this.dialogVisible = true
      this.isEdit = false
      this.form.type = type
      this.form.pid = pid
    },
    // 编辑权限
    setPms(rid) {
      this.dialogVisible = true
      this.isEdit = true
      this.getPermission(rid)
    },
    // 删除权限
    delPms(id) {
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 删除权限接口
        await DeletePermissionAPI(id)
        this.getSysPermission()
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
    // 点击确定
    determine() {
      this.$refs.form.validate(value => {
        if (value) {
          this.isEdit ? this.putPermission() : this.postSysPermission()
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: this.isEdit ? '编辑成功' : '添加成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '请按要求填写'
          })
        }
      })
    },
    // 清除表单内容
    clear() {
      setTimeout(() => {
        this.$refs.form.resetFields()
        this.form = {
          enVisible: 0,
          name: '',
          code: '',
          description: ''
        }
      })
      this.getSysPermission()
    }
  }
}
</script>
