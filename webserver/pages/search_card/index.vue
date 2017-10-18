<template>
<v-layout row wrap align-top>
  <v-flex xs12 md4>
    <div class="text-xs-center">
      <h5 class="text-xs-center">相关症状</h5>
      <v-data-table :items="items" hide-actions class="elevation-1">
        <template slot="items" scope="props">
              <td class="text-xs-center" @click.stop="searchSymptom(props.item._id)">{{ props.item.symptom }}</td>
        </template>
      </v-data-table>
    </div>
    </v-flex>
    <v-flex xs16 md6 offset-md2>
      <h5 class="text-xs-center">症状知识卡</h5>
        <v-card class="my-3" hover v-if="!!symptom">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <div class="headline">{{ symptom.symptom }}</div>
                <br>
                <div class="black--text">分类: {{symptom.category}}</div>
                <br>
                <div class="black--text">科室: {{symptom.department}}</div>
                <br>
                <div class="black--text">标签: {{tags}}</div>
              </v-flex>
            </v-layout>
          </v-container>
          
        <v-card v-for="(item, index) in body" :key="index">
          <v-card-actions>
            <v-btn flat color="purple">问题: {{item.kd_title}}</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="setIndex(index)">
              <v-icon>{{ presetIndex === index ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="presetIndex === index">
              {{item.content}}
            </v-card-text>
          </v-slide-y-transition>
        </v-card> 
        </v-card>
        <div v-else>
          <span class="gray--text">请选择相关症状</span>
        </div>
    </v-flex>
  </v-layout>
</template>


<script>
import {
  mapState
} from 'vuex'

export default {
  data() {
    return {
      title: 'Your Logo',
      headers: [],
      presetIndex: '',
    }
  },
  computed: {
    ...mapState([
      'symptoms',
      'symptom'
    ]),

    items() {
      console.log('symptoms....', this.symptoms)
      let items = []
      items = this.symptoms.filter(item => !!item)
      return items
    },
    tags() {
      if (this.symptom.tags && Array.isArray(this.symptom.tags)) {
        return this.symptom.tags.join(', ')
      }
    },
    body() {
      if(this.symptom) {
        console.log(this.symptom.kd_body)
      }
      let items = []
      items = this.symptom.kd_body.filter(item => {
        if (item.kd_title === 'NaN') {
          return false
        }
        return true
      })
      return items
    }
  },
  methods: {
    searchSymptom(id) {
      this.$store.dispatch('fetchSymptom', id)
    },
    setIndex(index) {
      this.presetIndex = index
    }
  }
}
</script>
