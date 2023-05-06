const { test, expect } = require("@playwright/test");
const user = require("./user.js");
const delay = 10000;

test("Successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.waitForTimeout(delay);
  await page.screenshot({ path: "screenshot.png", fullPage: true });
  await page.getByPlaceholder("Email").fill(user.username);
  await page.screenshot({ path: "screenshot1.png", fullPage: true });
  await page.getByPlaceholder("Пароль").fill(user.password);
  await page.screenshot({ path: "screenshot2.png", fullPage: true });
  await page.getByTestId("login-submit-btn").click();
  await page.waitForTimeout(delay);
  await page.screenshot({ path: "screenshot3.png", fullPage: true });

  await expect(page).toHaveURL("https://netology.ru/profile");
  await expect(
    page.getByRole("heading", { name: "Мои курсы и профессии" })
  ).toBeVisible();
});

test("Unsuccessful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.waitForTimeout(delay);
  await page.screenshot({ path: "screenshot5.png", fullPage: true });
  await page.getByPlaceholder("Email").fill("usermail@mail.ru");
  await page.screenshot({ path: "screenshot6.png", fullPage: true });
  await page.getByPlaceholder("Пароль").fill("userpass");
  await page.screenshot({ path: "screenshot7.png", fullPage: true });
  await page.getByTestId("login-submit-btn").click();
  await page.waitForTimeout(delay);
  await page.screenshot({ path: "screenshot8.png", fullPage: true });

  await expect(page.getByTestId("login-error-hint")).toHaveText(
    "Вы ввели неправильно логин или пароль"
  );
});
