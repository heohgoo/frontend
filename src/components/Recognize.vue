<template>
   <head>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
   </head>
   <!-- build시 삽입 -->
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
  <button v-if="scene==0" class="recog_btn" @click="recognize">음식 확인</button>
  <div v-if="scene==1" class="recognize"><p class="recog_info"><img class="wait" src="../assets/answer.jpg"/>이 음식은 '{{ foodname }}'인 거 같아요.</p>
  <p class="truefalse" style="margin-top:10px">맞나요? 아니라면,</p><textarea class="truefalse" @click="erase" v-model="wmsg"></textarea>
  </div>
  <button v-if="scene==1" class="submit" @click="[recommend(),loading()]">확인</button>
  <!-- @click="[back, recommend]" -->
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
            foodlist:[],
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
            .post('/predict', frm, 
            {
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            }
            )
            .then((result) => {
                this.foodname = result.data;
                this.$emit('sfood', this.foodname)
                console.log(this.foodname)
            })
            .catch((err) => {
                console.log(err)
            });

        },
        recommend() {
             axios
             .post('/rmfood', { "input_list" : this.selectedfoodlist })
             .then((result) => {
                 console.log(this.selectedfoodlist)
                 console.log(result)
                 this.foodlist = result.data.rmfood;
                 this.$emit('foodlists', this.foodlist)
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
        loading(){
            this.isLoading = false;
        }
    },
}
</script>

<style>
.upload-image {
  height: 450px;
  background: white;
  background-size: cover;
  border-radius:20px;
  box-shadow: 0px 0px 20px rgb(87, 87, 87);
  border: 3px solid rgb(63, 64, 68);
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
    background:rgb(255,244,226); 
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
    font-size: 25px;
    font-family: "Jua", sans-serif;
    margin-left: auto;
    margin-right: auto;
    display: block;
    margin-top: 50px;
    margin-bottom: 0px;
    background:rgb(255,244,226); 
    color: black;
    border-radius:10px;
}
</style>