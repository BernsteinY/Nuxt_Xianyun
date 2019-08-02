<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" v-model="form.password" type="password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" type="password" v-model="form.checkPassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    // 验证再次输入密码
    // rule当前的规则
    // value  输入框的值
    // callback 回调函数，必须要调用的，不调用就不会验证
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };

    return {
      // 表单数据
      form: {
        username: "", //登录用户名
        password: "", //登录密码
        checkPassword: "", //确认密码
        nickname: "", //昵称
        captcha: "" //手机验证码
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "手机验证码不能为空", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        checkPassword: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      // 判断手机号码是否为空
      if (!this.form.username) {
        this.$message.warning("手机号码不能为空");
        return;
      }

      this.$axios({
        url: "/captchas",
        method: "POST",
        data: {
          tel: this.form.username
        }
      }).then(res => {
        const { code } = res.data;
        console.log(res);

        this.$alert(`模拟手机验证码为：${code}`, "提示", {
          type: "warning"
        });
      });
    },
    // 注册
    handleRegSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // ES6的标准语法，解构出特定的属性后，剩余的属性可以用... +变量名访问
          const { checkPassword, ...props } = this.form;

          // 调用注册的接口
          this.$axios({
            url: "/accounts/register",
            method: "POST",
            data: props
          }).then(res => {
            // console.log(res.data)

            // mutations下的方法都必须使用commit来调用
            // 第一个参数是调用的方法名，第二个参数就是数据
            this.$store.commit("user/setUserInfo", res.data);

            // 跳转到首页
            this.$router.push("/");
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>