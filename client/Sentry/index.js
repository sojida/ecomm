const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "https://d526d497173540d998251a4b4ff6aba3@o520319.ingest.sentry.io/6175825",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

module.exports = Sentry;