<template>
  <CDropdown
    :class="['c-header-nav-items',  isHome?'isHome':'']"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img
            :src="userInfoX?userInfoX.user_avatar:'https://lh3.googleusercontent.com/ogw/ADGmqu9HKP2aukmMBAbPzUiv7aM7E9WJ1sXtDvJr7iXm=s32-c-mo'"
            class="img"
          />
        </div>
      </CHeaderNavLink>
    </template>
    <!-- <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Tài khoản</strong>
    </CDropdownHeader>
    <CDropdownItem>
      <CIcon name="cil-bell"/> Thông báo
      <CBadge color="info" class="mfs-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-envelope-open" /> Hộp thoại
      <CBadge color="success" class="mfs-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-comment-square" /> Bình luận
      <CBadge color="warning" class="mfs-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem> -->
    <CDropdownHeader
      tag="div"
      class="text-center"
      color="light"
    >
      <strong>Thiết lập</strong>
    </CDropdownHeader>
    <CDropdownItem v-if="userInfoX&&userInfoX.role_ids.includes('4')" @click="mangermentsClicked">
      <CIcon name="cil-settings"/> Quản trị website
    </CDropdownItem>
    <CDropdownItem @click="profileClicked">
      <CIcon name="cil-user" /> Hồ sơ
    </CDropdownItem>
    <!-- <CDropdownItem>
      <CIcon name="cil-dollar" /> Thanh toán
      <CBadge color="secondary" class="mfs-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem> -->
    <CDropdownDivider/>
    <CDropdownItem @click="homeClicked">
      <CIcon name="cil-laptop" /> Trang chủ
    </CDropdownItem>
    <CDropdownItem @click="logoutClicked">
      <CIcon name="cil-lock-locked" /> Đăng xuất
    </CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  name: 'BDropdownHeader',
  data () {
    return { 
      itemsCount: 12,
      isHome: this.$route.path.includes('DTTBook')?true:false,
      userInfoX: null
    }
  },
  props:{
    userInfo: {
        type: Object,
        default: null
    }
  },
   watch:{
      userInfo: {
          handler(val){
              this.userInfoX = val
          },
          immediate: true
      }
  },
  methods: {
    mangermentsClicked(){
      this.$router.push({ name: 'Dashboard'})
    },
    profileClicked(){
      this.$router.push({ name: 'Profile'})
    },
    logoutClicked(){
      this.$router.push({ name: 'Login'})
    },
    homeClicked(){
      this.$router.push({ name: 'home'})
    }
  },
}
</script>

<style scoped>
  img{
    height: 32px;
    width: 32px;
    border-radius: 50%;
    /* position: relative; */
    /* left: 200px; */
  }
  li{
    list-style-type: none;
  }
  .c-icon {
    margin-right: 0.3rem;
  }
  .isHome{
    left: 175px;
    top: 56px ;
    z-index: 1000;
  }
</style>