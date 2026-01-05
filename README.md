Project ini merupakan sistem admin sederhana untuk:
- Input data pembelian produk
- Cancel pembelian oleh admin
- Pengelolaan stok produk secara otomatis

---

🛠 Tech Stack
- Node.js
- Express.js
- EJS (Template Engine)
- MySQL

---

⚙️ Cara Menjalankan Aplikasi

1. Clone Repository
git clone <link-repository>
cd <nama-folder>

2. Install Dependency
npm install

3. Setup Database

- Jalankan XAMPP
- Start Apache dan MySQL
- Buka phpMyAdmin
- Buat database baru (contoh: shop_db)
- Import file:
  database/admin_store.sql

File SQL sudah berisi:
- Struktur tabel
- Data awal produk (10 produk)

4. Konfigurasi Environment
Copy file .env.example menjadi .env, lalu sesuaikan:

DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=shop_db

6. Jalankan Aplikasi
npm run dev
Buka di browser:
http://localhost:3000/admin/products

---

⚙️ Panduan Penggunaan Aplikasi

1. Halaman Produk - Menampilkan daftar produk dan stok.
Klik tombol Beli untuk melakukan pembelian.
URL:

/admin/products

3. Input Pembelian
- Pilih produk
- Masukkan jumlah pembelian
- Klik Beli
- Stok produk akan otomatis berkurang

3. Cancel Pembelian
- Masuk ke halaman daftar pembelian
- Klik tombol Cancel
- Stok produk otomatis kembali

---

📌 Catatan
- Database tidak di-commit ke repository
- File SQL disediakan agar database dapat direplikasi
- UI dibuat sederhana dengan fokus pada fungsionalitas

---

👤 Author

Kemal Raisya Badrian
