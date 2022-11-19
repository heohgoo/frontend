<template>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <header>
        <div class="footer2">
            <img src="../assets/메뉴얼.png" style="width:60px; background-color: white; margin-left:60px; float:left" @click="openusagemodal"/>
            <img src="../assets/도움말.png" style="width:60px; background-color: white; margin-right:60px; float:right" @click="openhelpmodal"/>
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
    height:60px;
    width:410px;
    position: fixed;
    bottom: 0px;
    display: block;
    margin: 0px auto;
}
}
@media (min-width:460px) {
.footer2{
    background-color: black;
    height:60px;
    width:460px;
    bottom: 0px;
    position: fixed;
}
}
</style>