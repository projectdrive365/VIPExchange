// Luxury E-Commerce Apparel Landing Page - Interactive Controller

const PRODUCTS = [
  {
    id: 1,
    name: "Pure Linen Oversized Shirt",
    category: "Shirts",
    fabric: "100% French Flax Linen",
    price: 2499,
    originalPrice: 3499,
    rating: 4.9,
    reviews: 142,
    badge: "Bestseller",
    image: "assets/linen_shirt.jpg",
    description: "Tailored from breathable French flax linen with relaxed drop-shoulder cut, natural mother-of-pearl buttons, and pre-washed finish for unmatched softness.",
    specs: {
      fit: "Relaxed / Oversized",
      gsm: "165 GSM",
      care: "Cold machine wash, air dry",
      origin: "Ethically Crafted"
    }
  },
  {
    id: 2,
    name: "Classic Selvedge Denim Jacket",
    category: "Outerwear",
    fabric: "14oz Raw Ring-Spun Denim",
    price: 4299,
    originalPrice: 5999,
    rating: 4.8,
    reviews: 98,
    badge: "Iconic",
    image: "assets/denim_jacket.jpg",
    description: "Heavyweight selvedge denim jacket with vintage copper hardware, reinforced flat-felled seams, and natural indigo dye that develops a personalized patina over time.",
    specs: {
      fit: "Regular Trucker Cut",
      gsm: "14 oz Denim",
      care: "Spot clean or gentle soak",
      origin: "Handcrafted Stitching"
    }
  },
  {
    id: 3,
    name: "Heavyweight Boxy Cotton Tee",
    category: "T-Shirts",
    fabric: "100% Combed Heavy Cotton",
    price: 1299,
    originalPrice: 1899,
    rating: 5.0,
    reviews: 310,
    badge: "Essential",
    image: "assets/cotton_tee.jpg",
    description: "The ultimate everyday tee. Thick, structured 280 GSM combed jersey with ribbed crew neckline, zero see-through opacity, and durable double-stitched hems.",
    specs: {
      fit: "Boxy Contemporary Fit",
      gsm: "280 GSM Thick Jersey",
      care: "Machine wash cold",
      origin: "Sustainable Mill"
    }
  },
  {
    id: 4,
    name: "Ribbed Cashmere Blend Sweater",
    category: "Knitwear",
    fabric: "Grade-A Merino & Cashmere",
    price: 3799,
    originalPrice: 4999,
    rating: 4.9,
    reviews: 76,
    badge: "Luxury Knit",
    image: "assets/knitwear.jpg",
    description: "Ultra-soft waffle knit sweater spun from fine combed merino wool and Mongolian cashmere. Lightweight warmth with anti-pilling treatment and ribbed cuffs.",
    specs: {
      fit: "Tailored Comfort",
      gsm: "Medium Knit Gauge",
      care: "Hand wash or dry clean",
      origin: "Pill-Resistant Wool"
    }
  },
  {
    id: 5,
    name: "French Terry Minimalist Hoodie",
    category: "Outerwear",
    fabric: "100% Organic Loopback Terry",
    price: 2899,
    originalPrice: 3999,
    rating: 4.8,
    reviews: 184,
    badge: "Trending",
    image: "assets/hoodie.jpg",
    description: "Substantial 420 GSM french terry hoodie with double-layer hood, metal-tipped tonal drawstrings, seamless kangaroo pocket, and clean drop shoulders.",
    specs: {
      fit: "Relaxed Streetwear Fit",
      gsm: "420 GSM Loopback",
      care: "Machine wash cold inside out",
      origin: "Custom Heavy Dye"
    }
  },
  {
    id: 6,
    name: "Pleated Relaxed Chino Trousers",
    category: "Trousers",
    fabric: "Organic Cotton Stretch Twill",
    price: 2199,
    originalPrice: 2999,
    rating: 4.7,
    reviews: 64,
    badge: "Smart Casual",
    image: "assets/chinos.jpg",
    description: "Contemporary trousers featuring single front pleats, hidden expandable waistband, deep slash pockets, and a tapered ankle opening for effortless styling.",
    specs: {
      fit: "Relaxed Tapered",
      gsm: "240 GSM Twill",
      care: "Warm wash & iron",
      origin: "Pre-Shrunk Cotton"
    }
  },
  {
    id: 7,
    name: "Heritage Double-Weave Overshirt",
    category: "Shirts",
    fabric: "Brushed Flannel Cotton",
    price: 2399,
    originalPrice: 3299,
    rating: 4.8,
    reviews: 91,
    badge: "New Season",
    image: "assets/flannel_shirt.jpg",
    description: "Substantial overshirt crafted with brushed double-weave cotton. Ideal for layering over tees or under coats with dual chest flap pockets and horn buttons.",
    specs: {
      fit: "Straight Layering Fit",
      gsm: "220 GSM Brushed Fabric",
      care: "Cold gentle wash",
      origin: "Yarn-Dyed Weave"
    }
  },
  {
    id: 8,
    name: "Atelier Capsule Studio Set",
    category: "Outerwear",
    fabric: "Curated Seasonal Wardrobe",
    price: 7999,
    originalPrice: 11499,
    rating: 5.0,
    reviews: 42,
    badge: "Exclusive Bundle",
    image: "assets/hero_banner.jpg",
    description: "Complete seasonal capsule bundle including our signature Raw Selvedge Denim, Pure French Linen Shirt, Heavyweight Tee, and Cashmere Knit at a special bundled price.",
    specs: {
      fit: "Coordinated Tailoring",
      gsm: "Multi-Garment Suite",
      care: "Individual care labels",
      origin: "Limited Run of 100 Sets"
    }
  }
];

// State Management
let currentCategory = 'all';
let searchQuery = '';
let currentSort = 'featured';
let selectedSizes = {}; // { productId: 'M' }
let cart = JSON.parse(localStorage.getItem('apparel_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('apparel_wishlist')) || [];
let discountCode = '';
let discountPercent = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  setupEventListeners();
});

// Render Product Cards
function renderProducts() {
  const container = document.getElementById('productsContainer');
  if (!container) return;

  let filtered = PRODUCTS.filter(product => {
    const matchesCategory = currentCategory === 'all' || product.category.toLowerCase() === currentCategory.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sorting
  if (currentSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <i class="fa-solid fa-shirt" style="font-size: 3rem; margin-bottom: 1rem; color: var(--text-dim); display: block;"></i>
        <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: var(--text-main); margin-bottom: 0.5rem;">No apparel found</h3>
        <p>Try searching with another keyword or resetting filters.</p>
        <button onclick="resetFilters()" class="btn-primary" style="margin-top: 1.2rem; padding: 0.6rem 1.4rem;">Reset Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(product => {
    const isWishlisted = wishlist.includes(product.id);
    const selectedSize = selectedSizes[product.id] || 'M';
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="card-img-wrap">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <span class="card-badge">${product.badge}</span>
          <button class="quick-view-btn" onclick="openQuickView(${product.id})">
            <i class="fa-regular fa-eye"></i> Quick View
          </button>
        </div>
        
        <div class="card-details">
          <span class="card-fabric">${product.fabric}</span>
          <h3 class="card-title">${product.name}</h3>
          
          <div class="card-rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            <span>${product.rating} (${product.reviews})</span>
          </div>

          <div class="card-pricing">
            <span class="current-price">₹${product.price.toLocaleString('en-IN')}</span>
            <span class="original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>
            <span class="discount-tag">${discount}% OFF</span>
          </div>

          <div class="size-selector">
            ${['S', 'M', 'L', 'XL'].map(sz => `
              <div class="size-pill ${sz === selectedSize ? 'selected' : ''}" 
                   onclick="selectSize(${product.id}, '${sz}')">${sz}</div>
            `).join('')}
          </div>

          <div class="card-actions">
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
              <i class="fa-solid fa-bag-shopping"></i> Add to Bag
            </button>
            <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${product.id})">
              <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Size Selection
window.selectSize = function(productId, size) {
  selectedSizes[productId] = size;
  renderProducts();
};

// Category Filtering
window.filterCategory = function(cat, btnElement) {
  currentCategory = cat;
  document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  renderProducts();
};

// Reset Filters
window.resetFilters = function() {
  currentCategory = 'all';
  searchQuery = '';
  document.getElementById('productSearch').value = '';
  document.querySelectorAll('.cat-btn').forEach((btn, idx) => {
    btn.classList.toggle('active', idx === 0);
  });
  renderProducts();
};

// Wishlist Toggle
window.toggleWishlist = function(productId) {
  const index = wishlist.indexOf(productId);
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast("Removed from wishlist", "info");
  } else {
    wishlist.push(productId);
    showToast("Added to wishlist ❤️", "success");
  }
  localStorage.setItem('apparel_wishlist', JSON.stringify(wishlist));
  renderProducts();
};

// Cart Functionality
window.addToCart = function(productId, customSize = null, customQty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const size = customSize || selectedSizes[productId] || 'M';
  const existingIndex = cart.findIndex(item => item.id === productId && item.size === size);

  if (existingIndex > -1) {
    cart[existingIndex].qty += customQty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      fabric: product.fabric,
      size: size,
      qty: customQty
    });
  }

  saveCart();
  updateCartUI();
  openCart();
  showToast(`Added ${product.name} (Size: ${size}) to bag!`, "success");
};

function saveCart() {
  localStorage.setItem('apparel_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById('cartBadge');
  if (badge) badge.innerText = totalCount;

  const cartItemsContainer = document.getElementById('cartItems');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  
  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-bag-shopping"></i>
        <h4>Your shopping bag is empty</h4>
        <p style="font-size: 0.85rem; margin-top: 0.4rem;">Discover our latest apparel and add timeless pieces.</p>
      </div>
    `;
    if (cartSubtotalEl) cartSubtotalEl.innerText = '₹0';
    return;
  }

  let subtotal = 0;

  cartItemsContainer.innerHTML = cart.map((item, index) => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    return `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
          <div>
            <h4 class="cart-item-title">${item.name}</h4>
            <span class="cart-item-meta">${item.fabric} • Size: <strong>${item.size}</strong></span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.4rem;">
            <span class="cart-item-price">₹${(item.price).toLocaleString('en-IN')}</span>
            <div class="cart-item-qty">
              <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
            </div>
          </div>
        </div>
        <button class="cart-item-del" onclick="removeFromCart(${index})" title="Remove item">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
  }).join('');

  if (discountPercent > 0) {
    const discounted = subtotal * (1 - discountPercent / 100);
    if (cartSubtotalEl) {
      cartSubtotalEl.innerHTML = `<span>₹${Math.round(discounted).toLocaleString('en-IN')}</span> <small style="font-size: 0.75rem; color: var(--accent-emerald);">(-${discountPercent}%)</small>`;
    }
  } else {
    if (cartSubtotalEl) cartSubtotalEl.innerText = `₹${subtotal.toLocaleString('en-IN')}`;
  }
}

window.updateQty = function(index, delta) {
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartUI();
};

window.removeFromCart = function(index) {
  if (!cart[index]) return;
  const removed = cart.splice(index, 1)[0];
  saveCart();
  updateCartUI();
  showToast(`Removed ${removed.name} from bag`, "info");
};

// Cart Drawer open/close
window.openCart = function() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeCart = function() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = 'auto';
};

// Quick View Modal
window.openQuickView = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modalBody = document.getElementById('quickViewBody');
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  modalBody.innerHTML = `
    <div class="quickview-img">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="quickview-content">
      <div>
        <span class="modal-fabric">${product.fabric}</span>
        <h2 class="modal-title">${product.name}</h2>
        <div class="card-pricing" style="margin: 0.8rem 0;">
          <span class="current-price" style="font-size: 1.5rem;">₹${product.price.toLocaleString('en-IN')}</span>
          <span class="original-price" style="font-size: 1rem;">₹${product.originalPrice.toLocaleString('en-IN')}</span>
          <span class="discount-tag">${discount}% OFF</span>
        </div>
        <p class="modal-desc">${product.description}</p>
      </div>

      <div class="modal-specs">
        <div class="spec-item">
          <span>Silhouette</span>
          <strong>${product.specs.fit}</strong>
        </div>
        <div class="spec-item">
          <span>Weight / Weave</span>
          <strong>${product.specs.gsm}</strong>
        </div>
        <div class="spec-item">
          <span>Care Instruction</span>
          <strong>${product.specs.care}</strong>
        </div>
        <div class="spec-item">
          <span>Craftsmanship</span>
          <strong>${product.specs.origin}</strong>
        </div>
      </div>

      <div>
        <label style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem; display: block;">Select Size:</label>
        <div class="size-selector" id="modalSizeSelector">
          ${['S', 'M', 'L', 'XL', 'XXL'].map((sz, i) => `
            <div class="size-pill ${i === 1 ? 'selected' : ''}" onclick="selectModalSize(this, '${sz}')">${sz}</div>
          `).join('')}
        </div>
      </div>

      <button class="btn-primary" style="width: 100%; justify-content: center;" onclick="addFromModal(${product.id})">
        <i class="fa-solid fa-bag-shopping"></i> Add To Shopping Bag • ₹${product.price.toLocaleString('en-IN')}
      </button>
    </div>
  `;

  document.getElementById('quickViewModal').classList.add('open');
  document.body.style.overflow = 'hidden';
};

let currentModalSize = 'M';
window.selectModalSize = function(el, size) {
  document.querySelectorAll('#modalSizeSelector .size-pill').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
  currentModalSize = size;
};

window.addFromModal = function(productId) {
  addToCart(productId, currentModalSize, 1);
  closeQuickView();
};

window.closeQuickView = function() {
  document.getElementById('quickViewModal').classList.remove('open');
  document.body.style.overflow = 'auto';
};

// Checkout & WhatsApp Direct Order
window.proceedCheckout = function() {
  if (cart.length === 0) {
    showToast("Please add items to your bag first!", "warning");
    return;
  }
  showToast("Order simulated! Connecting to payment gateway...", "success");
  setTimeout(() => {
    alert("Thank you for your order! In a live environment, this directs to Razorpay / Stripe checkout.");
  }, 600);
};

window.orderViaWhatsApp = function() {
  if (cart.length === 0) {
    showToast("Your shopping bag is empty!", "warning");
    return;
  }

  let text = "Hello! I want to order the following clothes from your store:%0A%0A";
  let total = 0;
  cart.forEach((item, idx) => {
    text += `${idx + 1}. *${item.name}* (Size: ${item.size}) x ${item.qty} - ₹${(item.price * item.qty).toLocaleString('en-IN')}%0A`;
    total += item.price * item.qty;
  });

  if (discountPercent > 0) {
    total = Math.round(total * (1 - discountPercent / 100));
    text += `%0ADiscount Applied: ${discountPercent}%%0A`;
  }

  text += `%0A*Total Amount: ₹${total.toLocaleString('en-IN')}*%0APlease confirm my order.`;
  
  const whatsappUrl = `https://wa.me/919876543210?text=${text}`;
  window.open(whatsappUrl, '_blank');
};

// Coupon application
window.applyCoupon = function() {
  const codeInput = document.getElementById('couponCode');
  if (!codeInput) return;
  const val = codeInput.value.trim().toUpperCase();

  if (val === 'FIRST15') {
    discountPercent = 15;
    showToast("Coupon FIRST15 Applied! 15% Discount 🎉", "success");
    updateCartUI();
  } else {
    showToast("Invalid promo code. Try: FIRST15", "warning");
  }
};

// Toast Notifications
window.showToast = function(message, type = "success") {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let icon = 'fa-circle-check';
  if (type === 'warning') icon = 'fa-triangle-exclamation';
  if (type === 'info') icon = 'fa-circle-info';

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = '0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
};

// Event Listeners Setup
function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById('productSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Sort select
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail').value;
      if (email) {
        showToast("Subscribed! Check your inbox for 15% discount code.", "success");
        newsletterForm.reset();
      }
    });
  }
}
