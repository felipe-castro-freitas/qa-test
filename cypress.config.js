const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        // Block ad-related domains
        if (browser.name === "chrome" || browser.name === "edge") {
          launchOptions.args.push(
            "--host-rules=MAP *.doubleclick.net 127.0.0.1"
          );
          launchOptions.args.push(
            "--host-rules=MAP *.googlesyndication.com 127.0.0.1"
          );
          launchOptions.args.push(
            "--host-rules=MAP *.googleadservices.com 127.0.0.1"
          );
        }
        return launchOptions;
      });
    },
    // chromeWebSecurity: false, // This disables web security policies in Chrome
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
