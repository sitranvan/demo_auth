import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { loginAccount } from '../../apis/auth'
import { useMutation } from '@tanstack/react-query'
import { AppContext } from '../../contexts/App'
import { useNavigate } from 'react-router-dom'
import ButtonSubmit from '../../components/ButtonSubmit'

export default function Login() {
    const { setIsAuthenticated } = useContext(AppContext)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: { errors }
    } = useForm()

    const loginMutation = useMutation({
        mutationFn: (body) => loginAccount(body)
    })

    const onSubmit = handleSubmit((data) => {
        loginMutation.mutate(data, {
            onSuccess: (data) => {
                setIsAuthenticated(true)
                navigate('/')
            },
            onError: (error) => {
                const formError = error.response?.data.data
                if (formError) {
                    Object.keys(formError).forEach((key) => {
                        setError(key, {
                            type: 'manual',
                            message: formError[key]
                        })
                    })
                }
            }
        })
    })
    return (
        <Box
            sx={{
                width: '400px'
            }}
            onSubmit={onSubmit}
            component='form'
        >
            <Typography
                sx={{
                    mb: 4
                }}
                variant='h3'
            >
                Login
            </Typography>
            <TextField
                error={!!errors.email}
                fullWidth
                id='outlined-multiline-flexible'
                label='Email'
                multiline
                maxRows={4}
                helperText={errors.email?.message}
                {...register('email', {
                    required: {
                        value: true,
                        message: 'Email is required'
                    },
                    pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Invalid email'
                    }
                })}
            />
            <TextField
                sx={{
                    mt: 2
                }}
                error={!!errors.password}
                fullWidth
                id='outlined-multiline-flexible'
                label='Password'
                multiline
                maxRows={4}
                helperText={errors.password?.message}
                {...register('password', {
                    required: {
                        value: true,
                        message: 'Password is required'
                    }
                })}
            />
            <ButtonSubmit disabled={loginMutation.isPending} isLoading={loginMutation.isPending}>
                Login
            </ButtonSubmit>
        </Box>
    )
}
