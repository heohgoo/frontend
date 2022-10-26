<template>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <div class="header">
    <ul class="header-button-right">
    </ul>
    <img src="./assets/applogo.jpg" class="logo" @click="first"/>
    <ul class="header-button-left">
      <button v-if="num >= 1 && num != 4 && num != 5" @click="num -= 1" class="backbtn">&lt;뒤로</button>
    </ul>
    </div>
  <Login v-if="num == 0" @change="change" @signin="signin"/>
  <Select v-if="num == 1"  num="num" @change="change" @move="move" @recog="recog" @foodupload="foodupload" :foodimage="foodimage"/>
  <!-- <Recommend v-if="num == 2" num="num" @change="change" /> -->
  <Recommend v-if="num == 2" num="num" :foodlist="foodlist" @change="change"></Recommend>
  <Satisfaction v-if="num == 3" num="num" @change="change"/>
  <Recognize v-if="num == 4" num="num" :foodimage="foodimage" :foodfile="foodfile" @back="back" @foodlists="foodlists" @sfood="sfood" @erasefood="erasefood" :selectedfoodlist="selectedfoodlist"/>
  <Signin v-if="num == 5" num="num" @change="change"/>
  <!-- @foodlists="foodlists" -->

</template>



<script>
import Login from './components/Login.vue';
import Select from './components/Select.vue';
import Recommend from './components/Recommend.vue';
import Satisfaction from './components/Satisfaction.vue';
import Recognize from './components/Recognize.vue';
import Signin from './components/Signin.vue';

export default {
  name: 'App',
  data(){
    return {
      num : 0,
      foodimage : "",
      foodfile: "",
      foodlist: ['탕수육', '햄버거', '치킨'],
      selectedfoodlist: [],
    }
  },
  components: {
    Login,
    Select,
    Recommend,
    Satisfaction,
    Recognize,
    Signin
  },
  methods: {
    signin(value){ 
      this.num=value;
    },

    change(value){ 
      this.num=value;
    },

    move(value){
      this.num=value;
    },

    recog(value){
      this.foodimage=value;
    },

    back(value) {
      this.num=value;
    },

    first(){
      this.num = 0
      this.selectedfoodlist.splice(0, this.selectedfoodlist.length)
    },

    foodupload(value) {
      this.foodfile = value;
    },

    foodlists(value) {
      this.foodlist = value;
    },

    sfood(value) {
      this.selectedfoodlist.push(value);
    },

    erasefood() {
      this.selectedfoodlist.splice(this.selectedfoodlist.length-1, 1)
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
  background:rgb(255,244,226); 
  color:black;
  border: 1px solid rgb(63, 64, 68);
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
  color: rgb(82, 200, 247);
  font-family: 'Jua', sans-serif;
  float: right;
  width: 60px;
  cursor: pointer;
  margin-top: 60px;
  margin-right: 20px;
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

.backbtn{
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
  background-color: rgb(255, 255, 255);
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: rgb(82, 200, 247);
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
  color: rgb(82, 200, 247);
  font-family: 'Jua', sans-serif;
  float: right;
  width: 60px;
  cursor: pointer;
  margin-top: 60px;
  margin-right: 20px;
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

