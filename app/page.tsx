"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
};

// เพิ่ม Type สำหรับเก็บสินค้าในตะกร้า
type CartItem = {
  id: number;
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "Oversized Basic T-Shirt",
    category: "เสื้อยืด",
    price: 490,
    oldPrice: 590,
    badge: "ขายดี",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Premium White Shirt",
    category: "เสื้อเชิ้ต",
    price: 790,
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Classic Denim Jacket",
    category: "แจ็กเก็ต",
    price: 1290,
    oldPrice: 1490,
    badge: "ลดราคา",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Minimal Black T-Shirt",
    category: "เสื้อยืด",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Relaxed Fit Pants",
    category: "กางเกง",
    price: 890,
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Oversized Hoodie",
    category: "เสื้อฮู้ด",
    price: 990,
    oldPrice: 1190,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    name: "Beige Casual Shirt",
    category: "เสื้อเชิ้ต",
    price: 690,
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    name: "Straight Denim Jeans",
    category: "กางเกง",
    price: 1090,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
  },
];

const categories = [
  "ทั้งหมด",
  "เสื้อยืด",
  "เสื้อเชิ้ต",
  "กางเกง",
  "แจ็กเก็ต",
  "เสื้อฮู้ด",
];

function SearchIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function ShoppingBagIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M6 8h12l1 13H5L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20.8 8.8c0 5.5-8.8 10-8.8 10s-8.8-4.5-8.8-10A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [search, setSearch] = useState("");
  // อัปเดต State ตะกร้าให้เก็บทั้ง id และ quantity
  const [cart, setCart] = useState<CartItem[]>([]);
  const [liked, setLiked] = useState<number[]>([]);
  // State สำหรับเปิด/ปิด หน้าต่างตะกร้าสินค้า
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        selectedCategory === "ทั้งหมด" || product.category === selectedCategory;

      // แก้ไขให้ค้นหาจากทั้งชื่อและหมวดหมู่
      const searchMatch = 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, search]);

  // ฟังก์ชันเพิ่มลงตะกร้า
  const addToCart = (id: number) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === id);
      if (existingItem) {
        // ถ้ามีอยู่แล้วให้เพิ่มจำนวน
        return currentCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // ถ้ายังไม่มีให้เพิ่มเข้าไปใหม่จำนวน 1 ชิ้น
      return [...currentCart, { id, quantity: 1 }];
    });
    // เปิดตะกร้าโชว์ให้ผู้ใช้เห็นทันทีที่กดเพิ่ม
    setIsCartOpen(true);
  };

  // ฟังก์ชันปรับจำนวนสินค้าในตะกร้า
  const updateQuantity = (id: number, delta: number) => {
    setCart((current) =>
      current.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: Math.max(0, newQuantity) };
        }
        return item;
      }).filter((item) => item.quantity > 0) // ถ้าน้อยกว่าหรือเท่ากับ 0 ให้ลบออกจากตะกร้า
    );
  };

  // ฟังก์ชันลบสินค้าออกจากตะกร้า
  const removeFromCart = (id: number) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  // คำนวณจำนวนชิ้นทั้งหมดในตะกร้า
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  // คำนวณราคารวม
  const cartTotal = cart.reduce((total, item) => {
    const product = products.find((p) => p.id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  // ฟังก์ชันจำลองการสั่งซื้อ
  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert(`สั่งซื้อสำเร็จ! ยอดชำระทั้งหมด ฿${cartTotal.toLocaleString()}`);
    setCart([]); // เคลียร์ตะกร้า
    setIsCartOpen(false); // ปิดตะกร้า
  };

  const toggleLike = (id: number) => {
    setLiked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* TOP PROMOTION */}
      <div className="bg-black px-4 py-2 text-center text-xs font-medium tracking-wide text-white">
        FREE SHIPPING ON ORDERS OVER ฿1,500
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-zinc-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* LOGO */}
          <div className="text-2xl font-black tracking-[0.2em]">MODA</div>

          {/* DESKTOP MENU */}
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#" className="transition hover:text-zinc-500">
              หน้าแรก
            </a>
            <a href="#shop" className="transition hover:text-zinc-500">
              สินค้า
            </a>
            <a href="#categories" className="transition hover:text-zinc-500">
              หมวดหมู่
            </a>
            <a href="#about" className="transition hover:text-zinc-500">
              เกี่ยวกับเรา
            </a>
          </nav>

          {/* HEADER ACTIONS */}
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 border-b border-zinc-300 pb-1 sm:flex">
              <SearchIcon />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ค้นหาสินค้า..."
                className="w-36 bg-transparent text-sm outline-none placeholder:text-zinc-400"
              />
            </div>

            <button
              onClick={() => setLiked([])}
              className="relative transition hover:scale-105"
              aria-label="รายการโปรด"
            >
              <HeartIcon />
              {liked.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[9px] text-white">
                  {liked.length}
                </span>
              )}
            </button>

            {/* ปุ่มเปิดตะกร้า */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative transition hover:scale-105"
              aria-label="ตะกร้าสินค้า"
            >
              <ShoppingBagIcon />
              {cartItemsCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[9px] text-white">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SEARCH */}
      <div className="border-b border-zinc-100 px-5 py-3 sm:hidden">
        <div className="flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-2.5">
          <SearchIcon />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาสินค้า..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {/* CART DRAWER (หน้าต่างสไลด์ตะกร้าสินค้า) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Background Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative flex w-full max-w-md flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
              <h2 className="text-xl font-bold tracking-tight">ตะกร้าสินค้า ({cartItemsCount})</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-zinc-400 transition hover:text-black"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-zinc-400">
                  <ShoppingBagIcon />
                  <p className="mt-4 text-sm">ยังไม่มีสินค้าในตะกร้า</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {cart.map((cartItem) => {
                    const product = products.find((p) => p.id === cartItem.id);
                    if (!product) return null;

                    return (
                      <div key={cartItem.id} className="flex gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-24 w-20 rounded-md object-cover bg-zinc-100"
                        />
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-sm font-medium line-clamp-1">{product.name}</h3>
                              <p className="mt-1 text-xs text-zinc-500">{product.category}</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(cartItem.id)}
                              className="text-xs text-zinc-400 underline hover:text-black"
                            >
                              ลบ
                            </button>
                          </div>

                          <div className="mt-auto flex items-end justify-between">
                            {/* ปุ่มเพิ่มลดจำนวน */}
                            <div className="flex items-center gap-3 rounded-md border border-zinc-200 px-3 py-1">
                              <button
                                onClick={() => updateQuantity(cartItem.id, -1)}
                                className="text-zinc-500 hover:text-black"
                              >
                                -
                              </button>
                              <span className="text-sm font-medium w-4 text-center">
                                {cartItem.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(cartItem.id, 1)}
                                className="text-zinc-500 hover:text-black"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-bold">
                              ฿{(product.price * cartItem.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Drawer Footer (Summary & Checkout) */}
            {cart.length > 0 && (
              <div className="border-t border-zinc-100 bg-zinc-50 p-6">
                <div className="mb-4 flex items-center justify-between text-lg font-bold">
                  <span>ยอดรวมทั้งหมด</span>
                  <span>฿{cartTotal.toLocaleString()}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-black py-4 text-sm font-bold text-white transition hover:bg-zinc-800"
                >
                  สั่งซื้อสินค้า (Checkout)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-5 pt-6 lg:px-8">
        <div className="relative min-h-[500px] overflow-hidden bg-zinc-100">
          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1800&q=85"
            alt="Fashion collection"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/35" />

          <div className="relative flex min-h-[500px] items-center px-7 py-16 sm:px-14 lg:px-20">
            <div className="max-w-xl text-white">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em]">
                New Collection 2026
              </p>

              <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                FIND YOUR
                <br />
                OWN STYLE.
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/85 sm:text-base">
                เสื้อผ้าที่ออกแบบมาเพื่อให้คุณเป็นตัวเอง
                คัดสรรแฟชั่นคุณภาพสำหรับทุกวันของคุณ
              </p>

              <a
                href="#shop"
                className="mt-8 inline-flex items-center bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                SHOP NOW
                <span className="ml-4">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY */}
      <section id="categories" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
              Shop by category
            </p>
            <h2 className="text-3xl font-bold tracking-tight">
              เลือกสไตล์ที่ใช่สำหรับคุณ
            </h2>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm transition ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <section id="shop" className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
              Our products
            </p>
            <h2 className="text-3xl font-bold tracking-tight">สินค้าแนะนำ</h2>
          </div>

          <p className="hidden text-sm text-zinc-400 sm:block">
            {filteredProducts.length} products
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg font-medium">ไม่พบสินค้าที่ค้นหา</p>
            <p className="mt-2 text-sm text-zinc-400">
              ลองค้นหาด้วยคำอื่นหรือเลือกหมวดหมู่ใหม่
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {filteredProducts.map((product) => (
              <article key={product.id} className="group">
                {/* IMAGE */}
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {product.badge && (
                    <span className="absolute left-3 top-3 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wide">
                      {product.badge}
                    </span>
                  )}

                  <button
                    onClick={() => toggleLike(product.id)}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white transition hover:scale-105"
                    aria-label="เพิ่มรายการโปรด"
                  >
                    <span
                      className={
                        liked.includes(product.id)
                          ? "text-black"
                          : "text-zinc-400"
                      }
                    >
                      {liked.includes(product.id) ? "♥" : "♡"}
                    </span>
                  </button>

                  {/* ADD CART */}
                  <button
                    onClick={() => addToCart(product.id)}
                    className="absolute bottom-0 left-0 right-0 translate-y-full bg-black py-3 text-xs font-semibold text-white transition duration-300 group-hover:translate-y-0"
                  >
                    เพิ่มลงตะกร้า
                  </button>
                </div>

                {/* PRODUCT INFO */}
                <div className="pt-4">
                  <p className="mb-1 text-xs text-zinc-400">
                    {product.category}
                  </p>

                  <h3 className="line-clamp-1 text-sm font-medium">
                    {product.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm font-bold">
                      ฿{product.price.toLocaleString()}
                    </span>

                    {product.oldPrice && (
                      <span className="text-xs text-zinc-400 line-through">
                        ฿{product.oldPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* PROMOTION */}
      <section className="bg-zinc-100">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2 lg:px-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
              Special Offer
            </p>

            <h2 className="text-4xl font-black leading-tight sm:text-5xl">
              EVERYDAY
              <br />
              ESSENTIALS
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-zinc-500">
              เสื้อผ้าพื้นฐานที่สามารถ Mix & Match ได้ง่าย
              เหมาะกับทุกวันและทุกสไตล์
            </p>

            <button className="mt-7 bg-black px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-800">
              EXPLORE COLLECTION →
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80"
              alt="Fashion"
              className="h-72 w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
              alt="Fashion collection"
              className="mt-10 h-72 w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="about" className="border-b border-zinc-100">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-zinc-100 px-5 py-14 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">
          <div className="px-5 py-5 text-center">
            <div className="mb-3 text-2xl">🚚</div>
            <h3 className="text-sm font-semibold">จัดส่งรวดเร็ว</h3>
            <p className="mt-2 text-xs text-zinc-400">
              จัดส่งทั่วประเทศอย่างรวดเร็ว
            </p>
          </div>

          <div className="px-5 py-5 text-center">
            <div className="mb-3 text-2xl">↩</div>
            <h3 className="text-sm font-semibold">เปลี่ยน/คืนสินค้า</h3>
            <p className="mt-2 text-xs text-zinc-400">
              เปลี่ยนสินค้าได้ภายใน 7 วัน
            </p>
          </div>

          <div className="px-5 py-5 text-center">
            <div className="mb-3 text-2xl">✓</div>
            <h3 className="text-sm font-semibold">สินค้าคุณภาพ</h3>
            <p className="mt-2 text-xs text-zinc-400">
              คัดสรรสินค้าคุณภาพก่อนส่งถึงคุณ
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black px-5 py-12 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h2 className="text-2xl font-black tracking-[0.2em]">MODA</h2>
              <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-400">
                Modern fashion store สำหรับคนที่ต้องการสร้างสไตล์ในแบบของตัวเอง
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">SHOP</h3>
              <div className="space-y-3 text-sm text-zinc-400">
                <p>เสื้อยืด</p>
                <p>เสื้อเชิ้ต</p>
                <p>กางเกง</p>
                <p>แจ็กเก็ต</p>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">HELP</h3>
              <div className="space-y-3 text-sm text-zinc-400">
                <p>การจัดส่ง</p>
                <p>การคืนสินค้า</p>
                <p>คำถามที่พบบ่อย</p>
                <p>ติดต่อเรา</p>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">FOLLOW US</h3>
              <div className="space-y-3 text-sm text-zinc-400">
                <p>Instagram</p>
                <p>Facebook</p>
                <p>TikTok</p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-zinc-800 pt-6 text-xs text-zinc-500">
            © 2026 MODA. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
