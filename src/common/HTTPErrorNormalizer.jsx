const normalizeError = function (err, res) {
  let msg = '';
  let unauthorized = false;

  if (res && res.status) {
    if (res.status === 401 || res.status === 403) {
      unauthorized = true;
    }
  }

  if (res && res.body) {
    msg = res.body.error;
  } else if (err.response) {
    msg = `Something wrong ${err.response.statusText}`;
  } else {
    msg = 'Something wrong, possible network issues or server not responding..!';
  }

  return { msg, unauthorized };
};

export default {
  normalizeError,
};
