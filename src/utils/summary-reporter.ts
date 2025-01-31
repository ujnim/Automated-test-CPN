import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

class TestSummaryReporter implements Reporter {
    private totalTests = 0;
    private passedTests = 0;

    async onTestEnd(test: TestCase, result: TestResult) {
        this.totalTests++;
        if (result.status === 'passed') {
            this.passedTests++;
        }
    }

    async onEnd() {
        console.log('\n🔹 TEST SUMMARY 🔹');
        console.log(`✅ Total Tests: ${this.totalTests}`);
        console.log(`🎯 Passed Tests: ${this.passedTests}`);
        console.log(`❌ Failed Tests: ${this.totalTests - this.passedTests}`);
        console.log('------------------------------------');
    }
}

export default TestSummaryReporter;
