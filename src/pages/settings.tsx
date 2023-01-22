import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useState } from "react";
import useSWR, { mutate } from "swr";

import storage from "fetcher/storage";
import { StorageUser } from "types/user";

const SettingPage = () => {
  const router = useRouter();
  const { data: currentUser } = useSWR<StorageUser>("user", storage);

  const [form, setForm] = useState({
    image: currentUser?.user.image || "",
    username: currentUser?.user.username || "",
    email: currentUser?.user.email || "",
    password: "",
  });

  const handleLogout = () => {
    router.push("/");
    localStorage.removeItem("user");
    mutate("user", undefined);
  };

  const handleHandleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };

  const onUpdateSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = { user: form };
    throw Error("Not implement yet");
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <form onSubmit={onUpdateSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    name="image"
                    onChange={handleHandleInputChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    name="username"
                    onChange={handleHandleInputChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                    name="bio"
                    onChange={handleHandleInputChange}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={handleHandleInputChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleHandleInputChange}
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
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
