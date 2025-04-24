class TestReporter {
  constructor() {
    this.results = [];
    this.summary = {
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
    };
  }

  // Add a test result
  addResult(testArea, testId, description, status) {
    this.results.push({
      testArea,
      testId,
      description,
      status,
    });

    // Update summary
    this.summary.total++;
    if (status === "PASSED") this.summary.passed++;
    else if (status === "FAILED") this.summary.failed++;
    else if (status === "SKIPPED") this.summary.skipped++;
  }

  // Get report data for saving
  getReportData() {
    return {
      results: this.results,
      summary: this.summary,
      timestamp: new Date().toISOString(),
    };
  }
}

module.exports = new TestReporter();
