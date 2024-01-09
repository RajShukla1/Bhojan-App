import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const err = useRouteError();
  return (
    <>
    <div>Error</div>
    <h1>{err?.status}</h1>
    <h2>{err?.error?.message}</h2>
    </>
  )
}

export default Error