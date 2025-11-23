import { faker } from "@faker-js/faker";

const timeInBusinessOptions = [
  "Not open yet",
  "6 - 12 months",
  "1 - 2 years",
  "2 - 5 years",
  "5 years+",
];

const creditScoreOptions = [
  "Poor (639 or less)",
  "Fair (640 - 679)",
  "Good (680 - 719)",
  "Excellent (720+)",
];
export function generateTestUserData() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    businessName: faker.company.name(),
    annualRevenue: faker.finance.amount({
      min: 0,
      max: 1000000,
      dec: 2,
    }),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: "national" }),
    timeInBusiness: faker.helpers.arrayElement(timeInBusinessOptions),
    creditScore: faker.helpers.arrayElement(creditScoreOptions),
  };
}
