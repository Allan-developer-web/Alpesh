
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HeroBanner from "@/components/HeroBanner";

const categories = [
  {
    name: "Burgers",
    count: "3 items",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Pizza",
    count: "2 items",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Chicken",
    count: "1 item",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Rice Meals",
    count: "1 item",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Drinks",
    count: "1 item",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Desserts",
    count: "1 item",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=85",
  },
];

const popularMeals = [
  {
    id: 1,
    name: "Classic Beef Burger",
    description: "Juicy beef, fresh lettuce and house sauce.",
    price: 650,
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 2,
    name: "Chicken Pizza",
    description: "Cheese, fresh toppings and herbs.",
    price: 1200,
    badge: "Chef's pick",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 3,
    name: "Crispy Fried Chicken",
    description: "Golden, crunchy chicken seasoned with spices.",
    price: 750,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 4,
    name: "Chicken Rice Bowl",
    description: "A satisfying rice bowl with tender chicken.",
    price: 550,
    badge: "",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=85",
  },
];

const benefits = [
  {
    icon: "🚚",
    title: "Fast & Convenient",
    description: "Get your food delivered quickly and safely.",
  },
  {
    icon: "🌿",
    title: "Fresh Ingredients",
    description: "Only the best, always fresh.",
  },
  {
    icon: "🏷️",
    title: "Clear Prices",
    description: "No hidden costs, just great food.",
  },
  {
    icon: "🎧",
    title: "Friendly Support",
    description: "We're here to help whenever you need us.",
  },
];

export default function HomePage() {
  const [cartCount, setCartCount] = useState(0);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());

    const updateCartCount = () => {
      try {
        const savedCart = localStorage.getItem("alpesh_cart");
        const cart = savedCart ? JSON.parse(savedCart) : [];

        setCartCount(
          Array.isArray(cart)
            ? cart.reduce(
                (total: number, item: { quantity?: number }) =>
                  total + (Number(item.quantity) || 0),
                0
              )
            : 0
        );
      } catch {
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);

    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  function addToCart(foodId: number) {
    try {
      const savedCart = localStorage.getItem("alpesh_cart");
      const cart = savedCart ? JSON.parse(savedCart) : [];

      if (!Array.isArray(cart)) return;

      const existingItem = cart.find(
        (item: { foodId: number; quantity: number }) =>
          item.foodId === foodId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ foodId, quantity: 1 });
      }

      localStorage.setItem("alpesh_cart", JSON.stringify(cart));

      setCartCount(
        cart.reduce(
          (total: number, item: { quantity: number }) =>
            total + item.quantity,
          0
        )
      );
    } catch {
      alert("We couldn't update your cart. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-[#fffaf3] text-stone-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-orange-100 bg-[#fffaf3]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
          <Link href="/" className="shrink-0">
            <span className="block text-3xl font-extrabold italic text-orange-600">
              ♨ Alpesh
            </span>
            <span className="block text-center text-[10px] text-stone-500">
              Good Food · Happy People
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link href="/" className="border-b-2 border-orange-500 py-2 text-orange-600">
              Home
            </Link>
            <Link href="/popular" className="transition hover:text-orange-600">
              Popular
            </Link>
            <Link href="/menu" className="transition hover:text-orange-600">
              Our Menu
            </Link>
            <Link href="/about" className="transition hover:text-orange-600">
              About
            </Link>
            <Link href="/contact" className="transition hover:text-orange-600">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/menu"
              aria-label="Search menu"
              className="text-xl transition hover:text-orange-600"
            >
              ⌕
            </Link>
            <Link
              href="/checkout"
              aria-label="View shopping cart"
              className="relative rounded-full p-2 text-xl transition hover:bg-orange-100"
            >
              🛒
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-600 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </header>

      <HeroBanner />

      {/* Food Categories */}
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-700">
            <span className="mr-3 inline-block w-8 border-t-2 border-orange-500 align-middle" />
            Our Categories
          </p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Find Your Favourite
          </h2>
          <p className="mt-2 text-stone-600">
            From juicy burgers to refreshing drinks, we have something for
            everyone.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-6 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/menu?category=${encodeURIComponent(category.name)}`}
              className="group flex flex-col items-center text-center"
            >
              <div className="mb-3 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-orange-100 p-2 transition duration-300 group-hover:scale-105 group-hover:bg-orange-200">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <h3 className="font-bold transition group-hover:text-orange-600">
                {category.name}
              </h3>
              <p className="mt-1 text-xs text-stone-500">{category.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Meals */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-700">
              <span className="mr-3 inline-block w-8 border-t-2 border-orange-500 align-middle" />
              Popular Meals
            </p>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Our Best Sellers
            </h2>
          </div>
          <Link
            href="/popular"
            className="rounded-xl border border-orange-500 px-5 py-3 text-sm font-semibold text-orange-700 transition hover:bg-orange-600 hover:text-white"
          >
            View All Popular Meals →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popularMeals.map((meal) => (
            <article
              key={meal.id}
              className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                {meal.badge && (
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-orange-600 px-3 py-1 text-xs font-bold text-white">
                    {meal.badge}
                  </span>
                )}
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="p-4">
                <h3 className="font-bold">{meal.name}</h3>
                <p className="mt-2 min-h-10 text-sm leading-5 text-stone-500">
                  {meal.description}
                </p>
                <p className="mt-3 font-extrabold text-orange-600">
                  KSh {meal.price.toLocaleString("en-KE")}
                </p>
                <button
                  type="button"
                  onClick={() => addToCart(meal.id)}
                  className="mt-4 w-full rounded-xl bg-stone-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
                >
                  <span className="mr-2 text-orange-400">+</span>
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#fff1df]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-5 md:items-center md:px-8">
          <div className="md:col-span-1">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-700">
              Why Choose Us
            </p>
            <h2 className="text-2xl font-extrabold">
              Good Food. Great Reasons.
            </h2>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              We make it easy to enjoy tasty, fresh and affordable meals
              whenever you want.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:col-span-4 md:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-2xl">
                  {benefit.icon}
                </div>
                <h3 className="text-sm font-bold">{benefit.title}</h3>
                <p className="mt-2 text-xs leading-5 text-stone-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Call to Action */}
      <section className="relative overflow-hidden bg-stone-950 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 md:grid-cols-2 md:px-8 md:py-16">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
              Ready to order?
            </p>
            <h2 className="max-w-lg text-3xl font-extrabold leading-tight sm:text-4xl">
              Ready to find your
              <br />
              next favourite meal?
            </h2>
            <p className="mt-4 max-w-md leading-7 text-stone-300">
              Browse our menu, explore our categories and place your order in
              just a few clicks.
            </p>
            <Link
              href="/menu"
              className="mt-6 inline-block rounded-xl bg-orange-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-500"
            >
              Order Now →
            </Link>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85"
              alt="A freshly prepared meal ready to enjoy"
              className="h-64 w-full rounded-3xl object-cover md:h-72"
            />
            <p className="absolute bottom-4 right-4 rounded-xl bg-stone-950/80 px-4 py-3 font-bold italic text-orange-400">
              Good Food, Good Mood ♡
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-stone-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <Link href="/" className="w-fit">
            <span className="block text-3xl font-extrabold italic text-orange-500">
              ♨ Alpesh
            </span>
            <span className="text-xs text-stone-400">
              Good Food · Happy People
            </span>
          </Link>

          <nav className="flex flex-wrap gap-5 text-sm text-stone-300">
            <Link href="/" className="hover:text-orange-400">Home</Link>
            <Link href="/menu" className="hover:text-orange-400">Menu</Link>
            <Link href="/about" className="hover:text-orange-400">About</Link>
            <Link href="/contact" className="hover:text-orange-400">Contact</Link>
          </nav>

          <p className="text-xs text-stone-400">
            © {currentYear ?? ""} Alpesh. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
