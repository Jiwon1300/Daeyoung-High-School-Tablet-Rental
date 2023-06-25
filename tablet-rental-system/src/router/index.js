import {createRouter,createWebHistory} from 'vue-router'
import MainRentalView from '../views/MainRentalView.vue'
import StudentAuthentication from '../views/rentalViews/StudentAuthentication.vue'
import TabletSelection from '../views/rentalViews/TabletSelection.vue'
import StudentBiometricAuthentication from '../views/rentalViews/StudentBiometricAuthentication.vue'
import RentalPeriodSelection from '../views/rentalViews/RentalPeriodSelection.vue'
import RentalSuccess from '../views/rentalViews/SuccessRental.vue'
import ReturnStudentAuthentication from '../views/returnViews/StudentAuthentication.vue'

const routes = [
    {
        path:"/",
        component:MainRentalView
    },
    {
        path:"/studentAuthentication",
        component:StudentAuthentication
    },
    {
        name:"TabletSelection",
        path:"/tabletSelection",
        component:TabletSelection
    },
    {
        path:"/studentBiometricAuthentication",
        component:StudentBiometricAuthentication
    },
    {
        name:"RentalPeriodSelection",
        path:"/rentalPeriodSelection",
        component:RentalPeriodSelection
    },
    {
        name:"rentalSuccess",
        path:'/rentalSuccess',
        component:RentalSuccess
    },
    {
        name:"returnAuthentication",
        path:'/returnStudentAuthentication',
        component:ReturnStudentAuthentication
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: "/"
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
