<template>
  <ul class="footer flex jc-sa w100pc fixed bott0 bg-fff aic footer">
    <li class="item">
      <router-link to="/index" class="flex2 aic f20 yellow" active-class="active">
        <i class="icon-home iconfont f18 text"></i>
        <p class="mt-5 f12 text">首页</p>
      </router-link>
    </li>
    <li class="item">
      <router-link to="/demo" class="flex2 aic f20 text" active-class="active">
        <van-icon class="text" name="service-o"></van-icon>
        <p class="mt-5 text f12">歌单</p>
      </router-link>
    </li>
    <li class="item">
      <router-link to="/cartt" class="flex2 aic f20 text" active-class="active">
      	<me-progress
	    		:percentage="50"
	    		:strokeWidth="3"
	    		:width="50"
	    		type="circle"
	    		strokeLinecap="round">
	    		<img src="../assets/img/alt.jpg" class="circleImg Rotation" style="width: 40px;height: 40px;" />
	    	</me-progress>
      </router-link>
    </li>
    <li class="item">
      <router-link to="/cart" class="flex2 aic f20 text" active-class="active">
        <van-icon class="text" name="search"></van-icon>
        <p class="mt-5 text f12">搜索</p>
      </router-link>
    </li>
    <li class="item">
      <router-link to="/my" class="flex2 aic f20 text" active-class="active">
        <van-icon class="text" name="user-o"></van-icon>
        <p class="mt-5 text f12">我的</p>
      </router-link>
    </li>
  </ul>
</template>

<script>
import meProgress from '../views/components/me-progress'
export default {
	components: {
		meProgress
	}
}
</script>

<style scoped lang="less">
.footer {
  border-top: 1px solid #ebebeb;
  height: 50px;
  position: fixed;
  bottom: 0;
  width: 100%;
  bottom: 0;
  .text {
    color: #797d82;
  }
  .active .text {
    color: @red;
  }
}
.item{
	position: relative;
}
.circleImg{
	border-radius: 100%;
	opacity: .7;
}
.Rotation{
	-webkit-transform: rotate(360deg);
	animation: rotation 15s linear infinite;
	-moz-animation: rotation 15s linear infinite;
	-webkit-animation: rotation 15s linear infinite;
	-o-animation: rotation 15s linear infinite;
}
@-webkit-keyframes rotation{
	from {-webkit-transform: rotate(0deg);}
	to {-webkit-transform: rotate(360deg);}
}
</style>
