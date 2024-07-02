import { Context } from 'elysia';

export class ApiResponse {
  constructor(
      public status: number,
      public message: string,
      public data: any) {
  }

  toJSON() {
    return {
      status: this.status,
      message: this.message,
      data: this.data
    }
  }
}