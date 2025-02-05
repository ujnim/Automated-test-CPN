import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const SPREADSHEET_ID = process.env.SPREADSHEET_ID!;
const SHEET_NAME = process.env.SHEET_BACK_END!;

class GoogleSheetReporter implements Reporter {
    private testResults: any[] = [];  // เก็บผลการทดสอบทั้งหมด

    async onTestEnd(test: TestCase, result: TestResult) {
        this.testResults.push({
            desc: test.title,
            status: result.status === 'passed' ? 'PASSED' : 'FAILED',
            remark: result.status === 'failed' ? result.error?.message || 'Unexpected error' : '',
        });
    }

    async onEnd() {
        console.log('🔹 All tests completed. Updating Google Sheet...');

        try {
            const auth = new google.auth.GoogleAuth({
                credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}'),
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });

            const sheets = google.sheets({ version: 'v4', auth });

            // ✅ ค้นหาแถวที่มี Desc ตรงกับชื่อเคส
            const getResponse = await sheets.spreadsheets.values.get({
                spreadsheetId: SPREADSHEET_ID,
                range: `${SHEET_NAME}!D:D`,
            });

            const rows = getResponse.data.values || [];

            for (const testResult of this.testResults) {
                const rowIndex = rows.findIndex(row => row[0] === testResult.desc);

                if (rowIndex === -1) {
                    console.error(`🚨 Test case "${testResult.desc}" not found`);
                    continue;
                }

                console.log(`🔹 Updating row ${rowIndex + 1} for "${testResult.desc}"`);

                // ✅ อัปเดตค่า Status, Date, Remark
                const range = `${SHEET_NAME}!I${rowIndex + 1}:K${rowIndex + 1}`;
                const values = [[testResult.status, new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" }), testResult.remark || '']];

                await sheets.spreadsheets.values.update({
                    spreadsheetId: SPREADSHEET_ID,
                    range: range,
                    valueInputOption: 'USER_ENTERED',
                    requestBody: { values },
                });
            }

            console.log('✅ Successfully updated Google Sheet');
        } catch (error) {
            console.error('🚨 Failed to update Google Sheet:', error);
        }
    }
}

export default GoogleSheetReporter;
