
//
// describe("controller unit test", () => {
//     beforeAll(async () => {
//         await mongoose.connect(global.__MONGO_URI__, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//     });
//     afterAll(async () => {
//         await mongoose.connection.close();
//     });
//
//     let ctx = {
//         status: 200,
//         body: {},
//         model: (modelName) => {
//             const schema = modelName === "books" ? model : transactionsSchema;
//             return mongoose.model(modelName, schema);
//         },
//         response: {
//             message: "",
//         },
//         throw: (code, message) => {
//             try {
//                 throw new Error(message);
//             } finally {
//                 ctx.status = code;
//                 ctx.response.message = message;
//             }
//         },
//         checkUserInRole: (roles) => {
//             const user = mockUserAuth.getCurrentUser();
//             if (user === undefined) {
//                 ctx.throw(401);
//             } else {
//                 const res = roles.filter((role) => role === user.role);
//                 if (res.length === 0) ctx.throw(403);
//             }
//             return user;
//         },
//     };
//
//     describe("searchBooks()", () => {
//         it("it should return a list of books <200>", async () => {
//             mockUserAuth.mockLogIn("admin@red.software.systems");
//             const bookOne = {
//                 title: "ES6",
//                 author: "author",
//                 category: "ES6",
//                 desc: "description",
//                 ISBN: 115544,
//                 bookType: "paper",
//                 lang: "eng",
//                 pages: 815,
//                 img: "",
//                 argument: "EcmaScript6",
//                 publicDate: null,
//                 notAvailable: false,
//                 lost: false,
//             };
//             const bookTwo = {
//                 title: "React",
//                 author: "author",
//                 category: "React",
//                 desc: "description",
//                 ISBN: 993377,
//                 bookType: "paper",
//                 lang: "eng",
//                 pages: 815,
//                 img: "",
//                 argument: "react",
//                 publicDate: null,
//                 notAvailable: false,
//                 lost: false,
//             };
//             ctx = {
//                 ...ctx,
//                 request: { query: { title: "ES6" } },
//             };
//             await ctx.model("books").create(bookOne);
//             await ctx.model("books").create(bookTwo);
//             const books = await ctx
//                 .model("books")
//                 .find({ title: ctx.request.query.title });
//             await controller.searchBooks(ctx);
//             expect(ctx.body).toStrictEqual(books);
//             expect(ctx.status).toBe(200);
//         });
//
//         it("error <403>", async () => {
//             mockUserAuth.mockLogIn("user@red.software.systems");
//             try {
//                 await controller.searchBooks(ctx);
//             } catch (e) { }
//             expect(ctx.status).toBe(403);
//         });
//         it("error <401>", async () => {
//             mockUserAuth.mockLogIn();
//             try {
//                 await controller.searchBooks(ctx);
//             } catch (e) { }
//             expect(ctx.status).toBe(401);
//         });
//     });
//
//     describe("deleteBook()", () => {
//         beforeEach(async () => {
//             ctx.status = 200;
//             ctx.body = {};
//             mockUserAuth.mockLogIn();
//         });
//         afterAll(async () => {
//             await ctx.model("books").deleteMany({});
//             await ctx.model("transactions").deleteMany({});
//         });
//
//         it("<200>", async () => {
//             mockUserAuth.mockLogIn("admin@red.software.systems");
//
//             const book = {
//                 title: "unit test",
//                 author: "author",
//                 category: "unit test",
//                 desc: "description",
//                 ISBN: 123344,
//                 bookType: "digital",
//                 lang: "eng",
//                 pages: 815,
//                 img: "",
//                 argument: "unit test",
//                 publicDate: null,
//                 notAvailable: false,
//                 lost: false,
//             };
//             await ctx.model("books").create(book);
//             const { id } = await ctx.model("books").findOne(book);
//             ctx = {
//                 ...ctx,
//                 params: { id },
//             };
//             await controller.deleteBook(ctx);
//             expect(await ctx.model("books").findById({ _id: id })).toBe(null);
//             expect(ctx.body).toBeDefined();
//             expect(ctx.status).toBe(200);
//         });
//
//         it("error <409>", async () => {
//             mockUserAuth.mockLogIn("admin@red.software.systems");
//             const book = {
//                 title: "unit test",
//                 author: "author",
//                 category: "unit test",
//                 desc: "description",
//                 ISBN: 123344,
//                 bookType: "digital",
//                 lang: "eng",
//                 pages: 815,
//                 img: "",
//                 argument: "unit test",
//                 publicDate: null,
//                 notAvailable: false,
//                 lost: false,
//             };
//             const transaction = {
//                 ISBN: 123344,
//                 reserveDate: Date(),
//                 loanStartDate: null,
//                 loanEndDate: null,
//                 giveBackDate: Date() + 1,
//                 user: "user1@red.software.systems",
//             };
//             await ctx.model("books").create(book);
//             const { id } = await ctx.model("books").findOne(book);
//             await ctx.model("transactions").create(transaction);
//             ctx = {
//                 ...ctx,
//                 params: { id },
//             };
//             try {
//                 await controller.deleteBook(ctx);
//             } catch (e) {
//                 ctx.response.message = e.message;
//             }
//             expect(ctx.status).toBe(409);
//             expect(ctx.response.message).toStrictEqual("you cannot delete the book");
//         });
//
//         it("error <403>", async () => {
//             mockUserAuth.mockLogIn("user@red.software.systems");
//             try {
//                 await controller.deleteBook(ctx);
//             } catch (e) { }
//             expect(ctx.status).toBe(403);
//         });
//
//         it("error <401>", async () => {
//             try {
//                 await controller.deleteBook(ctx);
//             } catch (e) { }
//             expect(ctx.status).toBe(401);
//         });
//     });
//})
