module.exports = {
  successResponse: (res, msg) => {
    console.log('ovd');
    res.send(JSON.stringify({
      data: msg,
      error: '',
    }));
  },
  errorResponse: (res, msg) => {
    res.status(400);
    res.send(JSON.stringify({
      data: '',
      error: `There was an error! ${msg}`,
    }));
  },
};
