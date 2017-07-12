// this method will use to common access url and manage error
export function handleFetch(url, options) {
  return new Promise((resolve, reject) => {
    let statusCode;
    fetch(url, options)
      .then(response => {
        statusCode = response.status;
        if (!response.error) {
          if (options.mode === 'no-cors') {
            return resolve(response);
          } else {
            return response.json();
          }
        } else {
          return reject(response.error);
        }
      })
      .then(payload => {
        if (statusCode !== 200) {
          return reject({ statusCode, payload });
        }
        return resolve(payload);
      })
      .catch(error => {
        return reject(error);
      });
  });
}
