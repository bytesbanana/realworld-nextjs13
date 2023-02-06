import React, { FormEventHandler, useState } from "react";
import Link from "next/link";

import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { CommonErrors, ErrorsResponse } from "lib/types/common";
import ErrorList from "components/common/ErrorList";
import UserAPI from "lib/api/user";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

type RegisterForm = {
  username: string;
  email: string;
  password: string;
};

const initailFormData = {
  username: "",
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState<RegisterForm>(initailFormData);
  const [errors, setErrors] = useState<CommonErrors>();

  const handleInputChange = (e: InputChangeEvent) => {
    setForm((prevFromData) => ({
      ...prevFromData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { username, email, password } = form;

    const result = await UserAPI.register(username, email, password);
    if ("user" in result) {
      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.ok) {
        router.push("/");
      } 
    } else {
      setErrors(result.errors);
    }
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link href="/auth/login">Have an account?</Link>
            </p>

            {errors && <ErrorList errors={errors} />}

            <form onSubmit={handleFormSubmit}>
              <fieldset className="form-group">
                <input
                  name="username"
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Username"
                  onChange={handleInputChange}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  name="email"
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  onChange={handleInputChange}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  name="password"
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                />
              </fieldset>
              <button
                type="submit"
                className="btn btn-lg btn-primary pull-xs-right"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
