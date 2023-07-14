<template>
  <div class="manger">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <!-- 下面是表单内容 -->
      <el-form :rules="rules" :inline="true" ref="form" :model="form" label-width="80px">
        <!-- 姓名区域 -->
        <el-form-item prop="name" label="姓名">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <!-- 年龄 -->
        <el-form-item prop="age" label="年龄">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <!-- 性别 -->
        <el-form-item prop="sex" label="性别">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <!-- 出生日期 -->
        <el-form-item prop="birth" label="出生日期" value-format="yyyy-MM-dd">
          <el-date-picker v-model="form.birth" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <!-- 地址 -->
        <el-form-item prop="addr" label="地址">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manger-header">
      <!-- 新增功能 -->
      <el-button @click="handleAdd" type="primary">+新增</el-button>
      <!-- 下方的列表区域 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sex == 1 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="birth" label="出生日期" value-format="yyyy-MM-dd"></el-table-column>
        <el-table-column prop="addr" label="地址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelet(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser } from "../api";
export default {
  name: "Myuser",
  data () {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: ""
      },
      // 对表单进行验证
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        addr: [{ required: true, message: "请输入地址" }]
      },
      tableData: [],
      // 0代表新增表单 1代表编辑表单
      modelType: 0
    };
  },
  methods: {
    // 点击确定 验证表单 并关闭弹窗
    submit () {
      this.$refs.form.validate(vali => {
        if (vali) {
          if (this.modelType === 0) {
            addUser(this.form).then(() => {
              // 重新获取列表的接口
              this.getList()
            })
          } else {
            editUser(this.form).then(() => {
              // 重新获取列表数据 
              this.getList()
            })
          }

          // 如果验证成功了 就清空表单数据 并且关闭弹窗
          this.$refs.form.resetFields();
          this.dialogVisible = false;
        }
      });
    },
    // 弹窗关闭的时候
    handleClose () {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    cancel () {
      this.handleClose();
    },
    // 点击编辑按钮
    handleEdit (row) {
      this.modelType == 1,
        this.dialogVisible = true,
        this.form = JSON.parse(JSON.stringify(row))
    },
    handleAdd () {
      this.dialogVisible = true,
        this.modelType == 0
    },
    // 点击删除按钮
    handleDelet (row) {
      this.$confirm(row)
    },
    // 获取数据
    getList () {
      getUser().then(({ data }) => {
        console.log(data);
        this.tableData = data.list;
      });
    }
  },
  mounted () {
    this.getList()
  }
};
</script>

<style></style>