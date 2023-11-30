import React, { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import RegisterLayout from '../layouts'
import MainLayout from '../layouts/MainLayout/MainLayout'
import Profile from '../pages/Profile'
import { AppContext } from '../contexts/App'

function ProtectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
    const { isAuthenticated } = useContext(AppContext)

    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function userRouterElements() {
    const userRouterElements = useRoutes([
        {
            path: '',
            element: (
                <MainLayout>
                    <Home />
                </MainLayout>
            )
        },
        {
            path: '',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '/profile',
                    element: (
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    )
                }
            ]
        },

        {
            path: '/',
            element: <RejectedRoute />,
            children: [
                {
                    path: '/login',
                    element: (
                        <RegisterLayout>
                            <Login />
                        </RegisterLayout>
                    )
                },
                {
                    path: '/register',
                    element: <Register />
                }
            ]
        }
    ])
    return userRouterElements
}
