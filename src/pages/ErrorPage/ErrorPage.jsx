import React from 'react'
import { Link } from 'react-router-dom'

export const ErrorPage = () => {
  return (
    <div>
        <h2>Oops!!! </h2>
        <Link to="/">Go back to home</Link>
    </div>
  )
}
