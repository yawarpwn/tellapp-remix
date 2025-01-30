type HTTPRequestErrorOptions = {
  message: string;
  cause?: string;
};

export class HTTPRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HttpRequestError";
  }
}
