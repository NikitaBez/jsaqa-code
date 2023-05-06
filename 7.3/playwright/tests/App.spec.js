const { test, expect } = require("@playwright/test");
const user = require("./user.js");

test("Successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(user.username);
  await page.getByPlaceholder("Пароль").fill(user.password);
  await page.getByTestId("login-submit-btn").click();

  await expect(page).toHaveURL("https://netology.ru/profile");
  await expect(
    page.getByRole("heading", { name: "Мои курсы и профессии" })
  ).toBeVisible();
});

test("Unsuccessful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill("usermail@mail.ru");
  await page.getByPlaceholder("Пароль").fill("userpass");
  await page.getByTestId("login-submit-btn").click();

  await expect(page.getByTestId("login-submit-btn")).toBeVisible();
});
