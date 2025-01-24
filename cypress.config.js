const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  env: { ...process.env },  // Load environment variables into Cypress
  e2e: {
    baseUrl: process.env.BASE_URL, // Use the base URL from .env

    // Correctly placing the reporter configuration inside e2e
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports/mochawesome",  // Directory for reports
      overwrite: false,                         // Don't overwrite previous reports
      html: true,                               // Generate HTML report
      json: true,                               // Generate JSON report
    },

    setupNodeEvents(on, config) {
      // Node event listeners
      console.log("Base URL is:", config.baseUrl);  // Log the base URL
    },
  },
});
