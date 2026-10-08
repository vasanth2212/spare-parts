/**
 * TractorHub - Main Application Logic
 * State management, rendering engines, search & filters, shopping cart, checkout,
 * wishlist, auth, order tracking and admin dashboard.
 */

class TractorHubApp {
  constructor() {
    this.products = this.loadFromStorage('th_products', INITIAL_PRODUCTS);
    this.cart = this.loadFromStorage('th_cart', []);
    this.wishlist = this.loadFromStorage('th_wishlist', []);
    this.orders = this.loadFromStorage('th_orders', DEMO_ORDERS);
    this.currentUser = this.loadFromStorage('th_user', null);
    
    this.activeFilters = {
      search: '',
      brand: 'all',
      category: 'all',
      maxPrice: 30000,
      minRating: 0,
      inStockOnly: false,
      sortBy: 'featured'
    };

    this.appliedCoupon = null;
    this.currentViewProduct = null;

    this.init();
  }

  /* ==========================================================================
     Initialization & Event Listeners
     ========================================================================== */
  init() {
    this.renderBrands();
    this.renderCategories();
    this.renderProducts();
    this.renderBestSellers();
    this.renderNewArrivals();
    this.renderTestimonials();
    this.renderFAQs();
    this.updateCartBadge();
    this.updateWishlistBadge();
    this.updateUserNavState();
    this.setupCompatibilityWidget();
    this.bindEvents();
  }

  loadFromStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn('LocalStorage error:', e);
      return fallback;
    }
  }

  saveToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  bindEvents() {
    // Search form
    const searchForm = document.getElementById('headerSearchForm');
    const searchInput = document.getElementById('headerSearchInput');
    const categorySelect = document.getElementById('headerCategorySelect');

    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.activeFilters.search = searchInput.value.trim();
        if (categorySelect.value !== 'all') {
          this.activeFilters.category = categorySelect.value;
        }
        this.renderProducts();
        this.scrollToProducts();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.activeFilters.search = e.target.value.trim();
        this.renderProducts();
      });
    }

    // Sort selector
    const sortSelect = document.getElementById('catalogSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.activeFilters.sortBy = e.target.value;
        this.renderProducts();
      });
    }

    // Price range slider
    const priceSlider = document.getElementById('priceRangeSlider');
    const maxPriceDisplay = document.getElementById('maxPriceDisplay');
    if (priceSlider && maxPriceDisplay) {
      priceSlider.addEventListener('input', (e) => {
        this.activeFilters.maxPrice = parseInt(e.target.value, 10);
        maxPriceDisplay.textContent = `₹${this.formatINR(this.activeFilters.maxPrice)}`;
        this.renderProducts();
      });
    }

    // In Stock Only checkbox
    const inStockCheckbox = document.getElementById('inStockFilter');
    if (inStockCheckbox) {
      inStockCheckbox.addEventListener('change', (e) => {
        this.activeFilters.inStockOnly = e.target.checked;
        this.renderProducts();
      });
    }

    // Reset Filters button
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        this.resetAllFilters();
      });
    }

    // Modal close buttons (delegated)
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        if (modal) modal.classList.remove('active');
      });
    });

    // Close modal on background click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('active');
      });
    });

    // Cart Drawer toggle
    const cartBtn = document.getElementById('cartNavBtn');
    const closeCartBtn = document.getElementById('closeCartDrawer');
    const cartDrawer = document.getElementById('cartDrawerOverlay');

    if (cartBtn) cartBtn.addEventListener('click', () => this.openCartDrawer());
    if (closeCartBtn) closeCartBtn.addEventListener('click', () => cartDrawer.classList.remove('active'));
    if (cartDrawer) {
      cartDrawer.addEventListener('click', (e) => {
        if (e.target === cartDrawer) cartDrawer.classList.remove('active');
      });
    }

    // Wishlist Drawer toggle
    const wishlistBtn = document.getElementById('wishlistNavBtn');
    const closeWishlistBtn = document.getElementById('closeWishlistDrawer');
    const wishlistDrawer = document.getElementById('wishlistDrawerOverlay');

    if (wishlistBtn) wishlistBtn.addEventListener('click', () => this.openWishlistDrawer());
    if (closeWishlistBtn) closeWishlistBtn.addEventListener('click', () => wishlistDrawer.classList.remove('active'));
    if (wishlistDrawer) {
      wishlistDrawer.addEventListener('click', (e) => {
        if (e.target === wishlistDrawer) wishlistDrawer.classList.remove('active');
      });
    }

    // Account / Auth Modal
    const authBtn = document.getElementById('accountNavBtn');
    if (authBtn) {
      authBtn.addEventListener('click', () => {
        if (this.currentUser) {
          this.openAccountModal();
        } else {
          this.openAuthModal();
        }
      });
    }

    // Admin Dashboard Button
    const adminBtn = document.getElementById('adminPortalBtn');
    if (adminBtn) {
      adminBtn.addEventListener('click', () => this.openAdminModal());
    }

    // Coupon Apply Button
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    if (applyCouponBtn) {
      applyCouponBtn.addEventListener('click', () => {
        const couponInput = document.getElementById('couponCodeInput');
        this.applyCoupon(couponInput ? couponInput.value.trim().toUpperCase() : '');
      });
    }

    // Proceed to Checkout Button
    const proceedCheckoutBtn = document.getElementById('proceedCheckoutBtn');
    if (proceedCheckoutBtn) {
      proceedCheckoutBtn.addEventListener('click', () => {
        if (this.cart.length === 0) {
          this.showToast('Your shopping cart is empty!', 'error');
          return;
        }
        if (cartDrawer) cartDrawer.classList.remove('active');
        this.openCheckoutModal();
      });
    }

    // Checkout Form Submit
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handlePlaceOrder();
      });
    }

    // Login Form Submit
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        this.currentUser = {
          name: email.split('@')[0] || 'Farmer Friend',
          email: email,
          role: 'Customer'
        };
        this.saveToStorage('th_user', this.currentUser);
        this.updateUserNavState();
        document.getElementById('authModal').classList.remove('active');
        this.showToast(`Welcome back, ${this.currentUser.name}!`, 'success');
      });
    }

    // Signup Form Submit
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const mobile = document.getElementById('signupMobile').value;
        const role = document.getElementById('signupRole').value;

        this.currentUser = { name, email, mobile, role };
        this.saveToStorage('th_user', this.currentUser);
        this.updateUserNavState();
        document.getElementById('authModal').classList.remove('active');
        this.showToast(`Account created successfully! Welcome ${name}`, 'success');
      });
    }
  }

  /* ==========================================================================
     Helper Utilities
     ========================================================================== */
  formatINR(amount) {
    return Number(amount || 0).toLocaleString('en-IN');
  }

  scrollToProducts() {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✅' : '⚠️';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  /* ==========================================================================
     Tractor Compatibility Finder
     ========================================================================== */
  setupCompatibilityWidget() {
    const brandSelect = document.getElementById('widgetBrandSelect');
    const modelSelect = document.getElementById('widgetModelSelect');
    const searchPartsBtn = document.getElementById('widgetFindBtn');

    if (!brandSelect || !modelSelect || !searchPartsBtn) return;

    // Populate brands
    brandSelect.innerHTML = '<option value="">-- Choose Brand --</option>' + 
      TRACTOR_BRANDS.map(b => `<option value="${b.id}">${b.name}</option>`).join('');

    brandSelect.addEventListener('change', (e) => {
      const brandId = e.target.value;
      const brand = TRACTOR_BRANDS.find(b => b.id === brandId);
      if (brand) {
        modelSelect.disabled = false;
        modelSelect.innerHTML = '<option value="">-- Select Tractor Model --</option>' +
          brand.models.map(m => `<option value="${m}">${m}</option>`).join('');
      } else {
        modelSelect.disabled = true;
        modelSelect.innerHTML = '<option value="">-- Select Tractor Model First --</option>';
      }
    });

    searchPartsBtn.addEventListener('click', () => {
      const selectedBrand = brandSelect.value;
      const selectedModel = modelSelect.value;

      if (!selectedBrand) {
        this.showToast('Please select a tractor brand', 'error');
        return;
      }

      this.activeFilters.brand = selectedBrand;
      if (selectedModel) {
        this.activeFilters.search = selectedModel;
      }
      this.renderProducts();
      this.scrollToProducts();
      this.showToast(`Showing spare parts compatible with ${selectedModel || selectedBrand.toUpperCase()}`, 'success');
    });
  }

  /* ==========================================================================
     Render Brands & Categories
     ========================================================================== */
  renderBrands() {
    const brandsGrid = document.getElementById('brandsGrid');
    const filterBrandOptions = document.getElementById('filterBrandOptions');

    if (brandsGrid) {
      brandsGrid.innerHTML = TRACTOR_BRANDS.map(brand => `
        <div class="brand-card ${this.activeFilters.brand === brand.id ? 'active' : ''}" data-brand-id="${brand.id}">
          <div class="brand-icon-wrap" style="color:${brand.badgeColor}">${brand.logo}</div>
          <div class="brand-name">${brand.name}</div>
          <div class="brand-origin">${brand.origin}</div>
          <div class="brand-active-indicator">✓ Selected</div>
        </div>
      `).join('');

      brandsGrid.querySelectorAll('.brand-card').forEach(card => {
        card.addEventListener('click', () => {
          const brandId = card.getAttribute('data-brand-id');
          if (this.activeFilters.brand === brandId) {
            this.activeFilters.brand = 'all';
          } else {
            this.activeFilters.brand = brandId;
          }
          this.renderBrands();
          this.renderProducts();
          this.scrollToProducts();
        });
      });
    }

    if (filterBrandOptions) {
      filterBrandOptions.innerHTML = `
        <label class="filter-checkbox-label">
          <input type="radio" name="brandFilter" value="all" ${this.activeFilters.brand === 'all' ? 'checked' : ''}>
          <span>All Tractor Brands</span>
        </label>
        ${TRACTOR_BRANDS.map(b => `
          <label class="filter-checkbox-label">
            <input type="radio" name="brandFilter" value="${b.id}" ${this.activeFilters.brand === b.id ? 'checked' : ''}>
            <span>${b.name}</span>
          </label>
        `).join('')}
      `;

      filterBrandOptions.querySelectorAll('input[name="brandFilter"]').forEach(input => {
        input.addEventListener('change', (e) => {
          this.activeFilters.brand = e.target.value;
          this.renderBrands();
          this.renderProducts();
        });
      });
    }
  }

  renderCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    const filterCategoryOptions = document.getElementById('filterCategoryOptions');
    const headerCategorySelect = document.getElementById('headerCategorySelect');

    if (categoriesGrid) {
      categoriesGrid.innerHTML = PRODUCT_CATEGORIES.map(cat => `
        <div class="category-card ${this.activeFilters.category === cat.id ? 'active' : ''}" data-category-id="${cat.id}">
          <div class="category-icon">${cat.icon}</div>
          <h3>${cat.name}</h3>
          <span class="category-count">${cat.itemCount} Parts</span>
        </div>
      `).join('');

      categoriesGrid.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
          const catId = card.getAttribute('data-category-id');
          if (this.activeFilters.category === catId) {
            this.activeFilters.category = 'all';
          } else {
            this.activeFilters.category = catId;
          }
          this.renderCategories();
          this.renderProducts();
          this.scrollToProducts();
        });
      });
    }

    if (filterCategoryOptions) {
      filterCategoryOptions.innerHTML = `
        <label class="filter-checkbox-label">
          <input type="radio" name="categoryFilter" value="all" ${this.activeFilters.category === 'all' ? 'checked' : ''}>
          <span>All Categories</span>
        </label>
        ${PRODUCT_CATEGORIES.map(c => `
          <label class="filter-checkbox-label">
            <input type="radio" name="categoryFilter" value="${c.id}" ${this.activeFilters.category === c.id ? 'checked' : ''}>
            <span>${c.name}</span>
          </label>
        `).join('')}
      `;

      filterCategoryOptions.querySelectorAll('input[name="categoryFilter"]').forEach(input => {
        input.addEventListener('change', (e) => {
          this.activeFilters.category = e.target.value;
          this.renderCategories();
          this.renderProducts();
        });
      });
    }

    if (headerCategorySelect) {
      headerCategorySelect.innerHTML = '<option value="all">All Categories</option>' +
        PRODUCT_CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }
  }

  /* ==========================================================================
     Products Filtering & Rendering
     ========================================================================== */
  getFilteredProducts() {
    return this.products.filter(p => {
      // Search
      if (this.activeFilters.search) {
        const query = this.activeFilters.search.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchBrand = p.brand.toLowerCase().includes(query);
        const matchCat = p.category.toLowerCase().includes(query);
        const matchOEM = (p.oemNumber || '').toLowerCase().includes(query);
        const matchModel = p.compatibleModels.some(m => m.toLowerCase().includes(query));
        if (!matchName && !matchBrand && !matchCat && !matchOEM && !matchModel) return false;
      }

      // Brand
      if (this.activeFilters.brand !== 'all' && p.brand !== this.activeFilters.brand) {
        return false;
      }

      // Category
      if (this.activeFilters.category !== 'all' && p.category !== this.activeFilters.category) {
        return false;
      }

      // Price
      if (p.price > this.activeFilters.maxPrice) {
        return false;
      }

      // Rating
      if (this.activeFilters.minRating > 0 && p.rating < this.activeFilters.minRating) {
        return false;
      }

      // In Stock
      if (this.activeFilters.inStockOnly && p.stock <= 0) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (this.activeFilters.sortBy === 'price-low') return a.price - b.price;
      if (this.activeFilters.sortBy === 'price-high') return b.price - a.price;
      if (this.activeFilters.sortBy === 'rating') return b.rating - a.rating;
      if (this.activeFilters.sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }

  renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const resultsCountEl = document.getElementById('resultsCount');
    const activeFiltersBar = document.getElementById('activeFiltersBar');

    if (!productsGrid) return;

    const filtered = this.getFilteredProducts();

    if (resultsCountEl) {
      resultsCountEl.innerHTML = `Showing <strong>${filtered.length}</strong> of ${this.products.length} Tractor Parts`;
    }

    // Active tags
    if (activeFiltersBar) {
      let tagsHTML = '';
      if (this.activeFilters.search) {
        tagsHTML += `<span class="filter-tag">Search: "${this.activeFilters.search}" <span class="remove-tag" data-clear="search">✕</span></span>`;
      }
      if (this.activeFilters.brand !== 'all') {
        const brandObj = TRACTOR_BRANDS.find(b => b.id === this.activeFilters.brand);
        tagsHTML += `<span class="filter-tag">Brand: ${brandObj ? brandObj.name : this.activeFilters.brand} <span class="remove-tag" data-clear="brand">✕</span></span>`;
      }
      if (this.activeFilters.category !== 'all') {
        const catObj = PRODUCT_CATEGORIES.find(c => c.id === this.activeFilters.category);
        tagsHTML += `<span class="filter-tag">Category: ${catObj ? catObj.name : this.activeFilters.category} <span class="remove-tag" data-clear="category">✕</span></span>`;
      }
      if (this.activeFilters.inStockOnly) {
        tagsHTML += `<span class="filter-tag">In Stock Only <span class="remove-tag" data-clear="stock">✕</span></span>`;
      }
      activeFiltersBar.innerHTML = tagsHTML;

      activeFiltersBar.querySelectorAll('.remove-tag').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const type = e.target.getAttribute('data-clear');
          if (type === 'search') this.activeFilters.search = '';
          if (type === 'brand') this.activeFilters.brand = 'all';
          if (type === 'category') this.activeFilters.category = 'all';
          if (type === 'stock') {
            this.activeFilters.inStockOnly = false;
            const cb = document.getElementById('inStockFilter');
            if (cb) cb.checked = false;
          }
          this.renderBrands();
          this.renderCategories();
          this.renderProducts();
        });
      });
    }

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="no-products-found">
          <div class="icon">🔍</div>
          <h3>No matching spare parts found</h3>
          <p>Try searching for a different tractor model, part name or clear your filters.</p>
          <button class="btn btn-primary btn-sm" style="margin-top:16px;" onclick="window.tractorApp.resetAllFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = filtered.map(p => this.createProductCardHTML(p)).join('');
    this.attachProductCardEvents(productsGrid);
  }

  createProductCardHTML(p) {
    const isWishlisted = this.wishlist.some(item => item.id === p.id);
    const discountPercent = p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;
    const brandName = (TRACTOR_BRANDS.find(b => b.id === p.brand) || {}).name || p.brand.toUpperCase();

    return `
      <div class="product-card" data-product-id="${p.id}">
        <div class="product-image-wrap">
          <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'">
          <div class="product-badges">
            ${p.isBestSeller ? '<span class="badge badge-orange">★ Best Seller</span>' : ''}
            ${p.isNewArrival ? '<span class="badge badge-green">New Arrival</span>' : ''}
            ${discountPercent > 0 ? `<span class="badge badge-red">${discountPercent}% OFF</span>` : ''}
          </div>
          <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-action="toggle-wishlist" title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}">
            ${isWishlisted ? '❤️' : '🤍'}
          </button>
        </div>
        <div class="product-body">
          <div class="product-brand-tag">${brandName} OEM</div>
          <h3 class="product-title" title="${p.name}">${p.name}</h3>
          <div class="product-compatibility" title="Fits: ${p.compatibleModels.join(', ')}">
            🚜 Fits: ${p.compatibleModels.slice(0, 2).join(', ')}${p.compatibleModels.length > 2 ? ' +' + (p.compatibleModels.length - 2) + ' more' : ''}
          </div>
          <div class="product-rating">
            <span class="rating-stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5 - Math.floor(p.rating))}</span>
            <strong>${p.rating}</strong>
            <span class="rating-count">(${p.reviewsCount})</span>
          </div>
          <div class="product-pricing">
            <span class="current-price">₹${this.formatINR(p.price)}</span>
            ${p.originalPrice ? `<span class="original-price">₹${this.formatINR(p.originalPrice)}</span>` : ''}
            ${discountPercent > 0 ? `<span class="discount-tag">${discountPercent}% save</span>` : ''}
          </div>
          <div class="product-actions">
            <button class="btn btn-outline btn-sm" data-action="view-details">View Details</button>
            <button class="btn btn-primary btn-sm" data-action="add-cart">🛒 Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  }

  attachProductCardEvents(container) {
    container.querySelectorAll('.product-card').forEach(card => {
      const productId = card.getAttribute('data-product-id');
      const product = this.products.find(p => p.id === productId);

      // Wishlist toggle
      const wishlistBtn = card.querySelector('[data-action="toggle-wishlist"]');
      if (wishlistBtn) {
        wishlistBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleWishlist(product);
        });
      }

      // View Details
      const viewBtn = card.querySelector('[data-action="view-details"]');
      if (viewBtn) {
        viewBtn.addEventListener('click', () => {
          this.openProductDetailsModal(product);
        });
      }

      // Add to Cart
      const addCartBtn = card.querySelector('[data-action="add-cart"]');
      if (addCartBtn) {
        addCartBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.addToCart(product, 1);
        });
      }
    });
  }

  resetAllFilters() {
    this.activeFilters = {
      search: '',
      brand: 'all',
      category: 'all',
      maxPrice: 30000,
      minRating: 0,
      inStockOnly: false,
      sortBy: 'featured'
    };

    const searchInput = document.getElementById('headerSearchInput');
    if (searchInput) searchInput.value = '';

    const priceSlider = document.getElementById('priceRangeSlider');
    const maxPriceDisplay = document.getElementById('maxPriceDisplay');
    if (priceSlider) priceSlider.value = 30000;
    if (maxPriceDisplay) maxPriceDisplay.textContent = '₹30,000';

    const inStockCheckbox = document.getElementById('inStockFilter');
    if (inStockCheckbox) inStockCheckbox.checked = false;

    this.renderBrands();
    this.renderCategories();
    this.renderProducts();
    this.showToast('All filters have been reset', 'success');
  }

  /* ==========================================================================
     Best Sellers & New Arrivals Carousels
     ========================================================================== */
  renderBestSellers() {
    const grid = document.getElementById('bestSellersGrid');
    if (!grid) return;

    const bestSellers = this.products.filter(p => p.isBestSeller).slice(0, 4);
    grid.innerHTML = bestSellers.map(p => this.createProductCardHTML(p)).join('');
    this.attachProductCardEvents(grid);
  }

  renderNewArrivals() {
    const grid = document.getElementById('newArrivalsGrid');
    if (!grid) return;

    const newArrivals = this.products.filter(p => p.isNewArrival || p.isSpecialOffer).slice(0, 4);
    grid.innerHTML = newArrivals.map(p => this.createProductCardHTML(p)).join('');
    this.attachProductCardEvents(grid);
  }

  /* ==========================================================================
     Customer Reviews & FAQs
     ========================================================================== */
  renderTestimonials() {
    const grid = document.getElementById('testimonialsGrid');
    if (!grid) return;

    grid.innerHTML = CUSTOMER_REVIEWS.map(r => `
      <div class="testimonial-card">
        <div class="testimonial-rating">${'★'.repeat(r.rating)}</div>
        <p class="testimonial-text">"${r.comment}"</p>
        <div class="testimonial-author">
          <div class="author-avatar">${r.avatar}</div>
          <div class="author-info">
            <h4>${r.name} ${r.verified ? '✓' : ''}</h4>
            <p>${r.tractor} • ${r.location}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderFAQs() {
    const container = document.getElementById('faqContainer');
    if (!container) return;

    container.innerHTML = FAQS.map((faq, idx) => `
      <div class="faq-item ${idx === 0 ? 'open' : ''}">
        <div class="faq-question">
          <span>${faq.question}</span>
          <span class="toggle-icon">▼</span>
        </div>
        <div class="faq-answer">${faq.answer}</div>
      </div>
    `).join('');

    container.querySelectorAll('.faq-question').forEach(q => {
      q.addEventListener('click', () => {
        const item = q.closest('.faq-item');
        item.classList.toggle('open');
      });
    });
  }

  /* ==========================================================================
     Product Details Modal
     ========================================================================== */
  openProductDetailsModal(product) {
    this.currentViewProduct = product;
    const modal = document.getElementById('productDetailsModal');
    if (!modal) return;

    const brandObj = TRACTOR_BRANDS.find(b => b.id === product.brand);
    const brandName = brandObj ? brandObj.name : product.brand.toUpperCase();
    const discountPercent = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    const isWishlisted = this.wishlist.some(item => item.id === product.id);

    modal.querySelector('#modalProductImage').src = product.image;
    modal.querySelector('#modalProductBrand').textContent = `${brandName} GENUINE OEM`;
    modal.querySelector('#modalProductTitle').textContent = product.name;
    modal.querySelector('#modalProductOEM').textContent = `OEM Part #: ${product.oemNumber || 'TH-OEM-GENUINE'}`;
    modal.querySelector('#modalProductRating').innerHTML = `
      <span class="rating-stars">${'★'.repeat(Math.floor(product.rating))}</span> <strong>${product.rating}</strong> (${product.reviewsCount} verified customer reviews)
    `;
    modal.querySelector('#modalProductPrice').textContent = `₹${this.formatINR(product.price)}`;
    modal.querySelector('#modalProductMRP').textContent = product.originalPrice ? `₹${this.formatINR(product.originalPrice)}` : '';
    modal.querySelector('#modalProductDiscount').textContent = discountPercent > 0 ? `${discountPercent}% OFF Instant Savings` : '';
    modal.querySelector('#modalProductDescription').textContent = product.description;
    
    // Fitment models
    const fitmentContainer = modal.querySelector('#modalProductFitment');
    if (fitmentContainer) {
      fitmentContainer.innerHTML = product.compatibleModels.map(m => `
        <span class="badge badge-green" style="font-size:0.8rem; padding:4px 10px;">🚜 ${m}</span>
      `).join(' ');
    }

    // Specs table
    const specsTable = modal.querySelector('#modalProductSpecs');
    if (specsTable) {
      const specs = product.specs || {
        "Warranty": "1 Year Replacement Warranty",
        "Material": "Heavy-Duty Farm Grade",
        "Fitting Standard": "Direct Bolt-On OEM"
      };
      specsTable.innerHTML = Object.entries(specs).map(([key, val]) => `
        <tr>
          <td>${key}</td>
          <td><strong>${val}</strong></td>
        </tr>
      `).join('');
    }

    // Quantity reset
    const qtyInput = modal.querySelector('#modalProductQty');
    if (qtyInput) qtyInput.value = 1;

    // Quantity buttons
    const minusBtn = modal.querySelector('#modalQtyMinus');
    const plusBtn = modal.querySelector('#modalQtyPlus');
    if (minusBtn && qtyInput) {
      minusBtn.onclick = () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        if (val > 1) qtyInput.value = val - 1;
      };
    }
    if (plusBtn && qtyInput) {
      plusBtn.onclick = () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        qtyInput.value = val + 1;
      };
    }

    // Modal Add to Cart
    const addBtn = modal.querySelector('#modalAddToCartBtn');
    if (addBtn) {
      addBtn.onclick = () => {
        const qty = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;
        this.addToCart(product, qty);
        modal.classList.remove('active');
      };
    }

    // Modal Buy Now
    const buyBtn = modal.querySelector('#modalBuyNowBtn');
    if (buyBtn) {
      buyBtn.onclick = () => {
        const qty = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;
        this.addToCart(product, qty);
        modal.classList.remove('active');
        this.openCheckoutModal();
      };
    }

    modal.classList.add('active');
  }

  /* ==========================================================================
     Shopping Cart Operations
     ========================================================================== */
  addToCart(product, quantity = 1) {
    const existingIndex = this.cart.findIndex(item => item.id === product.id);
    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        brand: product.brand,
        quantity: quantity
      });
    }

    this.saveToStorage('th_cart', this.cart);
    this.updateCartBadge();
    this.showToast(`Added ${quantity}x "${product.name}" to cart!`, 'success');
  }

  updateCartQuantity(productId, delta) {
    const item = this.cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.saveToStorage('th_cart', this.cart);
    this.updateCartBadge();
    this.renderCartDrawerItems();
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(i => i.id !== productId);
    this.saveToStorage('th_cart', this.cart);
    this.updateCartBadge();
    this.renderCartDrawerItems();
    this.showToast('Item removed from cart', 'success');
  }

  updateCartBadge() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-count-badge');
    badges.forEach(b => {
      b.textContent = totalItems;
      b.style.display = totalItems > 0 ? 'flex' : 'none';
    });
  }

  calculateCartTotals() {
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let delivery = subtotal >= 1999 || subtotal === 0 ? 0 : 150;
    let discount = 0;

    if (this.appliedCoupon) {
      if (this.appliedCoupon.discountPercent) {
        discount = Math.round((subtotal * this.appliedCoupon.discountPercent) / 100);
      } else if (this.appliedCoupon.flatDiscount) {
        discount = this.appliedCoupon.flatDiscount;
      }
      if (this.appliedCoupon.freeShipping) {
        delivery = 0;
      }
    }

    const grandTotal = Math.max(0, subtotal + delivery - discount);

    return { subtotal, delivery, discount, grandTotal };
  }

  openCartDrawer() {
    const drawer = document.getElementById('cartDrawerOverlay');
    if (!drawer) return;
    this.renderCartDrawerItems();
    drawer.classList.add('active');
  }

  renderCartDrawerItems() {
    const body = document.getElementById('cartDrawerBody');
    const footer = document.getElementById('cartDrawerFooter');
    if (!body || !footer) return;

    if (this.cart.length === 0) {
      body.innerHTML = `
        <div style="text-align:center; padding: 40px 20px;">
          <div style="font-size:3.5rem; margin-bottom:12px;">🛒</div>
          <h3 style="font-size:1.2rem; margin-bottom:6px;">Your cart is empty</h3>
          <p style="color:var(--slate-600); font-size:0.9rem; margin-bottom:20px;">Find genuine tractor spare parts to get started.</p>
          <button class="btn btn-primary btn-sm" onclick="document.getElementById('cartDrawerOverlay').classList.remove('active'); window.tractorApp.scrollToProducts();">Explore Spare Parts</button>
        </div>
      `;
      footer.style.display = 'none';
      return;
    }

    footer.style.display = 'block';

    body.innerHTML = this.cart.map(item => `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.name}</h4>
          <div class="cart-item-price">₹${this.formatINR(item.price)}</div>
          <div class="cart-item-actions">
            <div class="quantity-control">
              <button onclick="window.tractorApp.updateCartQuantity('${item.id}', -1)">-</button>
              <input type="text" value="${item.quantity}" readonly>
              <button onclick="window.tractorApp.updateCartQuantity('${item.id}', 1)">+</button>
            </div>
            <button style="color:var(--danger); font-size:0.8rem; font-weight:700;" onclick="window.tractorApp.removeFromCart('${item.id}')">Remove</button>
          </div>
        </div>
      </div>
    `).join('');

    const totals = this.calculateCartTotals();

    document.getElementById('cartSubtotalDisplay').textContent = `₹${this.formatINR(totals.subtotal)}`;
    document.getElementById('cartDeliveryDisplay').textContent = totals.delivery === 0 ? 'FREE' : `₹${this.formatINR(totals.delivery)}`;
    document.getElementById('cartDiscountDisplay').textContent = totals.discount > 0 ? `-₹${this.formatINR(totals.discount)}` : '₹0';
    document.getElementById('cartGrandTotalDisplay').textContent = `₹${this.formatINR(totals.grandTotal)}`;
  }

  applyCoupon(code) {
    if (!code) {
      this.showToast('Please enter a coupon code', 'error');
      return;
    }

    const coupon = DISCOUNT_COUPONS.find(c => c.code.toUpperCase() === code.toUpperCase());
    if (!coupon) {
      this.showToast('Invalid coupon code. Try KISAN10 or TRACTOR500', 'error');
      return;
    }

    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (subtotal < coupon.minAmount) {
      this.showToast(`Coupon requires minimum order of ₹${this.formatINR(coupon.minAmount)}`, 'error');
      return;
    }

    this.appliedCoupon = coupon;
    this.renderCartDrawerItems();
    this.showToast(`Coupon "${coupon.code}" applied: ${coupon.description}!`, 'success');
  }

  /* ==========================================================================
     Wishlist Operations
     ========================================================================== */
  toggleWishlist(product) {
    const index = this.wishlist.findIndex(item => item.id === product.id);
    if (index > -1) {
      this.wishlist.splice(index, 1);
      this.showToast(`Removed "${product.name}" from Wishlist`, 'success');
    } else {
      this.wishlist.push(product);
      this.showToast(`Added "${product.name}" to your Wishlist ❤️`, 'success');
    }

    this.saveToStorage('th_wishlist', this.wishlist);
    this.updateWishlistBadge();
    this.renderProducts();
    this.renderBestSellers();
    this.renderNewArrivals();
  }

  updateWishlistBadge() {
    const badges = document.querySelectorAll('.wishlist-count-badge');
    badges.forEach(b => {
      b.textContent = this.wishlist.length;
      b.style.display = this.wishlist.length > 0 ? 'flex' : 'none';
    });
  }

  openWishlistDrawer() {
    const drawer = document.getElementById('wishlistDrawerOverlay');
    const body = document.getElementById('wishlistDrawerBody');
    if (!drawer || !body) return;

    if (this.wishlist.length === 0) {
      body.innerHTML = `
        <div style="text-align:center; padding: 40px 20px;">
          <div style="font-size:3.5rem; margin-bottom:12px;">❤️</div>
          <h3 style="font-size:1.2rem; margin-bottom:6px;">Your wishlist is empty</h3>
          <p style="color:var(--slate-600); font-size:0.9rem; margin-bottom:20px;">Save items you want to buy later by tapping the heart icon on any spare part.</p>
          <button class="btn btn-primary btn-sm" onclick="document.getElementById('wishlistDrawerOverlay').classList.remove('active'); window.tractorApp.scrollToProducts();">Explore Products</button>
        </div>
      `;
    } else {
      body.innerHTML = this.wishlist.map(item => `
        <div class="cart-item-card">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-price">₹${this.formatINR(item.price)}</div>
            <div style="display:flex; gap:8px; margin-top:8px;">
              <button class="btn btn-primary btn-sm" onclick="window.tractorApp.addToCart(${JSON.stringify(item).replace(/"/g, '&quot;')}, 1); window.tractorApp.toggleWishlist(${JSON.stringify(item).replace(/"/g, '&quot;')});">Move to Cart</button>
              <button style="color:var(--danger); font-size:0.8rem; font-weight:700;" onclick="window.tractorApp.toggleWishlist(${JSON.stringify(item).replace(/"/g, '&quot;')}); window.tractorApp.openWishlistDrawer();">Remove</button>
            </div>
          </div>
        </div>
      `).join('');
    }

    drawer.classList.add('active');
  }

  /* ==========================================================================
     Checkout & Order Placement
     ========================================================================== */
  openCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (!modal) return;

    // Prefill user data if logged in
    if (this.currentUser) {
      if (document.getElementById('checkoutName')) document.getElementById('checkoutName').value = this.currentUser.name || '';
      if (document.getElementById('checkoutEmail')) document.getElementById('checkoutEmail').value = this.currentUser.email || '';
      if (document.getElementById('checkoutMobile')) document.getElementById('checkoutMobile').value = this.currentUser.mobile || '';
    }

    // Render Order Summary
    const summaryItems = document.getElementById('checkoutItemsList');
    if (summaryItems) {
      summaryItems.innerHTML = this.cart.map(i => `
        <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.88rem;">
          <span>${i.name} (x${i.quantity})</span>
          <strong>₹${this.formatINR(i.price * i.quantity)}</strong>
        </div>
      `).join('');
    }

    const totals = this.calculateCartTotals();
    document.getElementById('checkoutSubtotal').textContent = `₹${this.formatINR(totals.subtotal)}`;
    document.getElementById('checkoutDelivery').textContent = totals.delivery === 0 ? 'FREE' : `₹${this.formatINR(totals.delivery)}`;
    document.getElementById('checkoutDiscount').textContent = totals.discount > 0 ? `-₹${this.formatINR(totals.discount)}` : '₹0';
    document.getElementById('checkoutGrandTotal').textContent = `₹${this.formatINR(totals.grandTotal)}`;

    modal.classList.add('active');
  }

  handlePlaceOrder() {
    const name = document.getElementById('checkoutName').value;
    const mobile = document.getElementById('checkoutMobile').value;
    const email = document.getElementById('checkoutEmail').value;
    const address = document.getElementById('checkoutAddress').value;
    const city = document.getElementById('checkoutCity').value;
    const state = document.getElementById('checkoutState').value;
    const pincode = document.getElementById('checkoutPincode').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'Cash on Delivery';

    const totals = this.calculateCartTotals();
    const orderId = `TH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      customer: { name, mobile, email, address, city, state, pincode },
      items: [...this.cart],
      subtotal: totals.subtotal,
      delivery: totals.delivery,
      discount: totals.discount,
      grandTotal: totals.grandTotal,
      paymentMethod: paymentMethod,
      status: "Order Placed",
      trackingTimeline: [
        { status: "Order Placed", date: "Just now", done: true },
        { status: "Confirmed", date: "Expected in 1 hr", done: false },
        { status: "Shipped", date: "Expected tomorrow", done: false },
        { status: "Out for Delivery", date: "Pending", done: false },
        { status: "Delivered", date: "Pending", done: false }
      ]
    };

    this.orders.unshift(newOrder);
    this.saveToStorage('th_orders', this.orders);

    // Clear cart
    this.cart = [];
    this.appliedCoupon = null;
    this.saveToStorage('th_cart', this.cart);
    this.updateCartBadge();

    // Close checkout modal
    document.getElementById('checkoutModal').classList.remove('active');

    // Show Confirmation Modal
    this.openOrderConfirmationModal(newOrder);
  }

  openOrderConfirmationModal(order) {
    const modal = document.getElementById('orderSuccessModal');
    if (!modal) return;

    modal.querySelector('#confirmedOrderId').textContent = order.id;
    modal.querySelector('#confirmedCustomerName').textContent = order.customer.name;
    modal.querySelector('#confirmedTotal').textContent = `₹${this.formatINR(order.grandTotal)}`;
    modal.querySelector('#confirmedPayment').textContent = order.paymentMethod;
    modal.querySelector('#confirmedAddress').textContent = `${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}`;

    modal.classList.add('active');
  }

  /* ==========================================================================
     User Authentication & Account Management
     ========================================================================== */
  openAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.add('active');
  }

  updateUserNavState() {
    const label = document.getElementById('accountNavLabel');
    if (!label) return;

    if (this.currentUser) {
      label.textContent = this.currentUser.name.split(' ')[0];
    } else {
      label.textContent = 'Login';
    }
  }

  openAccountModal() {
    const modal = document.getElementById('accountModal');
    if (!modal) return;

    modal.querySelector('#accountUserName').textContent = this.currentUser?.name || 'Farmer Member';
    modal.querySelector('#accountUserEmail').textContent = this.currentUser?.email || 'kisan@tractorhub.in';
    modal.querySelector('#accountUserRole').textContent = this.currentUser?.role || 'Verified Customer';

    // Render Order History
    const historyContainer = modal.querySelector('#accountOrderHistory');
    if (historyContainer) {
      if (this.orders.length === 0) {
        historyContainer.innerHTML = '<p style="color:var(--slate-600); text-align:center; padding:20px;">No orders found.</p>';
      } else {
        historyContainer.innerHTML = this.orders.map(order => `
          <div style="background:var(--slate-100); border-radius:var(--radius-lg); padding:16px; margin-bottom:14px; border:1px solid var(--slate-200);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <div>
                <strong style="font-size:1.05rem; color:var(--primary-dark);">${order.id}</strong>
                <span style="font-size:0.8rem; color:var(--slate-600); margin-left:8px;">📅 ${order.date}</span>
              </div>
              <span class="badge ${order.status === 'Delivered' ? 'badge-green' : 'badge-orange'}">${order.status}</span>
            </div>
            <div style="font-size:0.88rem; color:var(--slate-600); margin-bottom:10px;">
              ${order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px dashed var(--slate-200); padding-top:10px;">
              <span style="font-size:0.95rem; font-weight:800;">Total: ₹${this.formatINR(order.grandTotal)} (${order.paymentMethod})</span>
              <button class="btn btn-outline btn-sm" onclick="window.tractorApp.trackOrderTimeline('${order.id}')">Track Status 📍</button>
            </div>
          </div>
        `).join('');
      }
    }

    modal.classList.add('active');
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('th_user');
    this.updateUserNavState();
    document.getElementById('accountModal').classList.remove('active');
    this.showToast('You have been logged out', 'success');
  }

  /* ==========================================================================
     Admin Dashboard
     ========================================================================== */
  openAdminModal() {
    const modal = document.getElementById('adminModal');
    if (!modal) return;

    this.renderAdminStats();
    this.renderAdminProductsTable();
    this.renderAdminOrdersTable();

    modal.classList.add('active');
  }

  renderAdminStats() {
    const totalProducts = this.products.length;
    const totalOrders = this.orders.length;
    const totalCustomers = new Set(this.orders.map(o => o.customer.mobile || o.customer.email)).size + 14;
    const totalSales = this.orders.reduce((sum, o) => sum + o.grandTotal, 0) + 148500;

    document.getElementById('adminTotalProducts').textContent = totalProducts;
    document.getElementById('adminTotalOrders').textContent = totalOrders;
    document.getElementById('adminTotalCustomers').textContent = totalCustomers;
    document.getElementById('adminTotalSales').textContent = `₹${this.formatINR(totalSales)}`;
  }

  renderAdminProductsTable() {
    const tbody = document.getElementById('adminProductsTableBody');
    if (!tbody) return;

    tbody.innerHTML = this.products.map(p => `
      <tr>
        <td><strong>${p.id}</strong></td>
        <td>
          <div style="display:flex; align-items:center; gap:10px;">
            <img src="${p.image}" style="width:36px; height:36px; border-radius:6px; object-fit:cover;" onerror="this.src='https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'">
            <span>${p.name}</span>
          </div>
        </td>
        <td>${p.brand.toUpperCase()}</td>
        <td><strong>₹${this.formatINR(p.price)}</strong></td>
        <td><span class="badge ${p.stock > 10 ? 'badge-green' : 'badge-red'}">${p.stock} units</span></td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="window.tractorApp.deleteProductAdmin('${p.id}')" style="color:var(--danger);">Delete</button>
        </td>
      </tr>
    `).join('');
  }

  renderAdminOrdersTable() {
    const tbody = document.getElementById('adminOrdersTableBody');
    if (!tbody) return;

    tbody.innerHTML = this.orders.map(order => `
      <tr>
        <td><strong>${order.id}</strong></td>
        <td>${order.customer.name}<br><small style="color:var(--slate-600);">${order.customer.mobile}</small></td>
        <td>${order.date}</td>
        <td><strong>₹${this.formatINR(order.grandTotal)}</strong></td>
        <td>
          <select style="padding:4px 8px; border-radius:6px; border:1px solid var(--slate-200); font-weight:700;" onchange="window.tractorApp.updateOrderStatus('${order.id}', this.value)">
            <option value="Order Placed" ${order.status === 'Order Placed' ? 'selected' : ''}>Order Placed</option>
            <option value="Confirmed" ${order.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
            <option value="Out for Delivery" ${order.status === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery</option>
            <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
          </select>
        </td>
      </tr>
    `).join('');
  }

  updateOrderStatus(orderId, newStatus) {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) return;

    order.status = newStatus;
    this.saveToStorage('th_orders', this.orders);
    this.showToast(`Order ${orderId} status updated to: ${newStatus}`, 'success');
    this.renderAdminOrdersTable();
  }

  deleteProductAdmin(productId) {
    if (!confirm('Are you sure you want to delete this spare part from catalog?')) return;
    this.products = this.products.filter(p => p.id !== productId);
    this.saveToStorage('th_products', this.products);
    this.renderProducts();
    this.renderAdminProductsTable();
    this.renderAdminStats();
    this.showToast('Product deleted successfully', 'success');
  }

  trackOrderTimeline(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) return;
    alert(`Live Tracking Status for Order #${order.id}:\n\nCurrent Status: ${order.status}\nCustomer: ${order.customer.name}\nDestination: ${order.customer.city}, ${order.customer.state}\nEstimated Delivery: 2-3 Business Days via AgriExpress Logistics`);
  }
}

// Global Application Instance
window.addEventListener('DOMContentLoaded', () => {
  window.tractorApp = new TractorHubApp();
});
