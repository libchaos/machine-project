<template>
  <div>
    <v-dialog :value="isLogin" persistent="">
      <v-card hover="" style="backgroud:white">
        <v-card-row class="deep-purple darken-1">
          <v-card-title class="white--text">
            <div class="text-xs-center">
              登陆
            </div>
          </v-card-title>
        </v-card-row>
        <v-card-row>
          <v-card-text class="pt-4">
            <v-form v-model="valid" ref="form">
              
              <v-text-field label="邮箱" v-model="email" :rules="emailRules" required></v-text-field>
              <v-text-field label="密码" v-model="password" :rules="passwordRules" required type="password"></v-text-field>

              <v-btn @click="onSuccess" :class="{ green: valid, red: !valid }">submit</v-btn>
              <v-btn @click="clear">clear</v-btn>
            </v-form>
          </v-card-text>
        </v-card-row>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        isLogin: true,
        valid: false,
        email: '',
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        password: '',
        passwordRules: [
          (v) => !!v || 'password is required',
          (v) => v && v.length >= 6 || 'password length must be larger than 6 characters'
        ],
        show: true
      }
    },
    methods: {
      onSuccess() {
        this.isLogin = false
        this.$router.push('/')
      }
    }
  }
</script>


<style>
  body {
    background: #666 !important;
  }
</style>