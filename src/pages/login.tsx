import Head from "next/head";
import { useRouter } from "next/router";
import React, { FormEvent, FormEventHandler, useState } from "react";
import { API_BASE_URL } from "utils/constant";

interface LoginFormData {
  email: string;
  password: string;
}

interface ErrorResponse {
  errors: Errors;
}

interface Errors {
  [key: string]: string[];
}

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!router.isReady) return;

    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify({
        user: form,
      }),

      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    if (response.ok) {
      setErrors(null);
      router.push("/");
    } else {
      const errResponse = (await response.json()) as ErrorResponse;
      setErrors(errResponse.errors);
    }
  };

  return (
    <>
      <Head>
        <title>Sign in - Conduit</title>
        <meta name="description" content="Next.js 13 + SWR realword demo" />
      </Head>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <a href="">Need an account?</a>
              </p>

              <ul className="error-messages">
                {errors &&
                  Object.keys(errors).map((key) =>
                    errors[key].map((msg, i) => (
                      <li key={key + i}>
                        {key} {msg}
                      </li>
                    ))
                  )}
              </ul>

              <form onSubmit={handleSubmit}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, password: e.target.value }))
                    }
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
