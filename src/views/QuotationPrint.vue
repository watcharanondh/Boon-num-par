<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-col>
      <v-row>
        <v-card flat color="#E5E5E5">
          <div class="sizetitle">
            ใบเสนอราคา
          </div>
        </v-card>
      </v-row>
    </v-col>
    <v-col>
      <v-row> </v-row>
    </v-col>

    <v-col>
      <v-row> </v-row>
    </v-col>
    <v-row>
      <v-col lg="12" md="12" sm="12" cols="12">
        <!-- ปุ่ม -->
        <v-card class="mx-10 pa-5 rounded-lg" outlined>
          <v-col>
            <v-row>
              <v-col lg="2" md="3" sm="12" cols="12">
                <v-btn
                  class="ma-2"
                  block
                  color="#29CC97"
                 @click="print"
                  rounded
                >
                  <v-icon>print</v-icon>
                  <span class="white--text">ปริ้นเอกสาร</span></v-btn
                >
              </v-col>
              <v-col lg="2" md="3" sm="12" cols="12">
                <v-btn
                  class="ma-2"
                  block
                  color="black"
                  @click="$router.push('/Quotation')"
                  rounded
                >
                  <span class="white--text">ปิด</span></v-btn
                >
              </v-col>
            </v-row>
          </v-col>


        <div id="printMe">
          <v-col>
            <v-row>
              <div style="width:100%; display:flex;">
                <div style="padding:0 20px 10px 20px">
                <img src="@/assets/AW-Logo-Boonumpar.webp" width="100" height="120" >
                </div>
                <div style="padding:10px 0 10px ">
               <h2 style="font-size:22px">บริษัท บุญนำพา (Boon-Num-Par) จำกัด</h2>
                <p style="font-size:18px">
                218 หมู่ 1 ถ. ฝ่ายท่าหนองหัดไท ต.พงษ์ประศาสน์ อ.บางสะพาน รหัสไปรษณีย์ 77140 <br>
                โทร. 012-345-678, 098-787-6656, 095-234-1231 Fax. 09876543 E-mail:SALE@boonnumpar.co.th
                </p>
                </div>
              </div>
              <table style="width:100%; border-bottom:white;border-left:white;" border="none" cellspacing="0" cellpadding="0">
                <thead>
                  <tr style="border-bottom:black;border-left:black;border-right:black;padding:15px 0 -10px;">
                    <th COLSPAN="10" style="text-align:center;" class="bg-header" >
                      <h2 style="font-size:22px">ใบเสนอราคา / Quotation</h2>
                    </th>
                  </tr>
                </thead>
                <tbody class="t-body" style="border-bottom:black;">
                  <tr class="tb-header" style="border-bottom:black;border-left:black;">
                    <td COLSPAN="6" style="width:60%; border-right:black;">
                      <div style="display:flex;">
                      <v-row>
                        <v-col cols="2" class="ma-2" style="padding-left: 1.5em">
                          เรียน/คุณ
                        </v-col>
                        <v-col cols="9" class="ma-2" style="padding-left: -1.5em">
                          {{ Header.customer_name }}
                          {{ Header.cti_address }}
                          {{ Header.cti_district }}
                          {{ Header.cti_amphoe }}
                          {{ Header.cti_province }}
                          {{ Header.cti_zipcode }}
                        </v-col>
                        <v-col cols="2" class="ma-2"> </v-col>
                        <v-col cols="9" class="ma-2" style="padding-left: -1.5em">
                          เบอร์ติดต่อ: {{ Header.cti_telephone_number }}
                          Email: {{ Header.cti_email }}
                        </v-col>
                      </v-row>
                      </div>
                    </td>
                    <td style="border-right:black;" COLSPAN="4">
                      <div>
                        <v-row>
                          <v-col cols="7" class="ma-2" style="padding-left: 1.5em">
                            เลขที่/Number
                          </v-col>
                          <v-col style="text-align: right;"  cols="4" class="justify-end ma-2">
                            {{ Header.quotation_code }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="7" class="ma-2" style="padding-left: 1.5em">
                            วันที่เอกสาร/Number
                          </v-col>
                          <v-col style="text-align: right;"  cols="4" class="justify-end ma-2">
                            {{ Header.created_at }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="7" class="ma-2" style="padding-left: 1.5em">
                            วันที่จัดงาน
                          </v-col>
                          <v-col style="text-align: right;"  cols="4" class="justify-end ma-2" >
                            {{ Header.event_date }}
                          </v-col>
                        </v-row>
                      </div>
                    </td>
                  </tr>
                  <tr class="tb-head" align="center" style="border-bottom:black;border-left:black;border-right:black;">
                    <td COLSPAN="1">ลำดับ<br />item</td>
                    <td COLSPAN="5">รายการ<br />Description</td>
                    <td COLSPAN="1">จำนวน<br />Qtz.</td>
                    <td COLSPAN="1">ราคา/หน่วย<br />Unit Price</td>
                    <td COLSPAN="1">ราคารวม<br />Total Price</td>
                  </tr>

                    <tr v-for="(item, index) in Bodys.packages" :key="item.id" class="tb-data" align="center" style="border-left:black;border-right:black;">
                    <td COLSPAN="1">{{index + 1}}</td>
                    <td class="td-body-data" COLSPAN="5" align="start">
                      <div cols="7" class="ma-2" style="line-height: 1.6;">
                        {{ item.package_name }}
                      </div>
                    </td>
                    <td COLSPAN="1">{{ item.packages_amount }}</td>
                    <td COLSPAN="1">{{ item.package_price }}</td>
                    <td COLSPAN="1">{{ item.package_total }}</td>
                  </tr>

                    <tr v-for="(item, index) in Bodys.promotions" :key="item.id" class="tb-data" align="center" style="border-left:black;border-right:black;">
                    <td COLSPAN="1">{{index + 2}}</td>
                    <td class="td-body-data" COLSPAN="5" align="start">
                      <div cols="7" class="ma-2" style="line-height: 1.6;">
                        {{ item.promotion_name }}
                      </div>
                    </td>
                    <td COLSPAN="1">1.000</td>
                    <td COLSPAN="1" v-if="item.promotion_discount != 0">{{ item.promotion_discount }}</td>
                    <td COLSPAN="1" v-else></td>
                    <td COLSPAN="1"></td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr align="center" style="border-bottom:black;border-right:black;">
                    <td COLSPAN="1" class="widthzero" align="start" style="border-bottom:white !important;border-left:white !important;border-right: white;">หมายเหตุ <br><br><br><br></td>
                    <td COLSPAN="5" align="start" style="border-bottom:white !important;border-left:white !important;">
                      <v-col cols="10" class="ma-2">
                        {{Footer.note}}
                      </v-col>
                    </td>
                    <td COLSPAN="2" align="center">
                      <div>รวม</div>
                      <div v-if="Footer.discount_percent">ส่วนลด ({{Footer.discount_percent}})</div>
                      <div v-else>ส่วนลด</div>
                      <div v-if="Footer.vat">VAT (7%)</div>
                      <div>ราคารวม / Amount</div>
                    </td>

                    <td COLSPAN="1" align="right" style="padding-right:10px">
                     <div text-align="right"> {{Footer.total}} </div>
                     <div> {{Footer.discount}} </div>
                     <div v-if="Footer.vat"> {{Footer.vat}} </div>
                     <div> {{Footer.amount}} </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </v-row>
          </v-col>
          <br />
          <v-col>
            <v-row>
              Payment Term <br />
              นาย สรสิช เนตรนิล <br />
              ธ.กสิกรไทย สาขาโลตัส รามอินทรา 109 เลขที่บัญชี 069 - 3 - 51962 - 6
              <br />
              ออมทรัพย์ ธ.ไทยพาณิชย์ สาขาบิ๊กชี หทัยราษฎร์ เลขที่บัญชี <br />
              405-730-796-0 ออมทรัพย์ <br />
            </v-row>
          </v-col>
          <br />
          <v-row justify="center">
            <v-col class="text-center">
              ผู้อนุมัติ / Quoted
            </v-col>
            <v-col class="text-center">
              แสดงราคาโดย / Quoted
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="text-center"> </v-col>
            <v-col class="text-center"> ณัฐกานต์</v-col>
          </v-row>

          <v-row justify="center" style="justify-content: center !important;">
            <v-col justify="center" cols="5" md="2">
              <v-divider></v-divider>
            </v-col>

            <v-col cols="2" md="4"> </v-col>

            <v-col justify="center" cols="5" md="2">
              <v-divider></v-divider>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="2" style="text-align:right">(</v-col>
            <v-col class="text-start" md="1" style="text-align:left">
              
            </v-col>
            <v-col class="text-end" md="1" style="text-align:right">
              
            </v-col>

            <v-col cols="2" md="3" style="text-align:left">) </v-col>

            <v-col class="text-end" md="1" style="text-align:right">
              ( 
            </v-col>
            <v-col class="text-center" md="2" style="text-align:center"> ณัฐกานต์ หทัยราษฎร์ </v-col>
            <v-col md="1" style="text-align:left">
              )
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="text-center"> </v-col>
            <v-col class="text-center"> {{ Footer.signature_date }}</v-col>
          </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
import api from "@/services/api";
export default {
  name: "QuotationPrint",

  data: () => ({
    Header:{},
    Bodys:{},
    Footer:{}
  }),

 mounted() {
    this.loadDatas();
      this.$store.dispatch({
            type: "inputRoutepath",
            RT: this.$route.path,
          });
  },

  methods: {
    async loadDatas() {
      let ID_Quotation ={quotation_code:this.$store.getters["Newpersonal_BNP_ID"].BNP_ID}
      let result = await api.getPrintQuotation(ID_Quotation);
            this.Header = result.data.result.header
            this.Bodys = result.data.result.body
            this.Footer = result.data.result.footer
            //console.log(this.Bodys);
      
    },    
    print () {
      this.$htmlToPaper('printMe');
    }

  },
};
</script>

<style scoped>
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}

th {
  background-color: #c4c4c4;
}

.widthzero {
  border-bottom: 0;
}
</style>
