/**
 * @swagger
 * get:
 * /api/books/ :
 *  get:
 *    description: get all books
 *    tags:
 *    - books
 *    produces:
 *    - application/json
 *    responses:
 *      '200':
 *        description: get all books
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *             data:
 *               type: object
 *      '401':
 *        description: Failed to authenticate token
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '403':
 *        description: No token provided
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '500':
 *        description: Internal Server Error
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 */
/**
 * @swagger
 * get:
 * /api/books/{_id} :
 *  get:
 *    description: get books
 *    tags:
 *    - books
 *    produces:
 *    - application/json
 *    parameters:
 *       - name: _id
 *         in: path
 *         description:  id books
 *         required: true
 *         type: string
 *    responses:
 *      '200':
 *        description: get  books
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *             data:
 *               type: object
 *      '401':
 *        description: Failed to authenticate token
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '403':
 *        description: No token provided
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '500':
 *        description: Internal Server Error
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 */
/**
 * @swagger
 * post:
 * /api/books/:
 *  post:
 *    description: add a new books
 *    tags:
 *    - books
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *              param1:
 *                 type: string
 *              param2:
 *                 type: string
 *    responses:
 *      '201':
 *        description: new books created
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *             data:
 *               type: object
 *      '401':
 *        description: Failed to authenticate token
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '403':
 *        description: No token provided
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '500':
 *        description: Internal Server Error
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 */

/**
 * @swagger
 * post:
 * /api/books/{_id}:
 *  post:
 *    security:
 *      - Bearer: []
 *    description: add a new books
 *    tags:
 *    - books
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *       - name: _id
 *         in: path
 *         description:  id books
 *         required: true
 *         type: string
 *    responses:
 *      '200':
 *        description:  books updated
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *             data:
 *               type: object
 *      '401':
 *        description: Failed to authenticate token
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '403':
 *        description: No token provided
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '500':
 *        description: Internal Server Error
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 */

/**
 * @swagger
 * delete:
 * /api/books/{_id}:
 *  delete:
 *    security:
 *      - Bearer: []
 *    description: remove news
 *    tags:
 *    - books
 *    produces:
 *    - application/json
 *    parameters:
 *       - name: _id
 *         in: path
 *         description:  id books
 *         required: true
 *         type: string
 *    responses:
 *      '200':
 *        description: books removed
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '401':
 *        description: Failed to authenticate token
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '403':
 *        description: No token provided
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '404':
 *        description: news not found
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '500':
 *        description: Internal Server Error
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 */