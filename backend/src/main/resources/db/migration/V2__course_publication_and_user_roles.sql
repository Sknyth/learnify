DO $$
BEGIN
    IF to_regtype('"StatusCourse"') IS NULL THEN
        CREATE TYPE "StatusCourse" AS ENUM ('Published', 'PendingReview', 'NeedsChanges');
    END IF;
END
$$;

ALTER TABLE "Course"
    ADD COLUMN IF NOT EXISTS "instructorId" TEXT REFERENCES "User" (id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS status "StatusCourse";

-- Courses in the Prisma catalog were publicly visible.
ALTER TABLE "Course" ALTER COLUMN status DROP DEFAULT;
ALTER TABLE "Course" ALTER COLUMN status TYPE "StatusCourse" USING (status::TEXT::"StatusCourse");
UPDATE "Course" SET status = 'Published' WHERE status IS NULL;
ALTER TABLE "Course"
    ALTER COLUMN status SET DEFAULT 'PendingReview',
    ALTER COLUMN status SET NOT NULL;

ALTER TABLE "User" ADD COLUMN IF NOT EXISTS role VARCHAR(255);
ALTER TABLE "User" ALTER COLUMN role DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN role TYPE VARCHAR(255) USING (role::TEXT);
UPDATE "User" SET role = 'STUDENT' WHERE role IS NULL OR role = 'USER';
ALTER TABLE "User"
    ALTER COLUMN role SET DEFAULT 'STUDENT',
    ALTER COLUMN role SET NOT NULL;
