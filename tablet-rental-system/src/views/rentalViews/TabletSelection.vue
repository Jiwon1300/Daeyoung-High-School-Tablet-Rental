<!-- 태블릿 대여함을 선택하여 대여 가능한 태블릿을 선택하는 화면입니다 -->

<template>
    <div>
        <div @click="$router.push('/')" style="margin-left: 20px; margin-top: 20px; font-size: 20px; font-weight: bold;">
            &lt 처음으로
        </div>
        <div style="text-align: center; font-size: 25px; font-weight: bold; ">{{ $route.query.name }}님, 사용할 태블릿을 선택해주세요
        </div>
        <div style="margin-left: 20vw; margin-right: 20vw; margin-top: 20px;">
            태블릿 보관함 선택
            <n-select size="large" v-model:value="tabletCaseId" :options="availableTablets" />
        </div>
        <div style="text-align: center; margin-top: 20px; font-weight: bold; font-size: 20px;">
            태블릿 선택
        </div>
        <div style="margin-left: 15vw; margin-right: 15vw; margin-top: 10px;">
            <n-table :bordered="false" :single-line="false">


                <thead>
                    <tr>
                        <th>태블릿 번호</th>
                        <th>대여 현황</th>
                        <th>태블릿 번호</th>
                        <th>대여 현황</th>
                    </tr>
                </thead>

                <tbody>

                    <tr v-for="(i) in tablets">
                        <td>{{ i.tabletId }}번 태블릿</td>
                        <td @click="rental(i.tabletId, !i.tabletRental)" style="cursor: pointer;"
                            :style="i.tabletRental ? 'color:rgb(196, 71, 69)' : 'color:rgb(132, 182, 98)'">{{ i.tabletRental
                                ? "대여불가" : "대여가능" }}</td>
                    </tr>
                </tbody>

            </n-table>
            <div v-show="isLoading" style="text-align: center; margin-top: 20px;">
                <n-spin size="medium" />
            </div>
        </div>

    </div>
</template>

<script>
import { useMessage } from 'naive-ui'
import axios from 'axios'
export default {
    setup() {
        const message = useMessage()
        return {
            error() {
                message.error("알 수 없는 오류가 발생하였습니다")
            },
            cantRental() {
                message.error("대여가 불가능한 태블릿입니다")
            }
        }
    },
    data() {
        return {
            tabletCaseId: null,
            availableTablets: [
            ],
            studentData:{
                studentId: this.$route.query.id,
                studentName: this.$route.query.name,
            },
            tablets: [],
            isLoading: false,
        }
    },
    mounted() {
        axios({
            url: '/api/tablet/gettabletcase',
            method: 'get'
        }).then((res) => {
            res.data.forEach(tabletCaseId => {
                this.availableTablets.push({
                    label: `${tabletCaseId}번 태블릿 보관함`,
                    value: `${tabletCaseId}`
                })
            });
        })
    },
    methods: {
        rental(tabletId, isCanRental) {
            if (isCanRental) {
                this.$router.push({
                    path: "/rentalPeriodSelection", query: {
                        studentId:this.studentData.studentId,
                        studentName:this.studentData.studentName,
                        tabletId:tabletId,
                        tabletCaseId:this.tabletCaseId
                        
                        
                    }
                })
            } else {
                this.cantRental()
            }

        }
    },
    watch: {
        tabletCaseId() {
            this.isLoading = true
            axios({
                url: '/api/tablet/gettablets',
                method: 'get',
                params: {
                    case: `${this.tabletCaseId}`
                },

            }).then((res) => {
                this.isLoading = false
                this.tablets = res.data
                // tabletId : 0 tabletRental : false
            }).catch(error => {
                this.isLoading = false
                this.$router.push("/")
            })

        }
    }
}

</script>