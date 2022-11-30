<template>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <header>
        <div class="footer2">
            <div style="float:left; margin-left:24%; margin-top:7.5px;">
            <svg xmlns="http://www.w3.org/2000/svg" height="25" color="white" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16" @click="openusagemodal">
            <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
            <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
            </svg>
            </div>
            <div style="float:right; margin-right:24%; margin-top:7.5px;">
            <svg xmlns="http://www.w3.org/2000/svg" height="25" color="white" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16" @click="openhelpmodal">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
            </svg>       
            </div>
            <!-- <img src="../assets/메뉴얼.png" style="width:40px; background-color: white; margin-left:80px; float:left" @click="openusagemodal"/> -->
            <!-- <img src="../assets/도움말.png" style="width:40px; background-color: white; margin-right:80px; float:right" @click="openhelpmodal"/> -->
        </div>
    </header>
</template>

<script>

export default {
    name:"Footer",
    data(){
        return{

        }
    },
    methods:{
        openusagemodal(){
            this.$emit('um', true)
        },
        openhelpmodal() {
            this.$emit('hm', true)
        }

    }
}


</script>

<style>
@media (min-width:300px) {
.footer2{
    background-color: black;
    height:40px;
    width:100%;
    position: fixed;
    bottom: 0px;
    display: block;
    margin: 0px auto;
}
}
@media (min-width:400px) {
.footer2{
    background-color: black;
    height:40px;
    width:99.5%;
    position: fixed;
    bottom: 0px;
    display: block;
    margin: 0px auto;
}
}
@media (min-width:460px) {
.footer2{
    background-color: black;
    height:40px;
    width:458px;
    bottom: 0px;
    position: fixed;
}
}
</style>