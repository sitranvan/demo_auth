import axios from 'axios'

export function isAxiosError(err) {
    return axios.isAxiosError(err)
}

export function isAxios409(err) {
    return isAxiosError(err) && err.response?.status === 409
}
