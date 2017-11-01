<template>
  <v-dialog
      persistent
      v-model="modal"
      lazy
      full-width
    >
      <v-text-field
        slot="activator"
        label="开始时间"
        v-model="date"
        prepend-icon="event"
        readonly
      ></v-text-field>
      <v-date-picker type="month" locale="zh-cn" v-model="date" scrollable actions>
        <template scope="{ save, cancel }">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="cancel">取消</v-btn>
            <v-btn flat color="primary" @click="save">确认</v-btn>
          </v-card-actions>
        </template>
      </v-date-picker>
    </v-dialog>    
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      date: null
    }
  }
}
</script>

