<template>
  <div class="col-10 offset-1 mt-5">
    <h1 class="text-center">Sign up</h1>
    <el-form :model="signupForm" :rules="rules" ref="signupForm">
      <el-form-item label="E-mail" prop="email">
        <el-input v-model="signupForm.email"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input v-model="signupForm.password" show-password></el-input>
      </el-form-item>
      <div class="text-center">
        <el-form-item>
          <el-button type="primary" @click="submit_signup(signupForm)">Sign up</el-button>
        </el-form-item>
      </div>
    </el-form>

    <router-link to="/login" class="text-center">
      <el-button size="mini" type="primary">back</el-button>
    </router-link>
  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    data() {
      return {
        interval_id: undefined,
        signupForm: {
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
          this.$message('sign up successed')
          this.$router.push('/main')
          clearInterval(this.interval_id)
        }
      },

      submit_signup: function() {
        console.log(this.$refs.signupForm)
        this.$refs.signupForm.validate((valid) => {
          if (valid) {
            firebase.auth().createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).catch(
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