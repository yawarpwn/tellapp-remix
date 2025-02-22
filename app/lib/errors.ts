type HTTPRequestErrorOptions = {
  message: string
  cause?: string
}

export class HTTPRequestError extends Error {
  statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.name = 'HttpRequestError'
  }
}
