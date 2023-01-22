import { ErrorList } from "components/shared";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  ChangeEventHandler,
  FormEvent,
  useCallback,
  useState,
} from "react";
import { mutate } from "swr";
import { ErrorResponse, Errors } from "types/response";
import { API_BASE_URL } from "utils/constant";

interface RegisterFormData {
  email: string;
  username: string;
  password: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors | undefined>();
  const [form, setForm] = useState<RegisterFormData>({
    email: "",
    username: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors(undefined);

    if (!router) return;

    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      body: JSON.stringify({ user: form }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    const data = await response.json();
    if (response.ok) {
      window.localStorage.setItem("user", JSON.stringify(data));
      mutate("user", data);
      router.push("/");
    } else {
      const errResponse = data as ErrorResponse;
      setErrors(errResponse.errors);
    }
  };

  const handleInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value })),
    []
  );

  return (
    <>
      <Head>
        <title>Sign up - Conduit</title>
        <meta name="description" content="Next.js 13 + SWR realword demo" />
      </Head>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <Link href="/login">Already have an account?</Link>
              </p>

              {errors && <ErrorList errors={errors} />}

              <form onSubmit={handleSubmit}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={form.username}
                    onChange={handleInputChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleInputChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleInputChange}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
