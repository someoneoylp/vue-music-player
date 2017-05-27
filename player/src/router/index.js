import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import music from '@/components/music/music.vue'
import list from '@/components/list/list.vue'
import friends from '@/components/friends/friends.vue'
import recommend from "@/components/music/recommend.vue"
import rankingList from "@/components/music/ranking-list.vue"
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
    
  ]
})
