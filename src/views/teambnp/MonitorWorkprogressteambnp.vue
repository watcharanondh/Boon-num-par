<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-col>
      <v-row>
        <v-card flat color="#E5E5E5">
          <div class="header-title">
            ความคืบหน้างาน
          </div>
        </v-card>
      </v-row>
    </v-col>
    <v-col>
      <v-row> </v-row>
    </v-col>
    <v-row justify="end">
      <v-btn
        class="mx-13"
        color="#C4C4C4"
        @click="$router.push({ name: 'menuJobWorkprogressteambnp' })"
        rounded>
        <span class="white--text">ย้อนกลับ</span></v-btn>
    </v-row>
    <v-col>
      <v-row> </v-row>
    </v-col>
    <v-row>
      <v-col lg="12" md="12" sm="12" cols="12">
        <v-card class="mx-10 pa-5 rounded-lg" outlined>
          <v-row justify="center">
            <v-col lg="12" md="12" sm="12" cols="12">
              <v-row>
                <v-col>
                  <div class="create-edit-title">
                    รายละเอียดพื้นที่
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col lg="4" md="4" sm="12" cols="12">
                  <!-- รหัสทีม -->
                  <div>รหัสทีม</div>
                  <v-row class="no-gutters">
                    <v-text-field
                      v-model="team_code"
                      disabled
                    ></v-text-field>
                  </v-row>
                </v-col>
                <!-- ชื่อใบกำกับภาษี -->
                <v-col lg="4" md="4" sm="12" cols="12">
                  <div>ชื่อใบกำกับภาษี</div>
                  <v-row class="no-gutters">
                    <v-text-field
                      v-model="Tax_invoice_name"
                      disabled
                    ></v-text-field>
                  </v-row>
                </v-col>
                <!-- สถานที่จัดงาน -->
                <v-col lg="4" md="4" sm="12" cols="12">
                  <div>สถานที่จัดงาน</div>
                  <v-row class="no-gutters">
                    <v-text-field
                      v-model="Event_venue"
                      disabled
                    ></v-text-field>
                  </v-row>
                </v-col>
                <!-- นัดดูสถานที่ -->
                <v-col lg="4" md="4" sm="12" cols="12">
                  <div>นัดดูสถานที่</div>
                  <v-row class="no-gutters">
                    <v-text-field
                      v-model="look_location"
                      disabled
                    ></v-text-field>
                  </v-row>
                </v-col>
            </v-row>
              <v-row>
              <v-col>
                <div class="create-edit-title">
                  ข้อมูลทีม
                </div>
              </v-col>
              </v-row>
              <v-row>
              <!-- ทีมดูสถานที่ -->
              <v-col lg="4" md="4" sm="12" cols="12">
                <div>ทีมดูสถานที่</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Venue_view_team"
                    disabled
                  ></v-text-field>
                </v-row>
              </v-col>
              <!-- ทีมจัดสถานที่ -->
              <v-col lg="4" md="4" sm="12" cols="12">
                <div>ทีมจัดสถานที่</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Venue_team"
                    disabled
                  ></v-text-field>
                </v-row>
              </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-card flat color="#E5E5E5">
      <div class="mx-6 pa-5 header-title">
        กิจกรรม
      </div>
    </v-card>

      <v-row class="mx-4 pa-5">
        <v-btn @click="before()"  :color="active1 ? '#606771' : undefined" class="ma-2" rounded><span>ตรวจเช็คของ-นำไป</span></v-btn>
        <v-btn  @click="between()" :color="active2 ? '#606771' : undefined" class="ma-2" rounded><span>ตรวจเช็ควันจัดสถานที่</span></v-btn>
        <v-btn @click="after()" :color="active3 ? '#606771' : undefined" class="ma-2" rounded><span>ตรวจเช็คของ-นำกลับ</span></v-btn>
      </v-row>
  
      <!-- beforeTab1 -->
      <div v-if="tab==1">
      <v-row>
        <v-col lg="12" md="12" sm="12" cols="12">
          <!-- รายการที่ต้องตรวจสอบ -->
          <v-card class="mx-10 pa-5 rounded-lg" outlined>
              <v-data-table
                :headers="headers_table_Monitorworkprogressteambnp_before"
                :items="table_Monitorworkprogressteambnp_before_item"
                class="elevation-1"
              >
                <!-- table top section -->
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title><span class="header-table-title">ตรวจเช็คของ - นำไป</span></v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                </template>
                <template v-slot:item="{ item }">
                  <tr>
                    <td>
                      {{ item.name }}
                    </td>
                    <td align="center">
                        {{ item.status }}
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
            <br/>
            <v-row>
              <v-col lg="12" md="12" sm="12" cols="12">
                <v-card class="mx-10 pa-5 rounded-lg" outlined>
                  <v-row>
                    <v-col>
                      <div class="create-edit-title">
                        รูปภาพ
                      </div>
                    </v-col>
                  </v-row>
                  <br/>
                  <div class="clearfix">
                    <a-upload
                      accept="image/*"
                      style="zoom:2; padding: 0px;"
                      list-type="picture-card"
                      :file-list="fileList_before"
                      @preview="handlePreview"
                      :showUploadList="notshow"
                    >
                    </a-upload>
                    <a-modal
                      :visible="previewVisible"
                      :footer="null"
                      @cancel="handleCancel"
                    >
                      <img alt="example" style="width: 100%" :src="previewImage" />
                    </a-modal>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
        <v-col lg="12" md="12" sm="12" cols="12">
          <v-card class="mx-10 pa-5 rounded-lg" outlined>
            <v-row>
              <v-col>
                <div class="create-edit-title">
                  เพิ่มเติม
                </div>
              </v-col>
            </v-row>
            <br />
              <v-textarea v-model="description_before" solo disabled></v-textarea>
          </v-card>
        </v-col>
    </v-row>
  </div>

      <!-- betweenTab2 -->
      <div v-if="tab==2">
      <v-row>
        <v-col lg="12" md="12" sm="12" cols="12">
          <v-card class="mx-10 pa-5 rounded-lg" outlined>
              <v-row>
                <v-col>
                  <div class="create-edit-title">
                    รูปภาพสถานที่
                  </div>
                </v-col>
              </v-row>
              <br/>
              <div class="clearfix">
                <a-upload
                  accept="image/*"
                  style="zoom:2; padding: 0px;"
                  list-type="picture-card"
                  :file-list="fileList_between_viewing_img"
                  @preview="handlePreview"
                  :showUploadList="notshow"
                >
                </a-upload>
                <a-modal
                  :visible="previewVisible"
                  :footer="null"
                  @cancel="handleCancel"
                  
                >
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </div>
            </v-card>
            <br/>
            <v-row>
              <v-col lg="12" md="12" sm="12" cols="12">
                <v-card class="mx-10 pa-5 rounded-lg" outlined>
                  <br/>
                  <v-row>
                    <v-col>
                      <div class="create-edit-title">
                          วันจัดงาน
                      </div>
                    </v-col>
                  </v-row>
                  <br/>
                  <div class="clearfix">
                    <a-upload
                      accept="image/*"
                      style="zoom:2; padding: 0px;"
                      list-type="picture-card"
                      :file-list="fileList_between"
                      :customRequest="uploadbetween"
                      @preview="handlePreview"
                      :showUploadList="notshow"
                    >
                    </a-upload>
                    <a-modal
                      :visible="previewVisible"
                      :footer="null"
                      @cancel="handleCancel"
                    >
                      <img alt="example" style="width: 100%" :src="previewImage" />
                    </a-modal>
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
            <v-col lg="12" md="12" sm="12" cols="12">
              <v-card class="mx-10 pa-5 rounded-lg" outlined>
                <v-row>
                  <v-col>
                    <div class="create-edit-title">
                      เพิ่มเติม
                    </div>
                  </v-col>
                </v-row>
                <br />
                  <v-textarea v-model="description_between" solo disabled></v-textarea>
              </v-card>
            </v-col>
            </v-row>
            </v-col>
        </v-row>
  </div>

      <!-- afterTab3 -->
      <div v-if="tab==3">
      <v-row>
        <v-col lg="12" md="12" sm="12" cols="12">
          <!-- รายการที่ต้องตรวจสอบ ตรวจเช็คของ - นำกลับ -->
          <v-card class="mx-10 pa-5 rounded-lg" outlined>
              <v-data-table
                :headers="headers_table_Monitorworkprogressteambnp_before"
                :items="table_Monitorworkprogressteambnp_after_item"
                class="elevation-1"
              >
                <!-- table top section -->
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title><span class="header-table-title">ตรวจเช็คของ - นำกลับ</span></v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                </template>
                <template v-slot:item="{ item }">
                  <tr>
                    <td>
                      {{ item.name }}
                    </td>
                    <td align="center">
                    {{item.status}}
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
            <br/>
            <v-row>
              <v-col lg="12" md="12" sm="12" cols="12">
                <v-card class="mx-10 pa-5 rounded-lg" outlined>
                  <v-row>
                    <v-col>
                      <div class="create-edit-title">
                        รูปภาพ
                      </div>
                    </v-col>
                  </v-row>
                  <br/>
                  <div class="clearfix">
                    <a-upload
                      accept="image/*"
                      style="zoom:2; padding: 0px;"
                      list-type="picture-card"
                      :file-list="fileList_after"
                      :customRequest="uploadafter"
                      @preview="handlePreview"
                      :showUploadList="notshow"
                    >
                    </a-upload>
                    <a-modal
                      :visible="previewVisible"
                      :footer="null"
                      @cancel="handleCancel"
                    >
                      <img alt="example" style="width: 100%" :src="previewImage" />
                    </a-modal>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
        <v-col lg="12" md="12" sm="12" cols="12">
          <v-card class="mx-10 pa-5 rounded-lg" outlined>
            <v-row>
              <v-col>
                <div class="create-edit-title">
                  เพิ่มเติม
                </div>
              </v-col>
            </v-row>
            <br />
              <v-textarea v-model="description_after" solo disabled></v-textarea>
          </v-card>
        </v-col>
    </v-row>
  </div>
  </v-container>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

import api from "@/services/api";
import axios from "axios";
export default {
  name: "Monitorworkprogressteambnp",
  mounted() {
    this.loadMonitorworkprogressteambnp();
  },
  data: () => ({
    //รายละเอียดพื้นที่
    team_code: null,
    Tax_invoice_name: null,
    Event_venue: null,
    look_location: null,
    Venue_view_team:null,
    Venue_team:null,
    qc:null,
    BNP_TYPE:null,
    notshow : {showPreviewIcon: true, 
    showRemoveIcon: false,},

    //tab
    tab:1,
    active1: true,
    active2: false,
    active3: false,

    //tab1=>before
    Allchk_before:null,
    dialogCreatChecklistMonitorworkprogressteambnp: false,
    dialogEditchecklistMonitorworkprogressteambnp: false,
    Create_checklists_Monitorworkprogressteambnp: null,
    Edit_checklists_Monitorworkprogressteambnp: null,
    EditChkID:null,
    description_before:null,
    totalbefore: null,
    table_Monitorworkprogressteambnp_before_item: [],
    headers_table_Monitorworkprogressteambnp_before: [
      { text: "รายการ", value: "name", sortable: true, align: "start" },
      { text: "สถานะ", value: "", sortable: false, align: "center" },
      { text: "", value: "", sortable: false, align: "start" },
    ],

    //tab2=>between
    description_between: null,
    Allchk_betweenid: null,
    Isactive:null,


    //tab3=>after
    Allchk_after:null,
    description_after: null,
    totalafter: null,
    table_Monitorworkprogressteambnp_after_item: [],
    headers_table_Monitorworkprogressteambnp_after: [
      { text: "รายการ", value: "name", sortable: true, align: "start" },
      { text: "สถานะ", value: "", sortable: false, align: "center" },
      { text: "", value: "", sortable: false, align: "start" },
      { text: "", value: "", sortable: false, align: "start" },
    ],

    previewVisible: false,
    previewImage: "",
    fileList_before: [],
    fileList_between_viewing_img: [],
    fileList_between: [],
    fileList_after: [],
  }),

  methods: { 
    async loadMonitorworkprogressteambnp() {
      console.log('test');
      this.qc = this.$store.getters["BNP_DATA"].bnpdata;
      this.TypeID = this.$store.getters["BNP_TYPE"] ? this.$store.getters["BNP_TYPE"].bnptypeID:  null
      let MonitorworkprogressteambnpID = {quotation_code:this.qc, type:this.TypeID};
      console.log('qc',this.qc);
      console.log('ไอดี',this.TypeID);
      
      if (!MonitorworkprogressteambnpID.quotation_code || !MonitorworkprogressteambnpID.type) {
        console.log('sdewww');
        window.location.href = `${process.env.VUE_APP_SUB_PATH}/teambnp/JobWorkprogressteambnp`;
        return;
      }

      let result = await api.getListTasktoseeteambnp(MonitorworkprogressteambnpID);
      console.log(result);
      //รายละเอียดพื้นที่
      this.team_code = result.data.result.info.quotation_code;
      this.Tax_invoice_name = result.data.result.info.customer_name;
      this.Event_venue = result.data.result.info.address;
      this.look_location = result.data.result.info.area_viewing_date;
      this.Venue_view_team = result.data.result.info.area_viewing_team_name;
      this.Venue_team = result.data.result.info.event_team_name;


      //รายการที่ต้องตรวจสอบของ-นำไป
      this.table_Monitorworkprogressteambnp_before_item = result.data.result.before.checklists;
      //เข็ครายการตรวจสอบ
      this.Allchk_before=result.data.result.before.checklist_check_all;
      //เพิ่มเติม
      this.description_before=result.data.result.before.description;
      //รูป
      this.fileList_before=result.data.result.before.img;

      //ตรวจเช็ควันจัดสถานที่
      this.Allchk_between=result.data.result.between.checklists.status;
      this.Allchk_betweenid=result.data.result.between.checklists.id;
      //เพิ่มเติม
      this.description_between=result.data.result.between.description;
      //รูป
      this.fileList_between_viewing_img=result.data.result.between.viewing_img;
      this.fileList_between=result.data.result.between.img;

      //รายการที่ต้องตรวจสอบของ-นำกลับ
      this.table_Monitorworkprogressteambnp_after_item = result.data.result.after.checklists;
      //เข็ครายการตรวจสอบ
      this.Allchk_after=result.data.result.after.checklist_check_all;
      //เพิ่มเติม
      this.description_after=result.data.result.after.description;
      //รูป
      this.fileList_after=result.data.result.after.img;
    },


    before(){
        this.active1 = true ;
        this.active2 = false ;
        this.active3 = false ;
        this.tab=1
    },
    between(){
        this.active1 = false ;
        this.active2 = true ;
        this.active3 = false ;
        this.tab=2
    },
    after(){
        this.active1 = false  ;
        this.active2 = false ;
        this.active3 = true ;
        this.tab=3
    },

    
    // รูป
    async handlePreview(file) {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleCancel() {
      this.previewVisible = false;
    },

   async handleChange({ file, fileList }) {
      this.fileList = fileList;
      // console.log("ไฟล์", file);
      // console.log("ไฟล์ลิดส", fileList);
      if(file.status=="removed"){
        let uplondimg = {uid:file.uid}
        let result = await api.DELimgTeamSetup(uplondimg);
        // console.log('ลบ',result);
        if (result.data.response == "OK") {
          this.$swal.fire("บันทึกรูปเรียบร้อยแล้ว", "", "success");
          this.loadMonitorworkprogressteambnp();
        }   
      }
   
    
    },

    async uploadbefore({ file, onSuccess }) {
      // console.log('ไฟล์ssssssss',file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset","lkp8jzgy");
      axios.post(`https://api.cloudinary.com/v1_1/digisolution/image/upload`,formData).then(async(res) => {
        // console.log('ได้',res.data);
        this.fileList_before=[...this.fileList_before, {name:res.data.original_filename, uid:res.data.asset_id, url:res.data.url}]
      let uplondimg = {quotation_code:this.qc ,name:res.data.original_filename, url:res.data.url, img_type:1}
      let result = await api.CreateimgTeamSetup(uplondimg);
      console.log('ds',result);
      if (result.data.response == "OK") {
        this.$swal.fire("บันทึกรูปเรียบร้อยแล้ว", "", "success");
        this.loadMonitorworkprogressteambnp();
      }   
      });
      onSuccess('Ok')
    },
    async uploadbetween({ file, onSuccess }) {
      // console.log('ไฟล์ssssssss',file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset","lkp8jzgy");
      axios.post(`https://api.cloudinary.com/v1_1/digisolution/image/upload`,formData).then(async(res) => {
        console.log('ได้',res.data);
        this.fileList_between=[...this.fileList_between, {name:res.data.original_filename, uid:res.data.asset_id, url:res.data.url}]
      let uplondimg = {quotation_code:this.qc ,name:res.data.original_filename, url:res.data.url, img_type:2}
      let result = await api.CreateimgTeamSetup(uplondimg);
      // console.log('ds',result);
      if (result.data.response == "OK") {
        this.$swal.fire("บันทึกรูปเรียบร้อยแล้ว", "", "success");
        this.loadMonitorworkprogressteambnp();
      } 
        
      });
      onSuccess('Ok')
    },
    async uploadbetween_viwe({ file, onSuccess }) {
      // console.log('ไฟล์ssssssss',file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset","lkp8jzgy");
      axios.post(`https://api.cloudinary.com/v1_1/digisolution/image/upload`,formData).then(async(res) => {
        // console.log('ได้',res.data);
        this.fileList_between=[...this.fileList_between, {name:res.data.original_filename, uid:res.data.asset_id, url:res.data.url}]
      let uplondimg = {quotation_code:this.qc ,name:res.data.original_filename, url:res.data.url, img_type:2}
      let result = await api.CreateimgTeamSetup(uplondimg);
      // console.log('ds',result);
      if (result.data.response == "OK") {
        this.$swal.fire("บันทึกรูปเรียบร้อยแล้ว", "", "success");
        this.loadMonitorworkprogressteambnp();
      } 
        
      });
      onSuccess('Ok')
    },
    async uploadafter({ file, onSuccess }) {
      // console.log('ไฟล์ssssssss',file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset","lkp8jzgy");
      axios.post(`https://api.cloudinary.com/v1_1/digisolution/image/upload`,formData).then(async(res) => {
        // console.log('ได้',res.data);
        this.fileList_after=[...this.fileList_after, {name:res.data.original_filename, uid:res.data.asset_id, url:res.data.url}]
      let uplondimg = {quotation_code:this.qc ,name:res.data.original_filename, url:res.data.url, img_type:3}
      let result = await api.CreateimgTeamSetup(uplondimg);
      // console.log('ds',result);
      if (result.data.response == "OK") {
        this.$swal.fire("บันทึกรูปเรียบร้อยแล้ว", "", "success");
        this.loadMonitorworkprogressteambnp();
      } 
        
      });
      onSuccess('Ok')
    },
  },
};
</script>

<style scoped>
</style>
