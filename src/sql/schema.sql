BEGIN;

CREATE TABLE IF NOT EXISTS supervisor_email_notifications (
    email TEXT NOT NULL,
    name_first TEXT NOT NULL,
    name_last TEXT NOT NULL,
    supervisor TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS supervisor_phone_notifications (
    phone TEXT NOT NULL,
    name_first TEXT NOT NULL,
    name_last TEXT NOT NULL,
    supervisor TEXT NOT NULL
);

COMMIT;