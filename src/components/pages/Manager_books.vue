<template>
  <div>
  <CCard> 
   <CCardBody>
     <DxToast
      :visible="isVisibleToast"
      :message="messageToast"
      :type="typeToast"
      position="bottom left"
    />
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
      <template #status="{item}" >
        <td>
          <CBadge :color="getBadge(item.status)">
            {{item.status}}
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
                    <img :src="item.avatar" alt="">
                  </CCol>
                  <CCol col="3">
                    <h4>
                      {{item.book_nm}}
                    </h4>

                    <p>Số trang: <b>{{item.pages}}</b></p>
                    <p>Ngôn ngữ: <b>{{item.language}}</b></p>
                    <p>Điểm đánh giá: <b>5</b></p>
                  </CCol>
                  <CCol col="">
                     <p style="text-align: justify;"><b>Mô tả:</b> {{item.description}}</p>
                  </CCol>
                  <CCol col="2">
                   
                    <p class="text-muted" style="height: 190px"></p>
                    <CButton size="sm" color="info" class="" @click="hanldeEditBook(item)">
                      Sửa thông tin
                    </CButton>
                    <!-- <CButton size="sm" color="danger" class="ml-1" @click="handleDeleteBook(item)">
                      Xóa
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

  <CRow>
      <CCol md="12">
        <CCard>
          <CCardHeader>
            <CRow>
              <strong style="width: 1232px; line-height: 47px; padding-left: 12px">Thông tin sách</strong>
              <CCol tag="label" size="sm" class="col-form-label">
                <CButton type="submit" size="sm" color="primary" @click="handleReset"><CIcon name="cil-check-circle"/> Thêm mới</CButton>
              </CCol>
              <!-- <CCol tag="label" size="sm" class="col-form-label">
                <CButton type="submit" size="sm" color="primary"><CIcon name="cil-check-circle"/> Chỉnh sửa</CButton>
              </CCol> -->
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CInput
                label="Tên sách"
                horizontal
                v-model="itemBook.book_nm"
              />
              <CInput
                label="Hình ảnh sách"
                horizontal
                v-model="itemBook.avatar"
              />
              <CTextarea
                label="Mô tả"
                placeholder="Mô tả..."
                horizontal
                rows="9"
                v-model="itemBook.description"
              />
              <CInput
                label="Số trang"
                horizontal
                v-model="itemBook.pages"
                type="number"
              />
              <CInput
                label="Ngôn ngữ"
                horizontal
                v-model="itemBook.language"
              />
              <CInput
                label="Giá sách"
                horizontal
                v-model="itemBook.price"
                type="number"
              />
              <CInput
                label="Giảm giá (%)"
                horizontal
                type="number"
                v-model="itemBook.sale"
              />
              <CInput
                label="Hạn giảm giá (%)"
                type="date"
                horizontal
                v-model="itemBook.sale_expired"
              />
              <CInput
                label="Giảm giá (Vnđ)"
                horizontal
                type="number"
                v-model="itemBook.sale_money"
              />
              <!-- <CInput
                label="Lượt xem"
                horizontal
                v-model="itemBook.view"
              />
              <CInput
                label="Lượt bán"
                horizontal
                v-model="itemBook.sales"
              /> -->
              <CInput
                label="ISBN"
                horizontal
                v-model="itemBook.isbn"
              />
              <CInput
                label="Ngày xuất bản"
                horizontal
                type="date"
                v-model="itemBook.publishing_date"
              />
              <CInput
                label="Bảo vệ nội dung"
                horizontal
                v-model="itemBook.content_protection"
              />
              <CRow form class="form-group">
                <CCol tag="label" sm="3" class="col-form-label">
                  Thể loại
                </CCol>
                <div class="scroll">
                  <CCol v-for="(genres, id) in genresData" :key="id">
                    <CInputCheckbox
                      :label="genres.genres_nm"
                      :checked="genresSelected.includes(''+genres.genres_id)"
                      
                      
                      @update:checked="updateChecked(genres.genres_id)"
                    />
                  </CCol>
                </div>
              </CRow>
              <CSelect
                label="Tác giả"
                horizontal
                :options="authorData.map(el => {return {
                  value: el.author_id,
                  label: el.author_nm
                }})"
                v-model="authorSelected"
                placeholder="Chọn tác giả"
                @update:value="changeAuthor"
              />
               <CSelect
                label="Nhà xuất bản"
                horizontal
                :options="publisherData.map(el => {return {
                  value: el.publisher_id,
                  label: el.publisher_nm
                }})"
                v-model="publisherSelected"
                placeholder="Chọn nhà xuất bản"
                @update:value="changePublisher"
              />
             <!--  <CSelect
                label="Select"
                horizontal
                :options="options"
                placeholder="Please select"
              />

              <CRow form class="form-group">
                <CCol tag="label" sm="3" class="col-form-label">
                  Label
                </CCol>
                <CCol sm="9">
                  <CInputCheckbox
                    key="option"
                    label="option"
                    value="option"
                    name="option"
                    :checked="true"
                    :inline="true"
                  />
                </CCol>
              </CRow> -->
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary" @click="handleSaveBook"><CIcon name="cil-check-circle"/> Xác nhận</CButton>
            <!-- <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban"/> Reset</CButton> -->
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import bookAPI from '@/api/bookAPI.js'
import authorAPI from '@/api/authorAPI.js'
import publisherAPI from '@/api/publisherAPI.js'
import genresAPI from '@/api/genresAPI.js'
import { DxToast } from 'devextreme-vue/toast';

export default {
  name: 'Books',
  components:{
    DxToast
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
      dataSource: null,
      itemBook: {},
      authorData: null, 
      authorSelected: null,
      publisherData: null,
      publisherSelected: null,
      genresData: null,
      genresSelected: [],
      mode: 'Add',
      /* Thông báo */
      isVisibleToast: false,
      messageToast: "Thành công",
      typeToast: "success",
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

    authorAPI.getAll(res => {
      this.authorData = res;
    });
    publisherAPI.getAll(res => {
      this.publisherData = res;
    });
    genresAPI.getAll(res => {
      this.genresData = res;
    });
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
    getDataBooks(){
      var me = this;
      bookAPI.getAll((res) => {
        me.setItems(res)
        me.setFields(res)
        me.dataSource = res
      })
    },
    setItems(res){
      var resX = JSON.parse(JSON.stringify(res))
      this.items = resX.map((item, id) => { 
        Object.keys(item).forEach(key => {
          if(key == "created_at" || key.indexOf('date') != -1 || key == 'sale_expired'){
            item[key] = this.formatDate(item[key], 4);
          }
          if(item[key] == null) item[key] = "";
          // if(key.includes('price') || key.includes('money')){
          //   item[key] = this.formatCurrency(item[key])
          // }
        })
        return {...item, id}
      });
      // console.log(this.items)
    },
    setFields(res){
      let ignoreFields = ["updated_at", "deleted_at", "avatar", "description", "subtitle", "images", "pages", "language"]
      let keyvalue = {
        author_nm: "Tên tác giả",
        book_nm: "Tên Sách",
        content_protection: "Bảo vệ nội dung",
        isbn: "ISBN",
        language: "Ngôn ngữ",
        pages: "Số trang",
        price: "Giá",
        publisher_nm: "Nhà xuất bản",
        publishing_date: "Ngày xuất bản",
        sale: "Giảm giá(%)",
        sale_expired: "Hạn giảm giá (%)",
        sale_money: "Giảm giá(Vnđ)",
        sales: "Lượt bán",
        subtitle: "",
        view: "Lượt xem",
        created_at: "Ngày tạo" 
      }
      this.fields = []
      Object.keys(res[0]).forEach(it => {
        if(!ignoreFields.includes(it) && it.indexOf('id') == -1){
          this.fields.push({
            key: it,
            label: keyvalue[it]?keyvalue[it]:it,
            _style:'min-width:auto;'
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
    hanldeEditBook(item){
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
      this.genresSelected = this.itemBook.genres_ids.split(";");
      this.mode = 'Edit';
    },
    handleReset(){
      this.itemBook = {}
      this.genresSelected = [];
      this.authorSelected = null;
      this.publisherSelected = null;
      this.mode = 'Add';

    },
    updateChecked(genres_id){
      if(!this.genresSelected.includes(''+genres_id)){
        this.genresSelected.push(''+genres_id);
      }else{
        var ind = this.genresSelected.indexOf(''+genres_id);
        this.genresSelected.splice(ind, 1)
      }
    },
    changeAuthor(val){
      this.authorSelected = val;
    },
    changePublisher(val){
      this.publisherSelected = val;
    },

    handleSaveBook(){
      var data = {...this.itemBook};
      data.pages = parseInt(data.pages);
      data.price = parseFloat(data.price);
      data.sale = parseFloat(data.sale);
      data.sale_money = parseFloat(data.sale_money);
      // data.publishing_date = new Date(data.publishing_date);
      // data.sale_expired = new Date(data.sale_expired);
      console.log(data)
      if(this.genresSelected){
        data.genres_ids = this.genresSelected.join(";");
      }
      if(this.authorSelected){
        data.author_id = this.authorSelected
      }
      if(this.publisherSelected){
        data.publisher_id = this.publisherSelected;
      }
      if(this.mode == 'Add'){
        var maxBookId = Math.max(...this.dataSource.map(el => el.book_id));
        data.book_id = maxBookId + 1;
        data.comment_id = maxBookId + 1;
        // data.author_nm = this.authorData.filter(el => el.author_id == this.authorSelected)[0].author_nm;
        // data.publisher_nm = this.publisherData.filter(el => el.publisher_id == this.publisherSelected)[0].publisher_nm;
        
        bookAPI.Insert(data, (res) => {
           // Thanh toán thành công
            this.showToast(res?"Thành công":"Thất bại", res?true:true)
        })
      }else{
        
        bookAPI.Update(data, (res) => {
           // Thanh toán thành công
           this.showToast(res?"Thành công":"Thất bại", res?true:true)
        })
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
    getBadge (status) {
      switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
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
      if(!date) return;
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
  }
}
</script>
<style scoped lang="scss">
.scroll{
  max-height: 100px;
  overflow-y: auto;
  width: 74.7%;
}
</style>