// nav bar code
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.navbar ul a');

navLinks.forEach(link => {
    link.classList.toggle('active-link', link.getAttribute('href') === currentPath);
});

// all brands page
document.addEventListener('DOMContentLoaded', function () {
    const all_brand = document.querySelector(".all-brand");
    const all_brand_section_card = document.getElementById("all-brand-section-card");
    const card_div = document.getElementById("card-div");
    const result = document.getElementById("result-for");
    const count = document.getElementById("car-count");
    const loadingIndicator = document.getElementById("loading-indicator");
    const scroll_down = document.getElementById("scroll-down");


    all_brand.addEventListener("click", async (event) => {

        const target = event.target.closest('div[id]');
        if (!target || !target.id) return;

        const brand = target.id;

        try {
            loadingIndicator.classList.remove("hidden");

            const response = await fetch(`/api/brands/${brand}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const cars = await response.json();

            scroll_down.classList.remove("hidden");
            all_brand_section_card.classList.remove("hidden");
            result.innerText = brand.charAt(0).toUpperCase() + brand.slice(1);
            card_div.innerHTML = ""; 

            if (cars.length === 0) {
                card_div.innerHTML = "<p class='text-white'>No cars found for this brand.</p>";
                count.innerText = "0";
                return;
            }

            cars.forEach(car => {

                const sold = car.soldStatus === "false" ? 
                    `<div class="img-div h-[55%] rounded-t-md overflow-hidden mb-4">
                        <img class="object-cover h-full rounded-t-md w-full" src="${car.carImage.url[0]}" alt="${car.carName}">
                    </div>` : 
                    `<div class="img-div h-[55%] relative rounded-t-md overflow-hidden mb-4">
                        <img class="object-cover h-full rounded-t-md w-full" src="${car.carImage.url[0]}" alt="${car.carName}">
                        <span class="absolute top-5 left-5 bg-red-600 text-white px-2 py-1 text-sm rounded">Sold</span>
                    </div>`;

            
                const div = document.createElement("div");
                div.classList = "bg-[#D5D7D8] rounded-md overflow-hidden flex justify-between flex-col h-[500px]";
                div.innerHTML = `
                    ${sold}
                    <div class="px-4 text-start text-base mb-2">
                        <h1 class="font-semibold mb-1">${car.brand}</h1>
                        <p class="text-xl mb-1 text-orange-600 font-bold">${car.carName}</p>
                        <p class="text-lg tracking-wide mb-3 font-bold text-black">&#2547;&nbsp;${car.carPrice.toLocaleString("en-BD")}</p>
                        <p class="font-medium text-sm mb-1">Car Type: <b>${car.carType}</b></p>
                        <p class="font-medium text-sm mb-1">Model Year: <b>${car.modelYear}</b></p>
                    </div>
                    <a class="w-full" href="/allCollections/${car._id}">
                        <button class="btn border-none bg-orange-400 text-black text-base w-full rounded-none">See Details</button>
                    </a>
                `;
                card_div.appendChild(div);
            });

            count.innerText = cars.length;
        } catch (error) {
            console.error('Error fetching cars:', error);
            card_div.innerHTML = "<p class='text-red-500'>An error occurred while fetching cars. Please try again later.</p>";
            count.innerText = "0";
        } finally {
            loadingIndicator.classList.add("hidden");
        }
    });
});

// call option
document.getElementById("callBtn").addEventListener("click", () => {
    document.getElementById("callBtn").classList.add("hidden");
    document.getElementById("phoneNumber").classList.remove("hidden");
});

// Function to show the modal
function showModal() {
    document.getElementById('deleteModal').classList.remove('hidden');
}

// Function to hide the modal
function hideModal() {
    document.getElementById('deleteModal').classList.add('hidden');
}

// admin button
function goToAdmin() {
    window.location.href = '/admin';
}
