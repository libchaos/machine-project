<template>
<v-layout row wrap align-top>
  <v-flex xs12 md4>
    <div class="text-xs-center">
      <h5 class="text-xs-center">关键词相关性列表</h5>
      <v-data-table v-bind:headers="headers" :items="items" hide-actions class="elevation-1">
        <template slot="items" scope="props">
              <td class="text-xs-right" @click.stop="searchQues(props.item.keyword)">{{ props.item.keyword }}</td>
              <td class="text-xs-right">{{ props.item.weight }}</td>
</template>
          </v-data-table>

        </div>
      </v-flex>
    <v-flex xs12 md5 offset-md2>
      <h5 class="text-xs-center">相关问答列表</h5>
      <div v-for="post in logs" :key="post.title">
        <v-card class="my-3" hover>
          <v-card-media
            class="white--text"
            height="190px"
            :src="post.imgUrl"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">{{ post.title }}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-text>
            {{ post.content }}
          </v-card-text>
          <v-card-actions @click="getQuestion(post.id)">
            <v-spacer></v-spacer>
            <v-btn flat class="blue--text">Read More</v-btn>
          </v-card-actions>
        </v-card>
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
      headers: [{
          text: '相关词',
          value: 'keyword',
          sortable: false
        },
        {
          text: '相关词权重',
          value: 'weight'
        },
      ]
    }
  },
  computed: {
    ...mapState([
      'words',
      'questions'
    ]),

    items() {
      let items = []
      this.words.forEach(item => {
        item.forEach(item => {
          items.push({
            keyword: item[0],
            weight: item[1].toFixed(3)
          })
        })
      })
      return items
    },

    logs() {
      console.log('logs----')
      console.log(this.questions)
      let questions = this.questions || []
      let items = []
      return questions.map(item => ({
        id: item.root,
        title: item.logs[0].content.substr(0, 10),
        content: item.logs[0].content.substr(0, 100),
        imgUrl: 'https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/cards/docks.jpg'
      }))
    }
  },
  methods: {
    searchQues(word) {
      console.log('word')
      this.$store.dispatch('fetchQuestions', word)
    },
    async getQuestion(id) {
      console.log(id)
      const res = await this.$store.dispatch('fetchQuestion', id)
      let data = res.data
      if (data.success) {
        this.$router.push('/question')
      }
    }
  },
}
</script>
