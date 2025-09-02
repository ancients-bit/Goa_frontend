"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AdminNavigation from "./AdminNavigation";
import bookingsService from "../../services/bookingsService";
import blogPostsService from "../../services/blogPostsService";
import contactsService from "../../services/contactsService";

interface DashboardStats {
  totalContacts: number;
  totalBookings: number;
  totalBlogPosts: number;
  totalTestimonials: number;
  newsletterSubscribers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    totalBookings: 0,
    totalBlogPosts: 0,
    totalTestimonials: 0,
    newsletterSubscribers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock admin data
  const admin = { name: "Administrator" };

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch data from all services in parallel
      const [bookings, blogPosts, contacts] = await Promise.all([
        bookingsService.getAllBookings(),
        blogPostsService.getAllBlogPosts(),
        contactsService.getAllContacts(),
      ]);

      setStats({
        totalContacts: contacts.length,
        totalBookings: bookings.length,
        totalBlogPosts: blogPosts.length,
        totalTestimonials: 0, // Placeholder - no testimonials service yet
        newsletterSubscribers: 0, // Placeholder - no newsletter service yet
      });
    } catch (err: any) {
      console.error("Failed to fetch dashboard data:", err);
      setError(err.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const dashboardItems = [
    {
      title: "Bookings & Reservations",
      description: "Manage camping and activity bookings",
      href: "/admin/bookings",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      count: stats.totalBookings,
      color: "bg-green-500",
    },
    {
      title: "Blog Management",
      description: "Create and edit blog posts",
      href: "/admin/blog",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
      count: stats.totalBlogPosts,
      color: "bg-purple-500",
    },
    {
      title: "Messages & Notifications",
      description: "View contact form submissions",
      href: "/admin/notifications",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      ),
      count: stats.totalContacts,
      color: "bg-blue-500",
    },
    {
      title: "Newsletter Subscribers",
      description: "Manage email newsletter subscribers",
      href: "/admin/newsletter",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      count: stats.newsletterSubscribers,
      color: "bg-blue-500",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-earth-50">
        <AdminNavigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600 mx-auto"></div>
            <p className="mt-4 text-soil-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-earth-50">
      <AdminNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-soil-800 mb-2">
            Welcome back, {admin.name}!
          </h1>
          <p className="text-soil-600">
            Here's what's happening with your garden today
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-red-800 font-semibold mb-2">
              Error Loading Dashboard
            </div>
            <div className="text-red-700">{error}</div>
            <button
              onClick={fetchDashboardData}
              className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Refresh Button */}
        <div className="mb-6">
          <button
            onClick={fetchDashboardData}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-forest-600 hover:bg-forest-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-500"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh Dashboard
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {dashboardItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="bg-white rounded-lg shadow-sm border border-earth-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className={`${item.color} rounded-lg p-3 mr-4`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-soil-600">
                    {item.title}
                  </p>
                  <p className="text-2xl font-bold text-soil-800">
                    {item.count}
                  </p>
                </div>
              </div>
              <p className="text-sm text-soil-500 mt-2">{item.description}</p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-earth-200 p-6">
          <h2 className="text-lg font-semibold text-soil-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/bookings"
              className="flex items-center p-4 border border-earth-200 rounded-lg hover:bg-earth-50 transition-colors"
            >
              <svg
                className="w-5 h-5 text-forest-600 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-soil-700">View Bookings</span>
            </Link>

            <Link
              href="/admin/blog"
              className="flex items-center p-4 border border-earth-200 rounded-lg hover:bg-earth-50 transition-colors"
            >
              <svg
                className="w-5 h-5 text-forest-600 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span className="text-soil-700">Manage Blog</span>
            </Link>

            <Link
              href="/admin/notifications"
              className="flex items-center p-4 border border-earth-200 rounded-lg hover:bg-earth-50 transition-colors"
            >
              <svg
                className="w-5 h-5 text-forest-600 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <span className="text-soil-700">Check Messages</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
