import { GetServerSidePropsContext } from "next";
import { getServerSession, Session } from "next-auth";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import type { User, UserResponse } from "lib/types/user";
import UserAPI from "lib/api/user";
import ErrorList from "components/common/ErrorList";

interface FormData {
  email: string;
  username: string;
  bio?: string;
  image?: string;
  password?: string;
}

interface Props {
  session: Session;
  currentUser: User;
}

const Settings = ({ session, currentUser }: Props) => {
  const router = useRouter();
  const [disableForm, setDisableForm] = useState(false);
  const [isSubmitError, setIsSubmitError] = useState(false);

  const [form, setForm] = useState<FormData>({
    username: currentUser.username,
    email: currentUser.email,
    bio: currentUser.bio,
    image: currentUser.image,
    password: "",
  });

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFormSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    setIsSubmitError(false);
    if (confirm("After update your settings must login again are you sure?")) {
      setDisableForm(true);
      try {
        const user = form;

        const result = await UserAPI.update(user, session.accessToken);
        if ("user" in result) {
          await signOut({
            redirect: false,
          });
          router.push("/auth/login");
        } else {
          setIsSubmitError(true);
        }
      } finally {
        setDisableForm(false);
      }
    }
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            {isSubmitError && (
              <ErrorList
                errors={{
                  "Error:": [" failed to update settings."],
                }}
              />
            )}
            <form onSubmit={handleFormSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    name="image"
                    value={form?.image}
                    onChange={handleInputChange}
                    disabled={disableForm}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    name="username"
                    value={form?.username}
                    onChange={handleInputChange}
                    disabled={disableForm}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                    name="bio"
                    value={form?.bio}
                    onChange={handleInputChange}
                    disabled={disableForm}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={form?.email}
                    onChange={handleInputChange}
                    disabled={disableForm}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={form?.password}
                    onChange={handleInputChange}
                    disabled={disableForm}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleLogout}
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session || !session.accessToken) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const result = await UserAPI.currentUser(session?.accessToken);
  const userRes = result as UserResponse;

  return {
    props: {
      session,
      currentUser: userRes.user,
    },
  };
}

Settings.auth = true;

export default Settings;
