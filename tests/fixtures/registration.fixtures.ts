import { test as base } from '@playwright/test';
import { RegistrationPage } from '../pages/registration.page';
import { RegistrationBuilder } from '../builders/registration.builder';
import { RegistrationData } from '../types/registration.types';

type TestFixtures = {
  registrationPage: RegistrationPage;
  newUser: RegistrationData;
};

export const test = base.extend<TestFixtures>({
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },

  newUser: async ({}, use, testInfo) => {
    const overrides = testInfo.annotations
      .find(a => a.type === 'userOverride')?.description;

    const builder = new RegistrationBuilder();

    if (overrides) {
      Object.assign(builder, JSON.parse(overrides));
    }

    await use(builder.build());
  },
});

export { expect } from '@playwright/test';