document.addEventListener('DOMContentLoaded', function () {
    let swiper = new Swiper(".mySwiper", {
        autoplay: { delay: 2000, disableOnInteraction: false },
        speed: 1500,
        loop: true,
        on: { slideChange: function () { handleVideoSlide(this); } },
    });

    function handleVideoSlide(swiperInstance) {
        let activeSlide = swiperInstance.slides[swiperInstance.realIndex];
        if (!activeSlide) return;

        let video = activeSlide.querySelector('video');
        if (video) {
            swiperInstance.autoplay.stop();
            video.currentTime = 0;
            if (video.endedListener) video.removeEventListener('ended', video.endedListener);

            const endedListener = function () {
                swiperInstance.slideNext();
                swiperInstance.autoplay.start();
                video.removeEventListener('ended', endedListener);
            };
            video.addEventListener('ended', endedListener);
            video.endedListener = endedListener;

            video.play().catch(error => console.error('Error playing video:', error));
        } else {
            swiperInstance.autoplay.start();
        }
    }
    handleVideoSlide(swiper);

    let swiper2 = new Swiper(".mySwiper2", {
        slidesPerView: 3.5, spaceBetween: 15, loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false }, speed: 2000,
        pagination: { el: ".swiper2-pagination", clickable: true },
    });

    var swiper3 = new Swiper(".mySwiper3", {
        loop: true, spaceBetween: 10, slidesPerView: 4, freeMode: true, watchSlidesProgress: true,
    });

    var swiper4 = new Swiper(".mySwiper4", {
        loop: true, autoplay: { delay: 4000, disableOnInteraction: false }, speed: 1000, spaceBetween: 10,
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }, thumbs: { swiper: swiper3 },
    });

    const modal = document.getElementById("imageModal"),
          modalImage = document.getElementById("modalImage"),
          closeModal = document.getElementById("closeModal");

    document.querySelectorAll(".mySwiper4 .swiper-3-slide img").forEach((image) => {
        image.addEventListener("click", () => {
            modal.style.display = "flex";
            modalImage.src = image.src;
        });
    });

    closeModal.addEventListener("click", () => modal.style.display = "none");
    modal.addEventListener("click", (event) => {
        if (event.target !== modalImage) modal.style.display = "none";
    });
});
