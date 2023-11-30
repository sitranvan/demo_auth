import { Box, Button, TextField, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { registerAccount } from '../../apis/auth'
import { omit } from 'lodash'
import { isAxios409 } from '../../utils/errorAxios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: { errors }
    } = useForm()

    const registerMutation = useMutation({
        mutationFn: (body) => registerAccount(body)
    })
    const onSubmit = handleSubmit((data) => {
        const body = omit(data, ['confirmPassword'])
        registerMutation.mutate(body, {
            onSuccess: (data) => {
                navigate('/login')
            },
            onError: (error) => {
                if (isAxios409(error)) {
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
                Resgiter
            </Typography>
            <TextField
                error={!!errors.name}
                fullWidth
                id='outlined-multiline-flexible'
                label='Name'
                multiline
                maxRows={4}
                {...register('name', {
                    required: {
                        value: true,
                        message: 'Name is required'
                    }
                })}
                helperText={errors.name?.message}
            />
            <TextField
                error={!!errors.email}
                sx={{
                    mt: 2
                }}
                fullWidth
                id='outlined-multiline-flexible'
                label='Email'
                multiline
                maxRows={4}
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
                helperText={errors.email?.message}
            />
            <TextField
                error={!!errors.password}
                sx={{
                    mt: 2
                }}
                fullWidth
                id='outlined-multiline-flexible'
                label='Password'
                multiline
                maxRows={4}
                {...register('password', {
                    required: {
                        value: true,
                        message: 'Password is required'
                    }
                })}
                helperText={errors.password?.message}
            />
            <TextField
                error={!!errors.confirmPassword}
                sx={{
                    mt: 2
                }}
                fullWidth
                label='Confirm Password'
                id='outlined-multiline-flexible'
                multiline
                maxRows={4}
                {...register('confirmPassword', {
                    required: {
                        value: true,
                        message: 'Confirm password is required'
                    },
                    validate: {
                        validateConfirmPassword: (value) => value === getValues('password') || 'Passwords do not match'
                    }
                })}
                helperText={errors.confirmPassword?.message}
            />
            <Button
                sx={{
                    mt: 4
                }}
                type='submit'
                size='large'
                fullWidth
                variant='contained'
                color='success'
            >
                Register
            </Button>
        </Box>
    )
}
