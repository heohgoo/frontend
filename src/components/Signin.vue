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
    <img src="../assets/moto3.jpg" class="logo2"/>
      <header><h2 style="margin-top:20px; font-size:28px; text-align:center; font-family: 'Noto Sans KR', sans-serif; color:white">회원가입(SignIn)</h2></header>
        <div class="white-bg" v-if="complete == false">
        <img class=le src="../assets/lerror.jpg"/>
        <h4>회원가입 실패!</h4>
        <p>이미 가입한 회원이거나 정보를 잘못 입력하였습니다.</p>
        </div>
        <div class="input-box" style="margin-top:60px;">
          <input
            id="username"
            v-model="inputid"
            type="text"
            name="username"
            placeholder="아이디"
          />
          <label for="username" style="font-family: 'Noto Sans KR', sans-serif;">1.ID</label>
        </div>
        <div class="input-box">
          <input
            id="password"
            v-model="inputpw"
            type="password"
            name="password"
            placeholder="비밀번호"
          />
          <label for="password" style="font-family: 'Noto Sans KR', sans-serif;">2.비밀번호</label>
        </div>
        <div class="input-box">
          <input
            id="password2"
            v-model="inputpw2"
            type="password"
            name="password2"
            placeholder="비밀번호확인"
          />
          <label for="password2" style="font-family: 'Noto Sans KR', sans-serif;">3.비밀번호확인</label>
        </div>
        <p style="margin-top:0px; font-size:14px; font-family: 'Noto Sans KR', sans-serif; color:white; text-align:center">#아래는 정확한 추천 결과를 보장하기 위해 수집하는 정보들입니다.</p>
        <p style="margin-top:0px; font-size:18px; font-family: 'Noto Sans KR', sans-serif; color:white;">4.성별</p>
        <select v-model="gender" class="form-control" style="margin-top:0px; margin-left:2px">
          <option :key="index" :value="item.key" style="font-size:14px; font-family: 'Noto Sans KR', sans-serif; color: black" v-for="(item, index) in genderList">{{ item.value }}</option> 
        </select>
        <p style="margin-top:20px; font-size:18px; font-family: 'Noto Sans KR', sans-serif; color:white;">5.연령대</p>
        <select v-model="age" class="form-control" style="margin-top:0px; margin-left:2px">
          <option :key="index" :value="item.key" style="font-size:14px; font-family: 'Noto Sans KR', sans-serif; color: black" v-for="(item, index) in ageList">{{ item.value }}</option> 
        </select>
        <!-- <p style="margin-top:20px; font-size:18px; font-family: 'Do Hyeon', sans-serif; color:white;">6.평소 선호하던 음식(아래 선택지들 중 하나를 골라주세요.)</p>
        <select class="form-control" style="margin-top:0px; margin-left:2px">
          <option :key="index" :value="item.key" style="font-size:14px; font-family: 'Do Hyeon', sans-serif; color: black" v-for="(item, index) in foodList">{{ item.value }}</option> 
        </select> -->
        <div>
        <p style="margin-top:20px; font-size:18px; font-family: 'Noto Sans KR', sans-serif; color:white;">6.평소 선호하는 음식류(여러 개를 선택할 수 있어요.)</p>
        <div style="margin-top:20px; font-size:15px; font-family: 'Noto Sans KR', sans-serif; color:white; text-align:center">
        <input type="checkbox" v-model="checkedValues" id="국밥" name="국밥" value="국밥류">국밥류
        <input type="checkbox" v-model="checkedValues" id="탕찌개" name="탕찌개" value="탕찌개류">탕/찌개류
        <input type="checkbox" v-model="checkedValues" id="고기" name="고기" value="고기류">고기류
        <input type="checkbox" v-model="checkedValues" id="중식" name="중식" value="중식">중식
        <input type="checkbox" v-model="checkedValues" id="양식" name="양식" value="양식">양식
        <input type="checkbox" v-model="checkedValues" id="샐러드" name="샐러드" value="샐러드">샐러드 <br>
        <input type="checkbox" v-model="checkedValues" id="패스트푸드" name="패스트푸드" value="패스트푸드">패스트푸드
        <input type="checkbox" v-model="checkedValues" id="분식" name="분식" value="분식">분식
        </div>
        <!-- {{ checkedValues }} -->
      </div>
    </div>
      <div>
      <button class="loginbtn" style="font-family: 'Noto Sans KR', sans-serif; margin-bottom:20px; border:2px solid black" @click="register">확인</button>
      </div>
      <p><br></p>
    </body>
  </html>
</template>

<script>
import axios from "axios";

export default {
  name: "Signin",
  data(){
    return {
      checkedValues : [],
      complete: true,
      inputid: "",
      inputpw: "",
      inputpw2: "",
      gender: "",
      age: "",
      genderList: [
        {
          key: "남성",
          value: "남자",
        },
        {
          key: "여성",
          value: "여자",
        }
      ],
      ageList: [
        {
          key: "10",
          value: "10대",
        },
        {
          key: "20",
          value: "20대",
        },
        {
          key: "30",
          value: "30대",
        },
        {
          key: "40",
          value: "40대",
        },
        {
          key: "50",
          value: "50대",
        },
        {
          key: "60",
          value: "60대 이상",
        },
      ],
      // foodList: [
      //   {
      //     key: "국밥",
      //     value: "국밥류",
      //   },
      //   {
      //     key: "탕",
      //     value: "탕류",
      //   },
      //   {
      //     key: "마라탕",
      //     value: "마라탕",
      //   },
      //   {
      //     key: "찌개",
      //     value: "찌개류",
      //   },
      //   {
      //     key: "고기",
      //     value: "고기구이",
      //   },
      //   {
      //     key: "까스",
      //     value: "까스류",
      //   },
      //   {
      //     key: "중식면",
      //     value: "중식(면류)",
      //   },
      //   {
      //     key: "중식밥",
      //     value: "중식(밥류)",
      //   },
      //   {
      //     key: "샐러드",
      //     value: "샐러드",
      //   },
      //   {
      //     key: "치킨",
      //     value: "치킨",
      //   },
      //   {
      //     key: "피자",
      //     value: "피자",
      //   },
      //   {
      //     key: "햄버거",
      //     value: "햄버거",
      //   },
      //   {
      //     key: "양식",
      //     value: "양식(면류)",
      //   },

      // ],
    }
  },
  methods: {
    register() {
      // console.log(this.inputid)
      // console.log(this.inputpw)
      // console.log(this.inputpw2)
      // console.log(this.gender)
      // console.log(this.age)
      axios.post('https://www.foodwebrs.com/user/register', { "username":this.inputid, "password":this.inputpw, "password2":this.inputpw2, "gender":this.gender, "age":this.age, "foodtype":this.checkedValues })
      // axios.post('/user/register', { "username":this.inputid, "password":this.inputpw, "password2":this.inputpw2, "gender":this.gender, "age":this.age })
      .then((result) => {
      console.log(result)
      if (result.data.code == 200){
        this.$emit("change", 0)
      }
      else{
        this.$emit("change", 5)
        this.inputid = ""
        this.inputpw = ""
        this.inputpw2 = ""
        this.complete = false
        setTimeout(() => {
          this.complete = true
        }, 2000);
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
  margin-top:10px;
  padding-bottom: 50px;
  background-color:rgb(57,61,72);
  border: 1.5px solid rgb(63, 64, 68);
  border-radius:10px;
  box-shadow: 0px 0px 20px rgb(87, 87, 87);
  border: 3px solid rgb(63, 64, 68);
}

.logo2{
    margin-top:20px;
    margin-left:auto;
    margin-right:auto; 
    width:200px; 
    height:100px; 
    display:block; 
}

.loginbtn {
    width:100px; 
    margin:auto; 
    display:block; 
    font-size:15px; 
    font-family:'Gowun Dodum', sans-serif;
    background:rgb(255,244,226); 
    color: black;
    border-radius:20px;
    border: 1px solid rgb(63, 64, 68);
}

.signin {
    border-radius:10px;
    float:right; 
    font-size:20px; 
    font-family:'Gowun Dodum', sans-serif;
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
  font-family: 'Gowun Dodum', sans-serif;
  text-align: center;
  color:black;
  border-radius: 8px;
  padding: 20px;
} 
.login {
  width: 100%;
  margin-top:10px;
  padding-bottom: 50px;
  background-color:rgb(57,61,72);
  border: 1.5px solid rgb(63, 64, 68);
  border-radius:10px;
  box-shadow: 0px 0px 20px rgb(87, 87, 87);
}

.logo2{
    margin-top:20px;
    margin-left:auto;
    margin-right:auto; 
    width:230px; 
    height:100px; 
    display:block; 
    border-radius:20px;
}

.loginbtn {
    width:200px; 
    margin:auto; 
    display:block; 
    font-size:30px; 
    font-family:'Gowun Dodum', sans-serif;
    background:rgb(255,244,226); 
    border-radius:20px;
    border: 1px solid rgb(63, 64, 68);
}

.signin {
    border-radius:10px;
    float:right; 
    font-size:20px; 
    font-family:'Gowun Dodum', sans-serif;
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