<!-- 대여 기간을 지정할 수 있는 화면입니다 -->

<template>
    <div>
        <div @click="$router.push('/')" style="margin-left: 20px; margin-top: 20px; font-size: 20px; font-weight: bold;">
            &lt 처음으로
        </div>
        <div style="text-align: center; font-size: 25px; font-weight: bold; ">태블릿 대여 기간을 선택해주세요
        </div>
        <div style="text-align: center; font-size: 18px;  ">태블릿 대여는 현재 날짜부터 최대 20일까지 대여가 가능합니다
        </div>
        <div style="margin-top: 20px; margin-left: 15vw; margin-right: 15vw;">
            <n-date-picker size="large" :is-date-disabled="disabledDate" v-model:value="selectDate" type="date" />
        </div>
        <div style="text-align: center; margin-top: 20px;">
            <n-button @click="nextPage" ghost type="primary" style="width: 425px;" size="large" :disabled="isDisabled">
                대여기간 선택완료
            </n-button>
        </div>

    </div>
</template>

<script>
import router from '../../router'

export default {
    name: "RentalPeriodSelection",
    data() {
        return {
            isDisabled: true,
            studentData: {
                studentId: this.$route.query.studentId,
                studentName: this.$route.query.studentName
            },
            tabletData: {
                tabletCaseId: this.$route.query.tabletCaseId,
                tabletId: this.$route.query.tabletId,
            },
            selectDate: null
        }
    },
    methods: {
        disabledDate(ts, type, range) {
            const nowDate = new Date()
            const maxDate = new Date()
            const date = new Date(ts)
            maxDate.setDate(maxDate.getDate() + 20)
            while (nowDate.getDate() < maxDate.getDate() || nowDate.getMonth() + 1 != maxDate.getMonth() + 1) {
                if (nowDate.getDate() == date.getDate() && nowDate.getMonth() + 1 == date.getMonth() + 1) {
                    return false
                }
                nowDate.setDate(nowDate.getDate() + 1)
            }
            return true
        },
        nextPage() {
            router.push({
                path: '/studentBiometricAuthentication',
                query: {
                    studentId: this.studentData.studentId,
                    studentName: this.$route.query.studentName,
                    tabletCaseId: this.$route.query.tabletCaseId,
                    tabletId: this.$route.query.tabletId,
                    rentalPeriod: `${new Date(this.selectDate).getFullYear()}-${new Date(this.selectDate).getMonth() + 1}-${new Date(this.selectDate).getDate()}`
                }
            })
        }
    },
    mounted() {
        if (this.$route.query == {}) this.$router.push('/')
        axios({
            url: `/api/student/getstudent/${this.studentData.studentId}/${this.studentData.studentName}`,
            method: 'get'
        }).then((res) => {
            if (res.data.isRestrict) {
                this.$router.push('/')
            }

        })
    },
    watch: {
        selectDate() {
            this.isDisabled = false

        }
    }
}
</script>