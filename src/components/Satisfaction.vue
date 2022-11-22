<template>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <div class="satisfaction">
    <img src="../assets/review.png" class="logor" style="display:block; margin:0px auto; margin-top:20px; background-color:rgb(255,244,226);"/>
        *리뷰 쓰기*
  <p style="font-family: 'Noto Sans KR', sans-serif; font-size:15px; margin-top:20px; font-weight:bold;">step1.추천받은 음식들 중 지금 바로 먹을 음식이 있나요?</p>
  <div style="font-size:16px; font-weight: bold;">
  <input type="checkbox" id="yes" v-model="checkCrypto1" @click="checky">네
  <input type="checkbox" id="no" v-model="checkCrypto2" @click="checkn">아니요
  </div>
  <p style="font-size:15px; margin-top:30px; margin-bottom:0px;">step2.별점을 작성해주세요.</p>
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
  <p style="font-size:15px;">step3.건의사항 남겨주세요.</p>
  <div class="write">
  <textarea class="write-box" @click="erase" @input="$emit('write', $event.target.value)" v-model="msg"></textarea>
  <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="sbutton" @click="gosf" style="font-family:'Noto Sans KR', sans-serif;">제출</button>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" v-if="this.satismodal==true">
  <div class="modal-dialog">
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
  <p><br></p>
    <!-- <button type="submit" class="sbutton" @click="gohome" style="font-family:'Noto Sans KR', sans-serif;">제출</button> -->
</div>

</template>

<script>
// import axios from "axios"


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
      }
    }
  },
  props : {
    loverate : Number,
    id : String,
  },
  methods : {
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
      console.log(this.satisfy, this.ratings, this.msg)
        // axios.post('https://www.foodwebrs.com/', { "satisfy":this.satisfy, "ratings":this.ratings, "msg":this.msg })
        // .then((result) => {
        //     console.log(result)
        // }) 
        // .catch((err)=>{
        //     console.log(err)
        // })
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
  width: 100px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  background: white;
  font-size: 20px;
  color: black;
  border-radius:20px;
  font-family: 'Jua', sans-serif;
  border: 3px solid rgb(63, 64, 68);
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
  border-bottom-right-radius:60px;
  font-size:30px;
  text-align:center;
  padding-bottom: 0px;
  margin-left: 10px;
  margin-right: 10px;
  font-family:'Noto Sans KR', sans-serif;
  background-color: rgb(255,244,226);
  border: 3px solid rgb(63, 64, 68);
}
</style>