<template>
  <header class="header">
    <div class="main">
      <el-row type="flex" justify="space_between">
        <el-row class="logo">
          <nuxt-link to="/">
            <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
          </nuxt-link>
        </el-row>

        <el-row class="nav" type="flex">
          <nuxt-link to="/">首页</nuxt-link>
          <nuxt-link to="/post">旅游攻略</nuxt-link>
          <nuxt-link to="/hotel">酒店</nuxt-link>
          <nuxt-link to="/air">国内机票</nuxt-link>
        </el-row>

        <!-- 登录 注册 -->
        <div v-if="!$store.state.user.userInfo.token">
          <nuxt-link to="/user/login">登录注册</nuxt-link>
        </div>
        <!-- 登录之后 -->
        <div v-else>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
              {{$store.state.user.userInfo.user.nickname}}
              <i
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </span>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-row>
    </div>
  </header>
</template>



<script>
export default {
  methods: {
    // 用户退出
    handleLogout() {
      this.$store.commit("user/clearUserInfo");
    }
  }
};
</script>


<style lang="less" scoped>
.header {
  height: 60px;
  line-height: 60px;
  border: 1px solid #ccc;
  box-shadow: 0 3px 3px #eee;
}

.main {
  width: 1000px;
  margin: 0 auto;
}

.logo {
  margin-top: 9px;
  img {
    width: 156px;
    height: 42px;
    display: block;
  }
}

.nav {
  flex: 1;
  margin-left: 20px;
  a {
    height: 60px;
    line-height: 60px;
    display: block;
    padding: 0 20px;
    box-sizing: border-box;
    &:hover {
      border-bottom: 3px solid #409eff;
      color: #409eff;
    }
  }
  .nuxt-link-exact-active {
    background: #409eff;
    color: #fff;
    &:hover {
      color: #fff;
    }
  }
}

.el-dropdown-link {
  font-size: 14px;
  color: black;
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 5px;
  }
}
</style>

