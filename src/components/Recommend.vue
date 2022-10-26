<template>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <div class="recommend">
      <h2 class="headerlist">당신의 취향을 중점으로 추천해주는 음식들이에요.</h2>
      <div class="foods">
        <div class="food-1"></div>
        <span style="font-family: 'Black Han Sans', sans-serif;">{{ foodlist[0] }}&nbsp;</span>
        <input type="checkbox"/>
        <div class="food-2"></div>
        <span style="font-family: 'Black Han Sans', sans-serif;">{{ foodlist[1] }}&nbsp;</span>
        <input type="checkbox"/>
        <slot></slot>
        <div class="food-3"></div>
        <span style="font-family: 'Black Han Sans', sans-serif;">{{ foodlist[2] }}&nbsp;</span>
        <input type="checkbox"/>
        <slot></slot>
      </div>
        <h4 class="headerlist">당신과 비슷한 성향을 가진 사람들은 어떤 음식을 골랐을까요?</h4>
      <div class="foods">
        <div class="food-1"></div>
        <span style="font-family: 'Black Han Sans', sans-serif;">{{ foodlist[0] }}&nbsp;</span>
        <input type="checkbox"/>
        <div class="food-2"></div>
        <span style="font-family: 'Black Han Sans', sans-serif;">{{ foodlist[1] }}&nbsp;</span>
        <input type="checkbox"/>
        <slot></slot>
        <div class="food-3"></div>
        <span style="font-family: 'Black Han Sans', sans-serif;">{{ foodlist[2] }}&nbsp;</span>
        <input type="checkbox"/>
        <slot></slot>
        <!-- <div class="food-4"></div>
        <input type="checkbox"/>
        <div class="food-5"></div>
        <input type="checkbox"/>
        <div class="food-6"></div>
        <input type="checkbox"/> -->
    </div>
    <button class="rebutton">다시추천</button>
    <p class="tipletter" style="text-align:center"><br><br><br>마음에 드는 음식이 있으면,오른쪽 아래 체크박스에 체크해주세요!</p>
  </div>
  <div class="footer">
        <div class="tip">
            <p class="tipletter"><img class="tipimg" src="../assets/꿀팁.jpg">마음에 드는 음식이 없다면, '다시추천'을 눌러보세요!</p>
        </div>  
        <button class="newbutton" style="margin-top:20px;" @click="next">리뷰 남기기</button>
    </div>
</template>

<script>
export default {
    name : 'Recommend',
    data(){
        return{
            
        }
    },
    props: {
      foodlist : Array,
    },
    methods: {
        next(){
            this.$emit('change', 3);
        },
        selected(){
        },
    }

}
</script>

<style>
.headerlist{
  font-size:16px; 
  margin-top:10px; 
  margin-left:10px;
  font-weight:bold;
}


.tip{
  width: 100%;
  height: 80px;
  margin-top: 50px;
  background-color: rgb(255, 212, 39);
  box-shadow: 0px 0px 20px rgb(87, 87, 87);
}

.recommend{
  margin-top:20px;
  padding-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
  border: 2px solid rgb(63, 64, 68);
  border-top-right-radius:30px;
  font-family: 'Gowun Dodum', sans-serif;
  background-color: white;
  box-shadow: 0px 0px 20px rgb(87, 87, 87);
  background:rgb(255, 244, 226);
}

.tipletter{
    font-size:12px; 
    font-family: 'Jua', sans-serif; 
    color:rgb(48,14,0);
}

.tipimg{
  width: 80px;
  height: 80px;
  margin: auto;
  display:inline-block;
  vertical-align: middle;
}



.tipbar{
  width: 80px;
  height: 80px;
  display: block;
  margin: auto;
  font-size:20px;
  left: 0;
  right: 0;
  top: 10px;
  margin-left:10px;
  float:left
}
.footer {
  margin-top: 40px;
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 20px;
  background-color: white;
}

.newbutton{
    width:120px;
    height:50px;
    text-align: center;
    font-size: 10px;
    margin-left:260px;
    border-radius:20px;
    font-family: 'Gowun Dodum', sans-serif;
    background: rgb(255,244,226);
    box-shadow: 0px 0px 20px rgb(145, 144, 144);
    float: right;
    font-size: 15px;
    padding-bottom:5px;
}

.rebutton{
    background:black; 
    color:white;
    box-shadow: 0px 0px 20px rgb(255, 255,255); 
    width:80px; font-size:13px; 
    margin-left:295px;
    border-radius:5px;
    float: right;
}



.complete{
    margin-top: 40px;
    font-family: 'Gowun Dodum', sans-serif;
    width: 20px;
    height: 20px;
}

.food-1 {
width: 50px;
height: 50px;
border-radius:50%;
/* background-image: url(https://m.convenii.com/web/upload/NNEditor/20210810/mobile/59ce28fbdad73f939a444d57f286bb1a_1628586790.jpg); */
background-color: white;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : white;
background-size: cover;
border: 1.5px solid rgb(63, 64, 68);
}

.food-2 {
width: 300px;
height: 300px;
border-radius:50%;
/* background-image: url(https://data.0app0.com/diet/shop/goods/20210219/20210219151516_6436453018_2.jpg); */
background-color: white;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : white;
background-size: cover;
border: 1.5px solid rgb(63, 64, 68);
}

.food-3 {
width: 300px;
height: 300px;
border-radius:50%;
/* background-image: url(https://cdn.dominos.co.kr/admin/upload/goods/20200311_x8StB1t3.jpg); */
background-color: white;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : white;
background-size: cover;
border: 1.5px solid rgb(63, 64, 68);
}

/* .food-4 {
width: 300px;
height: 300px;
border-radius:50%;
background-image: url(https://cdnweb01.wikitree.co.kr/webdata/editor/202104/13/img_20210413164647_c21ec1ac.webp);
background-color: rgb(194, 233, 255);
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : white;
background-size: cover;
border: 1.5px solid rgb(63, 64, 68);
}

.food-5 {
width: 300px;
height: 300px;
border-radius:50%;
background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWiH2_fVsxWBsBBbJ4TAU0c00SVeehhWwbsA&usqp=CAU);
background-color: rgb(194, 233, 255);
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : white;
background-size: cover;
border: 1.5px solid rgb(63, 64, 68);
}

.food-6 {
width: 300px;
height: 300px;
border-radius:50%;
background-image: url(https://recipe1.ezmember.co.kr/cache/recipe/2017/03/20/0895d0a3c5bf13f67fdb00adf20c48d71.jpg);
background-color: rgb(194, 233, 255);
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : white;
background-size: cover;
border: 1.5px solid rgb(63, 64, 68);
} */


.foods {
  overflow-x: scroll;
  white-space: nowrap;
}

.foods::-webkit-scrollbar {
  height: 5px;
}
.foods::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.foods::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.foods::-webkit-scrollbar-thumb:hover {
  background: #555;
}


@media screen and (min-width:410px) {
.list{
  font-size:30px; 
  margin-top:10px; 
  margin-left:10px;
}

.tip{
  width: 100%;
  height: 80px;
  margin-top: 50px;
  background-color: rgb(255, 212, 39);
  box-shadow: 0px 0px 20px rgb(87, 87, 87);
}


.recommend{
  margin-top:20px;
  padding-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
  border: 2px solid rgb(63, 64, 68);
  border-top-right-radius:30px;
  font-family: 'Gowun Dodum', sans-serif;
  background-color: white;
  box-shadow: 0px 0px 20px rgb(87, 87, 87);
  background:rgb(255, 244, 226);
}
.tipletter{
    font-size:15px; 
    font-family: 'Jua', sans-serif; 
    color:rgb(48,14,0);
    
}

.tipimg{
  width: 80px;
  height: 80px;
  margin: auto;
  display:inline-block;
  vertical-align: middle;
}

.tipbar{
  width: 80px;
  height: 80px;
  display: block;
  margin: auto;
  left: 0;
  right: 0;
  top: 10px;
}
.footer {
  margin-top: 60px;
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 20px;
  background-color: white;
}

.newbutton{
    width:120px;
    height:50px;
    text-align: center;
    font-size: 15px;
    margin-left:260px;
    border-radius:20px;
    padding-bottom:5px;
    font-family: 'Gowun Dodum', sans-serif;
    background: rgb(255,244,226);
    box-shadow: 0px 0px 20px rgb(145, 144, 144);
    float: right;
}

.rebutton{
    background:black; 
    color:white;
    box-shadow: 0px 0px 20px rgb(255, 255,255); 
    width:80px; 
    font-size:13px; 
    border-radius:5px;
    margin-left:295px;
    float: right;
}



.complete{
    margin-top: 40px;
    font-family: 'Gowun Dodum', sans-serif;
    width: 20px;
    height: 20px;
}

.food-1 {
width: 300px;
height: 300px;
border-radius:50%;
/* background-image: url(https://m.convenii.com/web/upload/NNEditor/20210810/mobile/59ce28fbdad73f939a444d57f286bb1a_1628586790.jpg); */
background-color: white;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : black;
background-size: cover;
border: 1.5px solid rgb(63, 64, 68);
}

.food-2 {
width: 300px;
height: 300px;
border-radius:50%;
/* background-image: url(https://data.0app0.com/diet/shop/goods/20210219/20210219151516_6436453018_2.jpg); */
background-color: white;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : black;
background-size: cover;
border: 1.5px solid rgb(63, 64, 68);
}

.food-3 {
width: 300px;
height: 300px;
border-radius:50%;
/* background-image: url(https://cdn.dominos.co.kr/admin/upload/goods/20200311_x8StB1t3.jpg); */
background-color: white;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : black;
background-size: cover;
border: 1.5px solid rgb(63, 64, 68);
}

/* .food-4 {
width: 300px;
height: 300px;
border-radius:50%;
background-image: url(https://cdnweb01.wikitree.co.kr/webdata/editor/202104/13/img_20210413164647_c21ec1ac.webp);
background-color: rgb(194, 233, 255);
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : white;
background-size: cover;
border: 1.5px solid rgb(63, 64, 68);
}

.food-5 {
width: 300px;
height: 300px;
border-radius:50%;
background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWiH2_fVsxWBsBBbJ4TAU0c00SVeehhWwbsA&usqp=CAU);
background-color: rgb(194, 233, 255);
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : white;
background-size: cover;
border: 1.5px solid rgb(63, 64, 68);
}

.food-6 {
width: 300px;
height: 300px;
border-radius:50%;
background-image: url(https://recipe1.ezmember.co.kr/cache/recipe/2017/03/20/0895d0a3c5bf13f67fdb00adf20c48d71.jpg);
background-color: rgb(194, 233, 255);
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : white;
background-size: cover;
border: 1.5px solid rgb(63, 64, 68);
} */


.foods {
  overflow-x: scroll;
  white-space: nowrap;
}

.foods::-webkit-scrollbar {
  height: 5px;
}
.foods::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.foods::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.foods::-webkit-scrollbar-thumb:hover {
  background: #555;
}
}
</style>