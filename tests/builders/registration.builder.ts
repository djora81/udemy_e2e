import { faker, fakerDE, fakerUK } from '@faker-js/faker';
import { RegistrationData } from '../types/registration.types';

export class RegistrationBuilder {
  private data: RegistrationData;

  constructor() {
    this.data = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      password: 'Password123!',
      city: faker.location.city(),
      country: 'Ukraine',
      phone: faker.phone.number({ style: 'international' }),
      street: faker.location.streetAddress(),
      zipCode: faker.location.zipCode('#####'),
    };
  }

  withEmail(email: string) {
    this.data.email = email;
    return this;
  }

  withCountry(country: string) {
    this.data.country = country;
    return this;
  }

  withUkrainianPhone(phone: string = fakerUK.phone.number({ style: 'international' })) {
    this.data.phone = phone;
    return this;
  }

  withInvalidPassword() {
    this.data.password = '123';
    return this;
  }

  build(): RegistrationData {
    return { ...this.data }; // prevent mutation bugs
  }
}