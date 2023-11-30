import { Button, CircularProgress } from '@mui/material'
import React from 'react'

export default function ButtonSubmit({ isLoading, disabled, children, ...rest }) {
    console.log(isLoading)
    return (
        <Button
            type='submit'
            sx={{
                mt: 4
            }}
            size='large'
            fullWidth
            disabled={disabled}
            {...rest}
            variant='contained'
            color='success'
        >
            {isLoading ? <CircularProgress color='inherit' /> : children}
        </Button>
    )
}
