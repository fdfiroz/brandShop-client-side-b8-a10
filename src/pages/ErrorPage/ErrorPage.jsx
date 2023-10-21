
import { Link } from 'react-router-dom'

export const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h2 className='text-xl font-bold'>Oops!!! </h2>
        <h3 className='text-xl font-bold'>Something went wrong</h3>
        <p className='text-sm'>Page Not Found</p>
        <Link className='btn btn-primary rounded-md my-8' to="/">Go back to home</Link>
    </div>
  )
}
