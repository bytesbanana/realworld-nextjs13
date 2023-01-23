import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

import storage from "fetcher/storage";
import { User, StorageUser } from "types/user";
import { API_BASE_URL } from "utils/constant";

type FormData = Omit<User, "token"> & {
  password: string;
};

const SettingPage = () => {
  const router = useRouter();
  const { data: currentUser } = useSWR<StorageUser>("user", storage);

  const [formData, setFormData] = useState<FormData>({
    image: "",
    username: "",
    email: "",
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
    setFormData((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const onUpdateSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${API_BASE_URL}/user`, {
      method: "PUT",
      body: JSON.stringify({ user: formData }),
      headers: {
        Authorization: "Bearer " + currentUser?.user.token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) return;
    const data = (await response.json()) as StorageUser;
    window.localStorage.setItem("user", JSON.stringify(data));
    mutate("user", data);
    router.push("/profile/" + data.user.username);
  };

  useEffect(() => {
    if (!currentUser?.user) return;
    setFormData((p) => ({
      ...p,
      ...currentUser.user,
    }));
  }, [currentUser]);

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
                    value={formData.image}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    name="username"
                    autoComplete="off"
                    onChange={handleHandleInputChange}
                    value={formData.username}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                    name="bio"
                    onChange={handleHandleInputChange}
                    value={formData.bio}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    onChange={handleHandleInputChange}
                    value={formData.email}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    name="password"
                    autoComplete="off"
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
