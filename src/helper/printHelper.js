exports.printPaginate = (
  res,
  statusCode,
  message,
  totalData,
  totalPage,
  data,
  currentPage,
  perPage,
  previousPage,
  nextPage
) => {
  res.status(statusCode).json({
    status: statusCode === 200,
    message,
    totalData,
    totalPage,
    data,
    currentPage,
    perPage,
    previousPage,
    nextPage,
  });
};

exports.printSuccess = (res, statusCode, message, data) => {
  res.status(statusCode).json({
    status: statusCode === 200,
    message,
    data,
  });
};

exports.printError = (res, statusCode, message) => {
  res.status(statusCode).json({
    status: statusCode === 200,
    message,
  });
};
