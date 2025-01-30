import prisma from '../db/prisma';
import { sendEmail } from "../utils/sendEmail";
import { getBestDaysForPreference } from '../services/forecastService';

export async function scheduleTravelNotificationCron(): Promise<void> {

    console.log("Running best time to travel check every 5 minutes...");

    try {
      // Fetch preferences where notifications are enabled
      const subscribedPrefs = await prisma.preferences.findMany({
        where: { notify: true },
        include: { user: true },
      });

      for (const pref of subscribedPrefs) {
        const { user, id, location } = pref;
        if (!user) {
          console.warn(`Skipping preference ID ${id}: No associated user found.`);
          continue;
        }

        const { email, name } = user;
        if (!email) {
          console.warn(`Skipping preference ID ${id}: No email found.`);
          continue;
        }

        const bestDays = await getBestDaysForPreference(id);

        if (Array.isArray(bestDays) && bestDays.length > 0) {
          const response = await sendEmail(
            email,
            name,
            "https://i.pinimg.com/736x/b5/c2/a1/b5c2a1000e13f57abd4cbc37f36edbce.jpg",
            bestDays,
            location.split(",")[0]
          );
          console.log(`Email sent successfully to ${email}:`, response);
        } else {
          console.log(`No matching travel days found for ${email}`);
        }

        // Disable notifications after sending the email
        await prisma.preferences.update({
          where: { id },
          data: { notify: false },
        });

        console.log(`Notification disabled for preference ID ${id}`);
      }

      console.log("Travel notification cron job completed.");
    } catch (error) {
      console.error("Error in travel notification cron:", error);
    }
}
