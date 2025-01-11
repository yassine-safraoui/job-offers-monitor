CREATE TABLE `companies` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `job_sources` (
	`id` integer PRIMARY KEY NOT NULL,
	`company_id` integer NOT NULL,
	`url` text NOT NULL,
	`last_scanned_at` integer,
	FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `job_sources_url_unique` ON `job_sources` (`url`);--> statement-breakpoint
CREATE TABLE `jobs` (
	`id` integer PRIMARY KEY NOT NULL,
	`source_id` integer NOT NULL,
	`title` text NOT NULL,
	`url` text NOT NULL,
	`published_at` integer NOT NULL,
	`location` text,
	FOREIGN KEY (`source_id`) REFERENCES `job_sources`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `jobs_url_unique` ON `jobs` (`url`);