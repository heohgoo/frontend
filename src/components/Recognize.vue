<template>
   <!-- <head>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
   </head> -->
   <!-- build시 삽입 -->
   <div style="background-color:rgb(255,244,226); border:2px solid black; border-radius:10px;">
  <div class="upload-image" :style="`background-image:url(${foodimage})`">
  <div class="d-flex justify-content-center">
  <button v-if="isLoading==false" class="btn btn-dark" type="button" style="margin-top:40%" disabled>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  로딩 중...
  </button>
  </div>
  <!-- <div v-if="isLoading==false" class="d-flex justify-content-center" style="margin-top:40%">
  <div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
  </div>
  </div> -->
  </div>
  <img v-if="scene==0" src="../assets/딥러닝.png" style="width:70px; display:block; margin:0px auto; margin-top:20px; border:2px solid black;"/>
  <p v-if="scene==0" style="text-align:center; margin-top:20px; font-family:'Noto Sans KR', sans-serif;">한 번 확인해볼까요? 아래 (돋보기) 버튼을 누르세요</p>
  <svg v-if="scene==0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16" style="display:block; margin-top:40px; margin:0px auto; width:50px; height:50px;">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
</svg>
  <button v-if="scene==0" class="recog_btn" style="margin-top:40px;" @click="recognize">
    <img src="../assets/확인.png" style="width:40px; display:block; margin:0px auto;"/></button>
  <div v-if="scene==1" class="recognize"><p class="recog_info"><img class="wait" src="../assets/answer.jpg"/>이 음식은 '{{ foodname }}'인 거 같아요.</p>
  <p class="truefalse" style="margin-top:10px; margin-left:45px;">맞나요? 아니라면,</p><textarea class="truefalse" @click="erase" style="display:block; margin:0px auto;" v-model="wmsg"></textarea>
  </div>
  <button v-if="scene==1" class="submit" @click="recommend"><img src="../assets/완료.png" style="width:40px; display:block; margin:0px auto;"/></button>
  <!-- <button v-if="scene==1" class="submit" @click="[recommend(),loading()]">확인</button> -->
  <!-- @click="[back, recommend]" -->
  <p><br></p>
</div>
</template>

<script>
import axios from "axios";
// import Recommend from "./Recommend.vue";

export default {
    name : "Recognize",
    data(){
        return {      
            foodname : "",
            scene:0,
            wmsg:"음식 이름을 적어주세요.",
            cbfoodlist:[],
            cbfoodurl:[],
            isLoading: true,
        }
    },
    props : {
        foodimage: String,
        foodfile: Object,
        selectedfoodlist: Array,
    },
    methods : {
        recognize() {
            this.scene += 1;
            var frm = new FormData();
            console.log(this.foodfile)
            frm.append('file', this.foodfile[0])
            console.log(this.foodfile[0])
            axios
            // .post('/predict', frm, 
            .post('https://www.foodwebrs.com/predict', frm, 
            {
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            }
            )
            .then((result) => {
                this.foodname = result.data.class_name;
                this.$emit('sfood', this.foodname)
                console.log(this.foodname)
            })
            .catch((err) => {
                console.log(err)
            });

        },
        recommend() {
            this.isLoading = false;
            if (this.wmsg != ""&& this.wmsg !="음식 이름을 적어주세요."){
                this.$emit('erasefood')
                this.$emit('sfood', this.wmsg)
            }
            axios
            //.post('/cbfalgorithm', { "input_list" : this.selectedfoodlist })
            .post('https://www.foodwebrs.com/CBFalgorithm', { "food_list" : this.selectedfoodlist })
            .then((result) => {
                 console.log(this.selectedfoodlist)
                 console.log(result)
                 this.cbfoodlist = result.data.rmlist
                 this.cbfoodurl = result.data.urllist
                 console.log(this.cbfoodlist)
                 this.$emit('cbfoodlists', this.cbfoodlist)
                 this.$emit('cbfoodurl', this.cbfoodurl)
                 this.$emit('back', 1)
                 this.isLoading = true;
            })
            .catch((err)=>{
            console.log(err)
        }) 
        },
        erase(){
            this.wmsg="";
        },
        // loading(){
        //    this.isLoading = false;
        // } 
    },
}
</script>

<style>
.upload-image {
  height: 320px;
  width: 320px;
  background: white;
  background-size: cover;
  border-radius:10px;
  border: 0px solid rgb(63, 64, 68);
  display : block;
  margin: 0px auto;
}

.recognize {
    margin-top: 20px;
    width: 100%;
    padding-bottom:50px;
    border-radius:20px;
    background-color: white;
    border: 3px solid rgb(63, 64, 68);
}

.truefalse {
    text-align: left;
    font-size:15px;
    margin-left:10px;
    width:80%;
    font-family: 'Gowun Dodum', sans-serif; 
}

.submit {
    text-align: center;
    margin-left:auto;
    margin-right:auto;
    margin-top:10px;
    display:block;
    width:150px;
    font-size:25px;
    border-radius:20px;
    border: 3px solid rgb(63, 64, 68);
    background:rgba(241, 241, 241); 
    color: black;
    font-family: "Jua", sans-serif;
}

.recog_info {
    text-align: center;
    font-size: 20px;
    font-family: 'Gowun Dodum', sans-serif;
}

.recog_btn {
    width: 60%;
    text-align: center;
    font-size: 30px;
    font-family: 'Noto Sans KR', sans-serif;
    margin-left: auto;
    margin-right: auto;
    display: block;
    margin-top: 50px;
    margin-bottom: 0px;
    background:rgb(255,255,255); 
    color: black;
    border-radius:10px;
}
</style>