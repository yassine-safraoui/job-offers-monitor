import { Job, JobSource } from "../../schema"

export type JobProcessor = (source: JobSource) => Promise<Job[]>