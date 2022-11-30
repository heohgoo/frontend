<template>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <div class="satisfaction">
  <img src="../assets/booklet.png" style="width:60px; float:right; margin-top:-4.5px; margin-right:30px;"/><br><br>
  <div>
    <img src="../assets/review.png" style="background:white; width:40px; vertical-align: middle;">
    <span style="margin-top:10px; margin-left:10px; font-family: 'Lobster', cursive; font-size:35px;">Review</span>
  </div>
  <div v-if="this.reviewnum==1">
  <img src="../assets/step1.png" style="width:60px; float:left; margin-left:10%; margin-top:20px;"/><br>
  <p style="font-family: 'Nanum Brush Script', cursive; font-size:25px; font-weight:bold; margin-bottom:50px; text-align:center;"><br><br>추천받은 음식들 중 지금 먹을 음식이 있나요?</p>
  <div style="font-size:18px; font-weight: bold;">
  <input style="zoom:2.0;" type="checkbox" id="yes" v-model="checkCrypto1" @click="checky">
  <span style="margin-right:20%; font-size:25px; font-family: 'Lobster', cursive; margin-left:5px;">Yes</span>
  <input style="zoom:2.0;" type="checkbox" id="no" v-model="checkCrypto2" @click="checkn">
  <span style="font-size:25px; font-family: 'Lobster', cursive; margin-left:5px;">No</span><br>
  <img src="../assets/next.png" style="width:20px; display:block; margin:0px auto; margin-top:80px;" @click="nextst"/>
  </div>
  </div>
  <div v-if="this.reviewnum==2">
  <img src="../assets/step2.png" style="width:60px; float:left; margin-left:10%; margin-top:20px;"/><br>
  <p style="font-family: 'Nanum Brush Script', cursive; font-size:25px; font-weight:bold; margin-top:20px; margin-bottom:0px;"><br>별점을 입력해주세요.</p>
  <div class="star-rating space-x-4 mx-auto">
	<input type="radio" id="5-stars" name="rating" value="5" v-model="ratings"/>
	<label for="5-stars" class="star pr-4">★</label>
	<input type="radio" id="4-stars" name="rating" value="4" v-model="ratings"/>
	<label for="4-stars" class="star">★</label>
	<input type="radio" id="3-stars" name="rating" value="3" v-model="ratings"/>
	<label for="3-stars" class="star">★</label>
	<input type="radio" id="2-stars" name="rating" value="2" v-model="ratings"/>
	<label for="2-stars" class="star">★</label>
	<input type="radio" id="1-star" name="rating" value="1" v-model="ratings" />
	<label for="1-star" class="star">★</label>
  </div> 
  <img src="../assets/next.png" style="width:20px; display:block; margin:0px auto; margin-top:80px;" @click="nextst"/>
  </div>
  <div v-if="this.reviewnum==3">
    <img src="../assets/step3.png" style="width:60px; float:left; margin-left:10%; margin-top:20px;"/><br>
  <p style="font-family: 'Nanum Brush Script', cursive; font-size:25px; font-weight:bold; margin-top:15px;"><br>건의사항 남겨주세요.</p>
  <div class="write">
  <textarea class="write-box" @click="erase" @input="$emit('write', $event.target.value)" v-model="msg" style="margin-top:50px;"></textarea>
  <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="sbutton" @click="gosf" style="font-family:'Noto Sans KR', sans-serif;">제출</button>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" v-if="this.satismodal==true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header" style="font-family:'Gowun Dodum', sans-serif;">
        <h5 class="modal-title" id="exampleModalLabel" style="text-align:center;">만족도 점수</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <p style="margin-top:20px;">{{ this.id }}님의 애플리케이션 만족도 점수</p>
      <div class="progress" style="width:80%; margin:0px auto;">
      <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" :aria-valuenow="this.loverate" aria-valuemin="0" aria-valuemax="100" :style="mystyle"></div>
      </div>
      <div class="modal-px" style="text-align:center; font-size:16px; margin-top:20px; margin-bottom:20px; font-family:'Gowun Dodum', sans-serif;">
        <p style="font-size:20px;">{{this.score}}점/100점</p>
        '좋아요' 선택 수 + 별점 + 지금 먹을 음식 여부를<br>기반으로 가중치를 적용하여 산출한 만족도 점수<br>(각각 0.1:0.4:0.5의 가중치 적용)
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="gohome">확인</button>
      </div>
    </div>
  </div>
  </div>  
</div>
</div>
  <p><br></p>
    <!-- <button type="submit" class="sbutton" @click="gohome" style="font-family:'Noto Sans KR', sans-serif;">제출</button> -->
</div>

</template>

<script>
import axios from "axios"


export default {
  data(){
    return{
      msg : "건의사항 있으면 여기에 남겨줘요",
      checkCrypto1 : false,
      checkCrypto2 : false,
      ratings : 0,
      satisfy : true,
      satismodal : false,
      ynscore : 0,
      score : 0,
      mystyle : {
        width : '0%',
      },
      reviewnum : 1,
    }
  },
  props : {
    loverate : Number,
    id : String,
  },
  methods : {
    nextst(){
      this.reviewnum += 1
    },

    erase() {
      this.msg="";
    },

    gosf() {
      this.satismodal = true
      if (this.checkCrypto1 == true){
          this.satisfy = true
      }
      else{
        this.satisfy = false
      }
      if (this.msg == "건의사항 있으면 여기에 남겨줘요"){
          this.msg = ""
      }
      if (this.satisfy == true){
        this.ynscore = 1
      }
      else {
        this.ynscore = 0
      }
      this.score = parseInt(((this.loverate/100)*0.1 + (this.ratings/5)*0.4 + (this.ynscore)*0.5)*100)
      this.mystyle.width = (((this.loverate/100)*0.1 + (this.ratings/5)*0.4 + (this.ynscore)*0.5)*100) + "%"
      // if ((this.satismodal) == false){
      //   this.$emit('change', 1)
      //   console.log(this.satisfy, this.ratings, this.msg)
      //   // axios.post('https://www.foodwebrs.com/', { "satisfy":this.satisfy, "ratings":this.ratings, "msg":this.msg })
      //   // .then((result) => {
      //   //     console.log(result)
      //   // }) 
      //   // .catch((err)=>{
      //   //     console.log(err)
      //   // })
      // }
    },
    
    gohome(){
      this.$emit('change', 1)
      this.reviewnum = 1
      console.log(this.satisfy, this.ratings, this.msg)
        axios.post('https://www.foodwebrs.com/satisfaction', { "satisfy":this.satisfy, "ratings":this.ratings, "msg":this.msg })
        .then((result) => {
            console.log(result)
        }) 
        .catch((err)=>{
            console.log(err)
        })
    },

    checky() {
      if (this.checkCrypto2 == true){
        this.checkCrypto2 = false
      }
    },

    checkn() {
      if (this.checkCrypto1 == true){
        this.checkCrypto1 = false
      }
    },
  }
}

</script>

<style>
.sbutton{
  width: 50%;
  height: 50px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  background: black;
  color: white;
  font-size: 20px;
  border-radius:20px;
  border: 1px solid black;
}

.logor {
  width: 80px;
  margin-left:10px;
  margin-top:10px;
  display: block;
  left: 0;
  right: 0;
}

.write{
  font-size:15px;
}

.write-box {
  color: black;
  border: none;
  width: 90%;
  height: 300px;
  padding: 15px;
  margin: auto;
  display: block;
  border-radius:20px;
  outline: none;
  font-family: 'Jua', sans-serif;
  border: 3px solid rgb(63, 64, 68);
}

.review{
  font-size:20px;
}

.star-rating {
  margin-bottom:40px;
  margin-top:40px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row-reverse;
  font-size: 2.7rem;
  line-height: 2.5rem;
  justify-content: space-around;
  padding: 0 0.2em;
  text-align: center;
  width: 5em;
}
 
.star-rating input {
  display: none;
}
 
.star-rating label {
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 2.3px;
  -webkit-text-stroke-color: #2b2a29;
  cursor: pointer;
}
 
.star-rating :checked ~ label {
  -webkit-text-fill-color: gold;
}
 
.star-rating label:hover,
.star-rating label:hover ~ label {
  -webkit-text-fill-color: #fff58c;
}

.satisfaction {
  width: 95%;
  border-bottom-right-radius:60px;
  border-top-left-radius: 70px;
  font-size:30px;
  text-align:center;
  padding-bottom: 0px;
  margin-left: 10px;
  margin-right: 10px;
  font-family:'Noto Sans KR', sans-serif;
  background-color: white;
  border: 2px solid rgb(63, 64, 68);
}

</style>