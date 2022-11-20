import type { AxiosHeaders, Method } from "axios";

export interface MockReq<D> {
  method: Method,
  headers: AxiosHeaders,
  body: D,
  query: D,
}

export const getReqDataByMethod = <D>(req: MockReq<D>): D => {
  const _method = req.method.toLowerCase();
  return _method === 'get' ? req.query : req.body;
}