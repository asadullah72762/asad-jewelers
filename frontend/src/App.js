import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notification, setNotification] = useState('');
  const [filter, setFilter] = useState('All');

  // Fetch products from backend
  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([
        { _id: '1', name: 'Royal Emerald Ring', price: 85000, category: 'Rings', image: '💍', description: 'Handcrafted 22k gold ring with natural emerald stone', stock: 5, rating: 4.9 },
        { _id: '2', name: 'Pearl Goddess Necklace', price: 145000, category: 'Necklaces', image: '📿', description: 'South sea pearl necklace with gold chain', stock: 3, rating: 5.0 },
        { _id: '3', name: 'Vintage Drop Earrings', price: 32000, category: 'Earrings', image: '✨', description: 'Antique gold drop earrings with ruby accents', stock: 8, rating: 4.8 },
        { _id: '4', name: 'Empress Bangle Set', price: 67000, category: 'Bangles', image: '⭕', description: 'Set of 6 pure gold bangles with floral engravings', stock: 4, rating: 4.7 },
        { _id: '5', name: 'Diamond Solitaire', price: 195000, category: 'Rings', image: '💎', description: 'GIA certified 1 carat diamond solitaire ring', stock: 2, rating: 5.0 },
        { _id: '6', name: 'Bridal Jewelry Set', price: 350000, category: 'Sets', image: '👑', description: 'Complete bridal set with necklace, earrings and tikka', stock: 2, rating: 5.0 },
        { _id: '7', name: 'Rose Gold Bracelet', price: 45000, category: 'Bracelets', image: '🌹', description: 'Delicate rose gold bracelet with heart charms', stock: 10, rating: 4.6 },
        { _id: '8', name: 'Sapphire Pendant', price: 78000, category: 'Pendants', image: '💙', description: 'Ceylon sapphire pendant in white gold setting', stock: 6, rating: 4.9 },
      ]));
  }, []);

  // Show notification
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // Add to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
    showNotification(`${product.name} added to cart!`);
  };

  // Remove from cart
  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  // Total price
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // Filtered products
  const categories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bangles', 'Bracelets', 'Pendants', 'Sets'];
  const filtered = filter === 'All' ? products : products.filter(p => p.category === filter);

  return (
    <div style={s.app}>

      {/* ===== Notification Toast ===== */}
      {notification && (
        <div style={s.toast}>{notification}</div>
      )}

      {/* ===== Header ===== */}
      <header style={s.header}>
        <div style={s.headerInner}>
          <div style={s.logo}>
            <div style={s.logoIcon}>💎</div>
            <div>
              <div style={s.logoName}>Asad Jewelers</div>
              <div style={s.logoTagline}>Crafted with Love Since 1990</div>
            </div>
          </div>
          <nav style={s.nav}>
            {['home', 'shop', 'cart'].map(p => (
              <button
                key={p}
                style={page === p ? s.navActive : s.navBtn}
                onClick={() => { setPage(p); setSelectedProduct(null); }}
              >
                {p === 'cart' ? `Cart (${cart.length})` : p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ===== HOME PAGE ===== */}
      {page === 'home' && !selectedProduct && (
        <div>

          {/* Hero Section */}
          <div style={s.hero}>
            <div style={s.heroOverlay}>
              <p style={s.heroSub}>✦ Pakistan's Most Trusted Jewelry House ✦</p>
              <h1 style={s.heroTitle}>Where Every Piece<br/>Tells a Love Story</h1>
              <p style={s.heroDesc}>Handcrafted jewelry made with pure gold, diamonds & precious stones</p>
              <div style={s.heroBtns}>
                <button style={s.heroBtnPrimary} onClick={() => setPage('shop')}>Explore Collection →</button>
                <button style={s.heroBtnSecondary} onClick={() => setPage('shop')}>View Bridal Sets</button>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div style={s.statsBar}>
            {[
              { num: '30+', label: 'Years of Trust' },
              { num: '50K+', label: 'Happy Customers' },
              { num: '100%', label: 'Pure Gold' },
              { num: '24/7', label: 'Customer Support' },
            ].map((stat, i) => (
              <div key={i} style={s.stat}>
                <div style={s.statNum}>{stat.num}</div>
                <div style={s.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div style={s.section}>
            <h2 style={s.sectionTitle}>Why Choose Asad Jewelers?</h2>
            <p style={s.sectionSub}>We bring you the finest jewelry with unmatched quality</p>
            <div style={s.featuresGrid}>
              {[
                { icon: '🥇', title: 'Certified Pure Gold', desc: 'Every piece is hallmarked and certified for purity' },
                { icon: '💎', title: 'Genuine Diamonds', desc: 'GIA certified diamonds with authenticity guarantee' },
                { icon: '🤝', title: 'Lifetime Service', desc: 'Free cleaning and maintenance for lifetime' },
                { icon: '🚚', title: 'Safe Delivery', desc: 'Insured delivery across all of Pakistan' },
                { icon: '↩️', title: 'Easy Returns', desc: '7-day no questions asked return policy' },
                { icon: '🔒', title: 'Secure Payment', desc: 'Safe and encrypted payment methods' },
              ].map((f, i) => (
                <div key={i} style={s.featureCard}>
                  <div style={s.featureIcon}>{f.icon}</div>
                  <h3 style={s.featureTitle}>{f.title}</h3>
                  <p style={s.featureDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Products */}
          <div style={{...s.section, background: '#f9f6f0'}}>
            <h2 style={s.sectionTitle}>Our Bestsellers</h2>
            <p style={s.sectionSub}>Most loved pieces by our customers</p>
            <div style={s.grid}>
              {products.slice(0, 4).map(product => (
                <div key={product._id} style={s.card} onClick={() => { setSelectedProduct(product); setPage('home'); }}>
                  <div style={s.cardImg}>{product.image}</div>
                  <div style={s.cardBadge}>{product.category}</div>
                  <div style={s.cardBody}>
                    <h3 style={s.cardName}>{product.name}</h3>
                    <p style={s.cardDesc}>{product.description}</p>
                    <div style={s.cardRating}>{'⭐'.repeat(Math.floor(product.rating))} ({product.rating})</div>
                    <div style={s.cardFooter}>
                      <span style={s.cardPrice}>Rs. {product.price.toLocaleString()}</span>
                      <button style={s.addBtn} onClick={(e) => { e.stopPropagation(); addToCart(product); }}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{textAlign: 'center', marginTop: '40px'}}>
              <button style={s.heroBtnPrimary} onClick={() => setPage('shop')}>View All Products →</button>
            </div>
          </div>

          {/* Testimonials */}
          <div style={s.section}>
            <h2 style={s.sectionTitle}>What Our Customers Say</h2>
            <div style={s.testimonialsGrid}>
              {[
                { name: 'Ayesha Khan', city: 'Lahore', text: 'The bridal set I bought was absolutely stunning! Everyone complimented it at my wedding.', stars: 5 },
                { name: 'Fatima Ali', city: 'Karachi', text: 'Best jewelry shop in Pakistan. The quality is unmatched and delivery was very safe.', stars: 5 },
                { name: 'Sara Ahmed', city: 'Islamabad', text: 'I love my emerald ring! It looks exactly like the picture. Very happy with my purchase.', stars: 5 },
              ].map((t, i) => (
                <div key={i} style={s.testimonialCard}>
                  <div style={s.testimonialStars}>{'⭐'.repeat(t.stars)}</div>
                  <p style={s.testimonialText}>"{t.text}"</p>
                  <div style={s.testimonialName}>{t.name}</div>
                  <div style={s.testimonialCity}>{t.city}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ===== PRODUCT DETAIL PAGE ===== */}
      {selectedProduct && (
        <div style={s.detailPage}>
          <button style={s.backBtn} onClick={() => setSelectedProduct(null)}>← Back</button>
          <div style={s.detailContainer}>
            <div style={s.detailImg}>{selectedProduct.image}</div>
            <div style={s.detailInfo}>
              <span style={s.detailCategory}>{selectedProduct.category}</span>
              <h1 style={s.detailName}>{selectedProduct.name}</h1>
              <div style={s.detailRating}>{'⭐'.repeat(Math.floor(selectedProduct.rating))} {selectedProduct.rating}/5</div>
              <p style={s.detailDesc}>{selectedProduct.description}</p>
              <div style={s.detailStock}>✅ In Stock ({selectedProduct.stock} available)</div>
              <div style={s.detailPrice}>Rs. {selectedProduct.price.toLocaleString()}</div>
              <button style={s.detailBtn} onClick={() => { addToCart(selectedProduct); }}>Add to Cart 🛒</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== SHOP PAGE ===== */}
      {page === 'shop' && (
        <div style={s.shopPage}>
          <div style={s.shopHeader}>
            <h2 style={s.shopTitle}>Our Collection</h2>
            <p style={s.shopSub}>Discover our handcrafted jewelry pieces</p>
          </div>

          {/* Category Filter */}
          <div style={s.filters}>
            {categories.map(cat => (
              <button
                key={cat}
                style={filter === cat ? s.filterActive : s.filterBtn}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div style={s.shopGrid}>
            {filtered.map(product => (
              <div key={product._id} style={s.card} onClick={() => { setSelectedProduct(product); setPage('home'); }}>
                <div style={s.cardImg}>{product.image}</div>
                <div style={s.cardBadge}>{product.category}</div>
                <div style={s.cardBody}>
                  <h3 style={s.cardName}>{product.name}</h3>
                  <p style={s.cardDesc}>{product.description}</p>
                  <div style={s.cardRating}>{'⭐'.repeat(Math.floor(product.rating))} ({product.rating})</div>
                  <div style={s.cardFooter}>
                    <span style={s.cardPrice}>Rs. {product.price.toLocaleString()}</span>
                    <button style={s.addBtn} onClick={(e) => { e.stopPropagation(); addToCart(product); }}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== CART PAGE ===== */}
      {page === 'cart' && (
        <div style={s.cartPage}>
          <h2 style={s.shopTitle}>Your Cart</h2>
          {cart.length === 0 ? (
            <div style={s.emptyCart}>
              <div style={s.emptyIcon}>🛒</div>
              <h3 style={s.emptyTitle}>Your cart is empty</h3>
              <p style={s.emptyDesc}>Discover our beautiful jewelry collection</p>
              <button style={s.heroBtnPrimary} onClick={() => setPage('shop')}>Start Shopping →</button>
            </div>
          ) : (
            <div style={s.cartInner}>
              <div style={s.cartItems}>
                {cart.map((item, i) => (
                  <div key={i} style={s.cartItem}>
                    <div style={s.cartItemImg}>{item.image}</div>
                    <div style={s.cartItemInfo}>
                      <h3 style={s.cartItemName}>{item.name}</h3>
                      <p style={s.cartItemCat}>{item.category}</p>
                    </div>
                    <div style={s.cartItemPrice}>Rs. {item.price.toLocaleString()}</div>
                    <button style={s.removeBtn} onClick={() => removeFromCart(i)}>✕</button>
                  </div>
                ))}
              </div>
              <div style={s.cartSummary}>
                <h3 style={s.summaryTitle}>Order Summary</h3>
                <div style={s.summaryRow}>
                  <span>Items ({cart.length})</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
                <div style={s.summaryRow}>
                  <span>Delivery</span>
                  <span style={{color: '#2d6a4f'}}>FREE</span>
                </div>
                <div style={s.summaryDivider}/>
                <div style={s.summaryTotal}>
                  <span>Total</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
                <button style={s.checkoutBtn}>Proceed to Checkout →</button>
                <button style={{...s.heroBtnSecondary, width: '100%', marginTop: '10px'}} onClick={() => setPage('shop')}>Continue Shopping</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== FOOTER ===== */}
      <footer style={s.footer}>
        <div style={s.footerInner}>
          <div style={s.footerBrand}>
            <div style={s.footerLogo}>💎 Asad Jewelers</div>
            <p style={s.footerDesc}>Pakistan's most trusted jewelry house since 1990. Crafting beautiful memories with every piece.</p>
          </div>
          <div style={s.footerLinks}>
            <h4 style={s.footerHeading}>Quick Links</h4>
            <p style={s.footerLink} onClick={() => setPage('home')}>Home</p>
            <p style={s.footerLink} onClick={() => setPage('shop')}>Shop</p>
            <p style={s.footerLink} onClick={() => setPage('cart')}>Cart</p>
          </div>
          <div style={s.footerContact}>
            <h4 style={s.footerHeading}>Contact Us</h4>
            <p style={s.footerText}>📍 Mall Road, Lahore, Pakistan</p>
            <p style={s.footerText}>📞 0300-1234567</p>
            <p style={s.footerText}>✉️ info@asadjewelers.pk</p>
            <p style={s.footerText}>🕐 Mon-Sat: 10am - 8pm</p>
          </div>
        </div>
        <div style={s.footerBottom}>
          <p>© 2024 Asad Jewelers. All rights reserved. | Made with ❤️ in Pakistan</p>
        </div>
      </footer>

    </div>
  );
}

// ===== STYLES =====
const green = '#1b4332';
const lightGreen = '#2d6a4f';
const gold = '#c9a84c';
const lightGold = '#f0d080';
const cream = '#faf7f2';
const darkGreen = '#081c15';

const s = {
  app: { fontFamily: "'Georgia', serif", background: cream, minHeight: '100vh' },

  // Toast
  toast: { position: 'fixed', top: '80px', right: '20px', background: green, color: 'white', padding: '12px 24px', borderRadius: '8px', zIndex: 1000, boxShadow: '0 4px 20px rgba(0,0,0,0.2)', border: `1px solid ${gold}` },

  // Header
  header: { background: darkGreen, position: 'sticky', top: 0, zIndex: 999, boxShadow: '0 2px 20px rgba(0,0,0,0.4)' },
  headerInner: { maxWidth: '1200px', margin: '0 auto', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' },
  logo: { display: 'flex', alignItems: 'center', gap: '15px' },
  logoIcon: { fontSize: '42px' },
  logoName: { color: gold, fontSize: '22px', fontWeight: 'bold', letterSpacing: '3px' },
  logoTagline: { color: '#999', fontSize: '11px', letterSpacing: '1px' },
  nav: { display: 'flex', gap: '10px' },
  navBtn: { background: 'transparent', color: '#ccc', border: `1px solid #444`, padding: '9px 20px', borderRadius: '25px', cursor: 'pointer', fontSize: '14px', transition: 'all 0.3s' },
  navActive: { background: gold, color: darkGreen, border: 'none', padding: '9px 20px', borderRadius: '25px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' },

  // Hero
  hero: { background: `linear-gradient(135deg, ${darkGreen} 0%, ${green} 50%, ${lightGreen} 100%)`, minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' },
  heroOverlay: { textAlign: 'center', padding: '60px 30px', zIndex: 1 },
  heroSub: { color: gold, fontSize: '14px', letterSpacing: '4px', marginBottom: '20px', textTransform: 'uppercase' },
  heroTitle: { color: 'white', fontSize: '56px', lineHeight: '1.2', marginBottom: '20px', fontWeight: 'normal' },
  heroDesc: { color: '#ccc', fontSize: '18px', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' },
  heroBtns: { display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' },
  heroBtnPrimary: { background: gold, color: darkGreen, border: 'none', padding: '15px 35px', borderRadius: '30px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' },
  heroBtnSecondary: { background: 'transparent', color: gold, border: `2px solid ${gold}`, padding: '15px 35px', borderRadius: '30px', fontSize: '16px', cursor: 'pointer' },

  // Stats
  statsBar: { background: green, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0', padding: '30px' },
  stat: { textAlign: 'center', padding: '10px 40px', borderRight: '1px solid rgba(255,255,255,0.2)' },
  statNum: { color: gold, fontSize: '32px', fontWeight: 'bold' },
  statLabel: { color: '#ccc', fontSize: '13px' },

  // Section
  section: { padding: '80px 30px', maxWidth: '1200px', margin: '0 auto' },
  sectionTitle: { textAlign: 'center', color: green, fontSize: '36px', marginBottom: '10px', fontWeight: 'normal' },
  sectionSub: { textAlign: 'center', color: '#888', fontSize: '16px', marginBottom: '50px' },

  // Features
  featuresGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' },
  featureCard: { background: 'white', borderRadius: '15px', padding: '35px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: `1px solid rgba(201,168,76,0.2)` },
  featureIcon: { fontSize: '45px', marginBottom: '15px' },
  featureTitle: { color: green, fontSize: '18px', marginBottom: '10px' },
  featureDesc: { color: '#888', fontSize: '14px', lineHeight: '1.6' },

  // Cards
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '25px' },
  card: { background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'transform 0.3s', border: `1px solid rgba(201,168,76,0.15)` },
  cardImg: { background: `linear-gradient(135deg, ${darkGreen}, ${green})`, fontSize: '80px', textAlign: 'center', padding: '40px 20px' },
  cardBadge: { background: `rgba(201,168,76,0.15)`, color: gold, padding: '4px 12px', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px', display: 'inline-block', margin: '12px 15px 0' },
  cardBody: { padding: '15px 20px 20px' },
  cardName: { color: green, fontSize: '17px', marginBottom: '8px' },
  cardDesc: { color: '#888', fontSize: '13px', lineHeight: '1.5', marginBottom: '10px' },
  cardRating: { fontSize: '13px', color: '#888', marginBottom: '15px' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardPrice: { color: green, fontWeight: 'bold', fontSize: '18px' },
  addBtn: { background: green, color: gold, border: 'none', padding: '9px 18px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' },

  // Testimonials
  testimonialsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' },
  testimonialCard: { background: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', borderLeft: `4px solid ${gold}` },
  testimonialStars: { fontSize: '18px', marginBottom: '15px' },
  testimonialText: { color: '#555', fontStyle: 'italic', lineHeight: '1.7', marginBottom: '15px' },
  testimonialName: { color: green, fontWeight: 'bold' },
  testimonialCity: { color: '#999', fontSize: '13px' },

  // Shop Page
  shopPage: { maxWidth: '1200px', margin: '0 auto', padding: '40px 30px' },
  shopHeader: { textAlign: 'center', marginBottom: '30px' },
  shopTitle: { color: green, fontSize: '36px', fontWeight: 'normal', marginBottom: '10px' },
  shopSub: { color: '#888' },
  filters: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '35px', justifyContent: 'center' },
  filterBtn: { background: 'white', color: green, border: `1px solid ${green}`, padding: '8px 20px', borderRadius: '25px', cursor: 'pointer', fontSize: '14px' },
  filterActive: { background: green, color: gold, border: 'none', padding: '8px 20px', borderRadius: '25px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' },
  shopGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '25px' },

  // Product Detail
  detailPage: { maxWidth: '1100px', margin: '0 auto', padding: '40px 30px' },
  backBtn: { background: 'transparent', color: green, border: `1px solid ${green}`, padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', marginBottom: '30px', fontSize: '14px' },
  detailContainer: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'start' },
  detailImg: { background: `linear-gradient(135deg, ${darkGreen}, ${green})`, fontSize: '140px', textAlign: 'center', padding: '60px', borderRadius: '20px' },
  detailInfo: { padding: '20px 0' },
  detailCategory: { background: `rgba(201,168,76,0.15)`, color: gold, padding: '5px 15px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' },
  detailName: { color: green, fontSize: '36px', margin: '15px 0', fontWeight: 'normal' },
  detailRating: { color: '#888', fontSize: '15px', marginBottom: '20px' },
  detailDesc: { color: '#555', lineHeight: '1.8', fontSize: '16px', marginBottom: '20px' },
  detailStock: { color: lightGreen, marginBottom: '20px', fontSize: '15px' },
  detailPrice: { color: green, fontSize: '36px', fontWeight: 'bold', marginBottom: '25px' },
  detailBtn: { background: green, color: gold, border: 'none', padding: '16px 40px', borderRadius: '30px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold', width: '100%' },

  // Cart Page
  cartPage: { maxWidth: '1100px', margin: '0 auto', padding: '40px 30px' },
  cartInner: { display: 'grid', gridTemplateColumns: '1fr 380px', gap: '30px', alignItems: 'start' },
  cartItems: { display: 'flex', flexDirection: 'column', gap: '15px' },
  cartItem: { background: 'white', borderRadius: '15px', padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 2px 15px rgba(0,0,0,0.06)' },
  cartItemImg: { fontSize: '45px', width: '70px', textAlign: 'center' },
  cartItemInfo: { flex: 1 },
  cartItemName: { color: green, marginBottom: '5px' },
  cartItemCat: { color: '#999', fontSize: '13px' },
  cartItemPrice: { color: green, fontWeight: 'bold', fontSize: '18px' },
  removeBtn: { background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '13px' },
  cartSummary: { background: 'white', borderRadius: '20px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', position: 'sticky', top: '100px' },
  summaryTitle: { color: green, fontSize: '20px', marginBottom: '20px' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#555' },
  summaryDivider: { height: '1px', background: '#eee', margin: '15px 0' },
  summaryTotal: { display: 'flex', justifyContent: 'space-between', color: green, fontWeight: 'bold', fontSize: '20px', marginBottom: '20px' },
  checkoutBtn: { background: green, color: gold, border: 'none', padding: '15px', borderRadius: '12px', width: '100%', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' },

  // Empty Cart
  emptyCart: { textAlign: 'center', padding: '80px 20px' },
  emptyIcon: { fontSize: '80px', marginBottom: '20px' },
  emptyTitle: { color: green, fontSize: '24px', marginBottom: '10px' },
  emptyDesc: { color: '#888', marginBottom: '30px' },

  // Footer
  footer: { background: darkGreen, color: '#ccc', marginTop: '60px' },
  footerInner: { maxWidth: '1200px', margin: '0 auto', padding: '60px 30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '40px' },
  footerBrand: {},
  footerLogo: { color: gold, fontSize: '22px', marginBottom: '15px' },
  footerDesc: { fontSize: '14px', lineHeight: '1.7', color: '#999' },
  footerLinks: {},
  footerHeading: { color: gold, marginBottom: '15px', fontWeight: 'normal', letterSpacing: '1px' },
  footerLink: { color: '#999', marginBottom: '8px', cursor: 'pointer', fontSize: '14px' },
  footerContact: {},
  footerText: { color: '#999', marginBottom: '8px', fontSize: '14px' },
  footerBottom: { borderTop: '1px solid #333', textAlign: 'center', padding: '20px', fontSize: '13px', color: '#666' },
};

export default App;