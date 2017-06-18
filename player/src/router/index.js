import Vue from 'vue'
import Router from 'vue-router'
const music = resolve => require(['@/components/music/music.vue'], resolve);
const list = resolve => require(['@/components/list/list.vue'], resolve); 
const friends = resolve => require(['@/components/friends/friends.vue'], resolve); 
const recommend = resolve => require(["@/components/music/recommend.vue"], resolve); 
const rankingList = resolve => require(["@/components/music/ranking-list.vue"], resolve); 
const musicList = resolve => require(["@/components/music/music-list-components.vue"], resolve); 
const rankingEachPage = resolve => require(["@/components/music/ranking-each-page.vue"], resolve); 
const playMusic = resolve => require(["@/components/public/play-music.vue"], resolve); 
const search = resolve => require(["@/components/search/search.vue"], resolve); 
const searchContentView = resolve => require(["@/components/search/search-content-view.vue"], resolve); 
const searchArtist = resolve => require(["@/components/search/search-artist.vue"], resolve); 
const searchAlbumPage = resolve => require(["@/components/search/search-album-page.vue"], resolve); 
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
      path: '/searchAlbumPage',
      name: 'searchAlbumPage',
      component: searchAlbumPage
    },
    {
      path: '/search',
      name: 'search',
      component: search,

      children:[
        {
          path: '/search/searchContentView/:id',
          name: 'searchContentView',
          component: searchContentView
        },
        {
          path:'/search/searchArtist',
          name: 'searchArtist',
          component: searchArtist
        },
        {
          path: '/search',
          redirect: '/search/searchContentView/1'
        }
      ]
    },
    {
       path: '*', 
       redirect: '/music/recommend' 
     }

  ]
})
