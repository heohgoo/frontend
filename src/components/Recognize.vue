<template>
   <!-- <head>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
   </head> -->
   <!-- build시 삽입 -->
   <div style="background-color:white; border:0px solid black; border-radius:10px;">
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
  <div style="border:0px solid black; border-radius:10px; box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1); margin-top:20px;">
  <img src="../assets/뒤로가기.png" @click="goselect" style="width:40px; margin-left:20px; margin-top:10px; margin-bottom:10px;"/>
  <input
        @change="changefood"
        accept="image/*"
        type="file"
        id="file"
        class="inputfile"
    />
  <label for="file">
  <img v-if="scene==0" src="../assets/다시선택.png" style="width:40px; margin-left:20px; margin-top:10px; margin-bottom:10px;">
  </label>
  <img src="../assets/설명.png"  type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" style="width:40px; margin-left:20px; margin-top:10px; margin-bottom:10px;"/>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" v-if="this.recogmodal==false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header" style="font-family:'Gowun Dodum',sans-serif;">
        <h5 class="modal-title" id="exampleModalLabel" style="text-align:center;">정보</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-px" style="text-align:center; font-size:16px; margin-top:20px; margin-bottom:20px; font-family:'Gowun Dodum', sans-serif;">
        @Microsoft ResNet(Version.50),<br><br>-인식 가능한 음식 리스트-<br>국밥류(돼지국밥, 소머리국밥, 콩나물국밥),
        <br>탕류(설렁탕, 갈비탕, 매운탕, 감자탕, 마라탕),
        <br>찌개류(된장찌개, 김치찌개, 부대찌개, 순두부찌개),
        <br>마라샹궈, 버섯전골, 샤브샤브, 나베, 낙곱새,
        <br>갈비, 생선구이, 고기구이,
        <br>비빔밥, 볶음밥, 덮밥, 초밥, 회덮밥,
        <br>육회, 돈까스, 생선까스, 해물찜,
        <br>족발, 보쌈, 스테이크, 폭립, 치킨, 피자,
        <br>햄버거, 샌드위치, 샐러드, 토스트,
        <br>짬뽕, 짜장면, 탕수육, 깐풍기, 꿔바로우,
        <br>냉면, 라면, 떡국,
        <br>국수, 파스타,
        <br>김밥, 떡볶이, 죽
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="continuerecommend">확인</button>
      </div>
    </div>
  </div>
</div>
  </div>
  <!-- <img v-if="scene==0" src="../assets/딥러닝.png" style="width:70px; display:block; margin:0px auto; margin-top:20px; border:2px solid black;"/> -->
  <p v-if="scene==0" style="text-align:center; margin-top:30px; font-family:'Noto Sans KR', sans-serif;">한 번 확인해볼까요?</p>
  <svg v-if="scene==0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16" style="display:block; margin:0px auto; width:50px; height:50px;">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
</svg>
  <button v-if="scene==0" class="recog_btn" style="margin-top:20px; width:100%; border:1px solid black;" @click="recognize">
    <img src="../assets/확인.png" style="width:40px; display:block; margin:0px auto;"/></button>
  <div v-if="(scene==1 && isrecog==false)">
  <div class="d-flex justify-content-center">
<button class="btn btn-dark" style="font-size:20px; margin-top:20px; font-family: 'Gowun Dodum',sans-serif;" type="button" disabled >
  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
  음식명 인식 중...
</button>
</div>
  </div>
  <div v-if="(scene==1 && isrecog==true)" class="recognize"><p class="recog_info"><img src="../assets/answer.jpg" style="width:50px; margin-right:10px;"/>이 음식은 '{{ foodname }}'입니다.</p>
  <p class="truefalse" style="margin-top:10px; margin-left:45px;">맞나요? 아니라면,</p><textarea class="truefalse" @click="erase" style="display:block; margin:0px auto;" v-model="wmsg"></textarea>
  </div>
  <button v-if="(scene==1 && isrecog == true)" class="submit" style="width:100%;" @click="recommend">
    <img src="../assets/완료.png" style="width:40px; display:block; margin:0px auto;"/>
  </button>
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
            recogmodal: false,
            changefoodfile : "",
            isrecog : true,
        }
    },
    props : {
        foodimage: String,
        foodfile: Object,
        // selectedfoodlist: Array,
    },
    methods : {
        recognize() {
            this.isrecog = false;
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
                // this.$emit('sfood', this.foodname)
                this.isrecog = true;
                console.log(this.foodname)
            })
            .catch((err) => {
                console.log(err)
            });

        },
        recommend() {
            this.isLoading = false;
            if (this.wmsg != ""&& this.wmsg !="음식 이름을 적어주세요."){
                // this.$emit('erasefood')
                this.$emit('sfood', this.wmsg)
            }
            else{
              this.$emit('sfood', this.foodname)
            }
            this.$emit('back',1)
            this.isLoading = true;
        //     axios
        //     //.post('/cbfalgorithm', { "input_list" : this.selectedfoodlist })
        //     .post('https://www.foodwebrs.com/CBFalgorithm', { "food_list" : this.selectedfoodlist })
        //     .then((result) => {
        //          console.log(this.selectedfoodlist)
        //          console.log(result)
        //          this.cbfoodlist = result.data.rmlist
        //          this.cbfoodurl = result.data.urllist
        //          console.log(this.cbfoodlist)
        //          this.$emit('cbfoodlists', this.cbfoodlist)
        //          this.$emit('cbfoodurl', this.cbfoodurl)
        //          this.$emit('back', 1)
        //          this.isLoading = true;
        //     })
        //     .catch((err)=>{
        //     console.log(err)
        // }) 
        },
        erase(){
            this.wmsg="";
        },
        goselect(){
            this.$emit('goselect', 1)
        },
        changefood(e){
            let a = e.target.files;
            console.log(a[0]); //일단 첫번째 파일만
            let url = URL.createObjectURL(a[0]);
            this.$emit('changefoodurl', url)
            this.$emit('changefoodfile', a)
        }
        
    },
}
</script>

<style>
.upload-image {
  height: 350px;
  width: 90%;
  background: white;
  background-size: cover;
  border-radius: 5px;
  border: 1px solid rgb(63, 64, 68);
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