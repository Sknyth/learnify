DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM "User" GROUP BY lower(btrim(email)) HAVING count(*) > 1) THEN
        RAISE EXCEPTION 'Multiple user accounts share the same normalized email'
            USING HINT = 'Assign distinct emails to those accounts before retrying this migration.';
    END IF;
END
$$;

UPDATE "User"
SET email = lower(btrim(email))
WHERE email IS DISTINCT FROM lower(btrim(email));

CREATE UNIQUE INDEX "User_email_normalized_key" ON "User" (lower(btrim(email)));
