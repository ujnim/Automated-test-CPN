import { APIResponse } from '@playwright/test';  // Ensure this is correctly imported

/**
 * Validates and parses an API response with strong typing.
 * @param res - The Playwright APIResponse object.
 * @param endpoint - The API endpoint for logging.
 * @returns The parsed response body as a strongly-typed object.
 */
export async function validateApiResponse<T>(res: APIResponse, endpoint: string): Promise<T> {
    const status = res.status();
    const contentType = res.headers()['content-type'];

    let body: T | undefined;

    try {
        if (contentType && contentType.includes('application/json')) {
            body = await res.json() as T;
        } else {
            console.warn(`⚠️ WARNING: API at ${endpoint} did not return JSON.`);
            console.warn(`🔹 Response Content-Type: ${contentType}`);
            console.warn(`🔹 API Response Text:`, await res.text());
        }
    } catch (error) {
        console.error(`🚨 ERROR: Unable to parse JSON response from ${endpoint}`);
        console.error(`🔹 API Response Text:`, await res.text());
    }

    console.info(`\n🔹 [API] ${endpoint}`);
    console.info(`   ➜ Status: ${status}`);
    console.info(`   ➜ Response Body:`, JSON.stringify(body, null, 2));

    if (status !== 200 || (body && (body as any)?.is_success === false)) {
        console.error(`🚨 ERROR: Expected status 200 but received ${status}`);
        console.error(`🔹 API Error Message:`, (body as any)?.message || "No error message provided");
        console.error(`🔹 Full Response Body:`, JSON.stringify(body, null, 2));
    }

    return body ?? {} as T;
}
