import { logger, schedules, wait } from "@trigger.dev/sdk/v3";
import { db } from "../db"
import { companies, Job, jobSourcesTable, jobsTable } from "../schema";
import { eq, and } from "drizzle-orm";
import { altentProcessor } from "./processors/alten";
import { JobsTemplate, resend } from "../resend";


export const firstScheduledTask = schedules.task({
  id: "first-scheduled-task",
  // Every hour
  cron: "0 0 * * *",
  // Set an optional maxDuration to prevent tasks from running indefinitely
  maxDuration: 60, // Stop executing after 300 secs (5 mins) of compute
  run: async (payload, { ctx }) => {

    const jobsSources = await db.select({
      job_source: jobSourcesTable,
      companie: companies
    }).from(jobSourcesTable).innerJoin(companies, eq(jobSourcesTable.companyId, companies.id)).all();
    for (let { job_source, companie } of jobsSources) {
      if (companie.name == "alten") {
        let jobs = await altentProcessor(job_source);
        let newJobs: Job[] = [];
        for (let job of jobs) {
          if (! await db.select().from(jobsTable).where(
            and(eq(jobsTable.sourceId, job_source.id), eq(jobsTable.url, job.url))
          ).get()) {
            logger.info("New job found", { job });
            newJobs.push(job);
          }
        }
        if (newJobs.length != 0) {
          logger.info("Inserting new jobs", { newJobs });
          await db.insert(jobsTable).values(newJobs).run();
          let { data, error } = await resend.emails.send({
            from: "Job hunter <job.hunter@yassine-safraoui.me>",
            to: ["yassine.safraoui@grenoble-inp.org"],
            subject: `New jobs found at ${companie.name}`,
            react: JobsTemplate({ jobs: newJobs }),
          });
          logger.info("Email sent", { data, error });
        }
      }
    }
  },
});