"use client";

import { useMemo, useState } from "react";

// --- SVG Icons ---
function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

// --- Sample Data ---
const PRODUCTS = [
  { id: 1, name: "Oversized Cotton Tee", category: "เสื้อผ้า", price: 1290, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80" },
  { id: 2, name: "Minimalist Leather Bag", category: "กระเป๋า", price: 3590, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80" },
  { id: 3, name: "Classic White Sneakers", category: "รองเท้า", price: 2990, image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80" },
  { id: 4, name: "Silver Minimal Watch", category: "เครื่องประดับ", price: 4200, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" },
];

const CATEGORIES = ["ทั้งหมด", "เสื้อผ้า", "กระเป๋า", "รองเท้า", "เครื่องประดับ"];

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchCategory = selectedCategory === "ทั้งหมด" || product.category === selectedCategory;
      const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, search]);

  const totalCartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const addToCart = (id: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { id, quantity: 1 }];
    });
  };

  return (
    <main className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark bg-zinc-950 text-zinc-100" : "bg-white text-zinc-900"}`}>
      
      {/* TOP BAR */}
      <div className="bg-black px-4 py-2 text-center text-xs font-medium tracking-wide text-white border-b border-zinc-800">
        FREE SHIPPING ON ORDERS OVER ฿1,500
      </div>

      {/* HEADER */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur transition-colors ${
        isDarkMode ? "border-zinc-800 bg-zinc-950/90" : "border-zinc-100 bg-white/95"
      }`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <div className="text-2xl font-black tracking-[0.2em]">MODA</div>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#" className="transition hover:opacity-60">หน้าแรก</a>
            <a href="#shop" className="transition hover:opacity-60">สินค้า</a>
            <a href="#categories" className="transition hover:opacity-60">หมวดหมู่</a>
            <a href="#about" className="transition hover:opacity-60">เกี่ยวกับเรา</a>
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 transition hover:scale-110 rounded-full ${isDarkMode ? "hover:bg-zinc-800" : "hover:bg-zinc-100"}`}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Search Bar */}
            <div className={`hidden items-center gap-2 border-b pb-1 sm:flex ${isDarkMode ? "border-zinc-700" : "border-zinc-300"}`}>
              <SearchIcon />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ค้นหาสินค้า..."
                className="w-36 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              />
            </div>

            <button onClick={() => setIsAuthOpen(true)} className="p-1 transition hover:opacity-60">
              <UserIcon />
            </button>
            <button className="p-1 transition hover:opacity-60">
              <HeartIcon />
            </button>
            <button onClick={() => setIsCartOpen(true)} className="relative p-1 transition hover:opacity-60">
              <BagIcon />
              {totalCartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white dark:bg-white dark:text-black">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SEARCH */}
      <div className={`border-b px-5 py-3 sm:hidden ${isDarkMode ? "border-zinc-800" : "border-zinc-100"}`}>
        <div className={`flex items-center gap-2 rounded-lg px-3 py-2.5 ${isDarkMode ? "bg-zinc-900" : "bg-zinc-100"}`}>
          <SearchIcon />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาสินค้า..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {/* CATEGORIES SECTION */}
      <section id="categories" className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition ${
                selectedCategory === category
                  ? isDarkMode ? "bg-white text-black" : "bg-black text-white"
                  : isDarkMode ? "bg-zinc-900 text-zinc-300 hover:bg-zinc-800" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section id="shop" className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <article key={product.id} className="group">
              <div className={`relative aspect-[3/4] overflow-hidden rounded-lg ${isDarkMode ? "bg-zinc-900" : "bg-zinc-100"}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                />
                <button
                  onClick={() => addToCart(product.id)}
                  className={`absolute bottom-4 left-4 right-4 rounded-lg py-3 text-xs font-semibold tracking-wider transition opacity-0 group-hover:opacity-100 ${
                    isDarkMode ? "bg-white text-black hover:bg-zinc-200" : "bg-black text-white hover:bg-zinc-800"
                  }`}
                >
                  ADD TO CART
                </button>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm font-medium">{product.name}</h3>
                  <p className={`mt-1 text-xs ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>{product.category}</p>
                </div>
                <p className="text-sm font-semibold">฿{product.price.toLocaleString()}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* AUTH MODAL */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className={`relative w-full max-w-md rounded-2xl p-6 shadow-xl ${isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-black"}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">เข้าสู่ระบบ</h2>
              <button onClick={() => setIsAuthOpen(false)} className="text-zinc-500 hover:text-zinc-700">✕</button>
            </div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-medium mb-1">อีเมล</label>
                <input
                  type="email"
                  className={`w-full rounded-lg border px-3 py-2 text-sm outline-none ${
                    isDarkMode ? "border-zinc-700 bg-zinc-800" : "border-zinc-300 bg-white"
                  }`}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">รหัสผ่าน</label>
                <input
                  type="password"
                  className={`w-full rounded-lg border px-3 py-2 text-sm outline-none ${
                    isDarkMode ? "border-zinc-700 bg-zinc-800" : "border-zinc-300 bg-white"
                  }`}
                  placeholder="••••••••"
                />
              </div>
              <button className={`w-full rounded-lg py-2.5 text-sm font-semibold transition ${
                isDarkMode ? "bg-white text-black hover:bg-zinc-200" : "bg-black text-white hover:bg-zinc-800"
              }`}>
                เข้าสู่ระบบ
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className={`relative flex w-full max-w-md flex-col p-6 shadow-2xl ${isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-black"}`}>
            <div className="flex justify-between items-center pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="text-lg font-bold">ตะกร้าสินค้า ({totalCartCount})</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-zinc-500 hover:text-zinc-700">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              {cart.length === 0 ? (
                <p className="text-center text-sm text-zinc-500 py-10">ไม่มีสินค้าในตะกร้า</p>
              ) : (
                cart.map((item) => {
                  const product = PRODUCTS.find((p) => p.id === item.id);
                  if (!product) return null;
                  return (
                    <div key={item.id} className="flex gap-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
                      <img src={product.image} alt={product.name} className="h-16 w-16 object-cover rounded-md" />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{product.name}</h4>
                        <p className="text-xs text-zinc-500">จำนวน: {item.quantity}</p>
                        <p className="text-sm font-semibold mt-1">฿{(product.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <button className={`w-full rounded-lg py-3 text-sm font-semibold transition ${
              isDarkMode ? "bg-white text-black hover:bg-zinc-200" : "bg-black text-white hover:bg-zinc-800"
            }`}>
              ชำระเงิน
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className={`px-5 py-12 text-white lg:px-8 ${isDarkMode ? "bg-zinc-900 border-t border-zinc-800" : "bg-black"}`}>
        <div className="mx-auto max-w-7xl text-center text-xs text-zinc-400">
          © {new Date().getFullYear()} MODA Store. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
