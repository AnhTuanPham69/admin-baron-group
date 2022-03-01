import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import callAPI from '../../api/api';

import './style.css'

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
    callAPI('post', '/login', data);
  }
  return (
    <div>
      <div className="body-login">
        <div className="outer-login">
          <div className="inner-login">
            <div className="login-top">
              <div className="logo-img-login"></div>
              <h3>
                <b>Administrator</b>
              </h3>
            </div>
            <form method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter user name"
                  {...register("username", { required: true })}
                />
                {errors.username && <span className="text-danger">This field is required</span>}
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  {...register("password", { required: true })}
                />
                {errors.password && <span className="text-danger">This field is required</span>}
              </div>

              <div className="form-group" id="choice">
              <div> <span className="text-danger"> Sai mật khẩu</span></div>
                <NavLink to="/forgot_password" >Forgot password?</NavLink>
              </div>
              
              <button type="submit" className="btn btn-login btn-lg btn-block" >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

