/** @format */

module.exports = {
   apps: [
      {
         name: "Indi-0",
         script: "./bin/www",
         env: {
            JWT_SECRET: "iki secret",
            GOOGLE_CLIENT_ID:
               "511330639928-qo2jmbbitgfc29s9g5rv1m99dj9ipeo1.apps.googleusercontent.com"
            ,
            MIDTRANS_SERVER_KEY: "Mid-server-VS7hL2KAXcNrVqNa0PnmCT9a",
            MIDTRANS_CLIENT_KEY: "Mid-client-qAqWa8yL4crhhbwt",
            DATABASE_URL:
               "db connection string : postgres://postgres.tyfvwbxksbvhvfvxqfrf:PJJKIVSKpZtR4LMw@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres",
         },
      },
   ],
};