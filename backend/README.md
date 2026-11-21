# Learnify Backend

The Learnify REST API manages the course catalog, course publishing, enrollments,
and student progress. It uses Java 21, Spring Boot, and PostgreSQL. The Gradle
Wrapper pins the Gradle version.

## Local setup

1. Install JDK 21 and start PostgreSQL.
2. Create an empty database named `learnify` and grant the application user
   permission to create tables and modify the schema. Flyway creates the tables
   on the first startup.
3. Create a `.env` file next to this README. Enter your PostgreSQL credentials
   and set `JWT_SECRET` to the output of `openssl rand -hex 32`.

```dotenv
DB_URL=jdbc:postgresql://localhost:5432/learnify
DB_USERNAME=postgres
DB_PASSWORD=your-postgres-password
JWT_SECRET=replace-with-generated-key
```

Start the application from the `backend` directory.

```bash
./gradlew bootRun
```

On Windows, run `.\gradlew.bat bootRun`. Once the application starts, check the
course catalog from another terminal.

```bash
curl --fail http://localhost:8080/api/courses
```

On an empty database, the catalog returns `[]`.

### Configuration

Spring reads settings from environment variables or the `.env` file.

| Variable | Purpose | Default |
| --- | --- | --- |
| `DB_URL` | PostgreSQL JDBC URL | `jdbc:postgresql://localhost:5432/learnify` |
| `DB_USERNAME` | PostgreSQL user | `postgres` |
| `DB_PASSWORD` | PostgreSQL password | `postgres` |
| `JWT_SECRET` | JWT signing key of at least 32 bytes | Required |
| `PORT` | Backend port | `8080` |
| `FRONTEND_ORIGIN` | Frontend origin allowed to send requests with cookies | `http://localhost:3000` |
| `COOKIE_SECURE` | Controls the cookie's `Secure` flag. Set to `true` for HTTPS deployments. | `false` |

Next.js proxies `/api/*` requests to the backend. If the backend runs at a
different address than `http://localhost:8080`, set `API_URL` in the frontend
environment.

## Main API endpoints

After sign-in or registration, the server sets an `HttpOnly` cookie named
`token`. The client sends this cookie with requests to protected endpoints.

| Request | Access |
| --- | --- |
| `POST /api/auth/signUp`, `POST /api/auth/signIn` | Registration and sign-in |
| `GET /api/auth/me`, `POST /api/auth/logout` | View the current user or sign out |
| `GET /api/courses`, `GET /api/courses/{id}` | Browse published courses and their curricula |
| `POST /api/enrollments/enroll` | Signed-in users can enroll in a published course |
| `GET /api/courses/{courseId}/lessons/{lessonId}` | Enrolled students can view the lesson and its video URL |
| `POST /api/enrollments/complete-lesson` | Enrolled students can mark a lesson as complete |
| `POST /api/courses`, `PUT /api/courses/{id}` | Instructors and administrators can create courses. Instructors can edit their own courses. |
| `PATCH /api/courses/{id}/status` | Administrators can change a course's status |

## Upgrade a database from `main`

Set `DB_URL` to the existing Learnify database. On the first startup, Flyway
baselines the existing schema at version 1 and applies the migrations in
[`src/main/resources/db/migration`](src/main/resources/db/migration).

Previously available courses are marked `Published`. Existing administrators
and instructors keep their roles, and `USER` becomes `STUDENT`. If the old schema
had no role column, all existing accounts become students. A database
administrator assigns the first administrator role if needed.

If multiple accounts share an email address after normalization, the migration
stops. Use this query to find the conflicting addresses, assign a unique email
address to each affected account, and restart the backend.

```sql
SELECT lower(btrim(email)) AS normalized_email
FROM "User"
GROUP BY lower(btrim(email))
HAVING count(*) > 1;
```

## Tests and builds

Create a separate PostgreSQL database for integration tests. The tests run
Flyway against the database specified by `DB_URL`.

```bash
DB_URL=jdbc:postgresql://localhost:5432/learnify_test ./gradlew test
./gradlew bootJar
```

The executable JAR is written to `build/libs/`.

### Docker

Build the image from the `backend` directory.

```bash
docker build -t learnify-backend .
```

Pass the environment variables to the container and use a JDBC URL reachable
from inside it. With Docker Desktop, `host.docker.internal` points to the host.

```bash
docker run --rm -p 8080:8080 --env-file .env \
  -e DB_URL=jdbc:postgresql://host.docker.internal:5432/learnify \
  learnify-backend
```
