import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import './style.css'

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => console.log(data);
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
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter email"
                  {...register("email", { required: true })}
                />
                {errors.email && <span className="text-danger">This field is required</span>}
              </div>
              <div className="form-group" id="choice">
              <div> <span className="text-danger"> Error: Sai email</span></div>
                <NavLink to="/login" >Back to login?</NavLink>
              </div>
              
              <button type="submit" className="btn btn-login btn-lg btn-block" >
                Get a new password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


