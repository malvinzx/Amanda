# Veloura — A Little Lovely World

Website satu halaman untuk Siti Amanda dengan loading screen, aesthetic editorial pastel, animasi halus, interaksi kecil, dan desain responsif.

## Cara menjalankan
1. Ekstrak ZIP.
2. Buka folder `veloura-girl-website`.
3. Buka `index.html` langsung di browser, atau gunakan Live Server / server lokal.
4. Internet dibutuhkan untuk Google Fonts dan foto Unsplash. Layout tetap bisa dibuka jika koneksi tidak tersedia, tetapi foto/font eksternal mungkin tidak muncul.

## Fitur
- Responsive untuk HP, tablet, dan desktop
- Loading screen pembuka dengan animasi
- Scroll reveal dan progress bar
- Personalisasi nama Siti Amanda
- Menghilangkan highlight biru saat tap pada perangkat mobile, tanpa mengorbankan fokus keyboard
- Efek cursor glow pada perangkat pointer
- Toggle light/dark theme
- Menu mobile
- Tombol sprinkle dengan partikel hati
- Affirmation generator
- Modal surat interaktif + dukungan Escape
- Animasi hover pada galeri
- Mendukung `prefers-reduced-motion`

## Kustomisasi cepat
- Warna: edit variabel CSS di bagian `:root` pada `css/style.css`.
- Teks, gambar, section: edit `index.html`.
- Interaksi: edit `js/main.js`.
- Foto memakai URL Unsplash, jadi ganti `src` gambar untuk memakai foto sendiri.

Semua kode inti menggunakan HTML, CSS, dan JavaScript vanilla tanpa build step.


## Foto personal
Foto yang diberikan dipasang dari URL Catbox: foto profil pada hero, foto kedua pada bagian cerita, dan foto lainnya pada galeri. Koneksi internet diperlukan untuk memuat foto tersebut.
