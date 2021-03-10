<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-col>
      <v-row>
        <v-card flat color="#E5E5E5">
          <div class="header-title">
            ตารางงานของคุณ
          </div>
        </v-card>
      </v-row>
    </v-col>
    <v-col>
      <v-row> </v-row>
    </v-col>
    <v-row justify="end">
      <v-btn
        class="mx-10"
        color="#C4C4C4"
        @click="$router.push({ name: 'menuPlacearrangement' })"
        rounded
      >
        <span class="white--text">ย้อนกลับ</span></v-btn
      >
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
                      v-model="code_Team"
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
              </v-row>
              <v-row>
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
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-card flat color="#E5E5E5">
      <div class="mx-10 pa-5 header-title">
        กิจกรรม
      </div>
    </v-card>

      <v-row class="mx-10 pa-5">
     
        <v-btn @click="ac1()"  :color="active1 ? '#606771' : undefined" class="ma-2" rounded><span>ตรวจเช็คของ-นำไป</span></v-btn>
        <v-btn  @click="ac2()" :color="active2 ? '#606771' : undefined" class="ma-2" rounded><span>ตรวจเช็ควันจัดสถานที่</span></v-btn>
        <v-btn @click="ac3()" :color="active3 ? '#606771' : undefined" class="ma-2" rounded><span>ตรวจเช็คของ-นำกลับ</span></v-btn>
      </v-row>
  
      <v-row>
        <v-col lg="12" md="12" sm="12" cols="12">
          <!-- รายการที่ต้องตรวจสอบ -->

          <v-card   v-if="tab==1 || tab==3" class="mx-10 pa-5 rounded-lg" outlined>
            <v-btn class="" rounded><span><v-icon>done</v-icon> ทำเครื่องหมายเสร็จสมบูรณ์</span></v-btn>
            <br />
            <br />
            <v-data-table
              :headers="headers_table_checklocation"
              :items="table_checklocation_item"
              class="elevation-1"
            >
              <!-- table top section -->

              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title
                    ><span class="header-table-title"
                      >ตรวจเช็คของ - นำไป</span
                    ></v-toolbar-title
                  >
                  <v-toolbar-title
                    ><span class="order">{{ total }}</span></v-toolbar-title
                  >
                  <v-spacer></v-spacer>
                  <ModalAddchecklist />
                  <!--   <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  label="ค้นหาชื่อลูกค้าบุคคล/บริษัท"
                  single-line
                  hide-details
                ></v-text-field> -->
                </v-toolbar>
              </template>
              <template v-slot:item="{ item }">
                <tr>
                  <td>
                    พื้นที่จัดงานส่วนกลาง
                    <!-- {{ item.team_code }} -->
                  </td>
                  <td align="center">
                    <button
                      class="button-left"
                      :class="{ 'active': item.status == 1 }"
                      @click="test(item, 1)"
                    >
                      ผ่าน
                    </button>
                    <button
                      class="button-right"
                      :class="{ 'active': item.status == 2 }"
                      @click="test(item, 2)"
                    >
                      ไม่ผ่าน
                    </button>
                  </td>
                  <td>
                    <v-row>
                      <v-btn
                        @click="EditCustomizecheck(item)"
                        fab
                        icon
                        outlined
                        small
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-btn
                        @click="DeleteCustomizecheck(item)"
                        fab
                        icon
                        outlined
                        small
                      >
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </v-row>
                  </td>
                  <td>
                    <!-- <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn> -->
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>

            <!-- <v-btn class="" rounded><span>ทำเครื่องหมายเสร็จสมบูรณ์</span></v-btn>
            <br />
            <br /> -->
            <v-card v-if="tab==2" class="mx-10 pa-5 rounded-lg" outlined>
            <v-row>
              <v-col>
                <div class="create-edit-title">
                  รูปภาพสถานที่
                </div>
              </v-col>
            </v-row>
       
              <a-upload
                list-type="picture-card"
                style="zoom:3;"
                :file-list="fileList"
                @preview="handlePreview"
                :showUploadList="{ showPreviewIcon: true, showRemoveIcon: false }" 
              >
              </a-upload>
              <a-modal
                :visible="previewVisible"
                :footer="null"
                @cancel="handleCancel"
              >
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
 
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
        <v-textarea
          solo
        ></v-textarea>
          </v-card>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col lg="12" md="12" sm="12" cols="12">
          <v-card class="mx-10 pa-5 rounded-lg" outlined>
                <v-btn v-if="tab==2" class="" rounded><span><v-icon>done</v-icon>ทำเครื่องหมายเสร็จสมบูรณ์</span></v-btn>
            <br />
            <br />
            <v-row>
              <v-col>
                <span v-if="tab==1" class="create-edit-title">
                  รูปภาพ
                </span>
                <span  v-if="tab==2" class="create-edit-title">
                  วันจัดงาน
                </span>
              </v-col>
            </v-row>
            <div class="clearfix">
              <a-upload
                style="zoom:3"
                list-type="picture-card"
                :file-list="fileList"
                @preview="handlePreview"
                @change="handleChange"
              >
                <div v-if="fileList.length < 8">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">
                    Upload
                  </div>
                </div>
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
import ModalAddchecklist from "@/components/dialog/ModalAddchecklist.vue";

export default {
  name: "CheckLocation",
  components: {
    ModalAddchecklist,
  },
  mounted() {
    this.loadExplorearea();
    this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path,
    });
  },
  data: () => ({
      tab:1,
      active1: false,
      active2: false,
      active3: false,
    isActive: 0,

code_Team:"",
Tax_invoice_name:"",
Event_venue:"",
look_location:"",



    total: null,
    table_checklocation_item: [
      {status:0},
      {status:0},
      {status:0},
    ],
    headers_table_checklocation: [
      { text: "รายการ", value: "team_code", sortable: true, align: "start" },
      { text: "สถานะ", value: "team_name", sortable: false, align: "center" },
      { text: "", value: "", sortable: false, align: "start" },
      { text: "", value: "", sortable: false, align: "start" },
    ],

    previewVisible: false,
    previewImage: "",
    fileList: [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        uid: "-2",
        name: "image.png",
        status: "done",
        url:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        uid: "-3",
        name: "image.png",
        status: "done",
        url:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
    ],
  }),

  methods: {
    test(item, status) {
      item.status = status;
    },

    ac1(){
        this.active1 = true ;
        this.active2 = false ;
        this.active3 = false ;
        this.tab=1
    },
    ac2(){
        this.active1 = false ;
        this.active2 = true ;
        this.active3 = false ;
        this.tab=2
    },
    ac3(){
        this.active1 = false  ;
        this.active2 = false ;
        this.active3 = true ;
        this.tab=3
    },




    

    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },

    async loadExplorearea() {
      let result = await api.TeamSurvey();
      console.log(result);
      // this.table_checklocation_item = result.data.result;
      this.total = result.data.total;
    },

    async MonitorTeaminformation() {
      //   await this.$store.dispatch({
      //     type: "doEditBNPID",
      //     BNP_ID: item.quotation_code
      //   });
      await this.$router.push({ name: "menuMonitorteaminformation" });
    },
  },
};
</script>

<style scoped>
.button-left {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.2px;
  padding: 5px 25px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #9fa2b4;
  border: 2px solid #9fa2b4;
  border-radius: 15px 0px 0px 15px;
}

.button-right {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.2px;
  padding: 5px 20px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #9fa2b4;
  border: 2px solid #9fa2b4;
  border-radius: 0px 15px 15px 0px;
}

.active {
  background-color: #666;
  color: white;
}
.ant-upload-list-picture .ant-upload-list-item, .ant-upload-list-picture-card .ant-upload-list-item{
 padding: 0px
}

</style>
