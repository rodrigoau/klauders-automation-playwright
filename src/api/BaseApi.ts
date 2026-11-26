import { APIRequestContext, type APIResponse } from "@playwright/test";

export abstract class BaseApi {
  protected abstract readonly endpoint: string;

  constructor(protected readonly request: APIRequestContext) {}

  protected get(
    path = "",
    params?: Record<string, string | number>,
  ): Promise<APIResponse> {
    return this.request.get(`${this.endpoint}${path}`, { params });
  }

  protected post(data: unknown, path = ""): Promise<APIResponse> {
    return this.request.post(`${this.endpoint}${path}`, { data });
  }
}
