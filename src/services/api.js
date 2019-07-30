import axios from 'axios';

const api = axios.create({
  baseURL: 'http://apiadvisor.climatempo.com.br',
});

/*
function searchCity(city, state) {
  return api.get(`/api/v1/locale/city`, {
    params: {
      name: city,
      state,
      token: 'bff8d6309c9130485b55469a928b5b25',
    },
  });
}

const data = qs.stringify({
  'localeId[]': '3477',
});
const headers = {
  Authorization: `Bearer bff8d6309c9130485b55469a928b5b25`,
  'Content-Type': 'application/x-www-form-urlencoded',
  Accept: 'application/x-www-form-urlencoded',
};
function idCity() {
  return api.put(
    'api-manager/user-token/bff8d6309c9130485b55469a928b5b25/locales',
    headers,
    data
  );
}
console.log(idCity());
// apiadvisor.climatempo.com.br/api-manager/user-token/bff8d6309c9130485b55469a928b5b25/locales/localeId%5B%5D=3477
*/

export default api;
