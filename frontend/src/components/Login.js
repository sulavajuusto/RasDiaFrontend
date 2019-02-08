import React, { Component } from "react";
import currentUserValue from "./services/currentUserValue";
import login from "./services/loginser";
import { Link } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export class Login extends Component {
  constructor(props) {
    super(props);

    if (localStorage.getItem("currentUser")) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="loginpage">
        <div className="logincontainer">
          <h2>Login</h2>
          <Formik
            initialValues={{
              username: "",
              password: ""
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().required("Username is required"),
              password: Yup.string().required("Password is required")
            })}
            onSubmit={(
              { username, password },
              { setStatus, setSubmitting }
            ) => {
              setStatus();
              login(username, password).then(
                user => {
                  const { from } = this.props.location.state || {
                    from: { pathname: "/" }
                  };
                  this.props.history.push(from);
                }
                //     error => {
                //       setSubmitting(false);
                //       setStatus(error);
                //     }
              );
            }}
            render={({ errors, status, touched, isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Field
                    name="username"
                    type="text"
                    className={
                      "form-control" +
                      (errors.username && touched.username ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className={
                      "form-control" +
                      (errors.password && touched.password ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    Login
                  </button>

                  {isSubmitting && (
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  )}
                </div>
                {status && <div className={"alert alert-danger"}>{status}</div>}
                <Link to="/register" className="btn btn-link">
                  Register
                </Link>
              </Form>
            )}
          />
        </div>
      </div>
    );
  }
}

export default Login;
