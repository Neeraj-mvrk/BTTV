import cron from "node-cron";
import prisma from '../db/prisma';
import { sendEmail } from "../utils/sendEmail";
import { getBestDaysForPreference } from '../services/forecastService';

// Runs at 6 AM daily
cron.schedule("*/5 * * * *", async () => {
  console.log("Running daily best time to travel check at 6 AM...");

  try {
    // Example logic:
    const subscribedPrefs = await prisma.preferences.findMany({
        where: { notify: true },
        include: { user: true },
      });

      for (const pref of subscribedPrefs) {
        const {email,name} = pref.user;
        const {id,location}=pref
        const bestDays = await getBestDaysForPreference(id);
        
    
        if(Array.isArray(bestDays)) {
                const resp = await sendEmail(email,
                    name,'https://i.pinimg.com/736x/b5/c2/a1/b5c2a1000e13f57abd4cbc37f36edbce.jpg',
                    bestDays,location.split(',')[0])
                console.log(resp);
              }
         await prisma.preferences.update({
            where: { id },
            data: { notify:false },
          });  
      }
      console.log("Daily travel check completed!");
  } catch (error) {
    console.error("Error in daily travel check cron:", error);
  }
});
