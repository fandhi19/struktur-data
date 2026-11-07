// Data Materi Pembelajaran Struktur Data (Kurikulum Merdeka - Fase E)
// Berdasarkan Buku Saku Struktur Data oleh Ilyas Fandhi Anggara, S.Kom (SMA N 4 Yogyakarta / PPG Prajabatan UNY)

const LEARNING_DATA = {
  meta: {
    title: "Struktur Data Kurikulum Merdeka",
    fase: "Fase E • Kelas X SMA",
    author: "Ilyas Fandhi Anggara, S.Kom",
    affiliation: "Guru Informatika • SMA Negeri 4 Yogyakarta • PPG Prajabatan UNY",
    version: "2.0 (UKIN Ed.)"
  },

  chapters: [
    {
      id: "bab1",
      number: "BAB I",
      title: "Pengantar Struktur Data & Berpikir Komputasional",
      subtitle: "Fondasi Komputasi & Tata Kelola Data dalam Memori Komputer (RAM)",
      readingTime: "8 Menit",
      badge: "Konseptual Dasar",
      summary: "Memahami hakikat struktur data, arsitektur penyimpanan RAM, analogi lemari pakaian, 4 dampak ketiadaan struktur data, dan 4 pilar Berpikir Komputasional (Dekomposisi, Pengenalan Pola, Abstraksi, Algoritma).",
      sections: [
        {
          title: "1. Apa Itu Struktur Data?",
          content: `
            <p class="mb-3">Bayangkan sebuah lemari pakaian yang sangat besar. Jika seluruh pakaian, kaus kaki, jaket, dan topi dilemparkan begitu saja ke dalam lemari tanpa sekat atau gantungan, apa yang terjadi saat kalian terburu-buru mencari sepasang kaus kaki hitam? Kalian harus mengaduk seluruh isi lemari, membuang banyak waktu, dan membuat ruangan berantakan.</p>
            <p class="mb-3">Komputer menghadapi tantangan yang persis sama. <strong>Struktur Data</strong> adalah cara khusus untuk <em>mengorganisasikan, menyimpan, dan mengatur data</em> di dalam sistem komputer (khususnya memori utama/RAM) sehingga data tersebut dapat diakses, dimodifikasi, dan diproses secara efisien dan adil.</p>
            <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl my-4 text-sm text-blue-900">
              <strong>Kutipan Emas Pendidik:</strong><br>
              "Komputer tidak memiliki intuisi manusia. Tanpa algoritma dan struktur data yang ditentukan oleh programmer, komputer hanyalah perangkat elektronik yang bingung mengelola triliunan byte data."
            </div>
          `
        },
        {
          title: "2. Dampak Fatal Ketiadaan Struktur Data",
          content: `
            <p class="mb-4">Jika seorang pembuat program (programmer) mengabaikan pemilihan struktur data yang tepat, sistem digital akan mengalami kegagalan operasional yang fatal:</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white p-4 rounded-xl border border-red-200 shadow-sm flex items-start gap-3">
                <span class="text-2xl text-red-500">⚠️</span>
                <div>
                  <h5 class="font-bold text-gray-800 text-sm">Kemacetan Sistem (Lag / Freeze)</h5>
                  <p class="text-xs text-gray-600 mt-1">Komputer harus memeriksa miliaran data satu per satu tanpa acuan arah, memboroskan daya prosesor (CPU).</p>
                </div>
              </div>
              <div class="bg-white p-4 rounded-xl border border-red-200 shadow-sm flex items-start gap-3">
                <span class="text-2xl text-red-500">⚖️</span>
                <div>
                  <h5 class="font-bold text-gray-800 text-sm">Ketidakadilan Layanan</h5>
                  <p class="text-xs text-gray-600 mt-1">Data pelanggan yang datang lebih awal bisa terlewat atau disalip oleh data yang baru masuk secara acak.</p>
                </div>
              </div>
              <div class="bg-white p-4 rounded-xl border border-red-200 shadow-sm flex items-start gap-3">
                <span class="text-2xl text-red-500">💥</span>
                <div>
                  <h5 class="font-bold text-gray-800 text-sm">Kerusakan Data (Data Corruption)</h5>
                  <p class="text-xs text-gray-600 mt-1">Data baru dapat menimpa data penting yang lama karena ketiadaan batasan alamat memori yang jelas.</p>
                </div>
              </div>
              <div class="bg-white p-4 rounded-xl border border-red-200 shadow-sm flex items-start gap-3">
                <span class="text-2xl text-red-500">📉</span>
                <div>
                  <h5 class="font-bold text-gray-800 text-sm">Kebocoran Memori (Memory Leak)</h5>
                  <p class="text-xs text-gray-600 mt-1">Memori teralokasi secara acak dan tidak pernah dibebaskan kembali saat proses selesai dijalankan.</p>
                </div>
              </div>
            </div>
          `
        },
        {
          title: "3. Empat (4) Pilar Berpikir Komputasional",
          content: `
            <p class="mb-4">Dalam mengelola struktur data, kita mengintegrasikan 4 keterampilan abad ke-21:</p>
            <div class="space-y-3">
              <div class="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-3">
                <span class="bg-blue-600 text-white font-bold px-2.5 py-1 rounded-lg text-xs">01</span>
                <div>
                  <strong class="text-gray-900 text-sm">Dekomposisi:</strong>
                  <p class="text-xs text-gray-600 mt-0.5">Memecah sekumpulan data kompleks menjadi elemen-elemen tunggal yang mandiri (misal: memecah data siswa menjadi NIS, Nama, dan Kelas).</p>
                </div>
              </div>
              <div class="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-3">
                <span class="bg-amber-500 text-white font-bold px-2.5 py-1 rounded-lg text-xs">02</span>
                <div>
                  <strong class="text-gray-900 text-sm">Pengenalan Pola:</strong>
                  <p class="text-xs text-gray-600 mt-0.5">Menganalisis karakteristik alur data: apakah data butuh pemrosesan urutan terbalik (LIFO) atau urutan kedatangan asli (FIFO)?</p>
                </div>
              </div>
              <div class="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-3">
                <span class="bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-lg text-xs">03</span>
                <div>
                  <strong class="text-gray-900 text-sm">Abstraksi:</strong>
                  <p class="text-xs text-gray-600 mt-0.5">Menyembunyikan detail rumit alamat fisik heksadesimal RAM dan hanya berfokus pada urutan hubungan logis antarelemen data.</p>
                </div>
              </div>
              <div class="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-3">
                <span class="bg-purple-600 text-white font-bold px-2.5 py-1 rounded-lg text-xs">04</span>
                <div>
                  <strong class="text-gray-900 text-sm">Perancangan Algoritma:</strong>
                  <p class="text-xs text-gray-600 mt-0.5">Menyusun langkah terurut untuk menyisipkan data baru (insert), mencari data (search), atau menghapus data (delete) tanpa merusak integritas sistem.</p>
                </div>
              </div>
            </div>
          `
        }
      ]
    },

    {
      id: "bab2",
      number: "BAB II",
      title: "List (Daftar / Larik Linier Berindeks)",
      subtitle: "Akses Fleksibel Bebas (Random Access) & Menguak Misteri Indeks Nol (0)",
      readingTime: "10 Menit",
      badge: "Struktur Dasar",
      summary: "Membedah struktur data List, anatomi indeks, misteri Zero-Based Indexing, perhitungan alamat offset memori RAM, operasi CRUD (Akses, Sisip, Hapus, Cari), serta kelebihan dan kelemahannya.",
      sections: [
        {
          title: "1. Pengertian & Karakteristik List",
          content: `
            <p class="mb-3"><strong>List (Daftar / Larik Dinamis)</strong> adalah struktur data linier di mana sekumpulan data disimpan secara berurutan dan setiap elemen memiliki <strong>nomor indeks</strong> sebagai tanda pengenalnya.</p>
            <ul class="list-disc pl-5 text-sm text-gray-700 space-y-2 mb-4">
              <li><strong>Akses Bebas (Random Access):</strong> Kita dapat langsung membaca data pada posisi mana pun hanya dengan memanggil nomor indeksnya (misal: <code>data[3]</code>) tanpa membaca indeks 0, 1, 2 terlebih dahulu.</li>
              <li><strong>Fleksibilitas Tinggi:</strong> Bebas menyisipkan (insert) data baru di awal, di tengah, atau di akhir daftar.</li>
              <li><strong>Ukuran Dinamis:</strong> Pada bahasa modern seperti Python, kapasitas list dapat bertambah atau berkurang secara otomatis.</li>
            </ul>
          `
        },
        {
          title: "2. Misteri Indeks Dimulai dari Nol (Zero-Based Indexing)",
          content: `
            <p class="mb-3">Banyak pemula bertanya: <em>"Mengapa elemen pertama disebut indeks 0, bukan indeks 1?"</em> Jawabannya berakar pada arsitektur perangkat keras komputer! Indeks sebenarnya adalah <strong>jarak perpindahan (offset)</strong> dari alamat memori awal.</p>
            <div class="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto my-3">
              <p class="text-gray-400">// RUMUS ALAMAT MEMORI RAM KOMPUTER:</p>
              <p class="text-yellow-300 font-bold">Alamat Elemen = Alamat Awal + (Indeks × Ukuran Data)</p>
              <p class="mt-2 text-gray-300">Contoh Elemen Pertama (Indeks 0):</p>
              <p>Alamat = 0x100 + (0 × 4 byte) = 0x100  <span class="text-emerald-300">// Langsung tanpa jeda komputasi perkalian!</span></p>
              <p class="mt-1 text-gray-300">Contoh Elemen Kedua (Indeks 1):</p>
              <p>Alamat = 0x100 + (1 × 4 byte) = 0x104</p>
            </div>
            <p class="text-sm text-gray-700">Jika indeks diawali dari 1, komputer terpaksa melakukan operasi pengurangan <code>(indeks - 1)</code> triliunan kali per detik, memperlambat prosesor secara masif.</p>
          `
        },
        {
          title: "3. Operasi Utama & Kelemahan Komputasi",
          content: `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div class="p-3 border rounded-xl bg-blue-50/50">
                <h6 class="font-bold text-blue-900 text-xs uppercase tracking-wide">1. Access & Read</h6>
                <p class="text-xs text-gray-700 mt-1"><code>lagu = playlist[4]</code> mengeklik langsung lagu ke-5 tanpa memutar lagu 1–4.</p>
              </div>
              <div class="p-3 border rounded-xl bg-emerald-50/50">
                <h6 class="font-bold text-emerald-900 text-xs uppercase tracking-wide">2. Insertion</h6>
                <p class="text-xs text-gray-700 mt-1">Bila disisipkan di tengah, elemen setelahnya harus bergeser 1 langkah ke kanan.</p>
              </div>
              <div class="p-3 border rounded-xl bg-amber-50/50">
                <h6 class="font-bold text-amber-900 text-xs uppercase tracking-wide">3. Deletion</h6>
                <p class="text-xs text-gray-700 mt-1">Menghapus data tertentu, elemen di sebelah kanan akan bergeser ke kiri mengisi celah kosong.</p>
              </div>
              <div class="p-3 border rounded-xl bg-purple-50/50">
                <h6 class="font-bold text-purple-900 text-xs uppercase tracking-wide">4. Search & Update</h6>
                <p class="text-xs text-gray-700 mt-1">Mencari nilai dan memperbarui isi elemen seketika (misal: <code>kontak[0] = "Ayah"</code>).</p>
              </div>
            </div>
            <div class="p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-xs text-amber-900">
              <strong>Kelemahan List:</strong> Operasi penyisipan atau penghapusan elemen di awal list berukuran besar membutuhkan biaya komputasi yang berat (O(N)), karena komputer harus menggeser jutaan elemen di belakangnya!
            </div>
          `
        }
      ]
    },

    {
      id: "bab3",
      number: "BAB III",
      title: "Stack (Tumpukan & Prinsip LIFO)",
      subtitle: "Disiplin Satu Pintu: Last In, First Out — Yang Terakhir Masuk, Pertama Keluar",
      readingTime: "12 Menit",
      badge: "Disiplin Satu Pintu",
      summary: "Konsep LIFO, anatomi Stack (Top & Base), operasi Push dan Pop, operasi pendukung (Peek, IsEmpty, IsFull), fenomena bahaya Stack Overflow dan Stack Underflow, serta penerapan nyata seperti tombol Undo (Ctrl+Z), Back browser, dan Call Stack rekursi.",
      sections: [
        {
          title: "1. Prinsip Kerja & Anatomi Stack",
          content: `
            <p class="mb-3"><strong>Stack (Tumpukan)</strong> adalah struktur data linier yang hanya mengizinkan penambahan dan pengambilan elemen melalui <strong>satu sisi yang sama</strong>, yaitu bagian paling atas yang disebut <strong>Top</strong>. Sisi dasarnya tertutup rapat dan disebut <strong>Base</strong>.</p>
            <div class="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-4">
              <h5 class="font-bold text-amber-900 text-sm flex items-center gap-2">🍽️ Analogi Nyata: Tumpukan Piring Bersih</h5>
              <p class="text-xs text-amber-800 mt-1">Ketika mencuci piring, piring yang baru dibilas ditaruh di atas tumpukan paling atas. Saat seseorang ingin makan, piring yang diambil pertama kali pastilah piring yang ditaruh paling terakhir! Jika nekat menarik piring terbawah, tumpukan piring akan roboh dan pecah.</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div class="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                <span class="font-bold text-blue-900 text-sm block">⬇️ Push (Operasi Menumpuk)</span>
                <span class="text-xs text-gray-700">Memasukkan data baru ke puncak tumpukan (Top). Nilai pointer Top bertambah naik 1 tingkat.</span>
              </div>
              <div class="p-3 bg-rose-50 border border-rose-200 rounded-xl">
                <span class="font-bold text-rose-900 text-sm block">⬆️ Pop (Operasi Mengambil)</span>
                <span class="text-xs text-gray-700">Menghapus dan mengambil data dari puncak tumpukan (Top). Nilai pointer Top turun 1 tingkat.</span>
              </div>
            </div>
            <p class="text-xs text-gray-600"><strong>Operasi Pendukung:</strong> <code>Peek()</code> (melihat nilai elemen Top tanpa menghapusnya), <code>IsEmpty()</code> (memeriksa apakah tumpukan kosong), dan <code>IsFull()</code> (memeriksa tumpukan penuh).</p>
          `
        },
        {
          title: "2. Bahaya Ekstrem: Overflow & Underflow",
          content: `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
              <div class="p-4 bg-red-50 border-2 border-red-300 rounded-2xl">
                <div class="flex items-center gap-2 text-red-700 font-bold text-sm">
                  <span>🚨</span> Stack Overflow (Meluap)
                </div>
                <p class="text-xs text-gray-700 mt-2">Terjadi saat program terus memanggil operasi <code>Push</code> pada stack yang kapasitas fisiknya sudah penuh. Akibatnya memori jebol dan program mengalami crash seketika!</p>
              </div>
              <div class="p-4 bg-orange-50 border-2 border-orange-300 rounded-2xl">
                <div class="flex items-center gap-2 text-orange-700 font-bold text-sm">
                  <span>🕳️</span> Stack Underflow (Hampa)
                </div>
                <p class="text-xs text-gray-700 mt-2">Terjadi saat sistem mencoba mengeksekusi operasi <code>Pop</code>, padahal tumpukan sudah kosong melompong (tidak ada elemen yang bisa diambil).</p>
              </div>
            </div>
          `
        },
        {
          title: "3. Penerapan Stack di Sistem Nyata",
          content: `
            <div class="space-y-3">
              <div class="p-3 bg-white border border-gray-200 rounded-xl shadow-xs">
                <strong class="text-sm text-gray-900">1. Fitur Sakti Ctrl+Z (Undo)</strong>
                <p class="text-xs text-gray-600 mt-0.5">Setiap ketikan kata disimpan ke dalam stack aksi. Saat menekan Ctrl+Z, aplikasi mengambil aksi dari tumpukan paling atas (Top) untuk dibatalkan terlebih dahulu.</p>
              </div>
              <div class="p-3 bg-white border border-gray-200 rounded-xl shadow-xs">
                <strong class="text-sm text-gray-900">2. Tombol Back pada Browser Internet</strong>
                <p class="text-xs text-gray-600 mt-0.5">Setiap link situs yang dikunjungi di-push ke stack riwayat. Saat tombol Back diklik, URL situs terakhir di-pop sehingga browser kembali ke laman sebelumnya.</p>
              </div>
              <div class="p-3 bg-white border border-gray-200 rounded-xl shadow-xs">
                <strong class="text-sm text-gray-900">3. Pengecekan Keseimbangan Tanda Kurung</strong>
                <p class="text-xs text-gray-600 mt-0.5">Compiler menggunakan stack untuk memeriksa apakah pasangan kurung buka <code>( [ {</code> ditutup secara tepat oleh kurung tutup <code>} ] )</code> yang bersesuaian.</p>
              </div>
              <div class="p-3 bg-white border border-gray-200 rounded-xl shadow-xs">
                <strong class="text-sm text-gray-900">4. Call Stack (Rekursi Pemrograman)</strong>
                <p class="text-xs text-gray-600 mt-0.5">Ketika fungsi memanggil dirinya sendiri, komputer menumpuk alamat memori eksekusi sebelumnya di Call Stack sistem operasi.</p>
              </div>
            </div>
          `
        }
      ]
    },

    {
      id: "bab4",
      number: "BAB IV",
      title: "Queue (Antrean & Prinsip FIFO)",
      subtitle: "Keadilan Layanan: First In, First Out — Yang Pertama Masuk, Pertama Dilayani",
      readingTime: "12 Menit",
      badge: "Keadilan Layanan",
      summary: "Prinsip FIFO, anatomi Queue (Front/Head & Rear/Tail), operasi Enqueue dan Dequeue, variasi Queue (Linear, Circular, Priority), serta penerapannya pada Print Spooler, tiket bioskop, dan buffer video streaming.",
      sections: [
        {
          title: "1. Prinsip Kerja & Anatomi Queue",
          content: `
            <p class="mb-3"><strong>Queue (Antrean)</strong> adalah struktur data linier yang menerapkan prinsip <strong>FIFO (First In, First Out)</strong>. Elemen yang pertama kali masuk akan menjadi elemen yang pertama kali keluar atau diproses.</p>
            <p class="mb-3">Berbeda dengan Stack yang hanya punya satu pintu (Top), Queue memiliki <strong>dua gerbang berbeda</strong>:</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div class="p-3 bg-indigo-50 border border-indigo-200 rounded-xl">
                <span class="font-bold text-indigo-900 text-sm block">🚪 Ujung Belakang: REAR / TAIL</span>
                <span class="text-xs text-gray-700">Pintu masuk data baru melalui operasi <strong>Enqueue()</strong>.</span>
              </div>
              <div class="p-3 bg-teal-50 border border-teal-200 rounded-xl">
                <span class="font-bold text-teal-900 text-sm block">🚪 Ujung Depan: FRONT / HEAD</span>
                <span class="text-xs text-gray-700">Pintu keluar pengambilan data melalui operasi <strong>Dequeue()</strong>.</span>
              </div>
            </div>
            <div class="p-3 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl text-xs text-rose-900">
              <strong>Miskonsepsi Fatal:</strong> Jangan menyamakan Queue dengan List! Pada antrean murni, kita dilarang keras memotong antrean atau mengambil data di tengah barisan tanpa izin logika khusus.
            </div>
          `
        },
        {
          title: "2. Tiga Variasi Struktur Queue Modern",
          content: `
            <div class="space-y-3">
              <div class="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <h6 class="font-bold text-gray-900 text-xs">1. Linear Queue (Antrean Lurus)</h6>
                <p class="text-xs text-gray-600 mt-1">Antrean lurus biasa. Kelemahannya: ruang kosong di depan bekas dequeue tidak bisa langsung dipakai lagi tanpa pergeseran seluruh elemen.</p>
              </div>
              <div class="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <h6 class="font-bold text-gray-900 text-xs">2. Circular Queue (Antrean Melingkar)</h6>
                <p class="text-xs text-gray-600 mt-1">Ujung belakang tersambung kembali ke depan secara melingkar (modulo), sehingga tidak ada ruang memori yang terbuang sia-sia.</p>
              </div>
              <div class="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <h6 class="font-bold text-gray-900 text-xs">3. Priority Queue (Antrean Berprioritas)</h6>
                <p class="text-xs text-gray-600 mt-1">Elemen dengan nilai urgensi tertinggi akan diproses lebih dulu, persis seperti penanganan pasien darurat di IGD Rumah Sakit.</p>
              </div>
            </div>
          `
        },
        {
          title: "3. Penerapan Nyata Queue dalam Sistem Digital",
          content: `
            <ul class="list-disc pl-5 text-sm text-gray-700 space-y-2 mb-3">
              <li><strong>Antrean Cetak Dokumen (Print Spooler):</strong> Ketika 5 siswa menekan tombol print serentak ke 1 printer di lab sekolah, dokumen siswa pertama selesai dicetak tuntas sebelum dokumen berikutnya mulai diproses.</li>
              <li><strong>Sistem Tiket & Nasabah Bank:</strong> Tiket nomor A-01 dipanggil sebelum A-02, menjamin keadilan pelayanan masyarakat.</li>
              <li><strong>Buffer Streaming Video (YouTube):</strong> Paket video yang tiba pertama di perangkat langsung diputar berurutan dari antrean buffer agar tontonan tidak patah-patah (*buffering*).</li>
            </ul>
          `
        }
      ]
    },

    {
      id: "bab5",
      number: "BAB V",
      title: "Matriks Komparasi & Algoritma Pohon Keputusan",
      subtitle: "Tabel Perbandingan Menyeluruh & Strategi Cerdas Memilih Struktur Data yang Tepat",
      readingTime: "10 Menit",
      badge: "Sintesis & HOTS",
      summary: "Membandingkan List, Stack, dan Queue dalam tabel komparatif 8 parameter, memahami pohon keputusan logis pemilihan wadah data, serta menelaah studi kasus 'Tragedi Kasir Menggunakan Stack'.",
      sections: [
        {
          title: "1. Tabel Komparasi: List vs Stack vs Queue",
          content: `
            <div class="overflow-x-auto my-3">
              <table class="min-w-full text-xs text-left border-collapse border border-gray-200 rounded-xl overflow-hidden shadow-xs">
                <thead class="bg-blue-900 text-white font-semibold">
                  <tr>
                    <th class="p-2.5 border border-blue-800">Parameter</th>
                    <th class="p-2.5 border border-blue-800">List (Daftar)</th>
                    <th class="p-2.5 border border-blue-800">Stack (Tumpukan)</th>
                    <th class="p-2.5 border border-blue-800">Queue (Antrean)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td class="p-2 font-bold text-gray-800 bg-gray-50">Prinsip Kerja</td>
                    <td class="p-2">Akses bebas berbasis indeks (0..N-1)</td>
                    <td class="p-2 text-amber-700 font-semibold">LIFO (Last In, First Out)</td>
                    <td class="p-2 text-blue-700 font-semibold">FIFO (First In, First Out)</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-bold text-gray-800 bg-gray-50">Titik Masuk (Input)</td>
                    <td class="p-2">Bebas di posisi indeks mana saja</td>
                    <td class="p-2">Hanya di puncak (Top) via Push</td>
                    <td class="p-2">Hanya di belakang (Rear) via Enqueue</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-bold text-gray-800 bg-gray-50">Titik Keluar (Output)</td>
                    <td class="p-2">Bebas dari posisi indeks mana saja</td>
                    <td class="p-2">Hanya dari puncak (Top) via Pop</td>
                    <td class="p-2">Hanya dari depan (Front) via Dequeue</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-bold text-gray-800 bg-gray-50">Akses Elemen</td>
                    <td class="p-2">Akses acak langsung (Random Access)</td>
                    <td class="p-2">Terbatas pada elemen teratas (Top)</td>
                    <td class="p-2">Terbatas pada elemen terdepan (Front)</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-bold text-gray-800 bg-gray-50">Kelebihan Utama</td>
                    <td class="p-2">Fleksibel membaca data instan via indeks</td>
                    <td class="p-2">Efisien membalik urutan data; hemat memori</td>
                    <td class="p-2">Menjamin keadilan urutan layanan (Fairness)</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-bold text-gray-800 bg-gray-50">Keterbatasan</td>
                    <td class="p-2">Pergeseran elemen lambat saat insert di tengah</td>
                    <td class="p-2">Bahaya Stack Overflow jika penuh</td>
                    <td class="p-2">Bahaya ruang kosong terbuang pada antrean linear</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-bold text-gray-800 bg-gray-50">Analogi Fisik</td>
                    <td class="p-2">Rak buku terbuka atau daftar belanjaan</td>
                    <td class="p-2">Tumpukan piring bersih atau tumpukan buku</td>
                    <td class="p-2">Antrean kasir toko atau loket tiket kereta</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-bold text-gray-800 bg-gray-50">Penerapan Digital</td>
                    <td class="p-2">Playlist musik Spotify, buku kontak HP</td>
                    <td class="p-2">Fitur Undo (Ctrl+Z), Back browser, Call Stack</td>
                    <td class="p-2">Print Spooler printer, buffer streaming YouTube</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `
        },
        {
          title: "2. Pohon Keputusan Berpikir Komputasional",
          content: `
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 my-2 font-sans text-xs">
              <p class="font-bold text-gray-900 text-sm mb-3">Pertanyaan Kunci Pemilihan Struktur Data:</p>
              <div class="space-y-2">
                <div class="p-2.5 bg-white rounded-lg border border-gray-200">
                  <span class="text-blue-600 font-bold">1. Apakah perlu akses acak bebas ke posisi sembarang data?</span>
                  <p class="text-gray-700 mt-0.5">➡️ <strong>YA:</strong> Pilih <strong>LIST (Daftar Berindeks)</strong>. (Contoh: Daftar nilai siswa, katalog barang toko, playlist lagu).</p>
                </div>
                <div class="p-2.5 bg-white rounded-lg border border-gray-200">
                  <span class="text-amber-600 font-bold">2. Jika TIDAK: Apakah data yang terakhir masuk harus diproses terlebih dahulu?</span>
                  <p class="text-gray-700 mt-0.5">➡️ <strong>YA:</strong> Pilih <strong>STACK (Tumpukan - LIFO)</strong>. (Contoh: Fitur Undo/Redo, riwayat navigasi Back, pengecekan kurung matematika).</p>
                </div>
                <div class="p-2.5 bg-white rounded-lg border border-gray-200">
                  <span class="text-emerald-600 font-bold">3. Jika TIDAK: Apakah data harus diproses adil sesuai urutan kedatangan?</span>
                  <p class="text-gray-700 mt-0.5">➡️ <strong>YA:</strong> Pilih <strong>QUEUE (Antrean - FIFO)</strong>. (Contoh: Antrean tiket bioskop, print spooler, penjadwalan CPU).</p>
                </div>
              </div>
            </div>
          `
        },
        {
          title: "3. Refleksi Kritis: Tragedi Kasir Menggunakan Stack",
          content: `
            <div class="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-950">
              <h6 class="font-bold text-rose-900 text-sm mb-1">🚨 Tragedi Kasir Rumah Sakit:</h6>
              <p>Bayangkan jika sebuah loket rumah sakit menerapkan struktur data <strong>Stack</strong> alih-alih <strong>Queue</strong>. Pasien pertama yang datang pukul 06.00 pagi ditaruh di paling bawah tumpukan. Setiap kali pasien baru tiba pukul 08.00, pasien baru itulah yang langsung dilayani!</p>
              <p class="mt-1">Pasien pertama yang sakit parah dari subuh tidak akan pernah dipanggil dan berisiko kehilangan nyawa. Inilah bukti nyata bahwa pemilihan struktur data bukan sekadar persoalan kode, melainkan <strong>keadilan etika sosial kemanusiaan</strong>!</p>
            </div>
          `
        }
      ]
    }
  ],

  hotsCases: [
    {
      id: "case1",
      title: "Studi Kasus 1: Perancangan Fitur Navigasi Aplikasi Mobile",
      scenario: "Raka sedang mengembangkan aplikasi e-commerce sekolah di ponsel pintar. Ketika pengguna membuka Halaman Beranda ➔ mengeklik Menu Produk ➔ memilih Baju Batik ➔ membuka Halaman Keranjang Belanja. Saat pengguna menekan tombol fisik 'Back' (Kembali) di ponselnya, sistem harus menampilkan kembali halaman Baju Batik, bukan langsung kembali ke Beranda.",
      questions: [
        {
          q: "Struktur data linier manakah yang paling ideal untuk memodelkan riwayat navigasi tersebut? Jelaskan alasannya berdasarkan prinsip kerjanya!",
          answer: "Struktur data yang paling ideal adalah STACK (Tumpukan). Alasannya: Navigasi browser/aplikasi menerapkan prinsip LIFO (Last In, First Out). Halaman yang terakhir dikunjungi pengguna (Baju Batik) harus menjadi halaman pertama yang dimunculkan kembali saat tombol Back ditekan."
        },
        {
          q: "Sebutkan nama operasi yang terjadi saat pengguna mengeklik Baju Batik dan saat pengguna menekan tombol Back!",
          answer: "Saat mengeklik Baju Batik: Operasi PUSH (menyimpan URL/halaman baru ke puncak Top stack). Saat menekan tombol Back: Operasi POP (mengambil dan mengeluarkan halaman teratas untuk kembali ke halaman sebelumnya)."
        }
      ]
    },
    {
      id: "case2",
      title: "Studi Kasus 2: Manajemen Pemesanan Dapur Restoran Cepat Saji",
      scenario: "Sebuah restoran burger menerima pesanan dari layar monitor pemesanan mandiri. Pesanan dari meja 01 masuk pukul 12.00, pesanan meja 02 masuk pukul 12.02, dan pesanan meja 03 masuk pukul 12.05. Koki dapur harus menyiapkan makanan secara adil agar pelanggan tidak protes.",
      questions: [
        {
          q: "Struktur data apakah yang wajib diterapkan pada layar monitor koki dapur? Apa konsekuensinya jika koki justru menerapkan struktur data Stack?",
          answer: "Wajib menerapkan QUEUE (Antrean) dengan prinsip FIFO (First In, First Out). Konsekuensi jika memakai Stack: Pesanan meja 03 (paling terakhir datang) akan dimasak duluan, sedangkan meja 01 (pelanggan pertama) akan terbengkalai paling lama hingga makanan dingin atau pelanggan marah."
        },
        {
          q: "Jelaskan posisi meja 01 dan meja 03 dalam terminologi struktur data tersebut (Front / Rear)!",
          answer: "Meja 01 berada di posisi FRONT (depan) karena masuk pertama dan siap di-dequeue untuk dimasak. Meja 03 berada di posisi REAR (belakang) karena paling baru masuk melalui operasi enqueue."
        }
      ]
    },
    {
      id: "case3",
      title: "Tantangan 3: Validasi Ekspresi Rumus Matematika (Kurung Seimbang)",
      scenario: "Diberikan sebuah ekspresi matematika: { [ ( 5 + 3 ) * 2 ] - 4 }. Komputer ingin memastikan bahwa tidak ada tanda kurung yang tertinggal atau salah pasangan.",
      questions: [
        {
          q: "Jelaskan langkah logis bagaimana sebuah Stack dapat menyelesaikan pengecekan ini saat membaca karakter satu per satu dari kiri ke kanan!",
          answer: "1. Setiap menemukan kurung buka '{', '[', '(', lakukan operasi PUSH ke dalam Stack. 2. Abaikan angka dan operator matematika. 3. Setiap menemukan kurung tutup ')', ']', '}', lakukan operasi POP dari puncak Stack, lalu periksa apakah pasangan jenis kurungnya cocok. Jika jenisnya tidak cocok atau stack kosong saat ada kurung tutup, rumus TIDAK VALID. 4. Di akhir ekspresi, jika stack benar-benar KOSONG (IsEmpty), maka seluruh tanda kurung seimbang sempurna."
        }
      ]
    },
    {
      id: "case4",
      title: "Tantangan 4: Fleksibilitas List vs Ketertiban Stack & Queue",
      scenario: "Seorang siswa bertanya: 'Pak Guru, jika List bisa melakukan segalanya karena memiliki nomor indeks bebas, mengapa kita masih repot-repot menciptakan Stack dan Queue yang aturannya serba kaku?'",
      questions: [
        {
          q: "Tulislah argumen ilmiah untuk menjawab pertanyaan kritis teman kalian tersebut!",
          answer: "1. Perlindungan Integritas & Keamanan: Aturan kaku Stack & Queue mencegah kesalahan manusia (human error), seperti ketidaksengajaan menghapus data pelanggan di tengah antrean atau merusak riwayat undo. 2. Optimasi Kinerja Memori: Stack dan Queue hanya beroperasi di ujung (Top atau Rear/Front) dengan kompleksitas O(1) konstan tanpa beban pergeseran jutaan indeks. 3. Abstraksi Konsep Nyata: Stack dan Queue memodelkan alur kerja dunia nyata (antrean adil dan tumpukan barang) secara langsung dan elegan."
        }
      ]
    }
  ],

  preTestQuestions: [
    {
      id: 1,
      question: "Apa fungsi utama dari Struktur Data di dalam sistem komputer?",
      options: [
        "A. Mempercepat koneksi internet pengguna",
        "B. Mengatur dan menyimpan data dalam memori (RAM) agar efisien diproses",
        "C. Membersihkan virus dan malware secara otomatis",
        "D. Meningkatkan resolusi grafis monitor komputer"
      ],
      correctIndex: 1,
      explanation: "Struktur data adalah cara mengorganisasikan, menyimpan, dan mengatur data di dalam memori kerja (RAM) agar mudah dan efisien diakses oleh prosesor."
    },
    {
      id: 2,
      question: "Mengapa indeks elemen pertama pada List (Array) di banyak bahasa pemrograman dimulai dari angka 0 (Zero-Based Indexing)?",
      options: [
        "A. Karena angka 0 adalah angka favorit penemu komputer",
        "B. Karena indeks merupakan jarak perpindahan (offset) dari alamat memori awal",
        "C. Karena komputer kuno tidak mengenal angka 1",
        "D. Supaya siswa kesulitan menghafal urutan data"
      ],
      correctIndex: 1,
      explanation: "Alamat elemen = Alamat Awal + (Indeks × Ukuran). Jika indeks = 0, offset = 0, sehingga komputer langsung mengakses memori awal tanpa perkalian tambahan."
    },
    {
      id: 3,
      question: "Prinsip kerja di mana data yang paling terakhir dimasukkan akan menjadi data yang pertama kali dikeluarkan dikenal dengan sebutan...",
      options: [
        "A. FIFO (First In, First Out)",
        "B. LIFO (Last In, First Out)",
        "C. Random Access",
        "D. Zero-Based"
      ],
      correctIndex: 1,
      explanation: "LIFO (Last In, First Out) adalah prinsip kerja Stack (Tumpukan), seperti tumpukan piring bersih di mana piring teratas diambil duluan."
    },
    {
      id: 4,
      question: "Manakah fitur aplikasi berikut yang paling tepat dimodelkan menggunakan struktur data Stack?",
      options: [
        "A. Antrean cetak dokumen printer bersama",
        "B. Tombol Undo (Ctrl+Z) dan riwayat tombol Back browser",
        "C. Pemanggilan nomor antrean nasabah di bank",
        "D. Pemutaran lagu acak pada Spotify"
      ],
      correctIndex: 1,
      explanation: "Fitur Undo dan tombol Back browser bekerja dengan prinsip membatalkan aksi paling terakhir (LIFO), yang merupakan karakteristik utama Stack."
    },
    {
      id: 5,
      question: "Operasi untuk menambahkan elemen baru ke bagian paling atas (Top) pada struktur data Stack dinamakan...",
      options: [
        "A. Enqueue",
        "B. Push",
        "C. Dequeue",
        "D. Pop"
      ],
      correctIndex: 1,
      explanation: "Operasi Push berfungsi menumpukkan atau memasukkan elemen baru ke bagian Top pada Stack."
    },
    {
      id: 6,
      question: "Kondisi di mana sistem mencoba mengambil data dari Stack yang sudah kosong melompong disebut...",
      options: [
        "A. Stack Overflow",
        "B. Stack Underflow",
        "C. Memory Leak",
        "D. Null Pointer"
      ],
      correctIndex: 1,
      explanation: "Stack Underflow terjadi saat memanggil operasi Pop pada tumpukan yang kosong (tidak ada elemen yang bisa diambil)."
    },
    {
      id: 7,
      question: "Prinsip kerja yang mengutamakan keadilan pelayanan, di mana elemen yang datang lebih dahulu akan dilayani lebih dahulu adalah...",
      options: [
        "A. FIFO (First In, First Out)",
        "B. LIFO (Last In, First Out)",
        "C. FILO (First In, Last Out)",
        "D. LOFI (Low Fidelity)"
      ],
      correctIndex: 0,
      explanation: "FIFO (First In, First Out) adalah prinsip keadilan antrean (Queue), persis seperti antrean loket tiket atau kasir."
    },
    {
      id: 8,
      question: "Pada struktur data Queue, di bagian manakah data baru dimasukkan saat operasi Enqueue?",
      options: [
        "A. Di ujung Front (depan)",
        "B. Di ujung Rear / Tail (belakang)",
        "C. Di sembarang posisi tengah",
        "D. Di luar memori RAM"
      ],
      correctIndex: 1,
      explanation: "Operasi Enqueue memasukkan elemen baru ke bagian belakang antrean yang ditunjuk oleh pointer Rear / Tail."
    },
    {
      id: 9,
      question: "Antrean dokumen pada mesin printer (Print Spooler) di laboratorium sekolah menerapkan struktur data...",
      options: [
        "A. Stack",
        "B. Queue",
        "C. Tree",
        "D. Graph"
      ],
      correctIndex: 1,
      explanation: "Printer menggunakan Queue (FIFO) agar dokumen yang dikirim paling awal dicetak tuntas terlebih dahulu sebelum dokumen berikutnya."
    },
    {
      id: 10,
      question: "Jika kamu membutuhkan struktur data yang mengizinkan membaca lagu ke-7 secara langsung tanpa harus memutar lagu 1 sampai 6, kamu harus memilih...",
      options: [
        "A. Stack murni",
        "B. Queue murni",
        "C. List (Daftar berindeks)",
        "D. Call Stack"
      ],
      correctIndex: 2,
      explanation: "List mendukung Random Access (akses acak bebas) melalui nomor indeks (contoh: playlist[6]), tanpa harus melalui urutan LIFO atau FIFO."
    }
  ],

  postTestQuestions: [
    {
      id: 1,
      question: "Formula alamat memori untuk mengakses elemen pada List adalah: Alamat = Alamat_Awal + (Indeks × Ukuran_Data). Jika alamat awal adalah 0x100 dan setiap data berukuran 4 byte, di manakah posisi memori untuk elemen berindeks 3?",
      options: [
        "A. 0x103",
        "B. 0x10C (karena 0x100 + 12 byte = 0x10C)",
        "C. 0x112",
        "D. 0x104"
      ],
      correctIndex: 1,
      explanation: "Perhitungan: 0x100 + (3 × 4 byte) = 0x100 + 12 byte. Dalam heksadesimal, angka 12 dilambangkan dengan huruf C, sehingga alamatnya adalah 0x10C."
    },
    {
      id: 2,
      question: "Sebuah aplikasi compiler sedang memvalidasi ekspresi rumus matematika: { [ ( A + B ) ] }. Struktur data apakah yang paling efektif digunakan untuk mencocokkan pasangan tanda kurung tersebut?",
      options: [
        "A. Queue (FIFO)",
        "B. Stack (LIFO)",
        "C. Circular List",
        "D. Priority Queue"
      ],
      correctIndex: 1,
      explanation: "Stack digunakan karena tanda kurung buka yang terakhir kali dibuka harus menjadi tanda kurung yang pertama kali dicocokkan dengan kurung tutup terdekat (prinsip LIFO)."
    },
    {
      id: 3,
      question: "Apa akibat yang terjadi jika sistem terus memanggil operasi Push pada Stack yang memorinya sudah dialokasikan penuh dan tidak memiliki ruang tersisa?",
      options: [
        "A. Stack Underflow",
        "B. Stack Overflow dan program mengalami crash",
        "C. Data otomatis berpindah ke struktur Queue",
        "D. Sistem komputer restart ke bios"
      ],
      correctIndex: 1,
      explanation: "Kondisi ini disebut Stack Overflow, di mana penambahan data melampaui batas kapasitas memori yang tersedia sehingga program mengalami crash seketika."
    },
    {
      id: 4,
      question: "Manakah perbedaan mendasar antara operasi Dequeue pada Queue dan operasi Pop pada Stack?",
      options: [
        "A. Dequeue mengeluarkan data dari Front (depan), sedangkan Pop mengeluarkan data dari Top (atas)",
        "B. Dequeue menambahkan data, sedangkan Pop menghapus data",
        "C. Dequeue hanya untuk angka, sedangkan Pop untuk teks",
        "D. Dequeue bersifat LIFO, sedangkan Pop bersifat FIFO"
      ],
      correctIndex: 0,
      explanation: "Dequeue mengeluarkan data yang pertama kali masuk dari ujung Front (FIFO), sedangkan Pop mengeluarkan data yang terakhir kali masuk dari ujung Top (LIFO)."
    },
    {
      id: 5,
      question: "Raka merancang aplikasi e-commerce. Pengguna membuka Beranda ➔ Produk ➔ Batik ➔ Keranjang. Ketika tombol 'Back' ditekan, sistem harus kembali ke Batik. Operasi apa yang tepat terjadi saat tombol Back ditekan?",
      options: [
        "A. Enqueue pada antrean navigasi",
        "B. Dequeue dari riwayat antrean",
        "C. Pop dari stack riwayat halaman",
        "D. Reset seluruh indeks list"
      ],
      correctIndex: 2,
      explanation: "Menekan tombol Back mengeksekusi operasi Pop pada stack riwayat, menghapus halaman 'Keranjang' dan menampilkan halaman puncak sebelumnya ('Batik')."
    },
    {
      id: 6,
      question: "Mengapa Queue Linier biasa sering digantikan oleh Circular Queue (Antrean Melingkar) dalam sistem operasi?",
      options: [
        "A. Karena Queue Linier tidak mendukung angka ganjil",
        "B. Untuk memanfaatkan kembali ruang kosong di depan antrean yang ditinggalkan setelah operasi Dequeue",
        "C. Karena Circular Queue tidak membutuhkan memori RAM",
        "D. Supaya antrean bisa dipotong dari tengah"
      ],
      correctIndex: 1,
      explanation: "Pada Linear Queue biasa, ruang bekas Dequeue di depan terbuang sia-sia jika tidak digeser. Circular Queue menghubungkan ujung belakang ke depan (modulo) sehingga memori terpakai optimal."
    },
    {
      id: 7,
      question: "Di Unit Gawat Darurat (IGD) Rumah Sakit, pasien dengan kondisi kritis didahulukan penanganannya daripada pasien demam biasa. Varian Queue apakah yang memodelkan skenario ini?",
      options: [
        "A. Double-Ended Queue (Deque)",
        "B. Priority Queue (Antrean Berprioritas)",
        "C. Circular Queue",
        "D. Stack LIFO"
      ],
      correctIndex: 1,
      explanation: "Priority Queue melayani elemen berdasarkan derajat prioritas/urgensinya, bukan semata-mata waktu kedatangan."
    },
    {
      id: 8,
      question: "Meskipun List sangat fleksibel karena memiliki nomor indeks bebas, apa alasan utama seorang software engineer tetap memilih Stack atau Queue untuk skenario tertentu?",
      options: [
        "A. List tidak dapat menyimpan data berupa string atau kata",
        "B. Aturan kaku Stack & Queue menjamin integritas data (mencegah modifikasi data sembarangan) dan memiliki performa O(1) konstan di ujungnya",
        "C. Stack dan Queue berukuran lebih besar daripada memori RAM",
        "D. List dilarang digunakan dalam kurikulum internasional"
      ],
      correctIndex: 1,
      explanation: "Stack dan Queue membatasi manipulasi data sembarangan sehingga alur data terjamin disiplin (integritas) dan operasi ujungnya bekerja sangat cepat tanpa pergeseran jutaan elemen."
    },
    {
      id: 9,
      question: "Dalam 4 Pilar Berpikir Komputasional, proses menyembunyikan alamat fisik heksadesimal RAM (seperti 0x7FFF5FBFFD04) dan hanya berfokus pada urutan logis data dinamakan...",
      options: [
        "A. Dekomposisi",
        "B. Pengenalan Pola",
        "C. Abstraksi",
        "D. Perancangan Algoritma"
      ],
      correctIndex: 2,
      explanation: "Abstraksi adalah kemampuan mengeliminasi detail rumit perangkat keras fisik (seperti alamat heksadesimal RAM) dan fokus pada konsep penting tingkat tinggi."
    },
    {
      id: 10,
      question: "Jika loket kasir restoran burger menerapkan struktur data Stack (LIFO) dan bukan Queue (FIFO), apakah dampak sosial yang dirasakan pelanggan?",
      options: [
        "A. Pelanggan merasa senang karena sistem bekerja sangat cepat",
        "B. Terjadi ketidakadilan berat di mana pelanggan yang datang paling awal akan dilayani paling akhir (bahkan berisiko tidak dilayani)",
        "C. Seluruh pesanan burger akan otomatis digratiskan",
        "D. Makanan yang disajikan menjadi lebih lezat"
      ],
      correctIndex: 1,
      explanation: "Prinsip LIFO pada kasir membuat orang yang baru datang langsung dilayani, sementara orang yang antre berjam-jam dari awal tertumpuk di dasar dan tidak pernah dilayani."
    }
  ],

  videos: [
    {
      id: "vid1",
      title: "Konsep Dasar Struktur Data & Berpikir Komputasional (Fase E)",
      duration: "10:24",
      embedUrl: "https://www.youtube.com/embed/5_5oE5lgrhw",
      speaker: "Tim Guru Informatika Indonesia",
      description: "Pengenalan komprehensif mengenai mengapa komputer memerlukan pengorganisasian data, bagaimana data disimpan dalam memori RAM, dan relasinya dengan 4 pilar computational thinking.",
      keyPoints: [
        "01:15 - Analogi Lemari dan Gudang Memori",
        "03:40 - Mengapa Struktur Data Menentukan Kecepatan Komputer",
        "06:20 - Pengenalan Tipe Linier vs Non-Linier",
        "08:50 - Rangkuman Berpikir Komputasional"
      ]
    },
    {
      id: "vid2",
      title: "Memahami List, Array, dan Misteri Zero-Based Indexing",
      duration: "12:15",
      embedUrl: "https://www.youtube.com/embed/RBSGKlAvoiM",
      speaker: "Kuliah Terbuka Pemrograman Dasar",
      description: "Penjelasan mendalam mengapa indeks selalu diawali dari nol (0), pembuktian rumus offset memori heksadesimal, serta demonstrasi operasi penyisipan dan penghapusan elemen.",
      keyPoints: [
        "00:45 - Anatomi Elemen dan Indeks",
        "04:10 - Rumus Perhitungan Alamat Memori (Base + Offset)",
        "07:35 - Kelebihan Akses Acak O(1)",
        "09:50 - Dampak Biaya Pergeseran Elemen saat Insert di Tengah"
      ]
    },
    {
      id: "vid3",
      title: "Stack (Tumpukan) & Prinsip LIFO: Dari Piring hingga Undo",
      duration: "11:42",
      embedUrl: "https://www.youtube.com/embed/F1F2imiOJfk",
      speaker: "Visualisasi Algoritma & Struktur Data",
      description: "Visualisasi animasi operasi Push dan Pop, pemahaman pointer Top, bahaya mematikan Stack Overflow pada rekursi tak berujung, serta simulasi fitur Ctrl+Z pada text editor.",
      keyPoints: [
        "01:00 - Disiplin Satu Pintu dan Prinsip LIFO",
        "03:30 - Animasi Operasi Push, Pop, dan Peek",
        "06:15 - Kasus Nyata: Browser History Back Button",
        "09:20 - Menangani Stack Overflow & Underflow"
      ]
    },
    {
      id: "vid4",
      title: "Queue (Antrean) & Prinsip FIFO: Keadilan Pelayanan Sistem",
      duration: "13:08",
      embedUrl: "https://www.youtube.com/embed/wjI1WNc4g08",
      speaker: "Edukasi TIK Kurikulum Merdeka",
      description: "Prinsip First In, First Out (FIFO), peran pointer Front dan Rear, perbedaan Linear Queue vs Circular Queue, serta penerapannya pada Print Spooler dan buffer YouTube.",
      keyPoints: [
        "01:20 - Mengapa FIFO Menjaga Keadilan Layanan",
        "04:00 - Operasi Enqueue (Rear) dan Dequeue (Front)",
        "07:15 - Solusi Ruang Terbuang: Circular Queue",
        "10:45 - Studi Kasus Nyata: Antrean Print Spooler Lab Sekolah"
      ]
    }
  ],

  glossary: [
    {
      term: "Computational Thinking",
      def: "Metode berpikir memecahkan masalah kompleks dengan pendekatan 4 pilar: dekomposisi, pengenalan pola, abstraksi, dan perancangan algoritma."
    },
    {
      term: "Deque (Double-Ended Queue)",
      def: "Struktur antrean fleksibel yang memungkinkan penambahan dan penghapusan data di kedua ujungnya (ujung depan dan ujung belakang)."
    },
    {
      term: "Dequeue",
      def: "Operasi mengeluarkan dan menghapus elemen data dari posisi paling depan (Front) pada struktur antrean (Queue)."
    },
    {
      term: "Enqueue",
      def: "Operasi memasukkan dan menambahkan elemen data baru ke posisi paling belakang (Rear) pada struktur antrean (Queue)."
    },
    {
      term: "FIFO (First In, First Out)",
      def: "Prinsip kerja antrean di mana elemen yang masuk pertama kali akan dilayani dan dikeluarkan pertama kali."
    },
    {
      term: "Front / Head",
      def: "Penunjuk indeks atau posisi data paling depan pada struktur Queue yang siap diambil oleh operasi Dequeue."
    },
    {
      term: "LIFO (Last In, First Out)",
      def: "Prinsip kerja tumpukan di mana elemen yang terakhir dimasukkan akan menjadi elemen yang pertama kali dikeluarkan."
    },
    {
      term: "List (Daftar Linier)",
      def: "Koleksi data linier terurut berindeks yang mengizinkan hak akses bebas (random access) ke posisi mana pun secara instan."
    },
    {
      term: "Pop",
      def: "Operasi mengambil dan menghapus elemen data dari posisi puncak (Top) pada struktur tumpukan (Stack)."
    },
    {
      term: "Push",
      def: "Operasi menambahkan dan menumpukkan elemen data baru ke posisi puncak (Top) pada struktur tumpukan (Stack)."
    },
    {
      term: "Rear / Tail",
      def: "Penunjuk indeks atau posisi data paling belakang pada struktur Queue tempat data baru masuk melalui operasi Enqueue."
    },
    {
      term: "Stack Overflow",
      def: "Kondisi kegagalan sistem saat operasi Push dipaksakan masuk ke struktur Stack yang kapasitas memorinya telah penuh."
    },
    {
      term: "Stack Underflow",
      def: "Kondisi galat saat operasi Pop dijalankan pada struktur Stack yang kosong tanpa memiliki elemen apa pun."
    },
    {
      term: "Top of Stack",
      def: "Elemen teratas pada struktur Stack yang menjadi satu-satunya gerbang operasi penambahan (Push) dan pengambilan (Pop)."
    },
    {
      term: "Zero-Based Indexing",
      def: "Sistem penomoran indeks elemen yang dimulai dari angka nol (0), di mana indeks merepresentasikan jarak perpindahan (offset) dari alamat dasar memori RAM."
    }
  ]
};

