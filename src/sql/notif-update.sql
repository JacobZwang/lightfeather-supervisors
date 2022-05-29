INSERT INTO
    supervisor_notifications (phone, email, name_first, name_last, supervisor)
VALUES
    ($1, $2, $3, $4, $5) ON CONFLICT (name_first, name_last, supervisor) DO
UPDATE
SET
    (phone, email) = ($1, $2);