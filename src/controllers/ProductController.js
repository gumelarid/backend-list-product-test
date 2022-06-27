const uuid = require('uuid');
const Validator = require('Validator')
const fs = require('fs')
const { response, pagination } = require('../helpers/index')
const { getAll, add, getOne, update, deleteProduct, searchAll, countProduct, getAllProduct } = require('../models/ProductModel')
let product

function deleteImage(params) {
    fs.unlink(`./uploads/${params}`, async (err) => {
        if (err) {
            throw err;
        } else {
            console.log('delete berhasil')
        }
    })
}

module.exports = {
    getAll: async (request, res) => {
        try {
            let { page, limit } = request.query;
            if (page === undefined || page === null || page === "") {
                page = parseInt(1);
            } else {
                page = parseInt(page);
            }
            if (limit === undefined || limit === null || limit === "") {
                limit = parseInt(5);
            } else {
                limit = parseInt(limit);
            }
            let totalData = await countProduct();
            let totalPage = Math.ceil(totalData / limit);
            let limits = page * limit;
            let offset = page * limit - limit;

            let prevLink = pagination.getPrevLink(page, request.query)
            let nextLink = pagination.getNextLink(page, totalPage, request.query);

            const pageInfo = {
                page,
                totalPage,
                limit,
                totalData,
                prevLink: prevLink && `http://localhost:3002/all?${prevLink}`,
                nextLink: nextLink && `http://localhost:3002/all?${nextLink}`,
            };
            const result = await getAllProduct(limit, offset);

            return response(res, 200, "Success Get All", result, pageInfo);
        } catch (error) {
            return response(res, 400, "Bad Request", error);
        }
    },





    getProduct: async (req, res) => {
        try {
            product = await getAll()

            return response(res, 200, "Success get product", product)
        } catch (error) {
            return response(res, 400, "Bad Request")
        }
    },
    postProduct: async (req, res) => {
        try {
            let filename
            const {
                product_name,
                product_price,
                product_sale,
                product_stock
            } = req.body


            let request = {
                product_name,
                product_picture: req.file,
                product_price,
                product_sale,
                product_stock
            }


            product = {
                product_name: product_name
            }
            const checkName = await getOne(product)


            if (checkName.length == 1) {
                if (req.file) {
                    deleteImage(req.file.filename)
                }
                return response(res, 300, "Product name is already exist")
            }


            const valid = Validator.make(request, {
                product_name: 'required|string',
                product_price: 'required|integer',
                product_sale: 'required|integer',
                product_stock: 'required|integer',
                product_picture: 'required'
            });

            if (valid.fails()) {
                if (req.file) {
                    deleteImage(req.file.filename)
                }
                const errors = valid.getErrors();
                return response(res, 300, errors)
            } else {
                product = {
                    product_id: uuid.v4(),
                    product_name,
                    product_price,
                    product_sale,
                    product_stock,
                    product_picture: req.file.filename,
                    product_created_at: new Date()
                }
                await add(product)

                return response(res, 200, "Success Add Product", product)
            }

        } catch (error) {
            return response(res, 400, "Bad Request")
        }
    },
    updateProduct: async (req, res) => {
        try {
            let filename
            const id = req.params.id
            const { product_name, product_price, product_sale, product_stock } = req.body

            if (req.file !== undefined) {
                filename = req.file.filename
            }


            product = {
                product_id: id
            }

            const checkId = await getOne(product)
            if (checkId.length === 0) {
                if (req.file) {
                    deleteImage(req.file.filename)
                }
                return response(res, 404, "Product not found")
            }

            product = {
                product_name: product_name
            }
            const checkName = await getOne(product)
            if (checkName.length == 1 && checkName[0].product_id !== checkId[0].product_id) {
                if (req.file) {
                    deleteImage(req.file.filename)
                }
                return response(res, 300, "Product name is already exist")
            }

            const valid = Validator.make(req.body, {
                product_name: 'required|string',
                product_price: 'required|integer',
                product_stock: 'required|integer',
                product_sale: 'required|integer',
            });

            if (valid.fails()) {
                if (filename) {
                    deleteImage(filename)
                }
                const errors = valid.getErrors();
                return response(res, 300, errors)
            } else {
                if (filename) {
                    deleteImage(checkId[0].product_picture)
                }

                let product = {
                    product_name,
                    product_price,
                    product_stock,
                    product_sale,
                    product_picture: filename ? filename : checkId[0].product_picture,
                    product_updated_at: new Date()
                }

                await update(product, id)
                return response(res, 200, "Success Update Product")
            }
        } catch (error) {
            return response(res, 400, "Bad Request")
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const id = req.params.id
            product = {
                product_id: id
            }
            const checkId = await getOne(product)
            if (checkId.length === 0) {
                return response(res, 404, "Product not found")
            }
            deleteImage(checkId[0].product_picture)

            await deleteProduct(id)
            return response(res, 200, "Success Delete Product")
        } catch (error) {
            return response(res, 400, "Bad Request")
        }
    },
    searchProduct: async (req, res) => {
        try {
            const keyword = req.query.keyword

            product = await searchAll(keyword)

            if (product.length == 0) {
                return response(res, 404, "Product not found")
            }
            return response(res, 200, "Success Search Product", product)
        } catch (error) {
            return response(res, 400, "Bad Request")
        }
    }
}