/* ============================================
   Buku Materi — Flipbook Engine
   Millenial Academy v1.0.0
   ============================================ */

(function() {
    'use strict';

    // ==========================================
    // DATA: Pages Content
    // ==========================================
    const pagesData = [
        {
            type: 'cover',
            title: 'Teknik Perbaikan
Handphone',
            subtitle: 'Panduan Lengkap untuk Teknisi Profesional',
            meta: ['Millenial Academy', 'Edisi 2026', 'Level: Dasar — Mahir'],
            front: true
        },
        {
            type: 'chapter',
            num: '01',
            title: 'Pengenalan Komponen',
            desc: 'Mengenal setiap komponen pada ponsel modern dan fungsinya dalam sistem.',
            front: true
        },
        {
            type: 'content',
            title: 'Komponen Utama Ponsel',
            content: `
                <h3>1.1 System on Chip (SoC)</h3>
                <p>SoC adalah otak dari perangkat mobile modern. Chip ini mengintegrasikan CPU, GPU, modem, dan pengolah sinyal dalam satu paket.</p>
                <div class="highlight-box">
                    <strong>Contoh SoC Populer:</strong> Snapdragon 8 Gen 3, MediaTek Dimensity 9300, Apple A17 Pro, Exynos 2400.
                </div>
                <h3>1.2 Modul Memori</h3>
                <p>RAM (LPDDR5X) dan Storage (UFS 4.0) menentukan kecepatan multitasking dan transfer data. Kerusakan pada modul memori sering menyebabkan bootloop atau restart berulang.</p>
                <div class="tip-box">
                    💡 <strong>Tips:</strong> Selalu gunakan ESD wrist strap saat menangani modul memori untuk mencegah kerusakan akibat listrik statis.
                </div>
                <h3>1.3 Power Management IC (PMIC)</h3>
                <p>PMIC mengatur distribusi daya ke seluruh komponen. Kerusakan PMIC dapat menyebabkan ponsel tidak mengisi daya, panas berlebihan, atau mati total.</p>
            `,
            front: true
        },
        {
            type: 'content',
            title: 'Alat Servis Essential',
            content: `
                <h3>2.1 Soldering Station</h3>
                <p>Station solder dengan kontrol suhu presisi (350°C–450°C) wajib dimiliki. Pilih yang dilengkapi hot air gun untuk rework IC BGA.</p>
                <ul>
                    <li><strong>Quick 861DW</strong> — Hot air, 1000W, kontrol digital</li>
                    <li><strong>Hakko FX-951</strong> — Soldering iron, T12 cartridge</li>
                    <li><strong>Sugon T36</strong> — Budget option, performa solid</li>
                </ul>
                <h3>2.2 Microscope & BNC</h3>
                <p>Microscope trinokular dengan zoom 7x–45x ideal untuk inspeksi solder ball BGA. Tambahkan kamera BNC untuk dokumentasi kerja.</p>
                <div class="highlight-box">
                    <strong>Rekomendasi:</strong> AmScope SM-4TZ-144A + kamera 5MP HDMI untuk hasil terbaik.
                </div>
                <h3>2.3 Power Supply & DC Load</h3>
                <p>Power supply lab 30V/5A dengan proteksi OCP/OVP. DC load untuk simulasi baterai saat troubleshooting tanpa baterai asli.</p>
            `,
            front: true
        },
        {
            type: 'chapter',
            num: '02',
            title: 'Troubleshooting',
            desc: 'Metode sistematis mengidentifikasi dan memperbaiki kerusakan pada perangkat mobile.',
            front: true
        },
        {
            type: 'content',
            title: 'Matot & Short Detection',
            content: `
                <h3>3.1 Identifikasi Matot</h3>
                <p>Matot (Mati Total) adalah kondisi ponsel tidak memberikan respons sama sekali saat di-charge atau ditekan tombol power. Langkah pertama: ukur konsumsi arus via power supply.</p>
                <div class="highlight-box">
                    <strong>Tabel Arus Normal:</strong><br>
                    • Standby: 0.01–0.05A<br>
                    • Booting: 0.3–1.5A (spike)<br>
                    • Charging: 0.5–2.0A (tergantung adapter)
                </div>
                <h3>3.2 Short Detection</h3>
                <p>Gunakan multimeter dalam mode diode/continuity untuk mendeteksi short pada jalur VBAT, VPH_PWR, atau rail PMIC. Nilai diode drop normal: 0.3–0.6V.</p>
                <div class="tip-box">
                    💡 <strong>Tips:</strong> Injeksi tegangan 1V/2A dengan power supply lalu deteksi panas menggunakan thermal camera atau alkohol (penguapan cepat = panas).
                </div>
                <h3>3.3 Rosin Method</h3>
                <p>Taburkan bubuk rosin pada PCB, injeksi tegangan, dan amati titik yang menghilangkan rosin terlebih dahulu — itu adalah lokasi short.</p>
            `,
            front: true
        },
        {
            type: 'content',
            title: 'Bootloop & Stuck Logo',
            content: `
                <h3>4.1 Analisis Bootloop</h3>
                <p>Bootloop terjadi ketika kernel atau init process gagal meload sistem. Penyebab umum: corrupt OS, kerusakan eMMC/UFS, atau short pada jalur I/O.</p>
                <ul>
                    <li><strong>Stuck di logo:</strong> Coba flash firmware via download mode</li>
                    <li><strong>Restart berkala:</strong> Periksa suhu PMIC dan konektor baterai</li>
                    <li><strong>Red screen / error:</strong> Kemungkinan kerusakan RAM atau SoC</li>
                </ul>
                <h3>4.2 EMMC/UFS Replacement</h3>
                <p>Jika storage chip rusak, lakukan replacement dengan chip yang sama tipe (capacity, vendor, generation). Jangan lupa reprogramming via ISP atau direct write.</p>
                <div class="highlight-box">
                    <strong>Tools Programming:</strong> EasyJTAG Plus, Z3X EasyJTAG, UFI Box, atau Medusa Pro.
                </div>
            `,
            front: true
        },
        {
            type: 'chapter',
            num: '03',
            title: 'Advanced Repair',
            desc: 'Teknik lanjutan: reballing, jumper, dan modifikasi hardware untuk kasus kompleks.',
            front: true
        },
        {
            type: 'content',
            title: 'Reballing BGA & Jumper',
            content: `
                <h3>5.1 Reballing IC</h3>
                <p>Reballing diperlukan saat solder ball BGA retak, korosi, atau short. Proses: remove IC → clean pad → stencil → paste → reflow → mount.</p>
                <div class="tip-box">
                    💡 <strong>Profil Reflow:</strong> Preheat 150°C/90s → Soak 180°C/60s → Peak 245°C/30s → Cool down <2°C/s.
                </div>
                <h3>5.2 Jumper Jalur</h3>
                <p>Jika jalur PCB putus (corrosion, retak, atau overheat), buat jumper menggunakan kawat magnet wire 0.02mm. Gunakan UV mask untuk isolasi.</p>
                <ul>
                    <li>Jumper jalur pendek: langsung titik ke titik</li>
                    <li>Jumper jalur panjang: gunakan jalur alternatif pada layer lain</li>
                    <li>Jumper via: solder wire melalui via hole yang tersedia</li>
                </ul>
                <div class="highlight-box">
                    <strong>Material:</strong> Kawat enamel 0.02mm, UV solder mask, curing lamp 365nm/405nm.
                </div>
            `,
            front: true
        },
        {
            type: 'back',
            title: 'Terima Kasih',
            subtitle: 'Terus belajar dan berlatih. Setiap perbaikan adalah investasi skill.',
            meta: ['Millenial Academy', 'millenial.academy', '© 2026 All Rights Reserved'],
            social: ['IG', 'YT', 'WA'],
            front: true
        }
    ];

    // ==========================================
    // STATE
    // ==========================================
    let currentPage = 0;
    let totalPages = pagesData.length;
    let zoom = 1;
    let isAnimating = false;

    // ==========================================
    // DOM Elements
    // ==========================================
    const flipbook = document.getElementById('flipbook');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const currentPageEl = document.getElementById('current-page');
    const totalPagesEl = document.getElementById('total-pages');
    const navDots = document.getElementById('nav-dots');
    const zoomLevel = document.getElementById('zoom-level');
    const btnZoomIn = document.getElementById('btn-zoom-in');
    const btnZoomOut = document.getElementById('btn-zoom-out');
    const btnFullscreen = document.getElementById('btn-fullscreen');
    const fabMenu = document.getElementById('fab-menu');
    const fabItems = document.getElementById('fab-items');
    const thumbnailsPanel = document.getElementById('thumbnails-panel');
    const tocPanel = document.getElementById('toc-panel');
    const thumbnailsGrid = document.getElementById('thumbnails-grid');
    const tocList = document.getElementById('toc-list');

    // ==========================================
    // RENDER PAGES
    // ==========================================
    function renderPages() {
        flipbook.innerHTML = '';

        pagesData.forEach((data, index) => {
            const page = document.createElement('div');
            page.className = 'page';
            page.style.zIndex = totalPages - index;
            page.dataset.index = index;

            // Front side
            const front = document.createElement('div');
            front.className = 'page-front';
            front.innerHTML = buildPageContent(data, index, 'front');

            // Back side (mirror content for realistic flip)
            const back = document.createElement('div');
            back.className = 'page-back';
            const backData = pagesData[index + 1] || { type: 'blank' };
            back.innerHTML = buildPageContent(backData, index + 1, 'back');

            page.appendChild(front);
            page.appendChild(back);
            flipbook.appendChild(page);

            // Click to flip
            page.addEventListener('click', (e) => {
                if (e.target.closest('a') || e.target.closest('button')) return;
                if (index === currentPage && index < totalPages - 1) {
                    goToPage(index + 1);
                } else if (index === currentPage - 1) {
                    goToPage(index);
                }
            });
        });

        updateDisplay();
        renderThumbnails();
        renderTOC();
    }

    function buildPageContent(data, index, side) {
        if (!data || data.type === 'blank') {
            return `<div class="page-content" style="background:#f0ebe3;"></div>`;
        }

        const pageNum = side === 'front' ? index + 1 : index + 1;

        if (data.type === 'cover') {
            return `
                <div class="page-content cover-page">
                    <div class="cover-decoration"></div>
                    <div class="cover-badge">Buku Materi Digital</div>
                    <h1 class="cover-title">${data.title.replace(/\n/g, '<br>')}</h1>
                    <p class="cover-subtitle">${data.subtitle}</p>
                    <div class="cover-meta">
                        ${data.meta.map(m => `<span>${m}</span>`).join('')}
                    </div>
                    <span class="page-number">${pageNum}</span>
                </div>
            `;
        }

        if (data.type === 'chapter') {
            return `
                <div class="page-content chapter-page">
                    <div class="chapter-number">${data.num}</div>
                    <h2 class="chapter-title">${data.title}</h2>
                    <p class="chapter-desc">${data.desc}</p>
                    <span class="page-number">${pageNum}</span>
                </div>
            `;
        }

        if (data.type === 'back') {
            return `
                <div class="page-content back-cover">
                    <h2>${data.title}</h2>
                    <p>${data.subtitle}</p>
                    <div class="cover-meta" style="margin-top:24px;">
                        ${data.meta.map(m => `<span>${m}</span>`).join('')}
                    </div>
                    <div class="social-links">
                        ${(data.social || []).map(s => `<a href="#">${s}</a>`).join('')}
                    </div>
                    <span class="page-number">${pageNum}</span>
                </div>
            `;
        }

        return `
            <div class="page-content content-page">
                <h2>${data.title}</h2>
                ${data.content}
                <span class="page-number">${pageNum}</span>
            </div>
        `;
    }

    // ==========================================
    // NAVIGATION
    // ==========================================
    function goToPage(pageIndex) {
        if (isAnimating || pageIndex < 0 || pageIndex >= totalPages) return;
        if (pageIndex === currentPage) return;

        isAnimating = true;
        const direction = pageIndex > currentPage ? 'next' : 'prev';

        if (direction === 'next') {
            const currentPageEl = flipbook.children[currentPage];
            if (currentPageEl) {
                currentPageEl.classList.add('flipping');
                requestAnimationFrame(() => {
                    currentPageEl.classList.add('flipped');
                });
            }
        } else {
            const prevPageEl = flipbook.children[currentPage - 1];
            if (prevPageEl) {
                prevPageEl.classList.add('flipping');
                requestAnimationFrame(() => {
                    prevPageEl.classList.remove('flipped');
                });
            }
        }

        setTimeout(() => {
            const els = flipbook.querySelectorAll('.page');
            els.forEach(el => el.classList.remove('flipping'));
            currentPage = pageIndex;
            updateDisplay();
            isAnimating = false;
        }, 800);
    }

    function updateDisplay() {
        currentPageEl.textContent = currentPage + 1;
        totalPagesEl.textContent = totalPages;

        btnPrev.disabled = currentPage === 0;
        btnNext.disabled = currentPage === totalPages - 1;

        // Update z-index for proper stacking
        const pages = flipbook.querySelectorAll('.page');
        pages.forEach((page, idx) => {
            if (idx < currentPage) {
                page.style.zIndex = totalPages + idx;
                page.classList.add('flipped');
            } else {
                page.style.zIndex = totalPages - idx;
                page.classList.remove('flipped');
            }
        });

        // Update dots
        document.querySelectorAll('.nav-dot').forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentPage);
        });

        // Update thumbnails
        document.querySelectorAll('.thumb-item').forEach((thumb, idx) => {
            thumb.classList.toggle('active', idx === currentPage);
        });
    }

    function renderDots() {
        navDots.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
            dot.title = `Halaman ${i + 1}`;
            dot.addEventListener('click', () => goToPage(i));
            navDots.appendChild(dot);
        }
    }

    // ==========================================
    // THUMBNAILS & TOC
    // ==========================================
    function renderThumbnails() {
        thumbnailsGrid.innerHTML = '';
        pagesData.forEach((data, index) => {
            const thumb = document.createElement('div');
            thumb.className = 'thumb-item' + (index === 0 ? ' active' : '');
            thumb.innerHTML = `
                <span>${data.title ? data.title.substring(0, 15) + '...' : 'Halaman ' + (index + 1)}</span>
                <span class="thumb-label">${index + 1}</span>
            `;
            thumb.addEventListener('click', () => {
                goToPage(index);
                thumbnailsPanel.classList.remove('open');
            });
            thumbnailsGrid.appendChild(thumb);
        });
    }

    function renderTOC() {
        tocList.innerHTML = '';
        pagesData.forEach((data, index) => {
            if (data.type === 'content' || data.type === 'chapter') {
                const li = document.createElement('li');
                li.innerHTML = `<span class="toc-num">${index + 1}</span> ${data.title}`;
                li.addEventListener('click', () => {
                    goToPage(index);
                    tocPanel.classList.remove('open');
                });
                tocList.appendChild(li);
            }
        });
    }

    // ==========================================
    // ZOOM
    // ==========================================
    function updateZoom() {
        flipbook.style.transform = `scale(${zoom})`;
        zoomLevel.textContent = Math.round(zoom * 100) + '%';
    }

    btnZoomIn.addEventListener('click', () => {
        if (zoom < 2) { zoom += 0.1; updateZoom(); }
    });
    btnZoomOut.addEventListener('click', () => {
        if (zoom > 0.5) { zoom -= 0.1; updateZoom(); }
    });

    // ==========================================
    // FULLSCREEN
    // ==========================================
    btnFullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    // ==========================================
    // KEYBOARD
    // ==========================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            goToPage(currentPage + 1);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goToPage(currentPage - 1);
        } else if (e.key === 'Home') {
            e.preventDefault();
            goToPage(0);
        } else if (e.key === 'End') {
            e.preventDefault();
            goToPage(totalPages - 1);
        }
    });

    // ==========================================
    // TOUCH / SWIPE
    // ==========================================
    let touchStartX = 0;
    let touchEndX = 0;

    flipbook.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    flipbook.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) goToPage(currentPage + 1);
            else goToPage(currentPage - 1);
        }
    }

    // ==========================================
    // FAB MENU
    // ==========================================
    fabMenu.addEventListener('click', () => {
        fabMenu.classList.toggle('active');
        fabItems.classList.toggle('open');
    });

    document.getElementById('fab-toc').addEventListener('click', () => {
        tocPanel.classList.add('open');
        thumbnailsPanel.classList.remove('open');
        fabMenu.classList.remove('active');
        fabItems.classList.remove('open');
    });

    document.getElementById('fab-thumbs').addEventListener('click', () => {
        thumbnailsPanel.classList.add('open');
        tocPanel.classList.remove('open');
        fabMenu.classList.remove('active');
        fabItems.classList.remove('open');
    });

    document.getElementById('fab-first').addEventListener('click', () => {
        goToPage(0);
        fabMenu.classList.remove('active');
        fabItems.classList.remove('open');
    });

    document.getElementById('fab-last').addEventListener('click', () => {
        goToPage(totalPages - 1);
        fabMenu.classList.remove('active');
        fabItems.classList.remove('open');
    });

    document.getElementById('btn-close-thumbs').addEventListener('click', () => {
        thumbnailsPanel.classList.remove('open');
    });

    document.getElementById('btn-close-toc').addEventListener('click', () => {
        tocPanel.classList.remove('open');
    });

    // Close panels on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.thumbnails-panel') && !e.target.closest('#fab-thumbs')) {
            thumbnailsPanel.classList.remove('open');
        }
        if (!e.target.closest('.toc-panel') && !e.target.closest('#fab-toc')) {
            tocPanel.classList.remove('open');
        }
    });

    // ==========================================
    // NAV BUTTONS
    // ==========================================
    btnPrev.addEventListener('click', () => goToPage(currentPage - 1));
    btnNext.addEventListener('click', () => goToPage(currentPage + 1));

    // ==========================================
    // INIT
    // ==========================================
    function init() {
        renderPages();
        renderDots();
        updateDisplay();

        // Add loading screen
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.innerHTML = '<div class="spinner"></div><p>Memuat Buku Materi...</p>';
        document.body.appendChild(loading);

        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => loading.remove(), 500);
        }, 800);
    }

    init();

})();
