export class ApiResponse {
  constructor(
    public message: string,
    public data: any = null,
    public success?: boolean,
  ) {}
}
