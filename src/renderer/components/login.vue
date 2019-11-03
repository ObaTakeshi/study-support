<template>
  <div class="col-10 offset-1 mt-5">
    <h2 class="text-center">Log in</h2>
    <el-form :model="loginForm" :rules="rules" ref="loginForm">
      <el-form-item label="E-mail" prop="email">
        <el-input v-model="loginForm.email"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input v-model="loginForm.password" show-password></el-input>
      </el-form-item>
      <div class="text-center">
        <el-form-item>
          <el-button type="primary" @click="submit_login(loginForm)">Log in</el-button>
        </el-form-item>
      </div>
    </el-form>

    <p>if you don't have your account</p>
    <router-link to="signup" class="text-center">
      <el-button size="mini" type="primary">Signup</el-button>
    </router-link>
  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    data() {
      return {
        interval_id: undefined,
        loginForm: {
          email: '',
          password: ''
        },
        rules: {
          email: [
            { required: true, message: 'Please input E-mail', trigger: 'blur', pattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/ }
          ],
          password: [
            { required: true, message: 'Please input password', trigger: 'blur' },
            { min: 6, max: 30, message: 'Length should be more 6', trigger: 'blur' }
          ]
        }
      }
    },

    methods: {
      push_page: function() {
        if (firebase.auth().currentUser) {
          console.log(firebase.auth().currentUser.uid)
          this.$message('login successed')
          this.$router.push('/main')
          clearInterval(this.interval_id)
        }
      },

      submit_login: function() {
        console.log(this.$refs.loginForm)
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            firebase.auth().signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).catch(
              function(error) {
                console.log(error.code)
                console.log(error.message)
                alert(error.message)
            })
            this.interval_id = setInterval(function() {
              this.push_page()
            }.bind(this), 500);
          } else {
            this.$message.error('error submit')
            console.log('error submit!!')
            return
          }
        });
      }
    }
  }
</script>

<!-- style中身は省略 -->
<style scoped>

</style>
