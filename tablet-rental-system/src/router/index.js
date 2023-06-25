import {createRouter,createWebHistory} from 'vue-router'
import mainRentalView from '../views/MainRentalView.vue'
import studentAuthentication from '../views/rentalViews/StudentAuthentication.vue'
import tabletSelection from '../views/rentalViews/TabletSelection.vue'
import studentBiometricAuthentication from '../views/rentalViews/StudentBiometricAuthentication.vue'
import rentalPeriodSelection from '../views/rentalViews/RentalPeriodSelection.vue'
import rentalSuccess from '../views/rentalViews/SuccessRental.vue'
import returnStudentAuthentication from '../views/returnViews/StudentAuthentication.vue'
import returnWaiting from '../views/returnViews/returnWaiting.vue'

const routes = [
    {
        path:"/",
        component:mainRentalView
    },
    {
        path:"/studentAuthentication",
        component:studentAuthentication
    },
    {
        name:"TabletSelection",
        path:"/tabletSelection",
        component:tabletSelection
    },
    {
        path:"/studentBiometricAuthentication",
        component:studentBiometricAuthentication
    },
    {
        name:"RentalPeriodSelection",
        path:"/rentalPeriodSelection",
        component:rentalPeriodSelection
    },
    {
        name:"rentalSuccess",
        path:'/rentalSuccess',
        component:rentalSuccess
    },
    {
        name:"returnAuthentication",
        path:'/returnStudentAuthentication',
        component:returnStudentAuthentication
    },
    {
        path:'/returnWaiting',
        component:returnWaiting
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
