export default function response(
    message: string,
    data: any,
    status: boolean = true,
    code: number,
  ) {
    return {
      message: message,
      data: data,
      status: status,
      code: code,
    };
  }