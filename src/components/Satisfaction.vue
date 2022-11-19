<template>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <div class="satisfaction">
    <img src="../assets/review.png" class="logor"/>
    리뷰를 작성해주세요
  <p style="font-family: 'Noto Sans KR', sans-serif; font-size:14px;">추천받은 음식들 중 지금 바로 먹을 음식이 있나요?</p>
  <input type="checkbox" id="yes" v-model="checkCrypto1" @click="checky" style="font-size:12px; font-family:'Noto Sans KR', sans-serif;">Yes
  <input type="checkbox" id="no" v-model="checkCrypto2" @click="checkn" style="font-size:12px; font-family:'Noto Sans KR', sans-serif;">No
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
  <div class="write">
  <textarea class="write-box" @click="erase" @input="$emit('write', $event.target.value)" v-model="msg"></textarea> 
  </div>
  <div>
    <button type="submit" class="sbutton" @click="gohome" style="font-family:'Noto Sans KR', sans-serif;">제출</button>
  </div>
</div>

</template>

<script>

export default {
  data(){
    return{
      msg : "건의사항 있으면 여기에 남겨줘요",
      checkCrypto1 : false,
      checkCrypto2 : false,
    }
  },
  methods : {
    erase() {
      this.msg="";
    },

    gohome() {
      this.$emit('change', 1)
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
  padding-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
  font-family: 'Jua', sans-serif;
  background-color: rgb(255,244,226);
  border: 3px solid rgb(63, 64, 68);
}
</style>