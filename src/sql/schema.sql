CREATE TABLE IF NOT EXISTS supervisor_notifications (
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    name_first TEXT NOT NULL,
    name_last TEXT NOT NULL,
    supervisor TEXT NOT NULL,
    PRIMARY KEY (name_first, name_last, supervisor)
);