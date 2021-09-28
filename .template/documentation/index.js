/**
 * @swagger
 * get:
 * /api/(qq)/ :
 *  get:
 *    description: get all (qq)
 *    tags:
 *    - (qq)
 *    produces:
 *    - application/json
 *    responses:
 *      '200':
 *        description: get all (qq)
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
 * /api/(qq)/{_id} :
 *  get:
 *    description: get (qq)
 *    tags:
 *    - (qq)
 *    produces:
 *    - application/json
 *    parameters:
 *       - name: _id
 *         in: path
 *         description:  id (qq)
 *         required: true
 *         type: string
 *    responses:
 *      '200':
 *        description: get  (qq)
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
 * /api/(qq)/:
 *  post:
 *    description: add a new (qq)
 *    tags:
 *    - (qq)
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
 *        description: new (qq) created
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
 * /api/(qq)/{_id}:
 *  post:
 *    security:
 *      - Bearer: []
 *    description: add a new (qq)
 *    tags:
 *    - (qq)
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *       - name: _id
 *         in: path
 *         description:  id (qq)
 *         required: true
 *         type: string
 *    responses:
 *      '200':
 *        description:  (qq) updated
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
 * /api/(qq)/{_id}:
 *  delete:
 *    security:
 *      - Bearer: []
 *    description: remove news
 *    tags:
 *    - (qq)
 *    produces:
 *    - application/json
 *    parameters:
 *       - name: _id
 *         in: path
 *         description:  id (qq)
 *         required: true
 *         type: string
 *    responses:
 *      '200':
 *        description: (qq) removed
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