export default [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        directives: {
          "frame-src": ["http://localhost:*", "self"],
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      headers: ["Strapi-Transformer-Ignore", "*"],
      origin: ["http://localhost:3000"],
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
