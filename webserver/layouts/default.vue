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
            <v-list-tile-title v-text="item.title" @click.stop="selectedTitle(item.title)"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>  
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
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
  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { to: '/', title: '文本分析', icon: '' },
          { to: '/knowlege-graph', title: '知识图谱', icon: ''},
          { to: '/search', title: '搜索', icon: '' },
          { to: '/qa', title: '问答', icon: ''}
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: '医学问答分析'
      }
    },
    methods: {
      selectedTitle(titlea) {
        console.log('title  ', titlea)
        this.title = titlea
      }
    }
  }
</script>
