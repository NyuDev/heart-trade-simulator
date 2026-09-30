/** Normalised error, carrying what the interface needs to pick a message. */
export class ApiError extends Error {
  constructor(message, { status, code, issues, retryAfterSeconds } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status ?? 0;
    this.code = code ?? 'network_error';
    this.issues = issues ?? [];
    this.retryAfterSeconds = retryAfterSeconds ?? 0;
  }

  get isRateLimited() {
    return this.status === 429;
  }
}
