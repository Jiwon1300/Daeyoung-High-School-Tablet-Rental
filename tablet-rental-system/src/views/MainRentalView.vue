<template>
    <div style="padding: 20px;">
        <div style="display: flex; height: 500px;">
            <div class="menuCard" @click="$router.push('/studentAuthentication')"
                style=" margin-left: auto; margin-right: 10px; width: 100%; max-width: 55vw; cursor: pointer; border-radius: 20px;  padding: 20px;">
                <div style="text-align: center; margin: 10px;">
                    <div style="font-size: 30px; font-weight: bold;">
                        대여하기
                    </div>
                    <img src="../assets/rentalIcon.svg" style=" width: 200px; margin-top: 50px;">
                    <div style="font-size: 20px; margin-top: 40px;">
                        간편한 생체정보로 태블릿을 쉽게 대여하세요!
                    </div>
                    <div style="font-size: 20px; font-weight: bold; margin-top: 50px;">
                        대여하기 >
                    </div>
                </div>


            </div>
            <div class="returnCard" @click="$router.push('/returnStudentAuthentication')"
                style="width: 100%; max-width: 50vw; cursor: pointer; border-radius: 20px; padding: 20px;">
                <div style="text-align: center; margin: 10px;">
                    <div style="font-size: 30px; font-weight: bold;">
                        반납하기
                    </div>
                    <img src="../assets/returnIcon.svg" style=" width: 200px; margin-top: 50px;">
                    <div style="font-size: 20px; margin-top: 40px;">
                        다른 학생들도 사용할 수 있도록 반납해주세요!
                    </div>
                    <div style="font-size: 20px; font-weight: bold; margin-top: 50px;">
                        반납하기 >
                    </div>
                </div>
            </div>
        </div>
        <div class="supportCard"
            style=" margin-top: 40px; height: 300px;  cursor: pointer; border-radius: 20px;  padding: 20px; ">
            <div style="text-align: center; margin: 10px;">
                <div style="font-size: 30px; font-weight: bold;">
                    문의하기
                </div>
                <div style="display: flex;">
                    <img src="../assets/supportIcon.svg" style=" width: 300px; margin-left:-20px">
                    <div style="font-size: 20px; margin-top: 60px; margin-left: -10px; text-align: left;">
                        태블릿 대여 시스템을 사용에 문제가 발생하였거나
                        
                        <br>
                        도움이 필요할 경우 문의하기를 터치하여 문의해주세요!
                    </div>
                    
                </div>
                <div style="font-size: 20px; font-weight: bold; margin-top: auto; margin-left: auto; text-align: right; margin-right: 10px;">
                        문의하기 >
                    </div>
                
            </div>

        </div>
    </div>
</template>

<style>
.menuCard {
    user-select: none;
    background-color: #669eff;
    color: white;
    transition: background-color 0.3s ease;
    /* transition: color 0.3s ease; */
}

.menuCard:hover {
    /* color:rgb(36, 36, 36); */
    background-color: #80a8ff;
}

.returnCard {
    user-select: none;
    background-color: #ff6b6b;
    color: white;
    transition: background-color 0.3s ease;
    /* transition: color 0.3s ease; */
}

.returnCard:hover {
    /* color:rgb(36, 36, 36); */
    background-color: #ff8585;
}

.supportCard {
    user-select: none;
    background-color: #8fbe75;
    color: white;
    transition: background-color 0.3s ease;
    /* transition: color 0.3s ease; */
}

.supportCard:hover {
    /* color:rgb(36, 36, 36); */
    background-color: #79b16a;
}
</style>

<script>

export default {
    components: [

    ]
}
</script>