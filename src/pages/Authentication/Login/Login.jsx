/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom"
import SocialLogin from "../../../Components/ExtraLogin/SocialLogin"
import useAuth from "../../../hooks/useAuth"
import toast from "react-hot-toast"
import { useState } from "react"
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { Helmet } from "react-helmet-async"
import axios from "axios"

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { signIn } = useAuth()
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = form.get('email');
    const password = form.get('password');

    if (password.length < 6) {
      toast.error("The password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("The password must contain at least one capital letter.");
      return;
    }
    if (!/[!@#$%^&*()]/.test(password)) {
      toast.error("The password must contain at least one special character.");
      return;
    }

    signIn(email, password)
      .then(res => {
        console.log(res)
        const uid = res.user?.uid;
        const emailVerified = res.user?.emailVerified;
        const lastSignInTime = res.user?.metadata?.lastSignInTime;
        const photoURL = res.user?.photoURL;
        const user = { uid, lastSignInTime, emailVerified, photoURL };
        axios.patch("http://localhost:5000/user", user)
          .then(res => {
            console.log(res)
            if (res.data.acknowledged) {
              toast.success('User Update  successfully');
            }
          })

        toast.success('User logged in successfully');
        navigate('/')
      })
      .catch(error => {
        toast.error(error.message)
      })

  }
  return (

    <>
      <Helmet>
        <title>Login | Social Login</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content px-16 flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div></div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="input input-bordered"
                  required
                />
                <span className="absolute top-[3.2rem] right-4" onClick={() => setShowPassword(!showPassword)}>
                  {
                    showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                  }

                </span>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">Login</button>
              </div>
            </form>
            <div className="divider">Or continue with</div>

            <SocialLogin />
            <p className="text-center mt-4">Don&apos;t have an account? <Link to={"/register"} className="font-medium text-indigo-600 hover:text-indigo-500">Register</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login