const fs = require("fs");
const path = require("path");

// Find the most recent report file
const reportDir = path.join(__dirname, "../reports");
if (!fs.existsSync(reportDir)) {
  console.error("No reports directory found. Please run the tests first.");
  process.exit(1);
}

// Get all JSON files in the reports directory
const jsonFiles = fs
  .readdirSync(reportDir)
  .filter((file) => file.endsWith(".json"))
  .map((file) => ({
    name: file,
    path: path.join(reportDir, file),
    time: fs.statSync(path.join(reportDir, file)).mtime.getTime(),
  }))
  .sort((a, b) => b.time - a.time); // Sort by most recent

if (jsonFiles.length === 0) {
  console.error("No test data JSON files found. Please run the tests first.");
  process.exit(1);
}

// Use the most recent file
const dataPath = jsonFiles[0].path;
console.log(`Using most recent test data: ${jsonFiles[0].name}`);

const reportData = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const { results, summary, timestamp, testInfo } = reportData;

// Calculate pass percentage
const passPercentage =
  summary.total > 0 ? ((summary.passed / summary.total) * 100).toFixed(2) : 0;

// Generate HTML content
const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>DEMOQA Test Results - ${testInfo?.name || "Test Report"}</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 20px; }
      h1 { color: #333366; }
      .summary { 
        background-color: #f5f5f5; 
        padding: 15px; 
        border-radius: 5px;
        margin-bottom: 20px;
      }
      .test-info {
        margin-bottom: 15px;
        font-size: 0.9em;
        color: #666;
      }
      .summary-item { 
        display: inline-block; 
        margin-right: 30px; 
        font-weight: bold; 
      }
      .passed { color: #007700; }
      .failed { color: #cc0000; }
      .skipped { color: #ff9900; }
      table { 
        width: 100%; 
        border-collapse: collapse; 
        margin-top: 20px;
      }
      th, td { 
        border: 1px solid #ddd; 
        padding: 8px; 
        text-align: left;
      }
      th { 
        background-color: #333366; 
        color: white; 
      }
      tr:nth-child(even) { background-color: #f2f2f2; }
      .status-PASSED { 
        color: #007700; 
        font-weight: bold;
      }
      .status-FAILED { 
        color: #cc0000; 
        font-weight: bold;
      }
      .status-SKIPPED { 
        color: #ff9900; 
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <h1>DEMOQA Test Results${testInfo?.name ? ` - ${testInfo.name}` : ""}</h1>
    <div class="test-info">
      <div>Generated: ${new Date().toLocaleString()}</div>
      ${testInfo?.browser ? `<div>Browser: ${testInfo.browser}</div>` : ""}
      ${testInfo?.viewport ? `<div>Viewport: ${testInfo.viewport}</div>` : ""}
    </div>
    <div class="summary">
      <div class="summary-item">Total: ${summary.total}</div>
      <div class="summary-item passed">Passed: ${summary.passed}</div>
      <div class="summary-item failed">Failed: ${summary.failed}</div>
      <div class="summary-item skipped">Skipped: ${summary.skipped}</div>
      <div class="summary-item">Pass Rate: ${passPercentage}%</div>
    </div>
    <table>
      <tr>
        <th>Test Area</th>
        <th>Test ID</th>
        <th>Description</th>
        <th>Status</th>
      </tr>
      ${results
        .map(
          (result) => `
        <tr>
          <td>${result.testArea}</td>
          <td>${result.testId}</td>
          <td>${result.description}</td>
          <td class="status-${result.status}">${result.status}</td>
        </tr>
      `
        )
        .join("")}
    </table>
  </body>
  </html>
`;

// Create a filename with the test name if available
const testName = testInfo?.name ? `-${testInfo.name}` : "";
const reportTimestamp = timestamp
  ? new Date(timestamp).toISOString().replace(/[:.]/g, "-")
  : new Date().toISOString().replace(/[:.]/g, "-");

// Write the HTML report
const reportPath = path.join(
  reportDir,
  `test-report${testName}-${reportTimestamp}.html`
);
fs.writeFileSync(reportPath, html);

// Print summary to console
console.log(`
====================================
    TEST EXECUTION SUMMARY
====================================
Test:    ${testInfo?.name || "Unknown"}
Browser: ${testInfo?.browser || "Unknown"}
Total:   ${summary.total}
Passed:  ${summary.passed}
Failed:  ${summary.failed}
Skipped: ${summary.skipped}
Pass %:  ${passPercentage}%
====================================
Report:  ${reportPath}
`);
