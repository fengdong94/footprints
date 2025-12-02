describe("footprints", () => {
  it("login and nvigate to profile", function () {
    cy.visit("http://localhost:3000/login");
    cy.get("h2").contains("Welcome Back");
    cy.get('input[name="email"]').type("fengdong94@163.com");
    cy.get('input[name="password"]').type("1qaz!QAZ");
    cy.get("button").click();
    cy.url().should("include", "/map");
    cy.get('a[href*="/profile"]').click();
    cy.get("h1").contains("Edit Profile");
  });
});
