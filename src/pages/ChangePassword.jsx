import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import callAPI from "../api/api";
import "./changepw.css";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState();
  const [status, setStatus] = useState();

  const history = useHistory();
  const onSubmit = (data) => {
    setLoading(true);
    callAPI("post", "/admin/change_password", data)
      .then((res) => {
        if (res.status === 201) {
          setTimeout(()=>{
            setStatus(res.status)
          }, 3000);
          logout();
        }else{
          console.log(res.data.status);
          setStatus(res.data.status);
        }
        
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const logout = ()=>{
    sessionStorage.removeItem('__token__');
    history.push('/');
    window.location.reload();
  }
  return (
    <div>
      <div className="page-body-changepassword">
        <div className="outer-login">
          <div className="inner-login">
            <div className="login-top">
              <div className="logo-img-login"></div>
              <h3>
                <b>Change Password</b>
              </h3>
            </div>
            <form method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter email"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
              <div className="form-group">
                <label>Old Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  {...register("oldPw", { required: true })}
                />
                {errors.oldPw && <span className="text-danger">This field is required</span>}
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  {...register("newPw", { required: true })}
                />
                {errors.newPw && <span className="text-danger">This field is required</span>}
              </div>

              <div className="form-group" id="choice">
                {status === 404 && (
                  <div>
                    {" "}
                    <span className="text-danger">Username is incorrect!</span>
                  </div>
                )}
              {status === 401 && (
                  <div>
                    {" "}
                    <span className="text-danger">
                      {" "}
                      Old password is incorrect
                    </span>
                  </div>
                )}
              {status === 201 && (
                  <div>
                    <div className="text-success">
                      Changed password
                    </div>

                    <div className="text-primary cursor_pointer " onClick={()=>logout()}>logout?</div>
                  </div>
                )}
              </div>
              

              {loading === true ? (
                <button className="btn btn-login btn-lg btn-block">
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-login btn-lg btn-block"
                >
                  Get a new password
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
