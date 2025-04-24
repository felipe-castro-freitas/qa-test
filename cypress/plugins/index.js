const fs = require("fs");
const path = require("path");

module.exports = (on, config) => {
  on("task", {
    saveReportData(data) {
      const reportDir = path.join(__dirname, "../../reports");
      if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true });
      }

      // Create a safe filename from the test run info
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const testName = data.testInfo?.name || "demoqa-tests";
      const safeTestName = testName.toLowerCase().replace(/[^a-z0-9]/g, "-");

      // Generate filename with test name and timestamp
      const dataPath = path.join(
        reportDir,
        `${safeTestName}-${timestamp}.json`
      );
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

      return dataPath;
    },
  });
};
