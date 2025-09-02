"use client";

import React, { useState, useEffect } from "react";
import AdminNavigation from "./AdminNavigation";
import bookingsService, { Booking } from "../../services/bookingsService";

const statusOptions = [
  { value: 0, label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  { value: 1, label: "Confirmed", color: "bg-green-100 text-green-800" },
  { value: 2, label: "Completed", color: "bg-blue-100 text-blue-800" },
  { value: 3, label: "Cancelled", color: "bg-red-100 text-red-800" },
];

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);

  // Fetch bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookingsService.getAllBookings();
      setBookings(data);
    } catch (err: any) {
      console.error("Failed to fetch bookings:", err);
      setError(err.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, status: number) => {
    try {
      setUpdatingStatus(id);
      const updatedBooking = await bookingsService.updateBookingStatus(
        id,
        status
      );

      setBookings((prev) =>
        prev.map((booking) => (booking.id === id ? updatedBooking : booking))
      );
    } catch (err: any) {
      console.error("Failed to update booking status:", err);
      setError(err.message || "Failed to update booking status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusLabel = (status: number) => {
    const statusOption = statusOptions.find(
      (option) => option.value === status
    );
    return statusOption ? statusOption.label : "Unknown";
  };

  const getStatusColor = (status: number) => {
    const statusOption = statusOptions.find(
      (option) => option.value === status
    );
    return statusOption ? statusOption.color : "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-earth-50">
        <AdminNavigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600 mx-auto"></div>
            <p className="mt-4 text-soil-600">Loading bookings...</p>
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
            Bookings & Reservations
          </h1>
          <p className="text-soil-600">Manage camping and activity bookings</p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-red-800 font-semibold mb-2">Error</div>
            <div className="text-red-700">{error}</div>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Refresh Button */}
        <div className="mb-6">
          <button
            onClick={fetchBookings}
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
            Refresh Bookings
          </button>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-earth-200 p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-soil-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-soil-900">
              No bookings found
            </h3>
            <p className="mt-1 text-sm text-soil-500">
              New bookings will appear here when customers make reservations.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-earth-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-earth-200">
                <thead className="bg-earth-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-soil-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-soil-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-soil-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-soil-500 uppercase tracking-wider">
                      People
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-soil-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-soil-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-earth-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-earth-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-soil-900">
                            {booking.full_name}
                          </div>
                          <div className="text-sm text-soil-500">
                            {booking.email}
                          </div>
                          <div className="text-sm text-soil-500">
                            {booking.phone_number}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-soil-900">
                          {booking.service}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-soil-900">
                          {new Date(booking.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-soil-500">
                          {booking.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-soil-900">
                          {booking.number_of_people}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {getStatusLabel(booking.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <select
                          value={booking.status}
                          onChange={(e) =>
                            handleUpdateStatus(
                              booking.id,
                              parseInt(e.target.value)
                            )
                          }
                          disabled={updatingStatus === booking.id}
                          className="block w-full px-3 py-2 border border-earth-300 rounded-md shadow-sm focus:outline-none focus:ring-forest-500 focus:border-forest-500 sm:text-sm"
                          aria-label={`Update status for ${booking.full_name}'s booking`}
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {updatingStatus === booking.id && (
                          <div className="mt-2 text-xs text-soil-500">
                            Updating...
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
