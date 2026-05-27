/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://dhruvpipaliya.com",
  generateRobotsTxt: true,
  exclude: ["/studio/*", "/api/*", "/admin", "/admin/*", "/api/admin/*"],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/", disallow: ["/studio", "/api", "/admin", "/api/admin/"] }]
  }
};
