<template>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <div class="header">
    <ul class="header-button-right">
    </ul>
    <img src="./assets/applogo.jpg" class="logo" @click="first"/>
    <ul class="header-button-left">
      <div class="d-flex">
  <div class="dropdown me-1" v-if="num==1">
    <button type="button" class="btn btn-secondary dropdown-toggle" id="dropdownMenuOffset" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20">
      Menu
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuOffset">
      <li><a class="dropdown-item" href="#" @click="removerecent">1.최근 선택한 음식을 리스트에서 지우기</a></li>
      <li><a class="dropdown-item" href="#" @click="removelist">2.음식 리스트 모두 지우기</a></li>
    </ul>
  </div>
</div>
      <button v-if="num > 1 && num != 4 && num != 5 && num != 3" @click="num -= 1" class="backbtn" style="font-weight:bold;">&lt;뒤로</button>
    </ul>
    <ul class="header-button-right">
      <div style="font-family:'Roboto Mono', monospace; font-weight:bold;">
      ID:
      {{ id }}
      </div>
    </ul>
    </div>
  <div>
    <div class="black-bg2" v-if="this.usagemodal==true">
      <div class="white-bg2" style="text-align:center; font-family:'Gowun Dodum', sans-serif;">
        <h4>사용설명서/작동 방식</h4>
        <p>1. '회원가입' 버튼을 눌러 회원가입을 한다.</p>
        <p>2. 회원가입 시 사용한 ID/패스워드로 로그인한다.</p>
        <p>3. '음식 사진 선택' 버튼을 눌러 갤러리 내의 음식 사진을 불러온다.</p>
        <p>4. 음식 사진 인식이 잘못된 경우 텍스트로 음식명을 입력하고 음식 사진 인식이 잘 됬으면 체크 버튼을 누른다.</p>
        <p>5. '음식 추천' 버튼을 입력하여 음식을 추천받는다.</p>
        <p>6. 음식 이미지 버튼을 클릭하면 음식에 대한 정보가 나오고, '좋아요' 버튼을 입력받을 수 있다.</p>
        <p>7. '리뷰 남기기' 버튼을 입력하고, 리뷰를 작성한 후 '제출' 버튼을 누르면, 초기 페이지로 돌아온다.</p>
        <button @click="closeum">확인</button>
      </div>
    </div>
    <div class="black-bg2" style="text-align:center; font-family:'Gowun Dodum', sans-serif;" v-if="this.helpmodal==true">
      <div class="white-bg2">
        <h4>도움말</h4>
        <p>음식 사진 인식과 사용자 정보를 통한<br>Content-based filtering, Collaborative filtering 기반<br>음식 추천 웹 어플리케이션</p>
        <button @click="closehm">확인</button>
      </div>
    </div>
  <Login v-if="num == 0 && this.usagemodal == false && this.helpmodal == false" @change="change" @signin="signin" @idinput="idinput"/>
  <Select v-if="num == 1" :id="id" num="num" @change="change" @move="move" @cflist="cflist" @cffood="cffood" @recog="recog" @foodupload="foodupload" @removelist="removelist" :foodimage="foodimage" :selectedfoodlist="selectedfoodlist"/>
  <!-- <Recommend v-if="num == 2" num="num" @change="change" /> -->
  <Recommend v-if="num == 2" num="num" :id="id" :cffoodlist="cffoodlist" :cfurllist="cfurllist" :cbfoodlist="cbfoodlist" :cburllist="cburllist" @sendresult="sendresult" @change="change"></Recommend>
  <Satisfaction v-if="num == 3" :id="id" num="num" :loverate="loverate" @change="change"/>
  <Recognize v-if="num == 4" num="num" :foodimage="foodimage" :foodfile="foodfile" @back="back" @cbfoodlists="cbfoodlists" @cbfoodurl="cbfoodurl" @sfood="sfood" @erasefood="erasefood" :selectedfoodlist="selectedfoodlist"/>
  <Signin v-if="num == 5 && this.usagemodal == false && this.helpmodal == false" num="num" @change="change"/>
  <!-- @foodlists="foodlists" -->
  <Footer @um="um" @hm="hm"/>
  </div>
</template>



<script>
import Login from './components/Login.vue';
import Select from './components/Select.vue';
import Recommend from './components/Recommend.vue';
import Satisfaction from './components/Satisfaction.vue';
import Recognize from './components/Recognize.vue';
import Signin from './components/Signin.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  data(){
    return {
      num : 0,
      foodimage : "",
      foodfile: "",
      foodlist: ['탕수육', '햄버거', '치킨'],
      selectedfoodlist: [],
      id: "",
      cffoodlist : [],
      cfurllist : [],
      cbfoodlist : [],
      cburllist : [],
      usagemodal : false,
      helpmodal : false,
      loverate : 0,
    }
  },
  components: {
    Login,
    Select,
    Recommend,
    Satisfaction,
    Recognize,
    Signin,
    Footer,
  },
  methods: {
    signin(value){ 
      this.num=value;
    },

    um(value){
      this.usagemodal=value;
    },

    closeum(){
      this.usagemodal=false;
    },

    hm(value){
      this.helpmodal=value;
    },

    closehm(){
      this.helpmodal=false;
    },

    change(value){ 
      this.num=value;
    },

    idinput(value){
      this.id=value;
    },

    move(value){
      this.num=value;
    },

    recog(value){
      this.foodimage=value;
    },

    cflist(value){
      this.cfurllist=value;
    },

    cffood(value){
      this.cffoodlist=value;
    },

    back(value) {
      this.num=value;
    },

    first(){
      this.num = 0
      this.id = ""
      this.selectedfoodlist.splice(0, this.selectedfoodlist.length)
    },

    foodupload(value) {
      this.foodfile = value;
    },

    cbfoodlists(value) {
      this.cbfoodlist = value;
    },

    cbfoodurl(value) {
      this.cburllist = value;
    },

    sfood(value) {
      this.selectedfoodlist.push(value);
    },

    erasefood() {
      this.selectedfoodlist.splice(this.selectedfoodlist.length-1, 1)
    },

    removelist() {
      this.selectedfoodlist = []
    },

    removerecent() {
      this.selectedfoodlist.pop()
    },

    sendresult(value) {
      this.loverate = value;
      console.log(this.loverate)
    }
    
  }
}
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}

.backbtn{
  border-radius:5px; 
  height:30px;
  background:rgb(255,244,226); 
  color:black;
  border: 1px solid rgb(63, 64, 68);
}

.white-bg2 {
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
} 

.black-bg2 {
  width: 100%; height:70%;
  background: rgba(0,0,0,0.5);
  position: absolute; 
  padding:20px;
  margin:auto;
}

.logo {
  width: 200px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 8px;
}
.header {
  width: 100%;
  height: 150px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: rgb(82, 200, 247);
  font-style: bold;
  float: left;
  width: 80px;
  font-size:11px;
  padding-left: 15px;
  font-family: 'Gowun Dodum', sans-serif;
  cursor: pointer;
  margin-top: 40px;
}
.header-button-right {
  color: rgb(0, 0, 0);
  font-family: 'Jua', sans-serif;
  float: right;
  width: 60px;
  margin-top: 40px;
  margin-left: -15px;
  margin-right: 0px;
}

#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}

@media (min-width:410px) {
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}

.white-bg2 {
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
} 

.black-bg2 {
  width: 410px; height:100%;
  background: rgba(0,0,0,0.5);
  position: absolute; 
  padding:20px;
  margin:auto;
}

.backbtn{
  height:40px;
  border-radius:5px; 
  background:rgb(255,244,226); 
  color:black
}

.logo {
  width: 200px;
  margin: auto;
  display: block;
  position: absolute;
  left: 40px;
  right: 40px;
  top: 8px;
}
.header {
  width: 100%;
  height: 150px;
  background-color: rgb(255,255,255);
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: black;
  font-style: bold;
  float: left;
  width: 80px;
  font-size:13px;
  padding-left: 15px;
  font-family: 'Gowun Dodum', sans-serif;
  cursor: pointer;
  margin-top: 40px;
}
.header-button-right {
  color: black;
  font-family: 'Jua', sans-serif;
  float: right;
  margin-top: 40px;
  margin-left: -15px;
  margin-right: 0px;
}

#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
}

@media (min-width:500px) {
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}

.white-bg2 {
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
} 

.black-bg2 {
  width: 460px; height:100%;
  background: rgba(0,0,0,0.5);
  position: absolute; 
  padding:20px;
  margin:auto;
}

.backbtn{
  height:40px;
  border-radius:5px; 
  background:rgb(255,244,226); 
  color:black
}

.logo {
  width: 200px;
  margin: auto;
  display: block;
  position: absolute;
  left: 40px;
  right: 40px;
  top: 8px;
}
.header {
  width: 100%;
  height: 150px;
  background-color: rgb(255,255,255);
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: black;
  font-style: bold;
  float: left;
  width: 80px;
  font-size:13px;
  padding-left: 15px;
  font-family: 'Gowun Dodum', sans-serif;
  cursor: pointer;
  margin-top: 40px;
}
.header-button-right {
  color: black;
  font-family: 'Jua', sans-serif;
  float: right;
  margin-top: 40px;
  margin-left: -15px;
  margin-right: 0px;
}

#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
}
</style>

