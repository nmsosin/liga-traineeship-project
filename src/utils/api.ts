import { BASE_URL } from 'constants/urlEndpoints';
// import axios from 'axios';

export const checkResponse = <T>(res: Response):Promise<T> => {
  console.log('check res' ,res);
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export default function request(urlEndpoint: string, options?: any) {
  const url =`${BASE_URL}/${urlEndpoint}`;
  return fetch(url, options)
    // eslint-disable-next-line prettier/prettier
    .then(checkResponse<any>)
}
