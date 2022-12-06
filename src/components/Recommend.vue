<template>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <!-- <div class="black-bg" v-if="modal == true">
      <div class="white-bg">
        <h4>{{ foodname }}</h4>
        <img :src='`${foodimgurl}`' style="width:35%">
        <p>칼로리(1인분 기준) : </p>
        <p>음식 설명</p>
        <button @click="close">확인</button>
        <button style="margin-left:20px" @click="close">근처 맛집 찾기</button>
      </div>
    </div> -->
  <div class="recommend">
    <div class="black-bg" v-if="modal == true">
      <div class="white-bg" style="height:600px;">
        <div v-if="modalscene==0" style="font-weight:bold;">
        <h4>
        <img :src='`${foodimgurl}`' style="width:150px; height:150px; border-radius:10px; border:0px solid black;"></h4>
        <button v-if="this.good==false && !this.selectedfoodlist.includes(this.foodname)" style="border-radius:5px; border:2px solid rgb(63, 64, 68); background-color: white; font-size:18px; color:black; margin:0px auto;"
        @click="selectgood">
            <img src="../assets/좋아요.png" style="width:20px; height:20px;"/>좋아요</button>
        <button v-if="this.good==true && this.selectedfoodlist.includes(this.foodname)" style="border-radius:5px; border:2px solid blue; background-color: blue; font-size:18px; margin:0px auto; color:white;"
        @click="cancelgood">
            <img src="../assets/좋아요.png" style="width:20px; height:20px;"/>좋아요</button> 
        <button id="kakaotalk-sharing-btn" @click="kakaoLink" style="margin-left:4%; border-radius:5px; border:2px solid black; background:white; font-size:18px; background:rgb(249,224,0); margin-top:10px;"><img src="../assets/kakao.png" style="width:20px; height:20px; margin-bottom:4px;"/>공유</button>
        <div style="border-radius:5px; box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2); border:0.5px solid white; margin-top:50px; margin-bottom:10px; background:white; padding:7px;">
        <p style="margin-top:5px;">칼로리(1인분) : {{ this.foodkcal }}kcal</p>
        <p>음식 설명 : </p>
        <p style="word-wrap:break-word; margin-top:15px;">{{ this.foodexp }}</p>
      </div>
        <button @click="close" style="border-radius:5px; background:white; margin-top:10px; color:black; border:1.5px solid black; font-weight:bold;">확인</button>
        <button style="margin-left:20px; border-radius:5px; background:white; color:black; border:1.5px solid black; font-weight:bold;" @click="selectrestaurant">주변 맛집 찾기</button> 
        </div>
        <div id="map" style="width:300px; height:300px; display:block; margin:0px auto; z-index:0"></div>
        <div v-if="modalscene==1">
        <h4 style="margin-top:20px;">-{{ this.foodname}} 맛집 찾기-</h4>
        <p style="font-size:13px;">{{ id }}님의 위치 : {{ where }}
        <br><br>마커를 누르면 식당명/위치/전화번호가 나와요.<br>
            줌인으로 더 자세한 식당 위치를 알 수 있어요.<br>
            <span style="font-weight:bold;">투명한 마커가 본인 위치에요.</span></p>
        <!-- <img src="../assets/map.png" style="width:100%; border-radius:5px;"/> -->
        <!-- <div style="border-radius:5px; box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);">
        <p style="margin-top:10px;">@@음식점 건대점</p>
        <button style="background:white; border-radius:5px;">위치 보기</button>
        <button style="margin-left:10px; background:white; border-radius:5px; margin-bottom:10px;">리뷰 보기</button>
        </div>
        <div style="border-radius:5px; box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);">
        <p style="margin-top:10px;">##음식점 건대점</p>
        <button style="background:white; border-radius:5px;">위치 보기</button>
        <button style="margin-left:10px; background:white; border-radius:5px; margin-bottom:10px;">리뷰 보기</button>
        </div> -->
        <button style="margin-top:20px; background: white; border-radius:5px; width:100%" @click="close">확인</button>
      </div>
      </div>
    </div>
      <h2 class="headerlist">당신의 취향을 중점으로 추천해주는 음식들이에요</h2>
      <div class="foods">
        <div class="food-1" v-for="(a,i) in cbfoodlist" :key="i" :style="{ backgroundImage: `url(${ cburllist[i] })`}" @click="selected(cburllist[i], cbfoodlist[i], cbkcallist[i], cbexplist[i])">
        <span style="font-family: 'Noto Sans KR', sans-serif; color: white; background:black;">{{ cbfoodlist[i] }}</span>
        <!-- <input type="checkbox" style="width:20px; height:20px;" @click="close"/> -->
        <slot></slot>
        </div>
    </div>
        <h4 class="headerlist">당신과 음식 취향이 비슷한 사람들이 만족했던 음식들이에요</h4>
        <div class="foods">
        <div class="food-1" v-for="(a,i) in cffoodlist" :key="i" :style="{ backgroundImage: `url(${ cfurllist[i] })`}" @click="selected(cfurllist[i], cffoodlist[i], cfkcallist[i], cfexplist[i])">
        <span style="font-family: 'Noto Sans KR', sans-serif; color: white; background:black;">{{ cffoodlist[i] }}</span>
        <!-- <input type="checkbox" style="width:18px; height:18px;"/> -->
        <slot></slot>
        </div>
    </div>
    <!-- <button class="rebutton" @click="a">다시추천</button> -->
    <p class="tipletter" style="text-align:center; font-family:'Noto Sans KR', sans-serif;"><br><br><br>마음에 드는 음식이 있으면 음식 이미지를 누르세요!</p>
    <button class="newbutton" style="margin-top:0px; margin-right:20px; font-family:'Noto Sans KR', sans-serif; background:white; color:black;" @click="next">리뷰 남기기</button>
  </div>
  <div class="footer">
        <div class="tip">
            <p class="tipletter" style="font-family:'Noto Sans KR', sans-serif;"><img class="tipimg" src="../assets/꿀팁.jpg">한 줄의 리뷰는 추천 알고리즘 최적화에 좋은 정보가 됩니다.</p>
        </div>  
        <p><br></p>
        <!-- <button class="newbutton" style="margin-top:0px; font-family:'Noto Sans KR', sans-serif;" @click="next">리뷰 남기기</button>  -->
    </div>
</template>

<script>
import axios from "axios"

export default {
    name : 'Recommend',
    head() {
            return {
                script: [
                    {src: '//developers.kakao.com/sdk/js/kakao.min.js'},
                ],
            }
    },
    data(){
        return{
          modal:false,
          foodname:"",
          foodimgurl:"",
          foodkcal:"",
          foodexp:"",
          good:false,
          selectedfoodlist:[],
          modalscene:0,
          textContent: '',
          keyword:'',
          latitude:0,
          longitude:0,
          where:'',
          rwhere:'',
        }
    },
    props: {
      foodlist : Array,
      cffoodlist : Array,
      cfurllist : Array,
      cfexplist : Array,
      cfkcallist : Array,
      cbfoodlist : Array,
      cburllist : Array,
      cbkcallist : Array,
      cbexplist : Array,
      id : String,
    },
    // mounted() {
    // window.kakao && window.kakao.maps
    //   ? this.initMap()
    //   : this.addKakaoMapScript();
    // },
    mounted() {
      if (!("geolocation" in navigator)) {
      console.log("not gps")
      return;
    }
    // get position
    navigator.geolocation.getCurrentPosition(pos => {
      this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
    })
    // function onGeoOkay(position) {
    //   console.log(position);
    //   var mylatitude = position.coords.latitude
    //   var mylongitude = position.coords.longitude
    //   console.log(mylatitude, mylongitude)
    // }

    // function onGeoError() {
    //   alert("I can't find you. No weather for you.");
    // }

    // navigator.geolocation.getCurrentPosition(onGeoOkay, onGeoError);
    },
    methods: {
        next(){
            this.$emit('change', 3);
            this.$emit('sendresult', this.selectedfoodlist.length*100/(this.cbfoodlist.length+this.cffoodlist.length))
            console.log(this.selectedfoodlist)
            console.log(this.id)
            axios.post('https://www.foodwebrs.com/user/updateitem', { "username":this.id, "selectedfoodlist":this.selectedfoodlist })
            .then((result) => {
            console.log("yes")
            console.log(result)
            }) 
            .catch((err)=>{
              console.log(err)
            })
            this.selectedfoodlist = [];
        },
        selected(foodimgurl, food, foodkcal, foodexp){
          console.log(this.latitude, this.longitude)
          this.modal = true
          window.scrollTo(0,0)
          this.foodname = food
          this.foodimgurl = foodimgurl
          this.foodkcal = foodkcal
          this.foodexp = foodexp
          // console.log(this.foodimg)
        },
        close(){
          this.modal = false
          this.good = false
          this.modalscene=0
          var container = document.getElementById('map');
          container.style.visibility = 'hidden'
        },
        selectgood(){
          this.good = true
          this.selectedfoodlist.push(this.foodname)
        },
        cancelgood(){
          this.good = false
          this.selectedfoodlist.pop(this.foodname)
        },
        selectrestaurant(){
          this.modalscene=1
          // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
          var infowindow = new kakao.maps.InfoWindow({zIndex:1});
          console.log(this.latitude)
          var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
          mapOption = {
             center: new kakao.maps.LatLng(this.latitude, this.longitude), // 지도의 중심좌표
             level: 5 // 지도의 확대 레벨
          };  
          mapContainer.style.visibility = 'visible';
          // 지도를 생성합니다    
          var map = new kakao.maps.Map(mapContainer, mapOption); 
          var geocoder = new kakao.maps.services.Geocoder();

          var coord = new kakao.maps.LatLng(this.latitude, this.longitude);
          var callback = (result, status) => {
              if (status === kakao.maps.services.Status.OK) {
                  console.log(result[0].road_address.address_name);
                  this.where = result[0].road_address.address_name;
                  this.rwhere = result[0].address.region_1depth_name+' '+result[0].address.region_2depth_name+' '+result[0].address.region_3depth_name
                  console.log(this.rwhere)
              }
          };
          var marker2 = new kakao.maps.Marker({ 
          // 지도 중심좌표에 본인 위치 마커를 생성합니다 
            position: new kakao.maps.LatLng(this.latitude, this.longitude),
            title: "본인 위치",
            opacity:0.5,
          }); 
          // 지도에 마커를 표시합니다
          marker2.setMap(map);
          geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
          // function getAddr(lat,lng) {
          //   let geocoder = new kakao.maps.services.Geocoder();

          //   let coord = new kakao.maps.LatLng(lat, lng);
          //   let callback = (result, status) => {
          //     if (status === kakao.maps.services.Status.OK) {
          //         console.log(result);
          //         console.log(result[0].road_address.address_name);
          //         this.where = result[0].road_address.address_name;
          //     }
          //   }
          //   geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
          // }
          // getAddr(this.latitude, this.longitude)
          var ps = new kakao.maps.services.Places();

          // 키워드로 장소를 검색합니다
          this.keyword = this.foodname+' 맛집'
          ps.keywordSearch(this.keyword, placesSearchCB, {x: this.longitude, y: this.latitude, size:8, radius:10000}); 

          // 키워드 검색 완료 시 호출되는 콜백함수 입니다
          function placesSearchCB (data, status, pagination) {
              if (status === kakao.maps.services.Status.OK) {
                  console.log(pagination)
                  // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                  // LatLngBounds 객체에 좌표를 추가합니다
                  var bounds = new kakao.maps.LatLngBounds();

                  for (var i=0; i<data.length; i++) {
                      displayMarker(data[i]);    
                      bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                  }       

                  // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                  map.setBounds(bounds);
              } 
          }

          // 지도에 마커를 표시하는 함수입니다
          function displayMarker(place) {
            // 마커를 생성하고 지도에 표시합니다
            var marker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(place.y, place.x) 
          });

          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(marker, 'click', function() {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          infowindow.setContent('<div style="padding:5px;font-size:12px; height:90px; text-align:center; display:block; margin:0px auto;">' + place.place_name + '<br>주소:' + place.address_name + '<br>번호:' + place.phone + '</div>');
          infowindow.open(map, marker);
    });
}
          // window.kakao && window.kakao.maps
          // ? this.initMap()
          // : this.addKakaoMapScript();
        },
        geofind() {
            if(!("geolocation" in navigator)) {
            this.textContent = 'Geolocation is not available.';
            return;
            }
            this.textContent = 'Locating...'
            
            // get position
            navigator.geolocation.getCurrentPosition(pos => {
            this.latitude = pos.coords.latitude;
            this.longitude = pos.coords.longitude;
            this.textContent = 'Your location data is ' + this.latitude + ', ' + this.longitude
            }, err => {
            this.textContent = err.message;
            })
        },
      kakaoLink() {
        // window.Kakao.Share.sendCustom({
        //   templateId: 86833,
        //   // 카카오톡이 설치 되지 않았을때 마켓으로 이동
        //   installTalk: true
        // });
        window.Kakao.Share.createDefaultButton({
          container: '#kakaotalk-sharing-btn',
          objectType: 'feed',
          content: {
            title: '오늘 이거 어때? => #'+this.foodname,
            description: this.foodexp,
            imageUrl:
            this.foodimgurl,
            link: {
              mobileWebUrl: 'https://heohgoo.github.io',
              webUrl: 'https://heohgoo.github.io',
            },
          },
      buttons: [
      {
        title: '웹으로 이동',
        link: {
          mobileWebUrl: 'https://heohgoo.github.io',
          webUrl: 'https://heohgoo.github.io',
        },
      },
      { 
        title: '앱으로 이동',
        link: {
          mobileWebUrl: 'https://heohgoo.github.io',
          webUrl: 'https://heohgoo.github.io',
        },
      },
    ],
    });
    },
    initMap() {
      var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      var options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(this.mylatitude, this.mylongitude), //지도의 중심좌표.
        level: 4 //지도의 레벨(확대, 축소 정도)
      };
      var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      //마커추가하려면 객체를 아래와 같이 하나 만든다.
      var marker = new kakao.maps.Marker({
         position: map.getCenter()
       });
       marker.setMap(map);
    },
    addKakaoMapScript() {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=385c9e43222e0c0b03514e087d72299a";
      document.head.appendChild(script);
    },
  }
}
</script>

<style>
/* body {
  margin : 0;
}
div {
  box-sizing: border-box;
}

.black-bg {
  width: 100%;
  height:70%;
  background: rgba(0,0,0,0.5);
  padding: 20px;
}
.white-bg {
  width: 60%;
  background: white;
  border-radius: 8px;
  padding: 20px;
} 

.headerlist{
  font-size:15px; 
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
border-radius:10%;
background-color: white;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : white;
background-size: cover;
border: 1.5px solid rgb(63, 64, 68);
}

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
} */
@media screen and (min-width:300px) {
body {
  margin : 0;
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 95%; height:80%;
  background: rgba(0,0,0,0.5);
  position: absolute; 
  padding:20px;
  margin:auto;
}
.white-bg {
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
} 

.headerlist{
  font-size:15px; 
  margin-top:10px; 
  margin-left:10px;
  font-weight:bold;
}

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
  /* box-shadow: 0px 0px 20px rgb(87, 87, 87); */
  background:rgb(255, 244, 226);
}
.tipletter{
    font-size:9px; 
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
  margin-top: 0px;
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
    border-radius:10px;
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
border-radius:10%;
/* background-image: url(https://m.convenii.com/web/upload/NNEditor/20210810/mobile/59ce28fbdad73f939a444d57f286bb1a_1628586790.jpg); */
background-color: white;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : black;
background-size: cover;
border: 1.5px solid rgb(63, 64, 68);
}

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

@media screen and (min-width:410px) {
body {
  margin : 0;
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 390px; height:70%;
  background: rgba(0,0,0,0.5);
  position: absolute; 
  padding:20px;
  margin:auto;
}
.white-bg {
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
} 

.headerlist{
  font-size:15px; 
  margin-top:10px; 
  margin-left:10px;
  font-weight:bold;
}

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
  /* box-shadow: 0px 0px 20px rgb(87, 87, 87); */
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
  left: 0;
  right: 0;
  top: 10px;
}
.footer {
  margin-top: 0px;
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
    border-radius:10px;
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
border-radius:10%;
/* background-image: url(https://m.convenii.com/web/upload/NNEditor/20210810/mobile/59ce28fbdad73f939a444d57f286bb1a_1628586790.jpg); */
background-color: white;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : black;
background-size: cover;
border: 1.5px solid rgb(63, 64, 68);
}

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

@media screen and (min-width:500px) {
body {
  margin : 0;
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 435px; height:70%;
  background: rgba(0,0,0,0.5);
  position: absolute; 
  padding:20px;
  margin:auto;
}
.white-bg {
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
} 

.headerlist{
  font-size:15px; 
  margin-top:10px; 
  margin-left:10px;
  font-weight:bold;
}

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
  /* box-shadow: 0px 0px 20px rgb(87, 87, 87); */
  background:rgb(255, 244, 226);
}
.tipletter{
    font-size:14px; 
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
    border-radius:10px;
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
border-radius:10%;
/* background-image: url(https://m.convenii.com/web/upload/NNEditor/20210810/mobile/59ce28fbdad73f939a444d57f286bb1a_1628586790.jpg); */
background-color: white;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : black;
background-size: cover;
border: 1.5px solid rgb(63, 64, 68);
}

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