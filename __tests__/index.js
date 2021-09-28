const mongoose = require('mongoose')

describe("controller unit test", () => {
    beforeAll(async () => {
        await mongoose.connect("mongodb+srv://asma:LBcXeI02Qtwrmg2Y@cluster0.4du3t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });

    let ctx = {
        status: 200,
        body: {},
        model: (modelName) => {
            const schema = modelName === "users" ? 'User' : transactionsSchema;
            return mongoose.model(modelName, schema);
        },
        response: {
            message: "",
        },
        throw: (code, message) => {
            try {
                throw new Error(message);
            } finally {
                ctx.status = code;
                ctx.response.message = message;
            }
        },
    
    };

    describe("create()", () => {
        it("it should return a user object<200>", async () => {
            const userOne = {
                username: "test1",
                email: "test1@gmail.com",
                password: "test123456"
            };
            
            ctx = {
                ...ctx,
                request: { query: { title: "test1" } },
            };
            await ctx.model("users").create(userOne);
            
            const user = await ctx
                .model("users")
                .find({ email: ctx.request.query.email });
            await controller.create(userOne);
            expect(ctx.status).toBe(200);
        });

        it("error <409>", async () => {
            try {
                await controller.create(ctx);
            } catch (e) { }
            expect(ctx.status).toBe(409);
        });
    });

});
