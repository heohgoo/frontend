<template>
<meta name="viewport" content="width=device-width,initial-scale=1">
  <html>
    <head>
      <meta
        name="viewport"
        content="width=device-width, height=device-height, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0"
      />
      <!-- <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> -->
      <!-- build시 삽입 -->
    </head>
    <body>
    <div class="login">
    <img src="../assets/moto4.jpg" class="logo2"/>
      <header><h2 style="margin-top:0px; font-size:30px; text-align:center; font-family: 'Lobster', cursive; color:white">REK:UMMEND</h2></header>
        <div class="white-bg" v-if="verified == false">
        <img class=le src="../assets/lerror.jpg"/>
        <h4>로그인 실패!</h4>
        <p>다시 입력해주세요.</p>
        </div>
        <div class="input-box" style="margin-top:60px;">
          <input
            id="username"
            v-model="inputid"
            type="text"
            name="username"
            placeholder="아이디"
          />
          <label for="username" style="font-family: 'Noto Sans KR', sans-serif;">ID</label>
        </div>
        <div class="input-box">
          <input
            id="password"
            v-model="inputpw"
            type="password"
            name="password"
            placeholder="비밀번호"
          />
          <label for="password" style="font-family: 'Noto Sans KR', sans-serif;">비밀번호</label>
        </div>
        <!-- <div id="signin" class="signin"><button style="border-radius:10px; border: 1px solid rgb(0, 0, 0);font-size:22px; font-family:'Noto Sans KR', sans-serif; background:rgb(255,240,240); text-align:center; " @click="signin">회원가입</button></div> -->
        <button class="loginbtn" style="font-family:'Noto Sans KR', sans-serif; font-size:17px; background-color:rgb(255,244,226); margin-top:40px; border-radius:7px; border:1px solid black; width:100%; height:55px; color:black;" @click="submit">로그인</button>
      <p style="text-align:center; margin-top:20px;"><span style="color:white; text-align:center; margin-top:20px; font-family:'Noto Sans KR', sans-serif;">아직 계정이 없으신가요?</span>
      <span style="color:white; font-family:'Noto Sans KR', sans-serif; text-align:center; text-decoration:underline; color:blueviolet; margin-left:10px; font-size:18px;" @click="signin">회원가입</span></p>
      </div>
      <div>
      </div>
    </body>
  </html>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data(){
    return {
      verified: true,
      inputid: "",
      inputpw: "",
    }
  },
  methods: {
    signin(){
      this.$emit("signin", 5)
    },
    submit() {
      // console.log(this.inputid)
      // console.log(this.inputpw)
      // axios.post('/user/login', { "username":this.inputid, "password":this.inputpw })
      axios.post('https://www.foodwebrs.com/user/login', { "username":this.inputid, "password":this.inputpw })
      .then((result) => {
      console.log(result)
      if (result.data.code == 200){
        this.$emit("change", 1)
        this.$emit("idinput", this.inputid)
      }
      else{
        this.$emit("change", 0)
        this.inputpw = ""
        this.verified = false
        setTimeout(() => {
          this.verified = true
        }, 1300);
      }
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
};

</script>

<style>
@media (min-width:300px) {
body {
  margin : 0;
}
div {
  box-sizing: border-box;
}
.le {
  width: 70px;
  height: 70px;
  display: block;
  margin: auto;
  left: 0;
  right: 0;
  top: 10px;
}
.white-bg {
  width: 100%; background: white;
  font-family: 'Gowun Dodum', sans-serif;
  text-align: center;
  color:black;
  border-radius: 8px;
  padding: 20px;
} 
.login {
  width: 100%;
  margin-top:20px;
  padding-bottom: 50px;
  background-color:black;
  border: 1.5px solid black;
  border-radius:10px;
}

.logo2{
    margin-top:20px;
    margin-left:auto;
    margin-right:auto; 
    width:200px; 
    height:200px; 
    display:block; 
}

.loginbtn {
    width:100px; 
    margin:auto; 
    display:block; 
    font-size:15px; 
    font-family:'Noto Sans KR', sans-serif;
    background:rgb(255,244,226); 
    color: black;
    border-radius:20px;
    border: 1px solid black;
}

.signin {
    border-radius:10px;
    float:right; 
    font-size:40px; 
    font-family:'Noto Sans KR', sans-serif;
    color: black;
}

.input-box {
  position: relative;
  margin: 10px 0;
  background-color: white;
  border-radius: 10px;
}

.input-box > input {
  background: transparent;
  border: none;
  border-bottom: solid 1px #ccc;
  padding: 20px 0px 5px 0px;
  font-size: 14pt;
  width: 100%;
}

input::placeholder {
  color: transparent;
}

input:placeholder-shown + label {
  color: #aaa;
  font-size: 14pt;
  top: 15px;
}
}

input:focus + label,

.label {
  color: #8aa1a1;
  font-size: 10pt;
  pointer-events: none;
  position: absolute;
  left: 0px;
  top: 0px;
  transition: all 0.2s ease;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
}

.input:focus,
.input:not(:placeholder-shown) {
  border-bottom: solid 1px #8aa1a1;
  outline: none;
}  

@media (min-width:410px) {
body {
  margin : 0;
}
div {
  box-sizing: border-box;
}
.le {
  width: 80px;
  height: 80px;
  display: block;
  margin: auto;
  left: 0;
  right: 0;
  top: 10px;
}
.white-bg {
  width: 100%; background: white;
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
  color:black;
  border-radius: 8px;
  padding: 20px;
} 
.login {
  width: 100%;
  margin-top:20px;
  margin-bottom:20px;
  padding-bottom: 20px;
  background-color:black;
  border: 1.5px solid black;
  border-radius:10px;
}

.logo2{
    margin-top:20px;
    margin-left:auto;
    margin-right:auto; 
    width:230px; 
    height:230px; 
    display:block; 
    border-radius:20px;
}

.loginbtn {
    width:200px; 
    margin:auto; 
    display:block; 
    font-size:30px; 
    font-family:'Noto Sans KR', sans-serif;
    background:rgb(255,244,226); 
    border-radius:20px;
    border: 1px solid black;
}

.signin {
    border-radius:10px;
    float:right; 
    font-size:40px; 
    font-family:'Noto Sans KR', sans-serif;
    color: black;
}

.input-box {
  position: relative;
  margin: 10px 0;
  background-color: white;
  border-radius: 10px;
}

.input-box > input {
  background: transparent;
  border: none;
  border-bottom: solid 1px #ccc;
  padding: 20px 0px 5px 0px;
  font-size: 14pt;
  width: 100%;
}

input::placeholder {
  color: transparent;
}

input:placeholder-shown + label {
  color: #aaa;
  font-size: 14pt;
  top: 15px;
}


input:focus + label,

.label {
  color: #8aa1a1;
  font-size: 10pt;
  pointer-events: none;
  position: absolute;
  left: 0px;
  top: 0px;
  transition: all 0.2s ease;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
}

.input:focus,
.input:not(:placeholder-shown) {
  border-bottom: solid 1px #8aa1a1;
  outline: none;
}  
}
</style>