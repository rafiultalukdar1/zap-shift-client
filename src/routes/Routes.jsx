import { createBrowserRouter } from "react-router";
import Root from "../components/Layouts/Root";
import Home from "../pages/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayouts from "../components/Layouts/AuthLayouts";
import Login from "../pages/AuthPage/Login/Login";
import Register from "../pages/AuthPage/Register/Register";
import PrivetRoute from "./PrivetRoute";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayouts from "../components/Layouts/DashboardLayouts";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/Payment/PaymentCancel";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import BeARider from "../pages/BeARider/BeARider";
import ApproveRiders from "../pages/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'be-a-rider',
                element: <PrivetRoute><BeARider></BeARider></PrivetRoute>,
                loader: () => fetch('/cerviceCenter.json').then(res => res.json())
            },
            {
                path: 'pricing',
                element: <h2>Pricing</h2>
            },
            {
                path: 'send-parcel',
                element: <PrivetRoute><SendParcel></SendParcel></PrivetRoute>,
                loader: () => fetch('/cerviceCenter.json').then(res => res.json())
            },
            {
                path: 'coverage',
                Component: Coverage,
                loader: () => fetch('/cerviceCenter.json').then(res => res.json())
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayouts,
        children: [
            {
                path: 'login',
                Component: Login,
            },
            {
                path: 'register',
                Component: Register,
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivetRoute><DashboardLayouts></DashboardLayouts></PrivetRoute>,
        children: [
            {
                path: 'my-parcels',
                Component: MyParcels,
            },
            {
                path: 'payment/:parcelId',
                Component: Payment
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'payment-cancel',
                Component: PaymentCancel
            },
            {
                path: 'payment-history',
                Component: PaymentHistory,
            },
            {
                path: 'approve-riders',
                Component: ApproveRiders
            },
            {
                path: 'users-management',
                Component: UsersManagement
            }
        ]
    }
]);