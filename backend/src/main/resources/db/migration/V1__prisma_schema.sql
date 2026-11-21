CREATE TYPE "Category" AS ENUM ('WebDev', 'Design', 'DataScience', 'DevOps', 'Mobile');
CREATE TYPE "Level" AS ENUM ('Beginner', 'Intermediate', 'Advanced');

CREATE TABLE "User" (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    "jobTitle" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX "User_email_key" ON "User" (email);

CREATE TABLE "Course" (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category "Category" NOT NULL,
    level "Level" NOT NULL,
    price INTEGER NOT NULL,
    duration TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    rating DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviewsCount" INTEGER NOT NULL DEFAULT 0,
    "studentsCount" INTEGER NOT NULL DEFAULT 0,
    "learningPoints" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "Module" (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "courseId" TEXT NOT NULL REFERENCES "Course" (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "Lesson" (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    duration TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL REFERENCES "Module" (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "Enrollment" (
    id TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL REFERENCES "User" (id) ON DELETE CASCADE ON UPDATE CASCADE,
    "courseId" TEXT NOT NULL REFERENCES "Course" (id) ON DELETE CASCADE ON UPDATE CASCADE,
    progress INTEGER NOT NULL DEFAULT 0,
    "completedLessons" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX "Enrollment_userId_courseId_key" ON "Enrollment" ("userId", "courseId");
