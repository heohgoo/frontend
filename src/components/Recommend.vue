<template>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <!-- <div class="black-bg" v-if="modal == true">
      <div class="white-bg">
        <h4>{{ foodname }}</h4>
        <img :src='`${foodimgurl}`' style="width:35%">
        <p>칼로리(1인분 기준) : </p>
        <p>음식 설명</p>
        <button @click="close">확인</button>
        <button style="margin-left:20px" @click="close">근처 맛집 찾기</button>
      </div>
    </div> -->
  <div class="recommend">
    <div class="black-bg" v-if="modal == true">
      <div class="white-bg">
        <h4>
        <img :src='`${foodimgurl}`' style="width:50%; border-radius:10px;"></h4>
        <button v-if="this.good==false && !this.selectedfoodlist.includes(this.foodname)" style="border-radius:10px; border:2px solid rgb(63, 64, 68); background-color: rgb(250, 250, 252); font-size:20px; margin:0px auto;"
        @click="selectgood">
            <img src="../assets/좋아요.png" style="width:20px; height:20px;"/>좋아요</button> 
        <p>칼로리(1인분 기준) : </p>
        <p>음식 설명</p>
        <button @click="close" style="border-radius:5px; background:white;">확인</button>
        <button style="margin-left:20px; border-radius:5px; background:white;" @click="close">주변 맛집 찾기</button> 
      </div>
    </div>
      <h2 class="headerlist">당신의 취향을 중점으로 추천해주는 음식들이에요.</h2>
      <div class="foods">
        <div class="food-1" v-for="(a,i) in cbfoodlist" :key="i" :style="{ backgroundImage: `url(${ cburllist[i] })`}" @click="selected(cburllist[i], cbfoodlist[i])">
        <span style="font-family: 'Noto Sans KR', sans-serif; color: white; background:black;">{{ cbfoodlist[i] }}</span>
        <!-- <input type="checkbox" style="width:20px; height:20px;" @click="close"/> -->
        <slot></slot>
        </div>
    </div>
        <h4 class="headerlist">당신과 음식 취향이 비슷한 사람들이 만족했던 음식들이에요.</h4>
        <div class="foods">
        <div class="food-1" v-for="(a,i) in cffoodlist" :key="i" :style="{ backgroundImage: `url(${ cfurllist[i] })`}" @click="selected(cfurllist[i], cffoodlist[i])">
        <span style="font-family: 'Noto Sans KR', sans-serif; color: white; background:black">{{ cffoodlist[i] }}</span>
        <!-- <input type="checkbox" style="width:18px; height:18px;"/> -->
        <slot></slot>
        </div>
    </div>
    <!-- <button class="rebutton" @click="a">다시추천</button> -->
    <p class="tipletter" style="text-align:center; font-family:'Noto Sans KR', sans-serif;"><br><br><br>마음에 드는 음식이 있으면 음식 이미지를 누르세요!</p>
    <button class="newbutton" style="margin-top:0px; margin-right:20px; font-family:'Noto Sans KR', sans-serif; background:white;" @click="next">리뷰 남기기</button>
  </div>
  <div class="footer">
        <div class="tip">
            <p class="tipletter" style="font-family:'Noto Sans KR', sans-serif; font-size:13px"><img class="tipimg" src="../assets/꿀팁.jpg">한 줄의 리뷰는 추천 알고리즘 최적화에 좋은 정보가 됩니다.</p>
        </div>  
        <p><br></p>
        <!-- <button class="newbutton" style="margin-top:0px; font-family:'Noto Sans KR', sans-serif;" @click="next">리뷰 남기기</button>  -->
    </div>
</template>

<script>
// import axios from "axios"

export default {
    name : 'Recommend',
    data(){
        return{
          modal:false,
          foodname:"",
          foodimgurl:"",
          good:false,
          selectedfoodlist:[],
        }
    },
    props: {
      foodlist : Array,
      cffoodlist : Array,
      cfurllist : Array,
      cbfoodlist : Array,
      cburllist : Array,
      id : String,
    },
    methods: {
        next(){
            this.$emit('change', 3);
            this.$emit('sendresult', this.selectedfoodlist.length*100/(this.cbfoodlist.length+this.cffoodlist.length))
            console.log(this.selectedfoodlist)
            console.log(this.id)
            this.selectedfoodlist = [];
            // axios.post('https://www.foodwebrs.com/', { "username":this.id, "selectedfoodlist":this.selectedfoodlist })
            // .then((result) => {
            // console.log(result)
            // }) 
            // .catch((err)=>{
            //   console.log(err)
            // })
        },
        selected(foodimgurl, food){
          this.modal = true
          this.foodname = food
          this.foodimgurl = foodimgurl
          console.log(this.foodimg)
        },
        close(){
          this.modal = false
          this.good = false
        },
        selectgood(){
          this.good = true
          this.selectedfoodlist.push(this.foodname)
        },
    }

}
</script>

<style>
/* body {
  margin : 0;
}
div {
  box-sizing: border-box;
}

.black-bg {
  width: 100%;
  height:70%;
  background: rgba(0,0,0,0.5);
  padding: 20px;
}
.white-bg {
  width: 60%;
  background: white;
  border-radius: 8px;
  padding: 20px;
} 

.headerlist{
  font-size:15px; 
  margin-top:10px; 
  margin-left:10px;
  font-weight:bold;
}


.tip{
  width: 100%;
  height: 80px;
  margin-top: 50px;
  background-color: rgb(255, 212, 39);
  box-shadow: 0px 0px 20px rgb(87, 87, 87);
}

.recommend{
  margin-top:20px;
  padding-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
  border: 2px solid rgb(63, 64, 68);
  border-top-right-radius:30px;
  font-family: 'Gowun Dodum', sans-serif;
  background-color: white;
  box-shadow: 0px 0px 20px rgb(87, 87, 87);
  background:rgb(255, 244, 226);
}

.tipletter{
    font-size:12px; 
    font-family: 'Jua', sans-serif; 
    color:rgb(48,14,0);
}

.tipimg{
  width: 80px;
  height: 80px;
  margin: auto;
  display:inline-block;
  vertical-align: middle;
}



.tipbar{
  width: 80px;
  height: 80px;
  display: block;
  margin: auto;
  font-size:20px;
  left: 0;
  right: 0;
  top: 10px;
  margin-left:10px;
  float:left
}
.footer {
  margin-top: 40px;
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 20px;
  background-color: white;
}

.newbutton{
    width:120px;
    height:50px;
    text-align: center;
    font-size: 10px;
    margin-left:260px;
    border-radius:20px;
    font-family: 'Gowun Dodum', sans-serif;
    background: rgb(255,244,226);
    box-shadow: 0px 0px 20px rgb(145, 144, 144);
    float: right;
    font-size: 15px;
    padding-bottom:5px;
}

.rebutton{
    background:black; 
    color:white;
    box-shadow: 0px 0px 20px rgb(255, 255,255); 
    width:80px; font-size:13px; 
    margin-left:295px;
    border-radius:5px;
    float: right;
}



.complete{
    margin-top: 40px;
    font-family: 'Gowun Dodum', sans-serif;
    width: 20px;
    height: 20px;
}

.food-1 {
width: 50px;
height: 50px;
border-radius:10%;
background-color: white;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : white;
background-size: cover;
border: 1.5px solid rgb(63, 64, 68);
}

.foods {
  overflow-x: scroll;
  white-space: nowrap;
}

.foods::-webkit-scrollbar {
  height: 5px;
}
.foods::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.foods::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.foods::-webkit-scrollbar-thumb:hover {
  background: #555;
} */


@media screen and (min-width:410px) {
body {
  margin : 0;
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 390px; height:70%;
  background: rgba(0,0,0,0.5);
  position: absolute; 
  padding:20px;
  margin:auto;
}
.white-bg {
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
} 

.headerlist{
  font-size:15px; 
  margin-top:10px; 
  margin-left:10px;
  font-weight:bold;
}

.list{
  font-size:30px; 
  margin-top:10px; 
  margin-left:10px;
}

.tip{
  width: 100%;
  height: 80px;
  margin-top: 50px;
  background-color: rgb(255, 212, 39);
  box-shadow: 0px 0px 20px rgb(87, 87, 87);
}


.recommend{
  margin-top:20px;
  padding-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
  border: 2px solid rgb(63, 64, 68);
  border-top-right-radius:30px;
  font-family: 'Gowun Dodum', sans-serif;
  background-color: white;
  box-shadow: 0px 0px 20px rgb(87, 87, 87);
  background:rgb(255, 244, 226);
}
.tipletter{
    font-size:15px; 
    font-family: 'Jua', sans-serif; 
    color:rgb(48,14,0);
    
}

.tipimg{
  width: 80px;
  height: 80px;
  margin: auto;
  display:inline-block;
  vertical-align: middle;
}

.tipbar{
  width: 80px;
  height: 80px;
  display: block;
  margin: auto;
  left: 0;
  right: 0;
  top: 10px;
}
.footer {
  margin-top: 0px;
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 20px;
  background-color: white;
}

.newbutton{
    width:120px;
    height:50px;
    text-align: center;
    font-size: 15px;
    margin-left:260px;
    border-radius:10px;
    padding-bottom:5px;
    font-family: 'Gowun Dodum', sans-serif;
    background: rgb(255,244,226);
    box-shadow: 0px 0px 20px rgb(145, 144, 144);
    float: right;
}

.rebutton{
    background:black; 
    color:white;
    box-shadow: 0px 0px 20px rgb(255, 255,255); 
    width:80px; 
    font-size:13px; 
    border-radius:5px;
    margin-left:295px;
    float: right;
}



.complete{
    margin-top: 40px;
    font-family: 'Gowun Dodum', sans-serif;
    width: 20px;
    height: 20px;
}

.food-1 {
width: 300px;
height: 300px;
border-radius:10%;
/* background-image: url(https://m.convenii.com/web/upload/NNEditor/20210810/mobile/59ce28fbdad73f939a444d57f286bb1a_1628586790.jpg); */
background-color: white;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : black;
background-size: cover;
border: 1.5px solid rgb(63, 64, 68);
}

.foods {
  overflow-x: scroll;
  white-space: nowrap;
}

.foods::-webkit-scrollbar {
  height: 5px;
}
.foods::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.foods::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.foods::-webkit-scrollbar-thumb:hover {
  background: #555;
}
}

@media screen and (min-width:500px) {
body {
  margin : 0;
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 435px; height:70%;
  background: rgba(0,0,0,0.5);
  position: absolute; 
  padding:20px;
  margin:auto;
}
.white-bg {
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
} 

.headerlist{
  font-size:15px; 
  margin-top:10px; 
  margin-left:10px;
  font-weight:bold;
}

.list{
  font-size:30px; 
  margin-top:10px; 
  margin-left:10px;
}

.tip{
  width: 100%;
  height: 80px;
  margin-top: 50px;
  background-color: rgb(255, 212, 39);
  box-shadow: 0px 0px 20px rgb(87, 87, 87);
}


.recommend{
  margin-top:20px;
  padding-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
  border: 2px solid rgb(63, 64, 68);
  border-top-right-radius:30px;
  font-family: 'Gowun Dodum', sans-serif;
  background-color: white;
  box-shadow: 0px 0px 20px rgb(87, 87, 87);
  background:rgb(255, 244, 226);
}
.tipletter{
    font-size:15px; 
    font-family: 'Jua', sans-serif; 
    color:rgb(48,14,0);
    
}

.tipimg{
  width: 80px;
  height: 80px;
  margin: auto;
  display:inline-block;
  vertical-align: middle;
}

.tipbar{
  width: 80px;
  height: 80px;
  display: block;
  margin: auto;
  left: 0;
  right: 0;
  top: 10px;
}
.footer {
  margin-top: 60px;
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 20px;
  background-color: white;
}

.newbutton{
    width:120px;
    height:50px;
    text-align: center;
    font-size: 15px;
    margin-left:260px;
    border-radius:10px;
    padding-bottom:5px;
    font-family: 'Gowun Dodum', sans-serif;
    background: rgb(255,244,226);
    box-shadow: 0px 0px 20px rgb(145, 144, 144);
    float: right;
}

.rebutton{
    background:black; 
    color:white;
    box-shadow: 0px 0px 20px rgb(255, 255,255); 
    width:80px; 
    font-size:13px; 
    border-radius:5px;
    margin-left:295px;
    float: right;
}



.complete{
    margin-top: 40px;
    font-family: 'Gowun Dodum', sans-serif;
    width: 20px;
    height: 20px;
}

.food-1 {
width: 300px;
height: 300px;
border-radius:10%;
/* background-image: url(https://m.convenii.com/web/upload/NNEditor/20210810/mobile/59ce28fbdad73f939a444d57f286bb1a_1628586790.jpg); */
background-color: white;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : black;
background-size: cover;
border: 1.5px solid rgb(63, 64, 68);
}

.foods {
  overflow-x: scroll;
  white-space: nowrap;
}

.foods::-webkit-scrollbar {
  height: 5px;
}
.foods::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.foods::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.foods::-webkit-scrollbar-thumb:hover {
  background: #555;
}
}

</style>