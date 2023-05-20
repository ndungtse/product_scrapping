export class ApiResponse<T = any> {
  constructor(
    public message: string,
    public data: T = null,
    public success?: boolean,
  ) {}
}

export const responses = {
  notfound: {
    status: 404,
    description: 'A post with given id does not exist.',
  },
  fetched: {
    status: 200,
    description: 'Data has been successfully fetched',
  },
};
