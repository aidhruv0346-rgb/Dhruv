/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://dhruvpipaliya.com",
  generateRobotsTxt: true,
  exclude: ["/studio/*", "/api/*"],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/", disallow: ["/studio", "/api"] }]
  }
};
