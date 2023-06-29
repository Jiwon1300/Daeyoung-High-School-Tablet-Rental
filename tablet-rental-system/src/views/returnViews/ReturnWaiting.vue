<template>
    <div>
        <div @click="$router.push('/')" style="margin-left: 20px; margin-top: 20px; font-size: 20px; font-weight: bold;">
            &lt 처음으로
        </div>
        <div style="text-align: center; font-size: 25px; font-weight: bold; ">태블릿을 반납해주세요</div>
        <div style="text-align: center; font-size: 18px; margin-top: 20px; ">보관함 잠금이 해제되면, 문을 열어 보관함의 태블릿 자리에 위치시킨 후 충전시켜주세요
        </div>
        <div style="text-align: center; margin-top: 20px;">
            <n-button @click="returnCheck" ghost type="primary" style="width: 425px;" size="large">
                반납확인
            </n-button>
        </div>
        <n-modal :show="notReturnModal">
            <n-card aria-modal="true" style="width: 600px" title="태블릿 반납이 확인되지 않았습니다" :bordered="false" size="huge"
                role="dialog">
                메인화면에서 다시시도 해주세요
            </n-card>
        </n-modal>
    </div>
</template>

<script>
import io from 'socket.io-client'
import axios from 'axios'

export default {
    data() {
        return {
            tabletId: "",
            tabletCaseId: "",
            studentId: "",
            notReturnModal: false,

        }
    },
    mounted() {
        axios({
            method: 'get',
            params: {
                studentId: this.$route.query.id
            },
            url: '/api/student/studentrentaltablet'
        }).then(async (tabletData) => {
            const socket = io('http://localhost:3001')
            socket.connect()
            console.log(tabletData)
            this.tabletCaseId = tabletData.data.tabletCaseId
            this.tabletId = tabletData.data.tabletId
            this.studentId = this.$route.query.id
            socket.emit("return", {
                studentId: this.$route.query.id,
                tabletCaseId: tabletData.data.tabletCaseId,
                tabletId: tabletData.data.tabletId
            })
            // socket.disconnect()
        })

        // setInterval(() => {
        //     this.isHidden = !this.isHidden
        // }, 800);
    },
    methods: {
        async returnCheck() {
            try {
                const tabletData = await axios({
                    method: 'get',
                    url: '/api/tablet/tabletdata',
                    params: {
                        tabletId: this.tabletId,
                        tabletCaseId: this.tabletCaseId,
                    }
                })
                if (tabletData.data.isRental == false) {
                    const tabletData = await axios({
                        url: '/tabletdata',
                        method: 'get',
                        params: {
                            tabletCaseId: this.tabletCaseId,
                            tabletId: this.tabletId
                        }
                    })
                    if (tabletData.data.isCharge) {
                        // 대여완료
                    } else {
                        axios({
                            url: '/api/tablet/rentalcancel',
                            method: 'post',
                            data: {
                                tabletId: this.tabletId,
                                tabletCaseid: this.tabletCaseId,
                                isCancel: true
                            }
                        })
                        this.notReturnModal = true
                        setTimeout(function () {
                            this.$router.push('/')
                        }.bind(this), 5000);
                    }

                } else {
                    axios({
                        url: '/api/tablet/rentalcancel',
                        method: 'post',
                        data: {
                            tabletId: this.tabletId,
                            tabletCaseid: this.tabletCaseId,
                            isCancel: true
                        }
                    })
                    this.notReturnModal = true
                    setTimeout(function () {
                        this.$router.push('/')
                    }.bind(this), 5000);
                }
            } catch (error) {
                console.log(error)
            }


        }
    }

}

</script>
