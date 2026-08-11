import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Search, Menu } from "lucide-react"; // แนะนำติดตั้ง lucide-react สำหรับไอคอน

// ข้อมูลจำลองสินค้า (Mock Data)
const PRODUCTS = [
  {
    id: "1",
    name: "Minimalist Oversized Tee",
    category: "T-Shirts",
    price: 590,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80",
    isNew: true,
  },
  {
    id: "2",
    name: "Classic Denim Jacket",
    category: "Outerwear",
    price: 1890,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&q=80",
    isNew: false,
  },
  {
    id: "3",
    name: "Relaxed Fit Cargo Pants",
    category: "Pants",
    price: 1290,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80",
    isNew: true,
  },
  {
    id: "4",
    name: "Linen Blend Summer Shirt",
    category: "Shirts",
    price: 890,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80",
    isNew: false,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      
      {/* 1. Navbar Navigation */}
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-4">
            <button className="sm:hidden p-1 text-neutral-600 hover:text-black dark:text-neutral-300">
              <Menu size={24} />
            </button>
            <Link href="/" className="text-xl font-bold tracking-wider uppercase">
              ATTIC.<span className="text-neutral-400">STUDIO</span>
            </Link>
          </div>

          <nav className="hidden space-x-8 text-sm font-medium sm:flex">
            <Link href="#" className="hover:text-neutral-500 transition-colors">New Arrivals</Link>
            <Link href="#" className="hover:text-neutral-500 transition-colors">Men</Link>
            <Link href="#" className="hover:text-neutral-500 transition-colors">Women</Link>
            <Link href="#" className="text-red-500 hover:text-red-600 font-semibold">Sale</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button aria-label="Search" className="p-2 text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white">
              <Search size={20} />
            </button>
            <button aria-label="Wishlist" className="p-2 text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white">
              <Heart size={20} />
            </button>
            <button aria-label="Cart" className="relative p-2 text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white">
              <ShoppingBag size={20} />
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white dark:bg-white dark:text-black">
                2
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* 2. Hero Section */}
        <section className="relative my-6 overflow-hidden rounded-2xl bg-neutral-900 text-white">
          <div className="relative z-10 flex flex-col items-start justify-center px-8 py-20 sm:px-16 lg:w-1/2 lg:py-32">
            <span className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Summer Collection 2026
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
              URBAN <br /> ESSENTIALS.
            </h1>
            <p className="mt-4 text-base text-neutral-300">
              เสื้อผ้าเรียบง่าย ทรงสวมสบาย ตอบโจทย์ทุกลุคในชีวิตประจำวัน พร้อมส่วนลดสูงสุด 30%
            </p>
            <Link
              href="#products"
              className="mt-8 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-200"
            >
              ช้อปคอลเลกชันนี้
            </Link>
          </div>
          
          <div className="absolute inset-0 z-0 opacity-40 lg:opacity-70">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80"
              alt="Hero Fashion"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </section>

        {/* 3. Product Catalog Header */}
        <section id="products" className="py-12">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">สินค้าแนะนำ (Featured)</h2>
              <p className="text-sm text-neutral-500">รวมสินค้ายอดนิยมประจำสัปดาห์</p>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {["ทั้งหมด", "เสื้อยืด", "เสื้อเชิ้ต", "กางเกง", "เสื้อคลุม"].map((cat, idx) => (
                <button
                  key={cat}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                    idx === 0
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Product Grid */}
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="group relative flex flex-col">
                
                {/* Image & Badge Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {product.isNew && (
                    <span className="absolute top-3 left-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white backdrop-blur-sm dark:bg-white/70 dark:text-black">
                      NEW
                    </span>
                  )}

                  <button 
                    aria-label="Add to Wishlist"
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-neutral-700 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500 dark:bg-black/80 dark:text-neutral-200"
                  >
                    <Heart size={16} />
                  </button>

                  <button className="absolute bottom-3 left-3 right-3 translate-y-4 rounded-lg bg-white/90 py-2.5 text-xs font-semibold text-neutral-900 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white dark:bg-neutral-900/90 dark:text-white">
                    + เพิ่มลงตะกร้า
                  </button>
                </div>

                {/* Product Info */}
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      <Link href={`/product/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-xs text-neutral-500">{product.category}</p>
                  </div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    ฿{product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 5. Footer */}
      <footer className="mt-20 border-t border-neutral-200 bg-white py-12 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-neutral-500 sm:px-6 lg:px-8">
          <p>© 2026 ATTIC.STUDIO. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
