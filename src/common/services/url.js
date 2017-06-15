export function queryParams(search) {
  let result = {};
  search.replace('?', '')
    .split('&')
    .forEach(queryItem => {
      let item = queryItem.split('=');
      result[item[0]] = item[1];
    });
  return result;
}