/**
 * Created by chenyb on 22/10/18.
 * API命名配置列表
 * 命名规则：驼峰式命名方式，动词放前面，名词放后面，
 * 如:addFeatures
 * API命名变量不要太过长
 */
import config from '../config'
let baseUrl
switch (process.env.NODE_ENV) {
  // 生产环境
  case 'production':
    baseUrl = config.baseUrl.pro
    break
  // 预生产环境
  case 'testing':
    baseUrl = config.baseUrl.tes
    break
  default:
    // 开发环境或测试环境
    baseUrl = config.baseUrl.dev
    break
}
export { baseUrl }
export default {
  music_lyric: baseUrl + '/music/lyric',
  sheet_cateList: baseUrl + '/sheet/cateList', // 歌单分类
  sheet_hot_cateList: baseUrl + '/sheet/hot/cateList', // 热门歌单分类
  sheet_detail: baseUrl + '/sheet/detail',
  sheet_advise: baseUrl + '/sheet/advise', // 推荐歌单
  sheet_user: baseUrl + '/sheet/user', // 用户歌单
  sheet_recommend: baseUrl + '/sheet/recommend', // 每日推荐歌单
  sheet_boutique: baseUrl + '/sheet/boutique', // 精品歌单
  search_hot: baseUrl + '/search/hot', // 热搜
  login_cellphone: baseUrl + '/login/cellphone', // 手机密码登陆
  like_music: baseUrl + '/like/music', // 喜欢和取消喜欢
  like_search: baseUrl + '/like/search', // 查询喜欢的歌曲
  music_detail: baseUrl + '/music/detail', // 歌曲详情
  rank_allList: baseUrl + '/rank/allList', // 获取所有榜单
  rank_allRank: baseUrl + '/rank/allRank', // 获取榜单列表
  rank_detail: baseUrl + '/rank/detail', // 获取榜单列表
  rank_topList: baseUrl + '/rank/topList', // 获取榜单详情
  music_new: baseUrl + '/music/new', // 新歌速递
  singer_hot: baseUrl + '/singer/hot', // 热门歌手
  
  
  getBanner: baseUrl + '/banner', // 轮播图
  getPersonalized: baseUrl + '/personalized', // 推荐歌单
  getNewSongs: baseUrl + '/personalized/newsong', // 推荐新音乐
  getPlaylists: baseUrl + '/top/playlist', // 获取歌单
  getTopPlaylists: baseUrl + '/top/playlist/highquality', // 精品歌单
  getSimiPlaylists: baseUrl + '/simi/playlist', // 获取相似歌单
  getCatlist: baseUrl + '/playlist/catlist', // 获取歌单分类
  getListDetail: baseUrl + '/playlist/detail', // 获取歌单详情
  getSongDetail: baseUrl + '/song/detail', // 获取音乐详情
  getLyric: baseUrl + '/lyric', // 获取歌词
  getTopList: baseUrl + '/toplist', // 获取所有榜单
  getTopListDetail: baseUrl + '/toplist/detail', // 获取所有榜单内容摘要
  getTop_list: baseUrl + '/top/list', // 获取热门歌曲
  search: baseUrl + '/search', // 搜索
  searchHot: baseUrl + '/search/hot/detail', // 热搜列表（简略）
  getAlbum: baseUrl + '/album', // 获取专辑内容
}
