SELECT
    *
FROM
    supervisor_notifications
WHERE
    name_first = $1
    AND name_last = $2;