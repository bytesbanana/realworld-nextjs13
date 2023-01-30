import React, { FormEventHandler, useState } from "react";
import Link from "next/link";

import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

type LoginFormData = {
  email: string;
  password: string;
};

const initailFormData = {
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState<LoginFormData>(initailFormData);
  const [errors, setErrors] = useState<boolean>(false);

  const handleInputChange = (e: InputChangeEvent) => {
    setForm((prevFromData) => ({
      ...prevFromData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setErrors(false);
    if (res?.ok) {
      router.push("/");
    } else {
      setErrors(true);
    }
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link href="/auth/register">Need an account?</Link>
            </p>

            {errors && (
              <ul className="error-messages">
                <li>Invaild credentials</li>
              </ul>
            )}

            <form onSubmit={handleFormSubmit}>
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
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
