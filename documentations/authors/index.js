/**
 * @swagger
 * get:
 * /api/authors/ :
 *  get:
 *    description: get all authors
 *    tags:
 *    - authors
 *    produces:
 *    - application/json
 *    responses:
 *      '200':
 *        description: get all authors
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
 * /api/authors/{_id} :
 *  get:
 *    description: get authors
 *    tags:
 *    - authors
 *    produces:
 *    - application/json
 *    parameters:
 *       - name: _id
 *         in: path
 *         description:  id authors
 *         required: true
 *         type: string
 *    responses:
 *      '200':
 *        description: get  authors
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
 * /api/authors/:
 *  post:
 *    description: add a new authors
 *    tags:
 *    - authors
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
 *        description: new authors created
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
 * /api/authors/{_id}:
 *  post:
 *    security:
 *      - Bearer: []
 *    description: add a new authors
 *    tags:
 *    - authors
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *       - name: _id
 *         in: path
 *         description:  id authors
 *         required: true
 *         type: string
 *    responses:
 *      '200':
 *        description:  authors updated
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
 * /api/authors/{_id}:
 *  delete:
 *    security:
 *      - Bearer: []
 *    description: remove news
 *    tags:
 *    - authors
 *    produces:
 *    - application/json
 *    parameters:
 *       - name: _id
 *         in: path
 *         description:  id authors
 *         required: true
 *         type: string
 *    responses:
 *      '200':
 *        description: authors removed
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