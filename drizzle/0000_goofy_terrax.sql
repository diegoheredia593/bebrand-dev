CREATE TABLE `leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`public_id` text NOT NULL,
	`status` text DEFAULT 'in_progress' NOT NULL,
	`current_step` integer DEFAULT 0 NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`email` text DEFAULT '' NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`company` text DEFAULT '' NOT NULL,
	`project_types` text DEFAULT '' NOT NULL,
	`main_goal` text DEFAULT '' NOT NULL,
	`budget_range` text DEFAULT '' NOT NULL,
	`timeline` text DEFAULT '' NOT NULL,
	`preferred_contact_method` text DEFAULT '' NOT NULL,
	`answers_json` text DEFAULT '{}' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `leads_public_id_unique` ON `leads` (`public_id`);