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
                  @click="$router.push('/QuotationCreate')"
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
              <div style="width:100%; height:100px">
               <h2>บริษัท ตัวอย่าง จำกัด</h2>
                218 หมู่ 1 ถ. ฝ่ายท่าหนองหัดไท ต.พงษ์ประศาสน์ อ.บางสะพาน รหัสไปรษณีย์ 77140 <br>
                โทร. 012-345-678, 098-787-6656, 095-234-1231 Fax. 09876543 E-mail:SALE@boonnumpar.co.th
              </div>
              <table style="width:100%;" border="solid 1px gray">
                <thead>
                  <tr>
                    <th COLSPAN="10" style="text-align:center; background-color: gainsboro !important;" >
                      <h2>ใบเสนอราคา / Quotation</h2>
                    </th>
                  </tr>
                </thead>
                <tbody class="t-body">
                  <tr>
                    <td COLSPAN="6" style="width:60%">
                      <div>
                      <v-row>
                        <v-col cols="2" class="ma-2" style="padding-left: 1.5em">
                          เรียน/คุณ
                        </v-col>
                        <v-col cols="5" class="ma-2">
                          กัญญาภัต 55/108. ญาตาเพลส ลำโพ41. ซอย รร
                          สารสาสน์บางบัวทอง ม.5, ต.ลำโพ อ.บางบัวทอง นนทบุรี
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="2" class="ma-2"> </v-col>
                        <v-col cols="6" class="ma-2">
                          เบอร์ติดต่อ 083-083-0031 Email
                        </v-col>
                      </v-row>
                      </div>
                    </td>
                    <td COLSPAN="4">
                      <div class="pa-5">
                        <v-row>
                          <v-col cols="7" class="ma-2" style="padding-left: 1.5em">
                            เลขที่/Number
                          </v-col>
                          <v-col style="text-align: right;"  cols="4" class="justify-end ma-2">
                            Q20060062
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="7" class="ma-2" style="padding-left: 1.5em">
                            วันที่เอกสาร/Number
                          </v-col>
                          <v-col style="text-align: right;"  cols="4" class="justify-end ma-2">
                            03/06/63
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="7" class="ma-2" style="padding-left: 1.5em">
                            วันที่จัดงาน
                          </v-col>
                          <v-col style="text-align: right;"  cols="4" class="justify-end ma-2" >
                            24/06/63
                          </v-col>
                        </v-row>
                      </div>
                    </td>
                  </tr>
                  <tr align="center">
                    <td COLSPAN="1">ลำดับ<br />item</td>
                    <td COLSPAN="5">รายการ<br />Description</td>
                    <td COLSPAN="1">จำนวน<br />Qtz.</td>
                    <td COLSPAN="1">ราคา/หน่วย<br />Unit Price</td>
                    <td COLSPAN="1">ราคารวม<br />Total Price</td>
                  </tr>
                  <tr align="center" style="border-bottom:white !important;">
                    <td COLSPAN="1">1</td>
                    <td COLSPAN="5" align="start">
                      <div cols="7" class="ma-2">
                        Package บุญนำพา5 วันจันทร์ที่ 8 มิ.ย 63 (พระเพล) <br />
                        ติดต่อวัดและนิมนต์คณะพระภิกษุสงฆ์ 9 รูป
                        (รวมนิมนต์พระและรับ-ส่งพระ) <br />
                        ชุดโต๊ะหมู่บูชาและพระประธาน <br />
                        ชุดอาสนะพระภิกษุสงฆ์ จำนวน 9 ตัว <br />
                        เครื่องใช้และอุปกรณ์ประกอบพิธีสงฆ์ครบถ้วน
                      </div>
                    </td>
                    <td COLSPAN="1">1.000</td>
                    <td COLSPAN="1">29,999.00</td>
                    <td COLSPAN="1">29,999.00</td>
                  </tr>
                  <tr align="center" style="border-bottom:white !important;">
                    <td COLSPAN="1">2</td>
                    <td COLSPAN="5" align="start">
                      <div cols="7" class="ma-2">
                       โปรโมชั่น*** แถมชุดโต๊ะ เก้าอี้ที่นั่งสำหรับแขก จำนวน 5 ชุด มูลค่า 2,000 บาท ฟรี
                      </div>
                    </td>
                    <td COLSPAN="1">1.000</td>
                    <td COLSPAN="1"></td>
                    <td COLSPAN="1"></td>
                  </tr>
                  <tr align="center">
                    <td COLSPAN="1">3</td>
                    <td COLSPAN="5" align="start">
                      <div cols="7" class="ma-2">
                       โปรโมชั่น ฟรี ค่าขนส่งเหมาติดตั้งและเก็บกลับ 1,500 บาท
                      </div>
                    </td>
                    <td COLSPAN="1">1.000</td>
                    <td COLSPAN="1"></td>
                    <td COLSPAN="1"></td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td COLSPAN="1" class="widthzero" align="start" style="border-bottom:none !important;">หมายเหตุ</td>
                    <td COLSPAN="5" align="start" style="border-bottom:none !important;">
                      <v-col cols="9" class="ma-2">
                        มัดจำล่วงหน้า 5,000 บาท ณ วันออกสัญญาจัดงาน
                        ส่วนที่เหลือจ่าย ณ วันเสร็จสิ้นงาน
                        สิ้นที่จะไม่รวมในเพ็กเกจ 1.ปัจจัยใส่ซองถวายพระ
                        2.โต๊ะเก้าอี้นั่งสำหรับแขก 3.เต็นท์ 4.พัดลม หมายเหตุ
                        ***ทองบริษัทของสงวนสิทธิ์ไม่คืนมัดจำหากลูกค้ายกเลิกการจัดงาน***
                        **สงวนสิทธิ์ให้คิวบริการลูกค้าที่โอนมัดจำชำระเงินก่อน**
                      </v-col>
                    </td>
                    <td COLSPAN="2" align="center">
                      รวม <br /><br />
                      ส่วนลด <br />
                      <br />ราคารวม / Amount
                    </td>

                    <td COLSPAN="1" align="center">
                      <br />
                      29,999.00 <br /><br />
                      0.00 <br /><br />29,999.00 <br /><br />
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
            <v-col class="text-center" md="2" style="text-align:center"> ณัฐกานต์ ณัฐกานต์ ณัฐกานต์ </v-col>
            <v-col md="1" style="text-align:left">
              )
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="text-center"> </v-col>
            <v-col class="text-center"> 03/06/63 </v-col>
          </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
export default {
  name: "QuotationPrint",

  data: () => ({
  }),

  methods: {
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
