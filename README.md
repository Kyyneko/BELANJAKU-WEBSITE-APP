# GROUP_L-FINAL_PROJECT

**Panduan Penggunaan Git**

Pengenalan
Repositori ini berisi panduan penggunaan Git untuk kolaborator proyek. Git adalah sistem kontrol versi yang populer digunakan untuk mengelola kode sumber dalam pengembangan perangkat lunak. Dokumen ini akan memberikan panduan singkat tentang cara menggunakan Git untuk kolaborasi dalam proyek.

**Cara Penggunaan Git**

1. Clone Repositori
   Untuk mulai berkontribusi dalam proyek, clone repositori ke lokal komputer Anda.
   
        git clone <url-repositori>
        cd <nama-repositori>

3. Pull
   Sebelum memulai pekerjaan atau melakukan perubahan pada proyek, lakukan pull terbaru dari repositori untuk memastikan Anda memiliki versi terbaru dari kode yang sedang dikerjakan oleh anggota tim lainnya.

        git pull

3. Lakukan Perubahan
   Buat perubahan yang diperlukan dalam proyek Anda.

4. Add, Commit, dan Push Perubahan
   Setelah menyelesaikan pekerjaan atau membuat perubahan yang Anda inginkan, lakukan add, commit, dan push perubahan tersebut ke repositori utama.

        git add .
        git commit -m "Pesan commit Anda"
        git push origin master


**Peringatan Saat Mengedit File**

Selalu perhatikan peringatan saat melakukan pengeditan file. Pastikan Anda melakukan pull terbaru sebelum push untuk menghindari konflik dengan kode yang telah diubah oleh anggota tim lainnya.

Catatan Penting
Pull Terlebih Dahulu: Sebelum melakukan push, pastikan untuk melakukan pull terbaru dari repositori utama.
Pastikan Kualitas Kode: Sebelum melakukan push, pastikan bahwa perubahan Anda telah diuji dan memenuhi standar kualitas kode.
Hindari Konflik: Selalu perhatikan peringatan konflik saat melakukan pull atau push. Selesaikan konflik dengan menggabungkan perubahan dengan bijaksana.
Dengan mengikuti langkah-langkah di atas, Anda dapat mengelola proyek secara efisien dan berkolaborasi dengan anggota tim secara harmonis.
