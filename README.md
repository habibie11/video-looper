# 🎬 VideoLooper - Infinite Moments

[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![FFmpeg.wasm](https://img.shields.io/badge/FFmpeg.wasm-Black?style=for-the-badge&logo=ffmpeg&logoColor=white)](https://ffmpegwasm.netlify.app/)

**VideoLooper** adalah aplikasi web modern yang memungkinkan Anda untuk membuat loop video secara instan tanpa kehilangan kualitas. Semua proses pengolahan video dilakukan langsung di dalam browser Anda menggunakan teknologi FFmpeg.wasm, sehingga privasi Anda tetap terjaga karena video tidak pernah diunggah ke server mana pun.

---

## ✨ Fitur Utama

- **🚀 Pemrosesan Sisi Klien**: Menggunakan FFmpeg.wasm untuk mengolah video langsung di browser Anda.
- **💎 Tanpa Penurunan Kualitas**: Teknik penyambungan video (concatenation) dilakukan tanpa re-encoding jika memungkinkan, menjaga kualitas asli.
- **🎨 Desain Premium**: Antarmuka pengguna yang bersih, responsif, dan elegan dengan efek *glassmorphism*.
- **🔒 Privasi Terjamin**: File video Anda tetap berada di perangkat Anda. Tidak ada data yang dikirim ke server.
- **📊 Indikator Progres**: Lacak status pemrosesan video Anda secara real-time.

---

## 🛠️ Teknologi yang Digunakan

- **Vite**: Build tool frontend generasi berikutnya yang super cepat.
- **FFmpeg.wasm**: Porting WebAssembly dari FFmpeg untuk pemrosesan video di browser.
- **Vanilla CSS**: Desain kustom dengan variabel CSS modern dan animasi halus.
- **JavaScript (ES6+)**: Logika aplikasi yang efisien dan modular.

---

## 🚀 Cara Instalasi

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di mesin lokal Anda:

### Prasyarat
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) (versi 18 ke atas direkomendasikan).

### Langkah-langkah
1. **Clone repositori ini** (atau unduh source code-nya):
   ```bash
   git clone https://github.com/username/video-looper.git
   cd video-looper
   ```

2. **Instal dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan**:
   ```bash
   npm run dev
   ```

4. **Buka aplikasi**:
   Akses `http://localhost:5173` di browser Anda.

---

## 📖 Cara Penggunaan

1. **Unggah Video**: Tarik dan lepas (*drag & drop*) file video Anda atau klik area unggah untuk memilih file.
2. **Atur Jumlah Loop**: Masukkan berapa kali Anda ingin video tersebut diulang (minimal 2 kali).
3. **Proses Video**: Klik tombol **"Create Loop Video"**.
4. **Unduh**: Setelah selesai, preview video akan muncul dan Anda bisa langsung mengunduh hasilnya dalam format `.mp4`.

---

## Screenshot
<img width="1227" height="755" alt="image" src="https://github.com/user-attachments/assets/20c23546-e9b8-4ccc-9e1d-53f9a8c85963" />
<img width="1227" height="755" alt="image" src="https://github.com/user-attachments/assets/27a863f7-823f-4c58-89ec-ee593c54832c" />
<img width="1227" height="755" alt="image" src="https://github.com/user-attachments/assets/a8cb45c6-5267-4b0f-991e-7d027e6a991c" />


## ⚠️ Catatan Penting

Karena aplikasi ini menggunakan `SharedArrayBuffer` (diperlukan oleh FFmpeg.wasm), server harus menyertakan header tertentu:
- `Cross-Origin-Embedder-Policy: require-corp`
- `Cross-Origin-Opener-Policy: same-origin`

Konfigurasi ini sudah disertakan secara otomatis dalam `vite.config.js`.

---

## 📄 Lisensi

Proyek ini berada di bawah lisensi MIT. Silakan gunakan dan modifikasi sesuai kebutuhan Anda.

---

Dibuat dengan ❤️ untuk kreativitas tanpa batas.
