import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import music from '@/components/music/music-nav.vue'
import list from '@/components/list/list.vue'
import friends from '@/components/friends/friends.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/music',
      name: 'music',
      component: music
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
