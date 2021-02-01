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
              <table style="width:100%">
                <tbody>
                  <tr>
                    <th align="center" COLSPAN="5">
                      <h1>ใบเสนอราคา / Quotation</h1>
                    </th>
                  </tr>
                  <tr>
                    <td COLSPAN="1">
                      <v-row>
                        <v-col cols="2" class="ma-2">
                          เรียน/คุณ
                        </v-col>
                        <v-col cols="9" class="ma-2">
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
                    </td>
                    <td COLSPAN="4">
                      <div class="pa-5">
                        <v-row>
                          <v-col cols="7" class="ma-2">
                            เลขที่/Number
                          </v-col>
                          <v-col cols="4" class="justify-end ma-2">
                            Q20060062
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="7" class="ma-2">
                            วันที่เอกสาร/Number
                          </v-col>
                          <v-col cols="4" class="justify-end ma-2">
                            03/06/63
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="7" class="ma-2">
                            วันที่จัดงาน
                          </v-col>
                          <v-col cols="4" class="justify-end ma-2">
                            24/06/63
                          </v-col>
                        </v-row>
                      </div>
                    </td>
                  </tr>
                  <tr align="center">
                    <td COLSPAN="1">ลำดับ<br />item</td>
                    <td>รายการ<br />Description</td>
                    <td>จำนวน<br />Qtz.</td>
                    <td>ราคา/หน่วย<br />Unit Price</td>
                    <td>ราคารวม<br />Total Price</td>
                  </tr>
                  <tr align="center">
                    <td>1</td>
                    <td align="start">
                      <div cols="7" class="ma-2">
                        Package บุญนำพา5 วันจันทร์ที่ 8 มิ.ย 63 (พระเพล) <br />
                        ติดต่อวัดและนิมนต์คณะพระภิกษุสงฆ์ 9 รูป
                        (รวมนิมนต์พระและรับ-ส่งพระ) <br />
                        ชุดโต๊ะหมู่บูชาและพระประธาน <br />
                        ชุดอาสนะพระภิกษุสงฆ์ จำนวน 9 ตัว <br />
                        เครื่องใช้และอุปกรณ์ประกอบพิธีสงฆ์ครบถ้วน
                      </div>
                    </td>
                    <td>1.000</td>
                    <td>29,999.00</td>
                    <td>29,999.00</td>
                  </tr>
                  <tr>
                    <td class="widthzero" align="start">หมายเหตุ</td>
                    <td align="start">
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

                    <td align="center">
                      <br />
                      29,999.00 <br /><br />
                      0.00 <br /><br />29,999.00 <br /><br />
                    </td>
                  </tr>
                </tbody>
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

          <v-row justify="center">
            <v-col justify="center" cols="5" md="2">
              <v-divider></v-divider>
            </v-col>

            <v-col cols="2" md="4"> </v-col>

            <v-col justify="center" cols="5" md="2">
              <v-divider></v-divider>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col class="text-start" md="1">
              (
            </v-col>
            <v-col class="text-end" md="1">
              )
            </v-col>

            <v-col cols="2" md="3"> </v-col>

            <v-col class="text-end" md="1">
              ( 
            </v-col>
            <v-col class="text-center" md="1"> ณัฐกานต์ </v-col>
            <v-col class="text-end" md="1">
              )
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="text-center"> </v-col>
            <v-col class="text-center"> 03/06/6 </v-col>
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
