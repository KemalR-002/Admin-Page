const express = require("express");
const router = express.Router();
const db = require("../db");

// halaman produk
router.get("/products", (req, res) => {
  const sql = `
    SELECT p.id, p.name, p.price, s.quantity
    FROM products p
    JOIN stocks s ON p.id = s.product_id
  `;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render("products", { products: results });
  });
});

// halaman pembelian
router.get("/purchases", (req, res) => {
  const sql = `
    SELECT pu.id, p.name, pu.quantity, pu.status
    FROM purchases pu
    JOIN products p ON pu.product_id = p.id
  `;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render("purchases", { purchases: results });
  });
});

// form tambah pembelian
router.get("/purchase/add", (req, res) => {
  const selectedProduct = req.query.product_id || null;

  db.query("SELECT * FROM products", (err, products) => {
    if (err) throw err;
    res.render("add-purchase", { products, selectedProduct });
  });
});

// handle purchase submission
router.post("/purchase", (req, res) => {
  const { product_id, quantity } = req.body;
  const qty = parseInt(quantity, 10);

  if (!product_id || !qty || qty <= 0) {
    return res.status(400).send("Invalid input");
  }

  db.query("SELECT quantity FROM stocks WHERE product_id = ?", [product_id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) return res.status(400).send("Product stock not found");

    const stockQty = results[0].quantity;
    if (stockQty < qty) return res.status(400).send("Not enough stock");

    const insertSql = "INSERT INTO purchases (product_id, quantity, status) VALUES (?, ?, ?)";
    db.query(insertSql, [product_id, qty, "pending"], (err2) => {
      if (err2) throw err2;

      db.query("UPDATE stocks SET quantity = quantity - ? WHERE product_id = ?", [qty, product_id], (err3) => {
        if (err3) throw err3;
        res.redirect("/admin/purchases");
      });
    });
  });
});

// cancel (delete) a purchase and restore stock
router.get("/purchase/cancel/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT product_id, quantity FROM purchases WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) return res.redirect("/admin/purchases");

    const p = results[0];

    db.query("DELETE FROM purchases WHERE id = ?", [id], (err2) => {
      if (err2) throw err2;
      db.query("UPDATE stocks SET quantity = quantity + ? WHERE product_id = ?", [p.quantity, p.product_id], (err3) => {
        if (err3) throw err3;
        res.redirect("/admin/purchases");
      });
    });
  });
});

module.exports = router;