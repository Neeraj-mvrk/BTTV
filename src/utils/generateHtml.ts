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
            href="https://www.instagram.com/trekkingtale/" 
            style="color: #1da1f2; text-decoration: none; margin-right: 10px;"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#E1306C"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.427.403a4.92 4.92 0 011.675 1.09 4.92 4.92 0 011.09 1.675c.163.457.349 1.257.403 2.427.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.427a4.92 4.92 0 01-1.09 1.675 4.92 4.92 0 01-1.675 1.09c-.457.163-1.257.349-2.427.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.427-.403a4.92 4.92 0 01-1.675-1.09 4.92 4.92 0 01-1.09-1.675c-.163-.457-.349-1.257-.403-2.427C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.427a4.92 4.92 0 011.09-1.675 4.92 4.92 0 011.675-1.09c.457-.163 1.257-.349 2.427-.403C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.07 5.772.128 4.66.323 3.757.646a7.07 7.07 0 00-2.535 1.654A7.07 7.07 0 00.646 4.835c-.323.903-.518 2.015-.576 3.295C0 8.332 0 8.741 0 12s.013 3.668.07 4.948c.058 1.28.253 2.392.576 3.295a7.07 7.07 0 001.654 2.535 7.07 7.07 0 002.535 1.654c.903.323 2.015.518 3.295.576C8.332 24 8.741 24 12 24s3.668-.013 4.948-.07c1.28-.058 2.392-.253 3.295-.576a7.07 7.07 0 002.535-1.654 7.07 7.07 0 001.654-2.535c.323-.903.518-2.015.576-3.295.057-1.28.07-1.689.07-4.948s-.013-3.668-.07-4.948c-.058-1.28-.253-2.392-.576-3.295a7.07 7.07 0 00-1.654-2.535 7.07 7.07 0 00-2.535-1.654c-.903-.323-2.015-.518-3.295-.576C15.668.013 15.259 0 12 0z"/>
              <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998z"/>
              <circle cx="18.406" cy="5.594" r="1.44"/>
            </svg>
            Instagram
            </a> 
            | 
            <a 
            href="https://www.youtube.com/@trekkingtale" 
            style="color: #3b5998; text-decoration: none; margin-left: 10px;"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#FF0000"
              style="margin-right: 5px;"
            >
              <path d="M23.498 6.186a2.974 2.974 0 00-2.096-2.107C19.636 3.5 12 3.5 12 3.5s-7.636 0-9.402.579a2.974 2.974 0 00-2.096 2.107A31.15 31.15 0 000 12a31.15 31.15 0 00.502 5.814 2.974 2.974 0 002.096 2.107C4.364 20.5 12 20.5 12 20.5s7.636 0 9.402-.579a2.974 2.974 0 002.096-2.107A31.15 31.15 0 0024 12a31.15 31.15 0 00-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
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
  