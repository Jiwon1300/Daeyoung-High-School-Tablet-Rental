<template>
    <div>
        <div style="text-align: center; font-size: 25px; margin-top: 20px; font-weight: bold;">
            태블릿 대여가 완료되었습니다
        </div>
        <div style="text-align: center; font-size: 18px; margin-top: 15px;">
            {{ tabletId }}번의 태블릿을 가져가주세요
        </div>
        <div style="text-align: center;">
            <img style="width: 500px;" src="../../assets/success.svg"/>
        </div>
        <div style="text-align: center; font-size: 18px; ">
            반납일 {{ rentalPeriod }} 전까지 반납해주세요
            <br>
            태블릿에 표시된 태블릿 사용 주의사항을 확인해주세요
        </div>
        
        
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            tabletId:this.$route.query.tabletId,
            rentalPeriod:this.$route.query.rentalPeriod
        }
    },
    mounted(){
        setTimeout(function(){
            this.$router.push("/")
        }.bind(this),8000)
    }
}
</script>