/// <reference types="cypress" />

const PORT = process.env.PORT || 4500;
const accountInfo = {
  email: "100108350@qq.com",
  password: "123",
};

describe("Pinia demo with counters", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:${PORT}`);
  });

  let { email, password } = accountInfo;
  it("works", () => {
    cy.wait(500) // wait for the JS to load
      .get("[name=email]input")
      .type(email)
      .get("[name=password]input")
      .type(password)
      .get("[name=submit-btn]")
      .click();

    cy.url().should("include", "/dashBoard");
  });
});
