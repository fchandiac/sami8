'use client'
import { Button } from '@mui/material'
import React from 'react'
import { useGlobalContext } from '@/globalContext'


export default function page() {
  const { commerce } = useGlobalContext()
  return (
    <Button variant="contained" color="primary"
      onClick={() => {
        console.log(commerce.userCommerce)
      }}
    >
      test commerce
    </Button>
  )
}
