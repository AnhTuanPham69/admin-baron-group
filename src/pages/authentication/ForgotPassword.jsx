import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import callAPI from "../../api/api";
import "./style.css";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState();
  const [status, setStatus] = useState();
  const onSubmit = (data) => {
    setLoading(true);
    callAPI("post", "/admin/forgot_password", data)
      .then((res) => {

        if (res.status === 201) {
          setTimeout(setStatus(res.status), 3000);
          setStatus(res.status);
          sessionStorage.setItem("__token__", JSON.stringify(res.data.token));
        }else{
          setStatus(res.data.status);
        }
        

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
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
                {errors.email && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
              <div className="form-group" id="choice">
                {status === 403 && (
                  <div>
                    {" "}
                    <span className="text-danger"> Error: Email wrong!</span>
                  </div>
                )}
              {status === 201 && (
                  <div>
                    {" "}
                    <span className="text-primary">
                      {" "}
                      Check email to get new password
                    </span>
                  </div>
                )}
                <NavLink to="/login">Back to login?</NavLink>
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
