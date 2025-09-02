"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Landing" },
    { href: "/home", label: "Home" },
    { href: "/about", label: "Our Story" },
    { href: "/services", label: "Experiences" },
    { href: "/blog", label: "Insights" },
    { href: "/testimonials", label: "Stories" },
    { href: "/contact", label: "Connect" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="bg-primary/95 backdrop-blur-md shadow-lg border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 overflow-hidden">
              <img
                src="/goaLogo.png"
                alt="Garden of Ancients Logo"
                className="w-12 h-12 object-contain"
              />
            </div>
            <div>
              <span className="text-xl font-bold text-neutral-900 leading-tight">
                Garden of Ancients
              </span>
              <div className="text-xs text-success font-medium">
                Fusion of Recreation & Conservation - Kenya’s Natural Classroom
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold transition-all duration-300 hover:text-accent relative ${
                  isActive(item.href) ? "text-accent" : "text-neutral-700"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full" />
                )}
              </Link>
            ))}

            {/* Camping - Less Prominent */}
            <div className="relative group">
              <button className="text-sm font-medium text-neutral-500 hover:text-accent transition-colors">
                More
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  href="/camping"
                  className="block px-4 py-3 text-sm text-soil-600 hover:bg-earth-50 hover:text-forest-600 transition-colors rounded-xl"
                >
                  Camping Experience
                </Link>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              className="bg-accent hover:bg-primary text-white rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/booking">Book Visit</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm" className="text-soil-700">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-earth-50">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 shadow-md rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src="/goaLogo.png"
                      alt="Garden of Ancients Logo"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <span className="text-lg font-bold text-soil-800">
                    Garden of Ancients
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  {/* <X className="h-5 w-5" /> */}
                </Button>
              </div>

              <div className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-forest-100 text-forest-700"
                        : "text-soil-600 hover:bg-earth-100 hover:text-forest-600"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                <Link
                  href="/camping"
                  className="block py-3 px-4 rounded-xl text-base font-medium text-soil-500 hover:bg-earth-100 hover:text-soil-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Camping Experience
                </Link>

                <div className="pt-4 border-t border-earth-200">
                  <Button
                    className="w-full bg-forest-600 hover:bg-forest-700 text-white rounded-full"
                    asChild
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href="/booking">Book Visit</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
