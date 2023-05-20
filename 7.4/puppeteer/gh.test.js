let page;

afterEach(() => {
  page.close();
});

describe("Github/team page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForTimeout(1000);
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Let’s build from here · GitHub");
  }, 10000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 6000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 7000);
});

describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
  });

  test("The sign in page test", async () => {
    await page.goto("https://github.com");
    const signInBtn = 'a[href="/login"]';
    await page.waitForSelector(signInBtn);
    await page.click(signInBtn);
    await page.waitForTimeout(5000);
    const actual = await page.title();
    expect(actual).toContain("Sign in to GitHub · GitHub");
  }, 10000);

  test("Should open the pricing page", async () => {
    await page.goto("https://github.com");
    const pricingBtn = "nav > ul > li:nth-child(4) > a";
    await page.waitForSelector(pricingBtn);
    await page.click(pricingBtn);
    await page.waitForTimeout(5000);
    const articleTitleSelector = "h1";
    await page.waitForSelector(articleTitleSelector);
    const actual = await page.title();
    expect(actual).toContain("Pricing · Plans for every developer · GitHub");
  }, 7000);

  test("Should open 'choose the enterprise plan' title", async () => {
    await page.goto(
      "https://github.com/organizations/enterprise_plan?ref_cta=Start+a+free+enterprise+trial&ref_loc=Home+campaign+hero&ref_page=%2F"
    );
    const choosePlan = await page.title();
    expect(choosePlan).toContain("Choose an Enterprise plan · GitHub");
  }, 7000);
});
