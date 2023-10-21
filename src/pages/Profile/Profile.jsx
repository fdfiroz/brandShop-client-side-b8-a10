
import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import axios from 'axios'

const Profile = () => {
  const { user, loading} = useAuth()
  const [newUser, setNewUser] = useState({})
  useEffect(() => {
    axios.get(`https://brand-shop-server-side-fdfiroz.vercel.app/user/${user?.uid}`)
    .then(res => {
      setNewUser(...res.data)
     })
    .catch(err => {
      console.log(err)
     })
  }, [loading, user?.uid])
  return (
    <>
   
    <div className='h-full pt-16 flex flex-col items-center justify-center bg-base-100'>
      <div className="avatar">
        <div className="w-36 rounded-full">
          <img src={user.photoURL} />
        </div>
      </div>
      <div className='flex items-center justify-center gap-4 p-8'>
      <div className='font-bold text-md text-start'>
      <p>Name: </p>
      <p>Email:</p>
      <p>Phone:</p>
      <p>Profile Created:</p>
      <p>Last Login:</p>
      </div>
      <div className="divider divider-horizontal"></div> 
      <div className='text-md text-start'>
      <p>{newUser?.name}</p>
      <p>{newUser?.email}</p>
      <p>{newUser?.phoneNumber? newUser.phoneNumber:"No Phone number"}</p>
      <p>{newUser?.createdAt  }</p>
      <p>{newUser?.lastSignInTime}</p>
      </div>
      </div>
    </div>
    </>

  )
}

export default Profile