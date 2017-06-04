import Vue from 'vue'
import Router from 'vue-router'
import music from '@/components/music/music.vue'
import list from '@/components/list/list.vue'
import friends from '@/components/friends/friends.vue'
import recommend from "@/components/music/recommend.vue"
import rankingList from "@/components/music/ranking-list.vue"
import musicList from "@/components/music/music-list-components.vue"
import rankingEachPage from "@/components/music/ranking-each-page.vue"
import playMusic from "@/components/public/play-music.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/music',
      name: 'music',
      component: music,

      children:[
        {
          path: '/music/recommend',
          name: 'recommend',
          component: recommend
        },
        {
          path: '/music/rankingList',
          name: 'rankingList',
          component: rankingList
        },
        {
         path: '/music', 
         redirect: '/music/recommend' 
        }
      ]
    },
   {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/friends',
      name: 'friends',
      component: friends
    },
    {
      path: "/musicList",
      name: 'musicList',
      component : musicList
    },
    {
      path: '/music/rankingEachPage/:id',
      name: 'rankingEachPage',
      component: rankingEachPage
    },
    {
      path: '/playMusic',
      name: 'playMusic',
      component: playMusic
    },
    {
       path: '*', 
       redirect: '/music/recommend' 
     }

  ]
})
