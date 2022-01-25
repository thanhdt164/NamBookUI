<template>
  <div>
  <CCard> 
   <CCardBody>
    <CDataTable
      :items="items"
      :fields="fields"
      column-filter
      table-filter
      items-per-page-select
      :items-per-page="10"
      hover 
      sorter
      pagination
    >
      <template #role_nm="{item}" >
        <td>
          <CBadge :color="item.role_nm?getBadge(item.role_nm):'primary'">
            {{item.role_nm=="Manager"?'Quản trị viên':'Người dùng'}}
          </CBadge>
        </td>
      </template>
      <template #show_details="{item, index}">
        <td class="py-2">
          <CButton
            color="primary"
            variant="outline"
            square
            size="sm"
            @click="toggleDetails(item, index)"
          >
            {{Boolean(item._toggled) ? 'Ẩn' : 'Hiện'}}
          </CButton>
        </td>
      </template>
      <template #details="{item}">
        <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
          <CCardBody>
            <CMedia :aside-image-props="{ height: 0 }">
              <CRow>
                  <CCol col="1.7">
                    <img :src="item.user_avatar" style="height:150px" alt="">
                  </CCol>
                  <CCol col="3">
                    <h4>
                      {{item.user_nm}}
                    </h4>

                    <p>Giới tính: {{item.gender}}</p>
                    <p>Địa chỉ: {{item.address}}</p>
                    <p>Email: {{item.email}}</p>
                  </CCol>
                  <CCol col="">
                     <!-- <p style="text-align: justify;"><b>Description:</b> {{item.description}}</p> -->
                  </CCol>
                  <CCol col="2">
                    <p class="text-muted" style="height: 30%"></p>
                    <!-- <CButton size="sm" color="info" class="" @click="handleEditUser(item)">
                      Sửa thông tin
                    </CButton> -->
                    <!-- <CButton size="sm" color="danger" class="ml-1">
                      Delete
                    </CButton> -->
                  </CCol>
              </CRow>
            </CMedia>
          </CCardBody>
        </CCollapse>
      </template>
    </CDataTable>
  </CCardBody>
  </CCard>

  <!-- <CRow>
      <CCol md="12">
        <CCard>
          <CCardHeader>
            <strong>Thông tin người dùng</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CInput
                label="Tên người dùng"
                horizontal
                v-model="itemBook.user_nm"
              />
              <CInput
                label="Địa chỉ"
                horizontal
                v-model="itemBook.address"
              />
              <CInput
                label="Email"
                horizontal
                v-model="itemBook.email"
              />
              <CRow form class="form-group">
                  <CCol tag="label" sm="3" class="col-form-label">
                  Giới tính
                  </CCol>
                  <CCol>
                      <CInputCheckbox
                          :label="itemBook.gender?'Nam':'Nam'"
                          horizontal
                          :checked="itemBook.gender"
                          @update:checked="changeGender"
                      />
                  </CCol>
              </CRow>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary"><CIcon name="cil-check-circle"/> Xác nhận</CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow> -->

  </div>
</template>

<script>
import userAPI from '@/api/userAPI.js'

export default {
  name: 'Users',
  components:{
  },
  data () {
    return {
      items : [],
      options : [1, 2, 3],
      collapseDuration: 0,
      details: [],
      fields: [
        { key: 'username', _style:'min-width:200px' },
        'registered',
        { key: 'role', _style:'min-width:100px;' },
        { key: 'status', _style:'min-width:100px;' },
        { 
          key: 'show_details', 
          label: '', 
          _style: 'width:1%', 
          sorter: false, 
          filter: false
        }
      ],
      itemBook: {},
      mode: 'Add',

    }
  },
  created(){
    let itemsX = [
      { username: 'Samppa Nori', registered: '2012/01/01', role: 'Member', status: 'Active'},
      { username: 'Estavan Lykos', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
      { username: 'Chetan Mohamed', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
      { username: 'Derick Maximinus', registered: '2012/03/01', role: 'Member', status: 'Pending'},
      { username: 'Friderik Dávid', registered: '2012/01/21', role: 'Staff', status: 'Active'},
      { username: 'Yiorgos Avraamu', registered: '2012/01/01', role: 'Member', status: 'Active'},
      { username: 'Avram Tarasios', registered: '2012/02/01', role: 'Staff', status: 'Banned', _classes: 'table-success'},
      { username: 'Quintin Ed', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
      { username: 'Enéas Kwadwo', registered: '2012/03/01', role: 'Member', status: 'Pending'},
      { username: 'Agapetus Tadeáš', registered: '2012/01/21', role: 'Staff', status: 'Active'},
      { username: 'Carwyn Fachtna', registered: '2012/01/01', role: 'Member', status: 'Active', _classes: 'table-info'},
      { username: 'Nehemiah Tatius', registered: '2012/02/01', role: 'Staff', status: 'Banned'}];
    this.items= itemsX.map((item, id) => { return {...item, id}});
    this.getDataBooks();

  },
  methods: {
    getDataBooks(){
      var me = this;
      userAPI.getAll((res) => {
        me.setItems(res)
        me.setFields(res)
      })
    },
    setItems(res){
        res.forEach(el => el.gender = el.gender == 1?"Nam":"Nữ")
        this.items = res.map((item, id) => { 
        Object.keys(item).forEach(key => {
          if(key == "created_at" || key.indexOf('date') != -1){
            item[key] = this.formatDate(item[key], 4);
          }
          if(item[key] == null) item[key] = "";
          if(key.includes('price')){
            item[key] = this.formatCurrency(item[key])
          }
        })
        return {...item, id}
      });
    },
    setFields(res){
      let ignoreFields = ["updated_at", "deleted_at", "avatar", "description", "subtitle", "images", "pages", "language"]
      let keyvalue = {
        user_nm: "Tên người dùng",
        email: "Email",
        gender: "Giới tính",
        phone_number: "Số điện thoại",
        address: "Địa chỉ",
        role_nm: "Chức vụ",
        created_at: "Ngày tạo"
      }
      this.fields = []
      Object.keys(res[0]).forEach(it => {
        if(!ignoreFields.includes(it) && it.indexOf('id') == -1 && it.indexOf('avatar') == -1){
          this.fields.push({
            key: it,
            label: keyvalue[it]?keyvalue[it]:it,
            _style:'min-width:100px;'
          })
        }
      })
      this.fields.push({ 
          key: 'show_details', 
          label: '', 
          _style: 'width:1%', 
          sorter: false, 
          filter: false
        })
    },


    handleEditUser(item){
      this.itemBook = {...item}
      Object.keys(this.itemBook).forEach(key => {
        if(key.indexOf('date') != -1){
          this.itemBook[key] = this.formatDate(this.itemBook[key], 4)
        }
        if(key == "sale_expired" && this.itemBook[key]){
          this.itemBook[key] = this.formatDate(this.itemBook[key], 4)
        }
      })
      this.authorSelected = this.itemBook.author_id;
      this.publisherSelected = this.itemBook.publisher_id;
      this.genresSelected = this.itemBook.role_ids.split(";");
      this.mode = 'Edit';
    },
    changeGender(val){
      this.itemBook.gender = val?1:0;
    },
    // handleSaveUser(){
    //   var data = {...this.itemBook};
    //   data.pages = parseInt(data.pages);
    //   data.price = parseFloat(data.price);
    //   data.sale = parseFloat(data.sale);
    //   data.sale_money = parseFloat(data.sale_money);
    //   // data.publishing_date = new Date(data.publishing_date);
    //   // data.sale_expired = new Date(data.sale_expired);
    //   console.log(data)
    //   if(this.genresSelected){
    //     data.genres_ids = this.genresSelected.join(";");
    //   }
    //   if(this.authorSelected){
    //     data.author_id = this.authorSelected
    //   }
    //   if(this.publisherSelected){
    //     data.publisher_id = this.publisherSelected;
    //   }
    //   if(this.mode == 'Add'){
    //     var maxBookId = Math.max(...this.dataSource.map(el => el.book_id));
    //     data.book_id = maxBookId + 1;
    //     data.comment_id = maxBookId + 1;
    //     // data.author_nm = this.authorData.filter(el => el.author_id == this.authorSelected)[0].author_nm;
    //     // data.publisher_nm = this.publisherData.filter(el => el.publisher_id == this.publisherSelected)[0].publisher_nm;
        
    //     userAPI.Insert(data, (res) => {
    //        // Thanh toán thành công
    //         this.showToast(res?"Thành công":"Thất bại", res?true:true)
    //     })
    //   }else{
        
    //     userAPI.Update(data, (res) => {
    //        // Thanh toán thành công
    //        this.showToast(res?"Thành công":"Thất bại", res?true:true)
    //     })
    //   }
    // },

    getBadge (status) {
      switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        /* Role */
        
        case 'Manager': return 'success'
        case 'User': return 'secondary'
        case 'Staff': return 'warning'
        case 'Team Lead': return 'danger'
        default: 'primary'
      }
    },  
    toggleDetails (item) {
      this.$set(this.items[item.id], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => { this.collapseDuration = 0})
    },
    shuffleArray (array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array
    },
    validator (val) {
      return val ? val.length >= 4 : false
    },
    /**
     * Hàm format dữ liệu dạng ngày tháng
     * Created by: thanhdt - 12.05.2021
     */
    formatDate(date, type){
        date = new Date(date)
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
        let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        if(month<10){
          month = '0' + month;
        }
        if (type == 1) {
            return `${mo} ${ye}`
        }
        if (type == 2) {
            return `${mo} ${da}, ${ye}`
        }
        if(type == 3){
            return `${mo} ${da} ${ye}`
        }
        if(type == 4){
          return `${year}-${month}-${da}`
        }
    },
       /**
     * Hàm format tiền tệ
     */
    formatCurrency(val){
        return Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(val)
    },
  }
}
</script>
