import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
import callAPI from '../../api/api';

import './style.css'

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const history = useHistory();
  const [status, setStatus] = useState();

  const onSubmit = data => {
    console.log(data);
    callAPI('post', '/admin', data).then((res)=>{
      console.log(`status: ${res.status}`);
      setStatus(res.status);
      sessionStorage.setItem('__token__', JSON.stringify(res.data.token));
      history.push('/dashboard');
    }).catch((err)=>{
      setStatus(401);
    });
    

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
              <div>{
                status === 401 
                && <span className="text-danger">Username or Password is wrong! <br/></span>
              }</div>
              <div className="form-group" id="choice">
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

