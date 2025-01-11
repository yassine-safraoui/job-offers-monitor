import { Resend } from "resend";
import { config } from "dotenv";
config();
import React from "react";
import { Job } from "./schema";

export const resend = new Resend(process.env.RESEND_API_KEY!);

export function JobsTemplate({ jobs }: { jobs: Job[] }) {
  return (
    <div>
      <h1>New Jobs Found:</h1>
      {jobs.map((job) => (
        <div
          key={job.url}
          style={{ border: "1px solid black", padding: "10px" }}
        >
          <h2>{job.title}</h2>
          <br />
          <p>{job.location}</p>
          <br />
          <a href={job.url}>Apply</a>
        </div>
      ))}
    </div>
  );
}
