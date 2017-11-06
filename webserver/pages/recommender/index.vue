<template>
  <v-layout row wrap align-top>
    <v-flex xs12 md5>
      <v-card color="grey lighten-4" flat>
        <v-card-text>
          <v-container fluid>
            <v-layout row>
              <v-flex xs12>
                <v-text-field name="input-1" label="请简要描述问题，我们会为您匹配到合适的医生" textarea v-model="question"></v-text-field>
                <v-btn color="secondary" @click="getDoctors(question)">
                  发起查询
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
      <v-layout row wrap v-if="isDoctors">
        <v-btn small color="primary" dark v-for="item in doctors" :key="item" @click="getDoctor(item)">{{item}}</v-btn>
      </v-layout>
    </v-flex>
    <v-flex xs12 sm4 offset-sm2>
      <h5 class="text-xs-center">相关医生详情</h5>
      <v-card v-if="isDoctor">
        <v-card-media :src="doctor.image" height="300px">
          <v-layout column class="media">
            <v-spacer></v-spacer>
            <v-card-title class="white--text pl-5 pt-5">
              <div class="display-1 pl-5 pt-5">{{doctor.name}}</div>
            </v-card-title>
          </v-layout>
        </v-card-media>
        <v-list two-line>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">info</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-sub-title>{{doctor.title}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon dark>chat</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        <v-divider inset></v-divider>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">opacity</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{doctor.tags | joinTags}}</v-list-tile-title>
              <v-list-tile-sub-title>主治</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        <v-divider inset></v-divider>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">location_on</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{doctor.description}}</v-list-tile-title>
              <v-list-tile-sub-title>擅长</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>

    </v-flex>
  </v-layout>
</template>





<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        question: ''
      }
    },
    computed: {
      ...mapState([
        'doctors',
        'doctor'
      ]),
      isDoctors() {
        if (this.doctors) {
          return true
        } else {
          return false
        }
      },
      isDoctor() {
        if (this.doctor) {
          return true
        } else {
          return false
        }
      },
    },
    methods: {
      async getDoctors(question) {
        console.log(question)
        const data = await this.$store.dispatch('fetchDoctors', question)
        console.log(data)
      },
      async getDoctor(name) {
        const data = await this.$store.dispatch('fetchDoctor', name)
        console.log(data)
      }
    },
    filters: {
      joinTags(value) {
        return value.join('')
      }
    }
  }
</script>