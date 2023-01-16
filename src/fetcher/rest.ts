const restFetcher = (url: string, method: string) =>
  fetch(url, { method }).then((res) => res.json());

export default restFetcher;
