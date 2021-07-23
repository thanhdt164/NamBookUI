<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <CInput
                    placeholder="Username"
                    autocomplete="username email"
                    v-model="userName"
                  >
                    <template #prepend-content><CIcon name="cil-user"/></template>
                  </CInput>
                  <CInput
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                    v-model="password"
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="primary" class="px-4" @click="onLogin">Login</CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton color="link" class="px-0">Forgot password?</CButton>
                      <CButton color="link" class="d-lg-none">Register now!</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Sign up</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <CButton
                  color="light"
                  variant="outline"
                  size="lg"
                >
                  Register Now!
                </CButton>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import authenticateAPI from '@/api/authenticateAPI.js'
import moment from 'moment'
export default {
  name: 'Login',
  data(){
    return {
      userName: "",
      password: ""
    }
  },
  methods: {
    /**
     * Hàm login
     * Created by: thanhdt 19.05.2021
     */
    onLogin(){
      var md5 = require('md5');
      if(this.userName != "" && this.password != ""){
        let passwordMd5 = md5(this.password);
        authenticateAPI.authenticate((res) => {
          if(res && res.count > 0){
            localStorage.setItem('acc-name', this.userName);
            localStorage.setItem('exp-time', new Date(moment().add(300, 'minutes')))
            this.$router.push({ name: 'home'})
          }
        }, this.userName, passwordMd5)
        
        
      }
    }
  },
}
</script>
