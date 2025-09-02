import Link from "next/link";
import { Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Bookings from "./Bookings";
import Testimony from "./Testimony";
import Newsletter from "./Newsletter";
import BlogPost from "./BlogPost";
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f4faf7]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Link
                href="/admin/notifications"
                className="relative bg-transparent border-none p-0"
                title="Notifications"
                aria-label="Notifications"
              >
                <Mail className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Link>
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-emerald-100 text-emerald-700">
                GA
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      {/* Dashboard Content */}
      <main className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Bookings />
          </div>
          <Testimony />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Newsletter />
          <BlogPost />
        </div>
      </main>
    </div>
  );
}
