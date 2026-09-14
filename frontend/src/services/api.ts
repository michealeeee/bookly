/** Simulated API delay so the UI can later swap to a real backend. */
export function wait(ms = 220) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}
