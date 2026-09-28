const WORKER_URL = "https://support-agent.abdulmuqsithofficial.workers.dev";
const HINDSIGHT_URL = "https://api.hindsight.vectorize.io";
const HINDSIGHT_API_KEY = process.env.HINDSIGHT_API_KEY;

if (!HINDSIGHT_API_KEY) {
  console.error("❌ HINDSIGHT_API_KEY environment variable is not set!");
  console.error("Add it to your .env.local file or run: export HINDSIGHT_API_KEY=your_key");
  process.exit(1);
}

const fakeUsers = [
  {
    email: "muqsith@leader.com",
    password: "demo12345",
    tickets: [
      { content: "User reported their printer would not connect to wifi. Root cause was the router broadcasting only 5GHz, and the printer only supports 2.4GHz. Fixed by enabling the 2.4GHz band on the router.", timestamp: "2026-08-15T10:00:00Z" },
      { content: "User asked about upgrading their subscription plan from Basic to Pro. Explained pricing difference and they upgraded successfully.", timestamp: "2026-08-22T14:30:00Z" },
      { content: "User reported slow loading times on the dashboard. Diagnosed as a browser extension conflict (ad blocker). Resolved by having them disable the extension for our domain.", timestamp: "2026-09-05T09:15:00Z" },
      { content: "User reported a billing discrepancy, charged twice for the same month. Issued a refund for the duplicate charge and confirmed with the user.", timestamp: "2026-09-18T16:45:00Z" },
      { content: "User's printer wifi issue resurfaced after a router firmware update reset the band settings. Re-enabled 2.4GHz again and suggested they lock the setting so it survives future updates. User was noticeably frustrated this was the second time.", timestamp: "2026-09-25T11:20:00Z" }
    ]
  },
  {
    email: "rizawan@example.com",
    password: "demo12345",
    tickets: [
      { content: "User could not log in, kept getting 'invalid credentials' despite correct password. Turned out caps lock was on. Resolved after user confirmed.", timestamp: "2026-08-10T08:30:00Z" },
      { content: "User requested a data export of their account history for compliance purposes. Export was generated and emailed within 24 hours.", timestamp: "2026-08-28T13:00:00Z" },
      { content: "User reported the mobile app crashing on startup on Android. Escalated to engineering, was traced to an incompatible OS version (Android 9). Workaround: use the web app until a patch ships.", timestamp: "2026-09-12T15:40:00Z" },
      { content: "User followed up on the Android crash ticket, still not fixed, growing impatient since it's been weeks. Confirmed engineering is aware, no ETA yet, offered a discount for the inconvenience.", timestamp: "2026-09-24T10:10:00Z" }
    ]
  },
  {
    email: "Naafi@example.com",
    password: "demo12345",
    tickets: [
      { content: "User asked how to integrate our API with their internal CRM. Pointed them to API docs and offered a sample script; they were satisfied.", timestamp: "2026-08-05T09:00:00Z" },
      { content: "User reported receiving duplicate email notifications for every ticket update. Identified as a webhook misconfiguration on our side, fixed and confirmed resolved with user.", timestamp: "2026-08-19T12:15:00Z" },
      { content: "User calmly asked about the difference between Team and Enterprise plans before renewing. Provided a comparison and they renewed on Team.", timestamp: "2026-09-02T14:00:00Z" },
      { content: "User reported their integration broke after our API v2 migration. Root cause was a deprecated endpoint they were still calling. Sent migration guide, issue resolved same day.", timestamp: "2026-09-20T17:30:00Z" }
    ]
  }
];

async function retainWithRetry(bankId, ticket, maxRetries = 5) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const res = await fetch(`${HINDSIGHT_URL}/v1/default/banks/${bankId}/memories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${HINDSIGHT_API_KEY}`
      },
      body: JSON.stringify({
        items: [{ content: ticket.content, timestamp: ticket.timestamp }]
      }),
    });
    const data = await res.json();

    if (data.success) {
      return data;
    }

    // Try to find the "retry in X seconds" hint in the error message
    const detail = data.detail || "";
    const match = detail.match(/retry in (\d+\.?\d*)s/) || detail.match(/try again in (\d+\.?\d*)s/);
    const waitSeconds = match ? parseFloat(match[1]) + 2 : 15; // +2 second safety buffer

    console.log(`    Rate limited (attempt ${attempt}/${maxRetries}), waiting ${waitSeconds}s...`);
    await new Promise(resolve => setTimeout(resolve, waitSeconds * 1000));
  }
  return { success: false, error: "Max retries exceeded" };
}

async function seed() {
  for (const user of fakeUsers) {
    let userId;

    const signupRes = await fetch(`${WORKER_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email, password: user.password }),
    });
    const signupData = await signupRes.json();

    if (signupData.success) {
      userId = signupData.user_id;
      console.log(`Created user ${user.email} → ${userId}`);
    } else {
      const loginRes = await fetch(`${WORKER_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, password: user.password }),
      });
      const loginData = await loginRes.json();
      if (!loginData.success) {
        console.log(`Skipping ${user.email}, login also failed:`, loginData.error);
        continue;
      }
      userId = loginData.user_id;
      console.log(`User ${user.email} already existed → ${userId}`);
    }

    for (const ticket of user.tickets) {
      const data = await retainWithRetry(userId, ticket);
      if (data.success) {
        console.log("  Seeded:", ticket.content.slice(0, 60) + "...", "→ true");
      } else {
        console.log("  GAVE UP:", ticket.content.slice(0, 60) + "...", "→", JSON.stringify(data));
      }
      await new Promise(resolve => setTimeout(resolve, 5000)); // base gap between tickets
    }
  }
}

seed();