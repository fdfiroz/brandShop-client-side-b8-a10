import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../../../Components/ExtraLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaEyeSlash, FaEye} from "react-icons/fa6";
import { Helmet } from 'react-helmet-async';
import axios from "axios";


const Register = () => {
  const { createUser, handleUpdateProfile } = useAuth();
  const navigate = useNavigate();
const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name  = form.get("name")
    const email = form.get('email');
    const password = form.get('password');
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
      if (!/[A-Z]/.test(password)) {
        toast.error("Password must contain at least one capital letter.");
      return;
    }
    if (!/[!@#$%^&*()]/.test(password)) {
      toast.error("Password must contain at least one special character.");
      return;
    }
    createUser(email, password)
            .then(res => {
              console.log(res)
              const emailVerified = res.user?.emailVerified;
              const createdAt = res.user?.metadata?.creationTime;
              const uid = res.user?.uid;
              const lastSignInTime = res.user?.metadata?.lastSignInTime;
              const user = { name, email, uid, lastSignInTime, emailVerified, createdAt };
              axios.post("http://localhost:5000/user", user)
                .then(res => {
                  console.log(res)
                  if (res.data.insertedId) {
                    toast.success("User created successfully");
                  } else {
                    toast.error("User not created");
                  }
                })
                handleUpdateProfile(name)
                    .then(() => {
                        navigate('/')

                    })
            })
            .catch(error => {
                toast.error(error.message)
            })

  }
  return (
    <>
    <Helmet>
      <title>Register | Social Login</title>
    </Helmet>
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content px-16 flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
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
              <button className="btn btn-primary" type='submit'>Register</button>
            </div>
          </form>
          <div className="divider">Or continue with</div>
          <SocialLogin></SocialLogin>
          <p className="text-center mt-4">Already have an account? <Link to={"/login"} className="font-medium text-indigo-600 hover:text-indigo-500">Login</Link></p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
