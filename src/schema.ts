import { InferInsertModel, sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { InferSelectModel } from "drizzle-orm";

// Companies
export const companies = sqliteTable('companies', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull()
});

// Job sources (URLs to scan for each company)
export const jobSourcesTable = sqliteTable('job_sources', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    companyId: integer('company_id').references(() => companies.id).notNull(),
    url: text('url').notNull().unique(),
    lastScannedAt: integer('last_scanned_at'),
});

// Found jobs
export const jobsTable = sqliteTable('jobs', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    sourceId: integer('source_id').references(() => jobSourcesTable.id).notNull(),
    title: text('title').notNull(),
    url: text('url').notNull().unique(),
    publishedAt: integer('published_at').notNull(),
    location: text('location'),
});

export type Companie = InferInsertModel<typeof companies>;
export type JobSource = InferInsertModel<typeof jobSourcesTable>;
export type Job = InferInsertModel<typeof jobsTable>;