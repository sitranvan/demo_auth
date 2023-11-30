import axios from 'axios'
import { cleanLocalStorage, getAccessToken, saveAccessToken, setProfile } from '../utils/auth'

class Http {
    instance
    accessToken
    constructor() {
        // giúp tăng tốc độ truy xuất bộ nhớ
        this.accessToken = getAccessToken()
        this.instance = axios.create({
            baseURL: 'http://localhost:3000/api/v1/',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        this.instance.interceptors.request.use(
            (config) => {
                if (this.accessToken && config.headers) {
                    config.headers.authorization = `Bearer ${this.accessToken}`
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        this.instance.interceptors.response.use(
            (response) => {
                const { url } = response.config
                if (url === '/auth/login') {
                    this.accessToken = response.data.data.token
                    saveAccessToken(this.accessToken)
                    setProfile({
                        id: 1,
                        name: 'Tran Van Si',
                        email: 'si@gmail.com'
                    })
                } else if (url === '/auth/logout') {
                    this.accessToken = ''
                    cleanLocalStorage()
                }
                return response
            },
            (error) => {
                return Promise.reject(error)
            }
        )
    }
}

const httpInstance = new Http().instance

export default httpInstance
