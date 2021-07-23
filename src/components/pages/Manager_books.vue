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
            {{Boolean(item._toggled) ? 'Hide' : 'Show'}}
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

                    <p>Pages: {{item.pages}}</p>
                    <p>Languages: {{item.language}}</p>
                    <p>Star: 5</p>
                  </CCol>
                  <CCol col="">
                     <p style="text-align: justify;"><b>Description:</b> {{item.description}}</p>
                  </CCol>
                  <CCol col="2">
                   
                    <p class="text-muted" style="height: 190px"></p>
                    <CButton size="sm" color="info" class="">
                      Book Settings
                    </CButton>
                    <CButton size="sm" color="danger" class="ml-1">
                      Delete
                    </CButton>
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
            <strong>Basic Form</strong> Elements
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CInput
                description="Let us know your full name."
                label="Enter your name"
                horizontal
                autocomplete="name"
              />
              <CInput
                label="Text input"
                description="This is a help text"
                placeholder="Text"
                horizontal
              />
              <CInput
                label="Date"
                type="date"
                horizontal
              />
              <CInput
                label="Email input"
                description="Please enter your email"
                placeholder="Enter your email"
                type="email"
                horizontal
                autocomplete="email"
              />
              <CTextarea
                label="Textarea"
                placeholder="Content..."
                horizontal
                rows="9"
              />
              <CSelect
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
              </CRow>
              
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary"><CIcon name="cil-check-circle"/> Submit</CButton>
            <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban"/> Reset</CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>

  </div>
</template>

<script>
import bookAPI from '@/api/bookAPI.js'

export default {
  name: 'Books',
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
      bookAPI.getAll((res) => {
        me.setItems(res)
        me.setFields(res)
      })
    },
    setItems(res){
      this.items = res.map((item, id) => { return {...item, id}});
    },
    setFields(res){
      let ignoreFields = ["updated_at", "deleted_at", "avatar", "description", "subtitle", "images", "pages", "language"]
      this.fields = []
      Object.keys(res[0]).forEach(it => {
        if(!ignoreFields.includes(it) && it.indexOf('id') == -1){
          this.fields.push({
            key: it,
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
    }
  }
}
</script>
