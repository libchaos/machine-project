<template>
  <v-app light toolbar>
    <v-navigation-drawer
      persistent
      clipped
      v-model="drawer"
      enable-resize-watcher
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>  
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
       <v-text-field
        label="搜索..."
        single-line
        append-icon="search"
        hide-details
        @keyup.enter="submit"
        v-model="searchText"
        v-show="show"
      ></v-text-field>
    </v-toolbar>
    <main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </main>
    <v-footer :fixed="true">
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { to: '/', title: '问题检索', icon: 'chat' },
          { to: 'hotword', title: '热词统计', icon: 'info'},
          { to: '/search_card', title: '知识卡片检索', icon: 'event'},
          { to: '/knownledge', title: '知识图谱', icon: 'gavel'}
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: '问答',
        searchText: ''
      }
    },
    computed: {
      show() {
        if (this.$route.path === '/hotword') {
          return false
        }
        return true
      }
    },
    methods: {
      submit() {
        console.log('route path: ', this.$route.path)
        switch (this.$route.path) {
          case '/': 
            this.$store.dispatch('fetchWords', this.searchText)
            this.$store.dispatch('fetchQuestions', this.searchText)
            this.$router.push('/')
            break
          case '/search_card':
            this.$store.dispatch('fetchSymptoms', this.searchText)
            this.$router.push('/search_card')
            break
          default: 
            this.$router.push('/')
        }
     
      }
    }
  }
</script>
