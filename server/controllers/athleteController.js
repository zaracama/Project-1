/** @format */

const { Athlete } = require("../models");
const { comparePassword } = require("../helpers/bcryptjs");
const { generateToken } = require("../helpers/token");
const { OAuth2Client } = require("google-auth-library");

class AthleteController {
   static async registered(req, res, next) {
      let { username, email, password } = req.body;
      try {
         const userOnline = await Athlete.findOne({ where: { email } });
         if (userOnline) {
            throw { name: "SequelizeUniqueConstraintError" };
         }

         const athlete = await Athlete.create({
            username,
            email,
            password,
         });
         res.status(201).json({
            message: "Register Accomplished",
				username: athlete.username,
            email: athlete.email,
         });
      } catch (err) {
         next(err);
      }
   }

   static async logined(req, res, next) {
      const { email, password } = req.body;
      try {
         if (!email || !password) {
            throw { name: "Unauthorized" };
         }

         const athlete = await Athlete.findOne({ where: { email } });

         if (!athlete || !comparePassword(password, athlete.password)) {
            throw { name: "AuthenticationError" };
         }
         const accessed = generateToken({ id: athlete.id });
         res.status(200).json({ accessed });
      } catch (err) {
         next(err);
      }
   }

   static async authenGoogle(req, res, next) {
      const googleToken = req.headers["google-token"];
      const oauthClient = new OAuth2Client();

      try {
         const verified = await oauthClient.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID,
         });

         const userInfo = verified.getPayload();
         const userEmail = userInfo.email;

         let account = await User.findOne({ where: { email: userEmail } });
         if (!account) {
            account = await User.create(
               {
                  username: userInfo.username,
                  email: userEmail,
                  password: `example-password-${Date.now()}`,
               },
               { hooks: false }
            );
         }

         const accessed = generateToken({ id: account.id });
         res
            .status(200)
            .json({ accessed, id: account.id, email: account.email });
      } catch (err) {
         next(err);
      }
   }

   static async setAthleteDetail(req, res, next) {
      try {
         const { id } = req.params;
         const athlete = await Athlete.findByPk(id);

         if (!athlete) {
            throw { name: "NotFoundError" };
         }

         res.status(200).json(athlete);
      } catch (err) {
         next(err);
      }
   }
}

module.exports = AthleteController;