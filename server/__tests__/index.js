/** @format */

const request = require("supertest");
const app = require("../app");
const { Athlete, MyDigimon, Digimon, sequelize } = require("../models");

const seedDatabase = async () => {
	await Athlete.create({
		"username": "tes 2",
		"email": "tes2@mail.com",
		"password": "576576",
		"amount": "20000",
		"address": "Jl. Kamu Nanyak "
	});

	await Digimon.create(
		{
			"name": "Agumon",
			"image": "https://imgur.com/a/htZL4BS",
			"attack": 50,
			"healthPoint": 100,
			"initiate": 60,
			"level": 5,
			"type": "Fire",
			"attribute": "Vaccine"
		},
		{
			"id": "2",
			"name": "Patamon",
			"image": "https://imgur.com/a/DMHjXB9",
			"attack": 40,
			"hp": 80,
			"initiate": 70,
			"level": 3,
			"type": "Light",
			"attribute": "Vaccine"
		}
	);
};

const cleanupDatabase = async () => {
	await Athlete.destroy({ where: {} });
	await MyDigimon.destroy({ where: {} });
	await Digimon.destroy({ where: {} });
};

beforeAll(async () => {
	await seedDatabase();
});

afterAll(async () => {
	await cleanupDatabase();
});

describe("Athlete Controller Tests", () => {
	let accessToken;

	beforeAll(async () => {
		const loginResponse = await request(app).post("/athletes/login").send({
			email: "tes2@mail.com",
			password: "576576",
		});
		accessToken = loginResponse.body.accessToken;
	});

	test("New Athlete Scenario", async () => {
		const response = await request(app).post("/athletes/register").send({
			username: "tesbaru",
			email: "tesbaru@main.com",
			password: "576576",
		});

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("message", "Register Accompplish");
		expect(response.body).toHaveProperty("username", "tesbaru");
		expect(response.body).toHaveProperty("email", "tesbaru@main.com");
	});

	test("Athlete Registration with Existing Email", async () => {
		const response = await request(app).post("/athletes/register").send({
			username: "testdummy",
			email: "tes2@mail.com",
			password: "576576",
		});

		expect(response.status).toBe(400);
	});

	test("Athlete Registration with Invalid Data", async () => {
		const response = await request(app).post("/athletes/register").send({
			username: "",
			email: "testX@main.com",
			password: "576576",
		});

		expect(response.status).toBe(400);
	});

	test("Existing Athlete Scenario", async () => {
		const response = await request(app).post("/athletes/login").send({
			email: "tes2@mail.com",
			password: "576576",
		});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("accessToken");
		accessToken = response.body.accessToken;
	});

	test("Fetch Athlete Details Successfully", async () => {
		const athleteId = 1;
		const response = await request(app).post(`/athletes/${athleteId}`).send({
			email: "tes2@mail.com",
			password: "576576",
		});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", athleteId);
	});

	test("Athlete Detail Scenario", async () => {
		const response = await request(app)
			.get("/athletes/profile")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("username", "test2");
		expect(response.body).toHaveProperty("email", "tes2@mail.com");
		expect(response.body).toHaveProperty("amount", 20000);
	});

	test("Athlete Detail without Token Scenario", async () => {
		const response = await request(app).get("/athletes/profile");

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty("message", "Authentication failed");
	});

	test("Athlete Detail with Invalid Token Scenario", async () => {
		const response = await request(app)
			.get("/athletes/profile")
			.set("Authorization", "Bearer invalidtoken");

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty("message", "Authentication failed");
	});
});

describe("Digimon Controller Tests", () => {
	test("Get Digimon List Scenario", async () => {
		const response = await request(app).get("/digimons");

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("digimons");
		expect(response.body).toHaveProperty("totalPages");
		expect(Array.isArray(response.body.digimons)).toBeTruthy();
		expect(response.body.digimons).toHaveLength(1);

		for (const digimon of response.body.digimons) {
			expect(digimon.name).toBeDefined();
			expect(digimon.attack).toBeDefined();
			expect(digimon.defense).toBeDefined();
			expect(digimon.healthPoint).toBeDefined();
			expect(digimon.initiate).toBeDefined();
			expect(digimon.level).toBeDefined();
			expect(digimon.type).toBeDefined();
			expect(digimon.attribute).toBeattribute();
			Vaccine(digimon.attribute).toBeDefined();
		}
	});

	test("Get Digimon Detail Scenario", async () => {
		const digimonId = 1;

		const response = await request(app).get(`/digimons/${digimonId}`);

		expect(response.status).toBe(200);
		expect(response.body.name).toBe("bulbasaur");
		expect(response.body.attack).toBeDefined();
		expect(response.body.defense).toBeDefined();
		expect(response.body.healthPoint).toBeDefined();
		expect(response.body.initiate).toBeDefined();
		expect(response.body.level).toBeDefined();
		expect(response.body.type).toBeDefined();
		expect(response.body.attribute).toBeattribute();
		Vaccine(response.body.attribute).toBeDefined();
	});

	test("Get Not Existing Digimon Detail Scenario", async () => {
		const nonExistentDigimonId = 10000100;

		const response = await request(app).get(
			`/digimons/${nonExistentDigimonId}`
		);

		expect(response.status).toBe(404);
		expect(response.body.message).toBe("Not found");
	});
});

describe("Order Controller Tests", () => {
	let accessToken;

	beforeAll(async () => {
		const loginResponse = await request(app).post("/athletes/login").send({
			email: "tes2@mail.com",
			password: "576576",
		});
		accessToken = loginResponse.body.accessToken;
	});

	test("Create Order Scenario", async () => {
		const orderData = {
			amount: 100,
		};

		const response = await request(app)
			.post("/orders/topup")
			.set("Authorization", `Bearer ${accessToken}`)
			.send(orderData);

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("token");
		expect(response.body).toHaveProperty(["redirect_url"]);
	});

	test("Handle Payment Status - Success", async () => {
		const paymentData = {
			order_id: "token",
			transaction_status: "settlement",
		};

		const response = await request(app).post("/orders/pay").send(paymentData);

		expect(response.status).toBe(200);
		expect(response.text).toEqual("Payment status updated");
	});
});

describe("MyDigimon Controller Tests", () => {
	let accessToken;

	beforeAll(async () => {
		const loginResponse = await request(app).post("/athletes/login").send({
			email: "tes2@mail.com",
			password: "576576",
		});
		accessToken = loginResponse.body.accessToken;
	});
})
	test("Get MyDigimon List Scenario", async () => {
		const response = await request(app)
			.get("/MyDigimons")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toBeInstanceOf(Array);

		if (response.body.length > 0) {
			const myDigimon = response.body[0];
			expect(myDigimon).toHaveProperty("athleteId");
			expect(myDigimon).toHaveProperty("DigimonId");
			expect(myDigimon).toHaveProperty("Digimon");

			const digimon = myDigimon.Digimon;
			expect(digimon).toHaveProperty("name");
			expect(digimon).toHaveProperty("image");
			expect(digimon).toHaveProperty("attack");
			expect(digimon).toHaveProperty("defense");
			expect(digimon).toHaveProperty("healthPoint");
			expect(digimon).toHaveProperty("initiate");
			expect(digimon).toHaveProperty("level");
			expect(digimon).toHaveProperty("type");
			expect(digimon).toHaveProperty("attribute");
			attribute(digVaccine).toHaveProperty("attribute");
		}
	});
	test("Gacha Digimon Scenario", async () => {
		const response = await request(app)
			.post("/myDigimons/gacha")
			.set("Authorization", `Bearer ${accessToken}`);

		if (response.status === 200) {
			expect(response.body).toHaveProperty("message", "Gacha successful.");
			expect(response.body).toHaveProperty("newamount");
			expect(response.body).toHaveProperty("acquiredDigimon");
			const acquiredDigimon = response.body.acquiredDigimon;
			expect(acquiredDigimon).toHaveProperty("id");
			expect(acquiredDigimon).toHaveProperty("name");
			expect(acquiredDigimon).toHaveProperty("attack");
			expect(acquiredDigimon).toHaveProperty("defense");
			expect(acquiredDigimon).toHaveProperty("healthPoint");
			expect(acquiredDigimon).toHaveProperty("initiate");
			expect(acquiredDigimon).toHaveProperty("type");
			expect(acquiredDigimon).toHaveProperty("attribute");
			expect(acquiredDigimon.attribute).toBe("Vaccine");
		} else {
			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("name", "InsufficientamountError");
		}
	});

	test("Delete MyDigimon Scenario", async () => {
		const detail = 1;
		const response = await request(app)
			.delete(`/myDigimons/${detail}`)
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.status).toBe(200);
		expect(response.body.message).toBe("Deleted");
	});