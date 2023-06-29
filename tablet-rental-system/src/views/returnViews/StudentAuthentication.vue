<template>
    <div>
        <div @click="$router.push('/')" style="margin-left: 20px; margin-top: 20px; font-size: 20px; font-weight: bold;">
            &lt 처음으로
        </div>
        <div style="text-align: center; font-size: 25px; font-weight: bold; ">태블릿 반납을 위한 학생정보 인증</div>
        <div style="margin-right: 200px; margin-left: 200px; margin-top: 40px;">
            <div style="">
                학번 입력 (예시 : 1209)
            </div>
            <n-input :disabled="isLoading" :loading="isLoading" v-model:value="students.id" :maxlength="4"
                :allow-input="onlyAllowNumber" size="large" style="" placeholder="학번을 입력해주세요"></n-input>
        </div>
        <div style="margin-right: 200px; margin-left: 200px; margin-top: 10px;">
            <div style="">
                이름 입력 (예시 : 문지원)
            </div>
            <n-input :disabled="isLoading" :loading="isLoading" v-model:value="students.name" size="large" style=""
                placeholder="이름을 입력하세요"></n-input>
        </div>
        <div style="text-align: center; margin-top: 20px;">
            <n-button :disabled="isLoading" :loading="isLoading" @click="verify" ghost type="primary" style="width: 425px;"
                size="large">
                반납 시작하기
            </n-button>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import { useMessage } from 'naive-ui'
export default {
    setup() {
        const message = useMessage()
        return {
            notFoundStudent() {
                message.error(
                    "일치하는 학생 정보가 없습니다",
                    {
                        keepAliveOnHover: true
                    }
                )
            },
            notRentalStudent() {
                message.error(
                    "태블릿을 대여중인 학생이 아닙니다",
                    {
                        keepAliveOnHover: true
                    }
                )
            },
        }
    },
    data() {
        return {
            students: {
                id: "",
                name: ""
            },
            isLoading: false,
            onlyAllowNumber: (value) => !value || /^\d+$/.test(value),
        }
    },
    methods: {
        verify() {
            this.isLoading = true
            axios({
                url: `/api/student/getstudent`,
                params:{
                    id:this.students.id,
                    name:this.students.name
                },
                method: 'get'
            }).then((res) => {
                if(!res.data.isRental){
                    this.notRentalStudent()
                    this.isLoading = false
                }else{
                    this.$router.push({
                            path: "/returnWaiting", query: {
                                id: this.students.id,
                                name: this.students.name
                            }
                        })
                }
                
            }).catch(err => {
                this.notFoundStudent()
                this.isLoading = false
            })
        }
    }

}

</script>