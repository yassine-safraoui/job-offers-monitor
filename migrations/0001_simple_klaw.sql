PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_companies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_companies`("id", "name") SELECT "id", "name" FROM `companies`;--> statement-breakpoint
DROP TABLE `companies`;--> statement-breakpoint
ALTER TABLE `__new_companies` RENAME TO `companies`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_job_sources` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`company_id` integer NOT NULL,
	`url` text NOT NULL,
	`last_scanned_at` integer,
	FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_job_sources`("id", "company_id", "url", "last_scanned_at") SELECT "id", "company_id", "url", "last_scanned_at" FROM `job_sources`;--> statement-breakpoint
DROP TABLE `job_sources`;--> statement-breakpoint
ALTER TABLE `__new_job_sources` RENAME TO `job_sources`;--> statement-breakpoint
CREATE UNIQUE INDEX `job_sources_url_unique` ON `job_sources` (`url`);--> statement-breakpoint
CREATE TABLE `__new_jobs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`source_id` integer NOT NULL,
	`title` text NOT NULL,
	`url` text NOT NULL,
	`published_at` integer NOT NULL,
	`location` text,
	FOREIGN KEY (`source_id`) REFERENCES `job_sources`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_jobs`("id", "source_id", "title", "url", "published_at", "location") SELECT "id", "source_id", "title", "url", "published_at", "location" FROM `jobs`;--> statement-breakpoint
DROP TABLE `jobs`;--> statement-breakpoint
ALTER TABLE `__new_jobs` RENAME TO `jobs`;--> statement-breakpoint
CREATE UNIQUE INDEX `jobs_url_unique` ON `jobs` (`url`);