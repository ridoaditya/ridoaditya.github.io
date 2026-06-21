// Smooth scrolling untuk menu navigasi
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70, // Offset untuk navbar
            behavior: 'smooth'
        });
    });
});

// Efek Animasi Ngetik (Typewriter) di Section About
const words = ["Mechatronic Engineer.", "Process Engineer.", "IoT & Automation Enthusiast."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
    const currentWord = words[wordIndex];
    const typewriterElement = document.getElementById("typewriter");

    if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Kecepatan hapus lebih cepat
    } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Kecepatan ngetik normal
    }

    // Kalau udah selesai ngetik 1 kata
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Jeda 2 detik sebelum dihapus
        isDeleting = true;
    } 
    // Kalau udah selesai nghapus
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Lanjut ke kata berikutnya
        typeSpeed = 500; // Jeda setengah detik sebelum ngetik kata baru
    }

    setTimeout(typeWriter, typeSpeed);
}

// Jalankan fungsi
document.addEventListener("DOMContentLoaded", function() {
    typeWriter();
});

// =========================================
// LOGIC POPUP / MODAL PROJEK
// =========================================
const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const closeModalBtn = document.querySelector(".close-modal");

// Fungsi buka modal
function openModal(title, desc, imgSrc) {
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalImg.src = imgSrc;
    modal.classList.add("show");
}

// Fungsi tutup modal pas klik (X)
closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("show");
});

// Fungsi tutup modal pas klik area luar (background blur)
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});

// =========================================
// LOGIC AUTO-SCROLL CAROUSEL
// =========================================
function startAutoScroll(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    let isHovered = false;

    // Biar kalau user lagi naro mouse/jari di atas card, scrollnya berhenti bentar
    carousel.addEventListener('mouseenter', () => isHovered = true);
    carousel.addEventListener('mouseleave', () => isHovered = false);
    carousel.addEventListener('touchstart', () => isHovered = true);
    carousel.addEventListener('touchend', () => {
        setTimeout(() => isHovered = false, 2000); // Tahan 2 detik setelah disentuh
    });

    setInterval(() => {
        if (isHovered) return; // Jangan scroll kalau lagi di-hover/disentuh

        // Hitung batas scroll maksimal
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
        
        // Kalau udah mentok kanan, balik ke kiri (awal)
        if (carousel.scrollLeft >= maxScrollLeft - 5) {
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            // Kalau belum mentok, geser sejauh 1 lebar card + jaraknya (gap)
            const cardWidth = carousel.querySelector('.card').offsetWidth;
            const gap = 30; // Sesuai dengan gap di CSS
            carousel.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
        }
    }, 2000); // 2000 milidetik = 2 detik
}

// Jalankan motornya setelah halaman dimuat
document.addEventListener("DOMContentLoaded", function() {
    startAutoScroll('project-carousel');
    startAutoScroll('gallery-carousel');
});

// =========================================
// LOGIC SCROLL REVEAL ANIMATION
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    // 1. Pilih semua elemen yang mau dikasih animasi (semua card dan h2)
    const hiddenElements = document.querySelectorAll('.card, h2');
    
    // 2. Tambahin class awal biar sembunyi dulu
    hiddenElements.forEach((el) => el.classList.add('hidden-reveal'));

    // 3. Bikin observer (sensor pendeteksi layar)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Kalau elemen udah kelihatan di layar, tambahin class show-reveal
                entry.target.classList.add('show-reveal');
                // Berhenti memantau biar animasinya cuma jalan sekali pas pertama muncul
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // Memicu animasi ketika 10% elemen udah masuk layar
    });

    // 4. Pasang observer ke semua elemen tadi
    hiddenElements.forEach((el) => observer.observe(el));
});