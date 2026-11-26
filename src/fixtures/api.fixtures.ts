import { test as base } from '@playwright/test';
import { AuthApi } from '@api/AuthApi';

type Apis = { authApi: AuthApi };

export const test = base.extend<Apis>({
  authApi: async ({ request }, use) => {
    await use(new AuthApi(request));
  },
});

export { expect } from '@playwright/test';