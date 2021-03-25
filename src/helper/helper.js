const response = (res, result, status, err) => {
    const resultPrint = {
    }
    resultPrint.status = 'success'
    resultPrint.statusCode = status
    resultPrint.result = result
    resultPrint.error = err || null
    res.status(status).json(resultPrint)
  }
  module.exports = {
    response
  }