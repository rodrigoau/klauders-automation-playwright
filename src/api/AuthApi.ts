import { BaseApi } from "@api/BaseApi";

export class AuthApi extends BaseApi {
  protected readonly endpoint = "?api=auth/";

  login(username: string, password: string) {
    return this.post({ username, password }, "login");
  }
}
