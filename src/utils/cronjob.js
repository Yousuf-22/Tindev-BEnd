const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./sendEmail");
const ConnectionRequestModel = require("../models/connnectionRequest");

cron.schedule("25 20 * * *", async () => {
  // Send Email to all peoples who got request the previous day

  try {
    const yesterday = subDays(new Date(), 0);

    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequestsOfYesterday = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequestsOfYesterday.map((req) => req.toUserId.emailId)),
    ];

    console.log(listOfEmails);

    for (const email of listOfEmails) {
      const res = await sendEmail.run(
        "New Friend Request pending for " + email,
        "There are so many request pending, please login to TinDev.site and accept or reject the request "
      );
      console.log(res);
    }
  } catch (err) {
    console.error(err);
  }
});
