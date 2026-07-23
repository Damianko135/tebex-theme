CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`public_token` text NOT NULL,
	`secret_key_enc` text NOT NULL,
	`tebex_account_id` text,
	`currency` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `projects_userId_idx` ON `projects` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `projects_publicToken_idx` ON `projects` (`public_token`);--> statement-breakpoint
DROP TABLE `task`;