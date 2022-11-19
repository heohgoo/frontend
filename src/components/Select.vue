<template>
<meta name="viewport" content="width=device-width,initial-scale=1">
  <div class="d-flex justify-content-center">
  <button v-if="isLoading==false" class="btn btn-dark" type="button" style="margin-top:0%" disabled>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  로딩 중...
  </button>
  </div>
  <div class="select">
    <ul class="select-button-plus">
      <input
        @change="upload"
        accept="image/*"
        type="file"
        id="file"
        class="inputfile"
      />
      <label for="file" class="input-plus">음식 사진 선택</label>
    </ul>
    <img class="wait" src="../assets/음식선택.jpg"/>
    <p class="add">{{ id }}님의 갤러리에서 한 번 확인해볼까요?<br><br>@Instagram에서 캡처했거나,<br>본인이 직접 찍은 사진 다 가능해요!</p>
    <p class="add" style="font-weight:bold">선택한 음식 리스트 : {{ selectedfoodlist }}</p>
  </div>
  <div class="recommend-button">
    <ul class="recommend-button-plus">
    <label @click="cfrecommend">음식 추천</label>
    <!-- <label @click="[next(), cfrecommend()]">음식 추천</label> -->
    </ul>
    <img class="wait" src="../assets/음식추천.jpg"/>
    <p class="add">오늘의 맛아,맛점,맛저 메뉴는?<br></p>
    <p class="add" style="font-weight:bold">Content-based filtering, Collaborative filtering</p>
    <p class="add">기반으로 추천해줍니다.</p>
  </div>

  <div class="comment">
    <img class="wait" src="../assets/wait.jpg"/>
    <div class="comment-letter">
    <p></p>
    <p>1. '음식 사진 선택' 버튼을 누르세요.</p>
    <p>2. 갤러리에서 마음에 드는 음식을 골라보세요.</p>
    <p>3. 음식 추천 버튼을 눌러보세요.</p>
    <p>4. 음식 추천이 완료되었어요.</p>
    <p>5. 별점/리뷰 작성은 꼭 해주세요!</p>
    </div>
  </div>

</template>

<script>
import axios from "axios";


export default {
  name : "Select",
  data() {
    return {
      image: "",
      foodfile: "",
      cfrmlist: [],
      cfrmurl: [],
      isLoading: true,
    }
  },
  props : {
    num: Number,
    id: String,
    selectedfoodlist: Array,
  },
  methods : {
    upload(e) {
      let a = e.target.files;
      console.log(a[0]); //일단 첫번째 파일만
      let url = URL.createObjectURL(a[0]);
      console.log(url);
      this.$emit('recog', url);
      this.$emit('move', 4);
      this.foodfile = a[0];
      this.$emit('foodupload', a)
      console.log(a)
    },

    cfrecommend() {
      this.isLoading = false
      console.log(this.id)
      axios
      .post('https://www.foodwebrs.com/cfalgorithm', { "username" : this.id })
      // .post('/cfalgorithm', { "username" : this.id })
      .then((result) => {
              console.log(result.data)
              this.cfrmlist = result.data.rmlist
              this.cfrmurl = result.data.urllist
              this.$emit('cflist', this.cfrmurl)
              this.$emit('cffood', this.cfrmlist)
              this.$emit('change', 2);
              this.isLoading = true
            })
            .catch((err)=>{
            console.log(err)
        }) 
      this.$emit('removelist')
    },

  },

}
</script>

<style>
.wait {
  width: 80px;
  height: 80px;
  display: block;
  margin: auto;
  left: 0;
  right: 0;
  top: 10px;
}

.add{
  font-family: 'Gowun Dodum', sans-serif;
  text-align:center;
}

.comment{
  width: 100%;
  height: 320px;
  margin-top: 50px;
  background-color: rgb(130, 42, 48);
  border-radius: 20%;
  box-shadow: 0px 0px 20px rgb(87, 87, 87);
}

.comment-letter{
  color:white;
  text-align: center;
  font-family: 'Gowun Dodum', sans-serif;

}

.select {
  width: 100%;
  margin-top:20px;
  padding-bottom: 50px;
  background-color: rgb(237,225,227);
  border-top: 3px solid rgb(63, 64, 68);
  border-left: 3px solid rgb(63, 64, 68);
  border-right: 3px solid rgb(63, 64, 68);
  border-radius:10px;
  box-shadow: 0px 0px 20px rgb(87, 87, 87);
}

.select-button-plus {
  width: 200px;
  margin: auto;
  margin-top:10px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  font-family: 'Noto Sans KR', sans-serif;
  background: rgb(255,255,255);
  color: black;
  border: 2px solid rgb(63, 64, 68);
  font-size: 24px;
  padding-top: 8px;
}

.recommend-button{
  width: 100%;
  background-color: rgb(201,203,224);
  border-top: 3px solid rgb(63, 64, 68);
  border-left: 3px solid rgb(63, 64, 68);
  border-right: 3px solid rgb(63, 64, 68);
  border-radius:10px;
  padding-bottom:50px;
  box-shadow: 0px 0px 20px rgb(87, 87, 87);
}

.recommend-button-plus {
  width: 200px;
  margin: auto;
  margin-top: 10px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  border: 2px solid rgb(63, 64, 68);
  font-family: 'Noto Sans KR', sans-serif;;
  color:black;
  background: rgb(255,255,255);
  font-size: 24px;
}

.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}

@media (min-width:410px) {
.wait {
  width: 80px;
  height: 80px;
  display: block;
  margin: auto;
  left: 0;
  right: 0;
  top: 10px;
}

.add{
  font-family: 'Gowun Dodum', sans-serif;
  text-align:center;
}

.comment{
  width: 100%;
  height: 320px;
  margin-top: 50px;
  background-color: rgb(130, 42, 48);
  border-radius: 20%;
  box-shadow: 0px 0px 20px rgb(87, 87, 87);
}

.comment-letter{
  color:white;
  text-align: center;
  font-family: 'Gowun Dodum', sans-serif;

}

.select {
  width: 100%;
  margin-top:20px;
  padding-bottom: 50px;
  background-color: rgb(237,225,227);
  border-top: 3px solid rgb(63, 64, 68);
  border-left: 3px solid rgb(63, 64, 68);
  border-right: 3px solid rgb(63, 64, 68);
  border-radius:10px;
  box-shadow: 0px 0px 20px rgb(87, 87, 87);
}

.select-button-plus {
  width: 200px;
  margin: auto;
  margin-top:10px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  font-family: 'Noto Sans KR', sans-serif;
  background: rgb(255,255,255);
  color: black;
  border: 2px solid rgb(63, 64, 68);
  font-size: 24px;
  padding-top: 8px;
}

.recommend-button{
  width: 100%;
  background-color: rgb(201,203,224);
  border-top: 3px solid rgb(63, 64, 68);
  border-left: 3px solid rgb(63, 64, 68);
  border-right: 3px solid rgb(63, 64, 68);
  border-radius:10px;
  padding-bottom:50px;
  box-shadow: 0px 0px 20px rgb(87, 87, 87);
}

.recommend-button-plus {
  width: 200px;
  margin: auto;
  margin-top: 10px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  border: 2px solid rgb(63, 64, 68);
  font-family: 'Noto Sans KR', sans-serif;;
  color:black;
  background: rgb(255,255,255);
  font-size: 24px;
}

.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
}
</style>