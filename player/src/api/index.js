import axios from 'axios'

import {
	PlaylistDetailResource,
	ArtistAlbumResource,
	TopPlaylistResource,
	RecommendSongsResource,
	PersonalizedResource,//推荐歌单
	PersonalizedMvResource,
	PrivatecontentResource,
	BroadcastingStation,
	PlayListDeatil,
	TopListBriefResource,
  TopListResource,
  SearchSuggestResource,//搜索音乐（推荐）
  SearchResource,//搜索音乐
	SongDetail,
	SongUrl,
	SongLyric,
	SearchAlbumResource,
	SearchArtistResource
} from './resource.js';

export default {
	//// 获取歌单详情, id 为歌单id
	getPlaylistDetailResource(id){
		return axios.get(PlaylistDetailResource,{
			params:{
				id:id
			}
		},'')
	},
	//获取歌手专辑列表， id为歌手id
	getArtistAlbumResource(id,size){
	 	return axios.get(ArtistAlbumResource,{
	 		params:{
	 			id:id,
	 			limit:30||size
	 		}
	 	})
	 },
	  /**
   * @method 获取网友精选歌单
   * @param order new:  最新, hot:  最热
   * @param limit 每次请求返回列表条数，默认50
   * @param offset  偏移量 默认为0
   * @returns 返回歌单列表
   */
	  getTopPlaylistResource (order, limit, offset) {
	    return axios.get(TopPlaylistResource, {
	      params: {
	        order: order || 'hot',
	        limit: limit || 50,
	        offset: offset || 0
	      }
	    });
	  },
	  getRecommendSongsResource () {
    	return axios.get(RecommendSongsResource);
  	},
  	//获取推荐歌单
	  getPersonalized () {
	    return axios.get(PersonalizedResource);
	  	},
  	 // 获取独家放送
	  getPrivatecontent () {
	    return axios.get(PrivatecontentResource);
	  },

	  // 获取推荐MV
	  getPersonalizedMv () {
	    return axios.get(PersonalizedMvResource);
	  },
	  getBroadcastingStation(){
	  	return axios.get(BroadcastingStation);
	  },
	  //获取歌单内容
	  getPlayListDeatil(id){
	  	return axios.get(PlayListDeatil, {
	      params: {
	        id: id
	      }
	    })
	  },
	  //  音乐排行榜首页简介
	  getTopListBriefResource (idx) {
	    return axios.get(TopListBriefResource, {
	      params: {
	        idx: idx
	      }
	    });
	  },
	  //  音乐排行榜各个子页面
	  getTopListResource (id) {
	    return axios.get(TopListResource, {
	      params: {
	        id: id
	      }
	    });
	  },
	  //获取歌单详情
	  getSongDetail(id){
	  	return axios.get(SongDetail, {
	      params: {
	        id: id,
	        ids:'[' + id + ']'
	      }
	    });
	  },
	  getSongUrl(id,br){
	  	return axios.get(SongUrl,{
	  		params:{
	  			ids:'[' + id + ']',
	  			br:br,
	  			'csrf_token':''
	  		}
	  	})
	  },
	  //获取歌词
	  getSongLyric(id){
	  	return axios.get(SongLyric,{
	  		params:{
	  			id:id,
	  			lv:-1,
	  			kv:-1,
	  			tv:-1
	  		}
	  	})
	  },
  	/**
	   * @method 搜索音乐(推荐，包括songs单曲、artists歌手、albums专辑、mvs、playlists歌单)
	   * @param keywords 关键词
	   * @param type 1为单曲，10为专辑， 100为歌手， 1000为歌单， 1002为用户
	   * @param limit 返回数据限制
	   * @param offset 数据偏移量
	   * @returns response  数据返回值
	   */
	  getSearchSuggestResource (keywords, type, limit, offset) {
	    var type = type || 1;
	    var limit = limit || 20;
	    var offset = offset || 1;
	    var str = "s="+keywords+"&type="+type+"&limit="+limit+"&offset="+offset;
	    return axios.post(SearchSuggestResource, str);
	  },
	  /*
	  * @method 搜索音乐
	  * 搜索单曲(1)，歌手(100)，专辑(10)，歌单(1000)，用户(1002) *(type)*
	  */
	  getSearchResource (keywords, type, limit, offset) {
	    var type = type || 1;
	    var limit = limit || 20;
	    var offset = offset || 1;
	    var str = "s="+keywords+"&type="+type+"&limit="+limit+"&offset="+offset;
	    return axios.post(SearchResource, str);
	  },
	  // 获取专辑内容， id为专辑id
	  getSearchAlbumResource(id){
	  	return axios.get(SearchAlbumResource, {
	  		params:{
	  			id: id
	  		}
	  	})
	  }
}