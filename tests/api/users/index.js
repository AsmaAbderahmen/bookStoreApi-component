// import mongoose from "mongoose";
// import {create, delete_one, getAll, getById, update} from  '../../../api/users-controller.mjs';
// /*
// * change users by the model name imported from its model
// *
// * */
// import users from '../../../../../components/users/users-model.mjs';
//
// import mockUserAuth from "../../../../../app/services/mockUserAuth";
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
//
//     describe("giveBack()", () => {
//         beforeEach(async () => {
//             ctx.status = 200;
//             ctx.body = {};
//             mockUserAuth.mockLogIn();
//             ctx.request.query = {};
//         });
//         afterAll(async () => {
//             await ctx.model("books").deleteMany({});
//             await ctx.model("transactions").deleteMany({});
//         });
//         it("<200>", async () => {
//             mockUserAuth.mockLogIn("admin@red.software.systems");
//             const book = {
//                 title: "unit test",
//                 author: "author",
//                 category: "unit test",
//                 desc: "description",
//                 ISBN: 445566,
//                 bookType: "paper",
//                 lang: "eng",
//                 pages: 672,
//                 img: "",
//                 argument: "unit test",
//                 publicDate: null,
//                 notAvailable: true,
//                 lost: false,
//             };
//             const transaction = {
//                 ISBN: 445566,
//                 reserveDate: Date(),
//                 loanStartDate: Date(),
//                 loanEndDate: null,
//                 giveBackDate: Date() + 1,
//                 user: "user1@red.software.systems",
//             };
//             await ctx.model("books").create(book);
//             await ctx.model("transaction").create(transaction);
//             const { id } = await ctx.model("books").findOne(book);
//             ctx = {
//                 ...ctx,
//                 params: { id },
//                 request: { query: { user: "user1@red.software.systems" } },
//             };
//             await controller.giveBack(ctx);
//             expect(ctx.body).toBeDefined();
//             expect(ctx.status).toBe(200);
//         });
//
//         it("error <409>", async () => {
//             mockUserAuth.mockLogIn("admin@red.software.systems");
//
//             const book = {
//                 title: "unit test",
//                 author: "author",
//                 category: "unit test",
//                 desc: "description",
//                 ISBN: 445566,
//                 bookType: "paper",
//                 lang: "eng",
//                 pages: 672,
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
//                 request: { query: { user: "user1@red.software.systems" } },
//             };
//             try {
//                 await controller.giveBack(ctx);
//             } catch (e) {
//                 ctx.response.message = e.message;
//             }
//             expect(ctx.status).toBe(409);
//             expect(ctx.response.message).toStrictEqual(
//                 "Book not reserved to anyone, can't give back"
//             );
//         });
//         it("error <422>", async () => {
//             mockUserAuth.mockLogIn("admin@red.software.systems");
//             const book = {
//                 title: "unit test",
//                 author: "author",
//                 category: "unit test",
//                 desc: "description",
//                 ISBN: 445566,
//                 bookType: "paper",
//                 lang: "eng",
//                 pages: 672,
//                 img: "",
//                 argument: "unit test",
//                 publicDate: null,
//                 notAvailable: true,
//                 lost: false,
//             };
//             await ctx.model("books").create(book);
//             const { id } = await ctx.model("books").findOne(book);
//             ctx = {
//                 ...ctx,
//                 params: { id },
//             };
//             try {
//                 await controller.giveBack(ctx);
//             } catch (e) { }
//             expect(ctx.response.message).toStrictEqual("user is required");
//             expect(ctx.status).toBe(422);
//         });
//
//         it("error <403>", async () => {
//             mockUserAuth.mockLogIn("user@red.software.systems");
//             try {
//                 await controller.giveBack(ctx);
//             } catch (e) { }
//             expect(ctx.status).toBe(403);
//         });
//
//         it("error <401>", async () => {
//             try {
//                 await controller.giveBack(ctx);
//             } catch (e) { }
//             expect(ctx.status).toBe(401);
//         });
//     });
//
//     describe("transactionsList()", () => {
//         beforeEach(async () => {
//             ctx.status = 200;
//             ctx.body = {};
//             mockUserAuth.mockLogIn();
//             ctx.request.query = {};
//         });
//
//         it("<200> should return <200> ", async () => {
//             mockUserAuth.mockLogIn("admin@red.software.systems");
//
//             await controller.transactionsList(ctx);
//             expect(ctx.body).toBeDefined();
//             expect(ctx.status).toEqual(200);
//         });
//
//         it("<401> should throw error <401>", async () => {
//             try {
//                 await controller.transactionsList(ctx);
//             } catch (e) {
//                 ctx.response.message = e.message;
//             }
//             expect(ctx.status).toEqual(401);
//         });
//         it("<403> should throw error <403>", async () => {
//             mockUserAuth.mockLogIn("user@red.software.systems");
//             try {
//                 await controller.transactionsList(ctx);
//             } catch (e) {
//                 ctx.response.message = e.message;
//             }
//             expect(ctx.status).toEqual(403);
//         });
//     });
//
//     describe("showTransactionOf()", () => {
//         ctx = {
//             ...ctx,
//             request: {
//                 query: {},
//             },
//             params: {
//                 transactionsOf: "",
//                 page: 1,
//             },
//         };
//
//         beforeEach(async () => {
//             ctx.params.transactionsOf = "";
//             ctx.request.query = {};
//             ctx.status = 200;
//             ctx.body = {};
//             mockUserAuth.mockLogIn();
//         });
//
//         describe("<200> should return <200>", () => {
//             it("of book", async () => {
//                 mockUserAuth.mockLogIn("admin@red.software.systems");
//                 ctx.params.transactionsOf = "book";
//                 ctx.request.query = { ISBN: "111111", pageSize: "5" };
//
//                 await controller.showTransactionsOf(ctx);
//
//                 expect(ctx.body).toBeDefined();
//                 expect(ctx.status).toEqual(200);
//             });
//
//             it("of user", async () => {
//                 mockUserAuth.mockLogIn("admin@red.software.systems");
//                 ctx.params.transactionsOf = "user";
//                 ctx.request.query = {
//                     user: "user@red.software.systems",
//                     pageSize: "5",
//                 };
//
//                 await controller.showTransactionsOf(ctx);
//
//                 expect(ctx.body).toBeDefined();
//                 expect(ctx.status).toEqual(200);
//             });
//         });
//
//         it("<401> should throw error <401>", async () => {
//             try {
//                 await controller.showTransactionsOf(ctx);
//             } catch (e) {
//                 ctx.response.message = e.message;
//             }
//             expect(ctx.status).toEqual(401);
//         });
//         it("<403> should throw error <403>", async () => {
//             mockUserAuth.mockLogIn("user@red.software.systems");
//             try {
//                 await controller.showTransactionsOf(ctx);
//             } catch (e) {
//                 ctx.response.message = e.message;
//             }
//             expect(ctx.status).toEqual(403);
//         });
//         describe("<422>", () => {
//             it("should throw error <422> with message 'ISBN is required'", async () => {
//                 mockUserAuth.mockLogIn("admin@red.software.systems");
//                 ctx.params.transactionsOf = "book";
//                 try {
//                     await controller.showTransactionsOf(ctx);
//                 } catch (e) {
//                     ctx.response.message = e.message;
//                 }
//                 expect(ctx.status).toEqual(422);
//                 expect(ctx.response.message).toStrictEqual("ISBN is required");
//             });
//             it("should throw error <422> with message 'user is required'", async () => {
//                 mockUserAuth.mockLogIn("admin@red.software.systems");
//                 ctx.params.transactionsOf = "user";
//                 ctx.request.query = { pageSize: 5 };
//                 try {
//                     await controller.showTransactionsOf(ctx);
//                 } catch (e) {
//                     ctx.response.message = e.message;
//                 }
//                 expect(ctx.status).toEqual(422);
//                 expect(ctx.response.message).toStrictEqual("user is required");
//             });
//             it("should throw error <422> with message 'pageSize is required'", async () => {
//                 mockUserAuth.mockLogIn("admin@red.software.systems");
//                 ctx.params.transactionsOf = "book";
//                 ctx.request.query = { ISBN: "111111" };
//                 try {
//                     await controller.showTransactionsOf(ctx);
//                 } catch (e) {
//                     ctx.response.message = e.message;
//                 }
//                 expect(ctx.status).toEqual(422);
//                 expect(ctx.response.message).toStrictEqual("pageSize is required");
//             });
//             it("should throw error <422> with message 'page size not valid'", async () => {
//                 mockUserAuth.mockLogIn("admin@red.software.systems");
//                 ctx.params.transactionsOf = "book";
//                 ctx.request.query = { ISBN: "111111", pageSize: 1 };
//                 try {
//                     await controller.showTransactionsOf(ctx);
//                 } catch (e) {
//                     ctx.response.message = e.message;
//                 }
//                 expect(ctx.status).toEqual(422);
//                 expect(ctx.response.message).toStrictEqual("page size not valid");
//             });
//         });
//     });
//
//     describe("bookLost()", () => {
//         let id = null;
//         beforeAll(async () => {
//             const book = {
//                 title: "test book",
//                 author: "test author",
//                 publicDate: null,
//                 category: "test",
//                 ISBN: 123456,
//                 bookType: "paper",
//                 notAvailable: false,
//                 lang: "eng",
//                 pages: 354,
//                 desc: "",
//                 img: "",
//                 argument: "test",
//                 lost: false,
//             };
//             await ctx.model("books").create(book);
//             id = (await ctx.model("books").findOne(book)).id;
//         });
//
//         afterAll(async () => {
//             await ctx.model("books").deleteMany({});
//             await ctx.model("transactions").deleteMany({});
//         });
//
//         beforeEach(async () => {
//             ctx.status = 200;
//             ctx.body = {};
//             mockUserAuth.mockLogIn();
//         });
//
//         it("<200> should return <200>", async () => {
//             mockUserAuth.mockLogIn("admin@red.software.systems");
//
//             ctx = {
//                 ...ctx,
//                 params: { id },
//             };
//             await controller.booklost(ctx);
//             const expectedRes = {
//                 n: 1,
//                 nModified: 1,
//                 ok: 1,
//             };
//
//             expect(ctx.body).toStrictEqual(expectedRes);
//             expect(ctx.status).toEqual(200);
//             expect(
//                 await ctx.model("books").findOne({ _id: id, lost: true })
//             ).not.toBe(null);
//         });
//         it("<401> should throw error <401>", async () => {
//             try {
//                 await controller.booklost(ctx);
//             } catch (e) {
//                 ctx.response.message = e.message;
//             }
//             expect(ctx.status).toEqual(401);
//         });
//         it("<403> should throw error <403>", async () => {
//             mockUserAuth.mockLogIn("user@red.software.systems");
//             try {
//                 await controller.booklost(ctx);
//             } catch (e) {
//                 ctx.response.message = e.message;
//             }
//             expect(ctx.status).toEqual(403);
//         });
//     });
//
//     describe("reserveBook()", () => {
//         let id = null;
//         let idDigitalBook = null;
//         beforeAll(async () => {
//             const book = {
//                 title: "test book",
//                 author: "test author",
//                 publicDate: null,
//                 category: "test",
//                 ISBN: 123456,
//                 bookType: "paper",
//                 notAvailable: false,
//                 lang: "eng",
//                 pages: 354,
//                 desc: "",
//                 img: "",
//                 argument: "test",
//                 lost: false,
//             };
//             const digitalBook = {
//                 title: "test book",
//                 author: "test author",
//                 publicDate: null,
//                 category: "test",
//                 ISBN: 123457,
//                 bookType: "digital",
//                 notAvailable: false,
//                 lang: "eng",
//                 pages: 354,
//                 desc: "",
//                 img: "",
//                 argument: "test",
//                 lost: false,
//             };
//             await ctx.model("books").create(book);
//             await ctx.model("books").create(digitalBook);
//             id = (await ctx.model("books").findOne(book)).id;
//             idDigitalBook = (await ctx.model("books").findOne(digitalBook)).id;
//         });
//
//         afterAll(async () => {
//             await ctx.model("books").deleteMany({});
//             await ctx.model("transactions").deleteMany({});
//         });
//
//         beforeEach(async () => {
//             ctx.status = 200;
//             ctx.body = {};
//             ctx.request.query = {};
//             mockUserAuth.mockLogIn();
//         });
//         it("<200> should return <200>", async () => {
//             ctx.params = { id };
//             ctx.request.query = { user: "user@red.software.systems" };
//             mockUserAuth.mockLogIn("admin@red.software.systems");
//
//             await controller.reserveBook(ctx);
//
//             expect(ctx.status).toEqual(200);
//
//             const book = await ctx.model("books").findById({ _id: id });
//             const transaction = await ctx
//                 .model("transactions")
//                 .findOne({ ISBN: book.ISBN, user: ctx.request.query.user });
//
//             expect(transaction).not.toBe(null);
//         });
//         it("<401> should throw error <401>", async () => {
//             try {
//                 await controller.reserveBook(ctx);
//             } catch (e) {
//                 ctx.response.message = e.message;
//             }
//             expect(ctx.status).toEqual(401);
//         });
//         it("<403> should throw error <403>", async () => {
//             mockUserAuth.mockLogIn("user@red.software.systems");
//             try {
//                 await controller.reserveBook(ctx);
//             } catch (e) {
//                 ctx.response.message = e.message;
//             }
//             expect(ctx.status).toEqual(403);
//         });
//         it("<422> should throw error <422>", async () => {
//             ctx.params = { id };
//             mockUserAuth.mockLogIn("admin@red.software.systems");
//             try {
//                 await controller.reserveBook(ctx);
//             } catch (e) {
//                 ctx.response.message = e.message;
//             }
//             expect(ctx.status).toEqual(422);
//             expect(ctx.response.message).toStrictEqual("user is required");
//         });
//         describe("<409>", () => {
//             it("should throw error <409> with message 'It's a digital book'", async () => {
//                 mockUserAuth.mockLogIn("admin@red.software.systems");
//                 ctx.params = { id: idDigitalBook };
//                 ctx.request.query = { user: "user@red.software.systems" };
//                 try {
//                     await controller.reserveBook(ctx);
//                 } catch (e) {
//                     ctx.response.message = e.message;
//                 }
//                 expect(ctx.response.message).toStrictEqual("It's a digital book");
//                 expect(ctx.status).toEqual(409);
//             });
//
//             it("should throw error <409> with message 'already reserved test book to user'", async () => {
//                 mockUserAuth.mockLogIn("admin@red.software.systems");
//                 ctx.params = { id };
//                 ctx.request.query = { user: "user@red.software.systems" };
//                 try {
//                     await controller.reserveBook(ctx);
//                 } catch (e) {
//                     ctx.response.message = e.message;
//                 }
//                 expect(ctx.response.message).toStrictEqual(
//                     "already reserved 'test book' to user@red.software.systems"
//                 );
//                 expect(ctx.status).toEqual(409);
//             });
//             it("should throw error <409> with message 'Reached limit of reservations for user'", async () => {
//                 mockUserAuth.mockLogIn("admin@red.software.systems");
//                 ctx.params = { id };
//                 ctx.request.query = { user: "user1@red.software.systems" };
//
//                 const transaction = {
//                     ISBN: 111111,
//                     reserveDate: Date(),
//                     loanStartDate: null,
//                     loanEndDate: null,
//                     giveBackDate: Date() + 1,
//                     user: "user1@red.software.systems",
//                 };
//                 await ctx.model("transactions").create(transaction);
//                 transaction.ISBN = 222222;
//                 await ctx.model("transactions").create(transaction);
//                 transaction.ISBN = 333333;
//                 await ctx.model("transactions").create(transaction);
//
//                 try {
//                     await controller.reserveBook(ctx);
//                 } catch (e) {
//                     ctx.response.message = e.message;
//                 }
//                 expect(ctx.response.message).toStrictEqual(
//                     `Reached limit of reservations for ${ctx.request.query.user}`
//                 );
//                 expect(ctx.status).toEqual(409);
//             });
//         });
//     });
//
//     describe("lendingBook()", () => {
//         let id = null;
//         beforeAll(async () => {
//             const book = {
//                 title: "test book",
//                 author: "test author",
//                 publicDate: null,
//                 category: "test",
//                 ISBN: 123456,
//                 bookType: "paper",
//                 notAvailable: false,
//                 lang: "eng",
//                 pages: 354,
//                 desc: "",
//                 img: "",
//                 argument: "test",
//                 lost: false,
//             };
//             await ctx.model("books").create(book);
//             id = (await ctx.model("books").findOne(book)).id;
//         });
//
//         afterAll(async () => {
//             await ctx.model("books").deleteMany({});
//             await ctx.model("transactions").deleteMany({});
//         });
//
//         beforeEach(async () => {
//             ctx.status = 200;
//             ctx.body = {};
//             ctx.request.query = {};
//             ctx.params = { id };
//             mockUserAuth.mockLogIn();
//         });
//
//         it("<200> should return <200>", async () => {
//             ctx.request.query = { user: "user@red.software.systems" };
//             mockUserAuth.mockLogIn("admin@red.software.systems");
//
//             const transaction = {
//                 ISBN: 123456,
//                 reserveDate: Date(),
//                 loanStartDate: null,
//                 loanEndDate: null,
//                 giveBackDate: Date() + 1,
//                 user: "user@red.software.systems",
//             };
//             await ctx.model("transactions").create(transaction);
//
//             await controller.lendingBook(ctx);
//
//             const expectedTransaction = await ctx.model("transactions").findOne({
//                 ISBN: transaction.ISBN,
//                 loanStartDate: { $ne: null },
//                 giveBackDate: { $ne: null },
//             });
//
//             expect(expectedTransaction).toBeDefined();
//             expect(expectedTransaction).not.toBe(null);
//             expect(ctx.body).toBeDefined();
//             expect(ctx.status).toEqual(200);
//         });
//         it("<401> should throw error <401>", async () => {
//             try {
//                 await controller.reserveBook(ctx);
//             } catch (e) {
//                 ctx.response.message = e.message;
//             }
//             expect(ctx.status).toEqual(401);
//         });
//         it("<403> should throw error <403>", async () => {
//             mockUserAuth.mockLogIn("user@red.software.systems");
//             try {
//                 await controller.lendingBook(ctx);
//             } catch (e) {
//                 ctx.response.message = e.message;
//             }
//             expect(ctx.status).toEqual(403);
//         });
//         it("<404> should throw error <404>", async () => {
//             mockUserAuth.mockLogIn("admin@red.software.systems");
//             ctx.request.query = { user: "user@red.software.systems" };
//             try {
//                 await controller.lendingBook(ctx);
//             } catch (e) {
//                 ctx.response.message = e.message;
//             }
//             expect(ctx.response.message).toStrictEqual("Book not available");
//             expect(ctx.status).toEqual(404);
//         });
//         it("<422> should throw error <422>", async () => {
//             await ctx.model("transactions").deleteMany({});
//             const mybook = await ctx.model("books").findById(ctx.params.id);
//             mybook.notAvailable = false;
//             await ctx.model("books").updateOne(mybook);
//             mockUserAuth.mockLogIn("admin@red.software.systems");
//
//             try {
//                 await controller.lendingBook(ctx);
//             } catch (e) {
//                 ctx.response.message = e.message;
//             }
//
//             expect(ctx.response.message).toStrictEqual("user is required");
//             expect(ctx.status).toEqual(422);
//         });
//         it("<409> should throw error <409>", async () => {
//             ctx.request.query = { user: "user2@red.software.systems" };
//             await ctx.model("transactions").deleteMany({});
//             mockUserAuth.mockLogIn("admin@red.software.systems");
//
//             const transaction = {
//                 ISBN: 123456,
//                 reserveDate: Date(),
//                 loanStartDate: null,
//                 loanEndDate: null,
//                 giveBackDate: Date() + 1,
//                 user: "user@red.software.systems",
//             };
//             const transaction2 = {
//                 ISBN: 123456,
//                 reserveDate: Date() + 1,
//                 loanStartDate: null,
//                 loanEndDate: null,
//                 giveBackDate: Date() + 2,
//                 user: "user2@red.software.systems",
//             };
//
//             await ctx.model("transactions").create(transaction);
//             await ctx.model("transactions").create(transaction2);
//
//             try {
//                 await controller.lendingBook(ctx);
//             } catch (e) {
//                 ctx.response.message = e.message;
//             }
//
//             expect(ctx.response.message).toStrictEqual(
//                 "Can't lending 'test book' to user2@red.software.systems"
//             );
//             expect(ctx.status).toEqual(409);
//         });
//     });
//
//     describe("changeReservationPriority()", () => {
//         let id = null;
//         beforeAll(async () => {
//             const book = {
//                 title: "test book",
//                 author: "test author",
//                 publicDate: null,
//                 category: "test",
//                 ISBN: 123456,
//                 bookType: "paper",
//                 notAvailable: false,
//                 lang: "eng",
//                 pages: 354,
//                 desc: "",
//                 img: "",
//                 argument: "test",
//                 lost: false,
//             };
//             await ctx.model("books").create(book);
//             id = (await ctx.model("books").findOne(book)).id;
//         });
//
//         afterAll(async () => {
//             await ctx.model("books").deleteMany({});
//             await ctx.model("transactions").deleteMany({});
//         });
//
//         beforeEach(async () => {
//             ctx.status = 200;
//             ctx.body = {};
//             ctx.request.query = {};
//             ctx.params = { id };
//             mockUserAuth.mockLogIn();
//         });
//
//         it("<200> should return <200>", async () => {
//             mockUserAuth.mockLogIn("admin@red.software.systems");
//             ctx.request.query = { user: "user2@red.software.systems" };
//
//             const transaction = {
//                 ISBN: 123456,
//                 reserveDate: Date(),
//                 loanStartDate: null,
//                 loanEndDate: null,
//                 giveBackDate: Date() + 1,
//                 user: "user1@red.software.systems",
//             };
//             const transaction2 = {
//                 ISBN: 123456,
//                 reserveDate: Date() + 1,
//                 loanStartDate: null,
//                 loanEndDate: null,
//                 giveBackDate: Date() + 2,
//                 user: "user2@red.software.systems",
//             };
//
//             await ctx.model("transactions").create(transaction);
//             await ctx.model("transactions").create(transaction2);
//
//             await controller.changeReservationPriority(ctx);
//             const myTransactions = await ctx.model("transactions").find({});
//
//             const myreserveDate = myTransactions
//                 .map((t) => {
//                     if (t.user === transaction2.user) return t.reserveDate;
//                     return null;
//                 })
//                 .filter((tr) => {
//                     return tr !== null;
//                 });
//
//             const checkDate = myreserveDate < transaction2.reserveDate;
//
//             expect(checkDate).toBe(true);
//
//             const expectedRes = {
//                 n: 1,
//                 nModified: 1,
//                 ok: 1,
//             };
//
//             expect(ctx.body).toStrictEqual(expectedRes);
//             expect(ctx.status).toEqual(200);
//         });
//         it("<401> should throw error <401>", async () => {
//             try {
//                 await controller.lendingBook(ctx);
//             } catch (e) {
//                 ctx.response.message = e.message;
//             }
//             expect(ctx.status).toEqual(401);
//         });
//         it("<403> should throw error <403>", async () => {
//             mockUserAuth.mockLogIn("user@red.software.systems");
//             try {
//                 await controller.lendingBook(ctx);
//             } catch (e) {
//                 ctx.response.message = e.message;
//             }
//             expect(ctx.status).toEqual(403);
//         });
//         it("<404> should throw error <404>", async () => {
//             await ctx.model("transactions").deleteMany({});
//             mockUserAuth.mockLogIn("admin@red.software.systems");
//             ctx.request.query = { user: "user@red.software.systems" };
//
//             try {
//                 await controller.changeReservationPriority(ctx);
//             } catch (e) {
//                 ctx.response.message = e.message;
//             }
//
//             expect(ctx.status).toEqual(404);
//             expect(ctx.response.message).toStrictEqual("reservation not found");
//         });
//         it("<422> should throw error <422>", async () => {
//             await ctx.model("transactions").deleteMany({});
//             mockUserAuth.mockLogIn("admin@red.software.systems");
//             try {
//                 await controller.changeReservationPriority(ctx);
//             } catch (e) {
//                 ctx.response.message = e.message;
//             }
//
//             expect(ctx.status).toEqual(422);
//             expect(ctx.response.message).toStrictEqual("user is required");
//         });
//
//         describe("<409>", () => {
//             it("should throw error <409> with message 'user hasn't reservation for book'", async () => {
//                 ctx.request.query = { user: "user2@red.software.systems" };
//
//                 await ctx.model("transactions").deleteMany({});
//                 mockUserAuth.mockLogIn("admin@red.software.systems");
//
//                 const transaction = {
//                     ISBN: 123456,
//                     reserveDate: Date() + 1,
//                     loanStartDate: null,
//                     loanEndDate: null,
//                     giveBackDate: Date() + 2,
//                     user: "user@red.software.systems",
//                 };
//                 const transaction2 = {
//                     ISBN: 1111111,
//                     reserveDate: Date() + 1,
//                     loanStartDate: null,
//                     loanEndDate: null,
//                     giveBackDate: Date() + 2,
//                     user: "user2@red.software.systems",
//                 };
//
//                 await ctx.model("transactions").create(transaction);
//                 await ctx.model("transactions").create(transaction2);
//                 try {
//                     await controller.changeReservationPriority(ctx);
//                 } catch (e) {
//                     ctx.response.message = e.message;
//                 }
//                 expect(ctx.status).toEqual(409);
//                 expect(ctx.response.message).toStrictEqual(
//                     `${ctx.request.query.user} hasn't reservation for book : test book`
//                 );
//             });
//
//             it("should throw error <409> with message 'user has already priority for lending'", async () => {
//                 ctx.request.query = { user: "user@red.software.systems" };
//
//                 await ctx.model("transactions").deleteMany({});
//                 mockUserAuth.mockLogIn("admin@red.software.systems");
//
//                 const transaction = {
//                     ISBN: 123456,
//                     reserveDate: Date(),
//                     loanStartDate: null,
//                     loanEndDate: null,
//                     giveBackDate: Date() + 1,
//                     user: "user@red.software.systems",
//                 };
//                 await ctx.model("transactions").create(transaction);
//                 try {
//                     await controller.changeReservationPriority(ctx);
//                 } catch (e) {
//                     ctx.response.message = e.message;
//                 }
//                 expect(ctx.status).toEqual(409);
//                 expect(ctx.response.message).toStrictEqual(
//                     "user@red.software.systems has already priority for lending"
//                 );
//             });
//         });
//     });
// });
