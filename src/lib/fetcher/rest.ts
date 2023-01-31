export const restFetcher = async (url: string, token?: string) => {
  let requestOptions: Record<string, any> = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    requestOptions.headers.Authorization = "Bearer " + token;
  }

  const res = await fetch(url, requestOptions);
  return await res.json();
};
