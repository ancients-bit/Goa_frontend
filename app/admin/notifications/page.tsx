"use client";

import React, { useState, useEffect } from "react";
import AdminNavigation from "../../../components/admin/AdminNavigation";
import contactsService, { Contact } from "../../../services/contactsService";

export default function NotificationsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [expandedMessage, setExpandedMessage] = useState<Contact | null>(null);

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contactsService.getAllContacts();
      setContacts(data);
    } catch (err: any) {
      console.error("Failed to fetch contacts:", err);
      setError(err.message || "Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleExpand = (contact: Contact) => {
    if (expandedMessage?.id === contact.id) {
      setExpandedMessage(null);
    } else {
      setExpandedMessage(contact);
    }
  };

  const handleDeleteContact = async (id: number) => {
    if (!confirm("Are you sure you want to delete this contact message?")) {
      return;
    }

    try {
      await contactsService.deleteContact(id);
      setContacts((prev) => prev.filter((contact) => contact.id !== id));
      if (expandedMessage?.id === id) {
        setExpandedMessage(null);
      }
      setError(null);
    } catch (err: any) {
      console.error("Failed to delete contact:", err);
      setError(err.message || "Failed to delete contact");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-earth-50">
        <AdminNavigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600 mx-auto"></div>
            <p className="mt-4 text-soil-600">Loading messages...</p>
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
            Messages & Notifications
          </h1>
          <p className="text-soil-600">
            Manage contact form submissions and notifications
          </p>
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

        {/* Action Buttons */}
        <div className="mb-6">
          <button
            onClick={fetchContacts}
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
            Refresh Messages
          </button>
        </div>

        {/* Messages List */}
        {contacts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-earth-200 p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-soil-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-soil-900">
              No messages yet
            </h3>
            <p className="mt-1 text-sm text-soil-500">
              Contact form submissions will appear here when visitors send
              messages.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white rounded-lg shadow-sm border border-earth-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => handleExpand(contact)}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-x-4 items-center mb-2">
                        <span className="font-semibold text-soil-800">
                          {contact.full_name}
                        </span>
                        <span className="text-soil-600 text-sm">
                          {contact.email}
                        </span>
                        <span className="text-earth-500 text-xs">
                          {new Date(contact.created_at).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-soil-700 font-medium mb-2">
                        {contact.subject || (
                          <span className="italic text-soil-400">
                            No subject
                          </span>
                        )}
                      </div>
                      <div className="text-soil-600 text-sm">
                        {contact.message.length > 100
                          ? contact.message.substring(0, 100) + "..."
                          : contact.message}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-4">
                      <button
                        type="button"
                        className="text-forest-700 hover:text-forest-900 font-semibold text-sm underline"
                      >
                        {expandedMessage?.id === contact.id
                          ? "Collapse"
                          : "Expand"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Message Details */}
                {expandedMessage?.id === contact.id && (
                  <div className="bg-emerald-50 border-t border-emerald-200 px-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="font-semibold text-soil-700">
                          Phone:
                        </span>{" "}
                        {contact.phone_number || "-"}
                      </div>
                      <div>
                        <span className="font-semibold text-soil-700">
                          Organization:
                        </span>{" "}
                        {contact.organization || "-"}
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className="font-semibold text-soil-700">
                        Full Message:
                      </span>
                      <div className="mt-2 text-soil-800 whitespace-pre-wrap bg-white rounded px-4 py-3 border">
                        {contact.message}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDeleteContact(contact.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium underline"
                      >
                        Delete Message
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
