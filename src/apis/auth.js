import httpInstance from '../services/Http'

export const registerAccount = (body) => httpInstance.post('/auth/register', body)
export const loginAccount = (body) => httpInstance.post('/auth/login', body)
