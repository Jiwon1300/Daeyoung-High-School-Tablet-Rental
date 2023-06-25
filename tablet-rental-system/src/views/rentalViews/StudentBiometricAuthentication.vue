<template>
    <div>
        <div @click="$router.push('/')" style="margin-left: 20px; margin-top: 20px; font-size: 20px; font-weight: bold;">
            &lt 처음으로
        </div>
        <div style="text-align: center; font-size: 20px; font-weight: bold; ">{{ $route.query.tabletId }}번 태블릿 사용을 위해서 생체인증을
            진행해주세요
        </div>
        <Transition name="fade">
            <div v-show="isHidden" style="position: absolute; left: 50%; transform:translateX(-50%); margin-top: 20px;">
                <img style=" width: 100px;" src="../../assets/fingerprint.png" />
            </div>
        </Transition>
        <div style="text-align: center; font-size: 16px;  margin-top: 160px;">태블릿 보관함에 장착된 지문인식 센서에 손가락을 올려주세요</div>
    </div>
</template>

<style>
.hidden {
    visibility: hidden;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>

<script>
import io from 'socket.io-client'
import axios from 'axios'
export default {
    data() {
        return {
            isHidden: false,
            studentData: {
                studentId: this.$route.query.studentId,
                studentName: this.$route.query.studentName
            },
            tabletData: {
                tabletCaseId: this.$route.query.tabletCaseId,
                tabletId: this.$route.query.tabletId,
            },
            rentalPeriod: this.$route.query.rentalPeriod
        }
    },
    methods: {
        home() {

        },
    },
    async mounted() {
        // 연결
        const studentData = await axios({
            url: `/api/student/getstudent/${this.studentData.studentId}/${this.studentData.studentName}`,
            method: 'get'
        })
        if (studentData.data.isRestrict) {
            this.$router.push('/')
        } else {


            const socket = io('http://localhost:3001')
            socket.connect()
            socket.emit("startVerify", {
                tabletCase: this.tabletData.tabletCaseId,
                studentId: this.studentData.studentId
            })
            // 태블릿 보관함 번호 확인

            socket.on(`done-${this.tabletData.tabletCaseId}`, (data) => {
                axios({
                    method: "post",
                    url: '/api/tablet/startrental',
                    data: {
                        rentalData: {
                            tabletCaseID: this.tabletData.tabletCaseId,
                            tabletId: this.tabletData.tabletId,
                            studentId: this.studentData.studentId,
                            rentalPeriod: this.rentalPeriod
                        }
                    }
                }).then(() => {
                    this.$router.push({
                        path: '/rentalSuccess',
                        query: {
                            rentalPeriod: `${this.rentalPeriod.split("-")[0]}년 ${this.rentalPeriod.split("-")[1]}월 ${this.rentalPeriod.split("-")[2]}일`,
                            tabletId: this.tabletData.tabletId
                        }
                    })
                }).catch(error => {

                })

            })
            setInterval(() => {
                this.isHidden = !this.isHidden
            }, 800);
        }

    },
}
</script>