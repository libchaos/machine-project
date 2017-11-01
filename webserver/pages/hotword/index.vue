<template>
  <div>
  <v-layout row wrap>
    <v-flex xs4 sm4>
      <v-menu
        lazy
        :close-on-content-click="false"
        v-model="menu"
        transition="scale-transition"
        offset-y
        full-width
        :nudge-right="40"
        max-width="290px"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          label="开始时间"
          v-model="startTime"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker locale="zh-cn" v-model="startTime" no-title scrollable actions>
          <template scope="{ save, cancel }">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
              <v-btn flat color="primary" @click="save">OK</v-btn>
            </v-card-actions>
          </template>
        </v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs4 sm4>
      <v-dialog
        persistent
        v-model="modal"
        lazy
        full-width
      >
        <v-text-field
          slot="activator"
          label="结束时间"
          v-model="endTime"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker locale="zh-cn" v-model="endTime" scrollable actions>
          <template scope="{ save, cancel }">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
              <v-btn flat color="primary" @click="save">OK</v-btn>
            </v-card-actions>
          </template>
        </v-date-picker>
      </v-dialog>
    </v-flex>
    <v-btn fab dark color="indigo">
      <v-icon dark>search</v-icon>
    </v-btn>
  </v-layout>


  <v-layout>
    <v-flex>
      <v-card>
    <v-card-title>
      热词列表
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="检索分类"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
        v-bind:headers="headers"
        v-bind:items="items"
        v-bind:search="search"
      >
      <template slot="items" scope="props">
        <td class="text-xs-right">{{ props.item.calories }}</td>
      </template>
      <template slot="pageText" scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table>
  </v-card>

    </v-flex>
  </v-layout>
  </div>
  
</template>


<script>
  export default {
    data(){
      return {
        startTime: null,
        endTime: null,
        modal: false,
        menu: false
      }
    },
  }
</script>
