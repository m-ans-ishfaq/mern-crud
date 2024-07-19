export const BACKENDURL = "http://localhost:3000/";
export const call = uri => BACKENDURL + uri;
export const fetcher = (...args) => fetch(...args).then(res => res.json())