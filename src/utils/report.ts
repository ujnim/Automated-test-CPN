import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

class CustomReporter implements Reporter {
    async onTestEnd(test: TestCase, result: TestResult) {
        console.log(`\n🔹 Test: ${test.title}`);
        console.log(`   ➜ API Response Status: ${result.status}`);
        console.log(`   🕒 Duration: ${result.duration}ms`);
        console.log(`------------------------------------`);
    }
}

export default CustomReporter;
