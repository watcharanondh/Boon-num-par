<template>
  <v-row>
    <v-col cols="12" sm="3">
      <v-menu
        ref="menu"
        class="menupick"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="dates"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateRangeText"
            label="ค้นหาวันที่มีงาน"
            prepend-icon="mdi-calendar"
            dense
            solo
            outlined
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-row cols="12" sm="12">
          <v-col>
            <v-date-picker
              v-model="dates"
              locale="th"
              color="yellow darken-3"
              range
              no-title
              scrollable
            >
          <v-col>
          <v-row justify="center">
            <v-col cols="12" sm="12">
              <v-btn
                color="#29CC97"
                block
                large
                rounded
                small
                @click="$refs.menu.save(dates)"
              >
                ตกลง
              </v-btn>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="12">
              <v-btn
                block
                large
                rounded
                outlined
                small
                color="warning"
                @click="menu = false"
              >
                ปิด
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
            </v-date-picker>
          </v-col>
        </v-row>

      </v-menu>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    dates: [],
    menu: false,
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
};
</script>


