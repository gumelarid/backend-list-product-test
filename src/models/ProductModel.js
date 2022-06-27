const connection = require('../configs/database')

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM products', (err, result) => {
                !err ? resolve(result) : reject(new Error(err))
            })
        })
    },
    add: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO products (product_id, product_name, product_stock, product_price, product_sale , product_picture, product_created_at) value (?, ?, ?, ?, ? , ?,?) ", [data.product_id, data.product_name, data.product_stock, data.product_price, data.product_sale, data.product_picture, data.product_created_at], (err, result) => {
                !err ? resolve(data) : reject(new Error(err))
            })
        })
    },

    update: (data, id) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE products SET ? WHERE product_id = ?", [data, id], (err, result) => {
                !err ? resolve() : reject(new Error(err))
            })
        })
    },
    deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM products WHERE product_id = ?", [id], (err, result) => {
                !err ? resolve() : reject(new Error(err))
            })
        })
    },

    getOne: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM products WHERE ? ", [data], (err, result) => {
                !err ? resolve(result) : reject(new Error(err))
            })
        })
    },

    searchAll: (data) => {
        console.log(data)
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM products WHERE product_name LIKE '%${data}%'`, (error, result) => {
                console.log(result)
                !error ? resolve(result) : reject(new Error(error));
            });
        });
    },

    countProduct: () => {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT COUNT(*) as total FROM products ",
                (error, result) => {
                    !error ? resolve(result[0].total) : reject(new Error(error));
                }
            );
        });
    },

    getAllProduct: (limit, offset) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM products LIMIT ? OFFSET ?`, [limit, offset], (error, result) => {
                console.log(error)
                !error ? resolve(result) : reject(new Error(error));
            });
        });
    },
}

