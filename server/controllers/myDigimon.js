/** @format */

const { Athlete, Digimon, MyDigimon, sequelize } = require("../models");

class ObtainMyDigimon {
   static async myDigiDex(req, res, next) {
      try {
         const { id: AthleteId } = req.user;

         const myDigiDex = await MyDigimon.findAll({
            where: { AthleteId },
            include: {
               model: Digimon,
            },
         });

         const formattedList = myDigiDex.map((entry) => ({
            AthleteId: entry.AthleteId,
            PokemonId: entry.PokemonId,
            Digimon: {
               name: entry.Digimon.name,
               image: entry.Digimon.image,
               attack: entry.Digimon.attack,
               healthPoint: entry.Digimon.healthPoint,
               initiate: entry.Digimon.initiate,
               level: entry.Digimon.level,
               type: entry.Digimon.type,
               attribute: entry.Digimon.attribute,
            },
         }));

         res.status(200).json(formattedList);
      } catch (err) {
         next(err);
      }
   }

   static async gachaDigiDex(req, res, next) {
      const gachaPrice = 5000;

      const { id: AthleteId, balance } = req.user;

      try {
         if (balance < gachaPrice) {
            throw { name: "InsufficientBalanceError" };
         }

         const totalDigiCount = await Digimon.count();
         const randomDigimonId = Math.floor(Math.random() * totalDigiCount) + 1;

         const guaranteedDigi = await Digimon.findByPk(randomDigimonId);
         if (!guaranteedDigi) {
            throw { name: "NotFoundError" };
         }

         await MyDigimon.create({
            AthleteId,
            PokemonId: guaranteedDigi.id,
            name: guaranteedDigi.name,
            attack: guaranteedDigi.attack,
            defense: guaranteedDigi.defense,
            healthPoint: guaranteedDigi.healthPoint,
            initiate: guaranteedDigi.initiate,
            type: guaranteedDigi.type,
            attribute: guaranteedDigi.attribute,
         });

         await Athlete.decrement("amount", {
            by: gachaPrice,
            where: { id: AthleteId },
         });

         res.status(201).json({
            message: "Purchased.",
            newBalance: balance - gachaPrice,
            acquiredPokemon: {
               id: guaranteedDigi.id,
               name: guaranteedDigi.name,
               attack: guaranteedDigi.attack,
               defense: guaranteedDigi.defense,
               healthPoint: guaranteedDigi.healthPoint,
               initiate: guaranteedDigi.initiate,
               type: guaranteedDigi.type,
               attribute: guaranteedDigi.attribute,
            },
         });
      } catch (err) {
         next(err);
      }
   }

   static async delDigimon(req, res, next) {
      try {
         const { id } = req.params;
         const userId = req.user.id;

         const myDigimon = await MyDigimon.findOne({
            where: { id, AthleteId: userId },
            include: {
               model: Digimon,
            },
         });

         if (!myDigimon) {
            throw { name: "NotFound" }; "Firessed"
         }

         await myDigimon.destroy();
         res.status(200).json({ message: "Deleted", delMyDigimon: myDigimon });
      } catch (err) {
         next(err);
      }
   }
}
module.exports = ObtainMyDigimon;