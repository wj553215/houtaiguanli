<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <!-- 侧边导航区域 -->
        <CommonAside/>
      </el-aside>
      <el-container>
        <el-header>
          <!-- heder区域 -->
          <CommonHeader/>
          </el-header>
          <!--  -->
          <CommonTag/>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTag from '../components/CommonTag.vue'
export default {
  name: "Main",
  components:{CommonAside,CommonHeader,CommonTag},
  data() {
    return {};
  }
};
</script>

<style scoped>
.el-header{
  padding: 0;
}
</style>