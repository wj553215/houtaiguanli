<template>
  <div class="header-container">
    <!-- 头部左边区域 -->
    <div class="l-content">
      <el-button @click="handeerMenu" icon="el-icon-menu" size="mini"></el-button>
      <!-- 面包屑区域 -->
      <span class="text">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item  v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
        </el-breadcrumb>
      </span>
    </div>
    <!-- 头部右边头像区域 -->
    <div class="r-content">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img class="user" src="../assets/imges/1.jpg" alt="头像照片" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="delet">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from "js-cookie";
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    handeerMenu() {
      this.$store.commit("collapseMenu");
    },
     handleClick(command) {
        if(command === 'delet'){
          Cookie.remove('token')
          // 跳转到登录页面
          this.$router.push('/login')
           this.$message({
                message: "退出登录",
                type: "success"
              });
        }
      }
  }, 
  computed:{
    ...mapState({
      tags: state => state.tab.tabsList
    })
  }
};
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }
  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .l-content {
    display: flex;
    align-items:center;
    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: normal;
        &.is-link {
          color: #666;
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
        }
      }
    }
  }
}
</style>