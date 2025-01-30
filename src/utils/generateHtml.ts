/**
 * Generates an HTML string for an email that lists the user's best travel days.
 * 
 * @param {string} name - The user's name.
 * @param {string} logoUrl - The public URL to your logo image.
 * @param {Array} bestDays - An array of day objects, e.g.:
 *   [
 *     {
 *       date: "2025-01-26",
 *       condition: "Sunny",
 *       minTemp: 9.8,
 *       maxTemp: 23.3,
 *       sunrise: "2025-01-26T01:18",
 *       sunset: "2025-01-26T12:11"
 *     },
 *     ...
 *   ]
 * @returns {string} - A full HTML string.
 */
export function generateTravelEmailHTML(name:string, logoUrl:string, bestDays:any[],destination:string) {
    // Build table rows for bestDays
    const rowsHTML = bestDays
      .map((day) => {
        return `
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc;">${day.date}</td>
          <td style="padding: 8px; border: 1px solid #ccc;">${day.condition}</td>
          <td style="padding: 8px; border: 1px solid #ccc;">${day.minTemp}</td>
          <td style="padding: 8px; border: 1px solid #ccc;">${day.maxTemp}</td>
        </tr>
        `;
      })
      .join("");
  
    return `
  <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Best Travel Days</title>
  </head>
  <body style="margin:0; padding:0; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <!-- Main Wrapper -->
    <div style="
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
    ">
      <!-- Logo Section -->
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="${logoUrl}" alt="Your Logo" style="
            max-width: 140px; 
            height: auto; 
            border-radius: 4px; 
            background: #008080; /* fallback solid color for older clients */
            background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.8),
            rgba(0, 128, 128, 0.7)
            );
            padding: 20px;
            text-align: center;
  "
        " />
      </div>

      <!-- Title / Greeting -->
      <h2 style="text-align: center; color: #2e86de; margin-top: 0;">
        Hello, ${name}!
      </h2>
      <p style="text-align: center; font-size: 16px; margin: 10px 0 30px;">
        We've analyzed your preferences for <strong>${destination} and found these ideal travel days:
      </p>

      <!-- Table of Best Days -->
      <table style="
        margin: 0 auto;
        border-collapse: collapse;
        width: 100%;
        background-color: #ffffff;
        box-shadow: 0 0 5px rgba(0,0,0,0.1);
      ">
        <thead>
          <tr style="background-color: #2e86de; color: #fff;">
            <th style="padding: 12px; border: 1px solid #2e86de;">Date</th>
            <th style="padding: 12px; border: 1px solid #2e86de;">Condition</th>
            <th style="padding: 12px; border: 1px solid #2e86de;">Min Temp (°C)</th>
            <th style="padding: 12px; border: 1px solid #2e86de;">Max Temp (°C)</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHTML}
        </tbody>
      </table>
      <!-- New Info about disabling notifications -->
      <p style="margin-top: 20px; font-size: 15px; color: #555;">
        The information above covers the best travel days for 
        <strong>the next 15 days</strong>. 
        Please note, <strong>notifications are now disabled</strong> for this preference. 
        If you’d like to receive another update in the future, you’ll need to 
        <strong>re-enable notifications</strong> for this preference in your settings.
      </p>
      <!-- Footer Section -->
        <div style="
        margin-top: 30px; 
        padding: 20px; 
        background-color: #f2f2f2; 
        text-align: center; 
        font-size: 14px;
        color: #666;
        ">
        <!-- Optional Company & Social Links Row -->
        <p style="margin: 0 0 10px; font-weight: bold; color: #333;">
            Trekkingtale
        </p>
        <p style="margin: 0 0 10px;">
            <a 
            href="https://www.trekkingtale.com" 
            style="color: #1da1f2; text-decoration: none; margin-right: 10px;"
            >
            Website
            </a> 
            | 
            <a 
            href="https://www.youtube.com/@trekkingtale" 
            style="color: #3b5998; text-decoration: none; margin-left: 10px;"
            >
            Youtube
            </a>
        </p>

        <!-- Main Footer Text -->
        <p style="margin: 0 0 10px;">
            Safe travels, and thanks for choosing Trekkingtale!
        </p>

        <!-- Optional Unsubscribe or Settings Link -->
        <p style="margin: 0;">
   <!--     <a 
            href="https://www.yourbrand.com/unsubscribe" 
            style="color: #666; text-decoration: underline;"
            >
            Unsubscribe
            </a> 
            |  -->
            <a 
            href="https://www.trekkingtale.com/preferences" 
            style="color: #666; text-decoration: underline; margin-left: 5px;"
            >
            Manage Preferences
            </a>
        </p>

        <!-- Optional Disclaimer -->
        <p style="margin-top: 10px; font-size: 12px; color: #999;">
            &copy; 2025 Trekkingtale, Inc. All rights reserved.
        </p>
        </div>

    </div>
  </body>
</html>
    `;
  }
  