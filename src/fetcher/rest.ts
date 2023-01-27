const getHeaders = (): Record<string, string> | undefined => {
  if (typeof window === "undefined") return {};

  if (!window.localStorage.user) return {};

  if (Object.keys(window.localStorage.user).length === 0) return {};

  const currentUser = JSON.parse(window.localStorage.user);

  if (!!currentUser.token) {
    return {
      Authorization: `Token ${currentUser.token}`,
    };
  }
};

const restFetcher = (url: string, method: string) =>
  fetch(url, { method, headers: getHeaders() }).then((res) => res.json());

export default restFetcher;
