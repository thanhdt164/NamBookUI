<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm>
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
                <CInput
                  placeholder="accountName"
                  autocomplete="accountName"
                  v-model="accountName"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <!-- <CInput
                  placeholder="Email"
                  autocomplete="email"
                  prepend="@"
                  v-model="email"
                /> -->
                <CInput
                  placeholder="Password"
                  type="password"
                  autocomplete="new-password"
                  v-model="password"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CInput
                  placeholder="Repeat password"
                  type="password"
                  autocomplete="new-password"
                  class="mb-4"
                  v-model="repeatPassword"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CButton color="success" block @click="handleRegister">Create Account</CButton>
              </CForm>
            </CCardBody>
            <CCardFooter class="p-4">
              <!-- <CRow>
                <CCol col="6">
                  <CButton block color="facebook">
                    Facebook
                  </CButton>
                </CCol>
                <CCol col="6">
                  <CButton block color="twitter">
                    Twitter
                  </CButton>
                </CCol>
              </CRow> -->
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
    <DxToast
      :visible="isVisibleToast"
      :message="messageToast"
      :type="typeToast"
      position="bottom left"
    />
  </div>
</template>

<script>
import { DxToast } from 'devextreme-vue/toast';
import authenticateAPI from '@/api/authenticateAPI.js'
import userAPI from '@/api/userAPI.js'
import moment from 'moment'
export default {
  name: 'Register',
  components:{
    DxToast
  },
  data(){
    return{
      accountName: "",
      password: "",
      email: "",
      repeatPassword: "",
      /* Thông báo */
      isVisibleToast: false,
      messageToast: "Thành công",
      typeToast: "success",

      allUser: null,
    }
  },
  created(){
    authenticateAPI.getAll(res => {
      this.allUser = res.map(el => {
        var obj = {
          account_id: el.account_id,
          account_nm: el.account_nm
        }
        return obj
      })
    })
    
  },
  methods: {
    /**
     * Hiển thị thông báo
     */
    showToast(message = "Thành công", type = true) {
        this.isVisibleToast = false;
        setTimeout(() => {
            this.isVisibleToast = true;
        }, 0);
        this.messageToast = message;
        this.typeToast = type? 'success' : 'error';
    },
    handleRegister(){
      var maxId =  this.allUser.reduce((a, b) => {return a.account_id>b.account_id?a.account_id:b.account_id})
      var check = this.validate();
      if(check){
        var md5 = require('md5');
        var param = {
          account_nm: this.accountName,
          password: md5(this.password),
          cart_id: maxId + 1
        }
        authenticateAPI.Insert(param, (res) => {
          if(res){
            var param = {
              user_id : maxId + 1,
              user_nm: '...',
              user_avatar: 'https://play-lh.googleusercontent.com/EGemoI2NTXmTsBVtJqk8jxF9rh8ApRWfsIMQSt2uE4OcpQqbFu7f7NbTK05lx80nuSijCz7sc3a277R67g=w96-h96-n-rw',
              email: 'demo@gmail.com',
              gender: 1,
              phone_number: '',
              address: '',
              account_id: maxId + 1, 
              role_nm: 'User'
            }
            userAPI.Insert(param, (res) => {
              if(res){
                this.showToast();
                localStorage.setItem('acc-name', this.accountName);
                localStorage.setItem('exp-time', new Date(moment().add(300, 'minutes')))
                this.$router.push({ name: 'home'})
              }
            })
          }
        })
      }else{
        this.showToast("Đăng kí không thành công!", false)
      }
    },
    validate(){
      var rs = true;
      if(this.accountName == "" || this.password == "") rs =  false;
      if(this.password != this.repeatPassword){
        rs = false;
      }
      if(this.allUser.findIndex(el => el.account_nm == this.accountName) != -1) rs = false;
      
      return rs;
    }
  },
}
</script>
