<template>
  <v-layout column justify-center>
      <v-container fluid class="pa-5">
        <v-card v-for="(m, i) in messages" :key="i">
          <v-card-text>
            {{m.message}}
            <ul v-if="m.images.length > 0">
              <li v-for="image in m.images" :key="image">
                <img :src="image" alt="" height="360" weight="360">
              </li>
            </ul>
            <div class="text-xs-right">
              <em><small>&mdash; {{m.from}}</small></em>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
  </v-layout>
</template>


<script>
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
      }
    },
    computed: {
      ...mapState([
      'question'
      ]),
      messages() {
        let items = []
        console.log('done')
    
        let question = this.question[0].logs || []
        question.forEach(item => {
          let images = item.images.filter(i => i !== null)
          console.log(images);
          items.push({
            message: item.content,
            from: item.from,
            images: images
          })
        })
        console.log(items)
        return items
      }
    }
  }
</script>