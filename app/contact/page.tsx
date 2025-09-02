"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  Users,
  Camera,
  Building,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    subject: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Fetch to Rails backend!
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    // Map form fields to Rails attribute names
    const payload = {
      contact: {
        full_name: formData.name,
        email: formData.email,
        phone_number: formData.phone,
        organization: formData.organization,
        subject: formData.subject,
        message: formData.message,
      },
    };

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await fetch(`${API_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          organization: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      setSubmitStatus("error");
    }
    setLoading(false);
  };

  const faqs = [
    // ... (same as your existing FAQ list)
  ];

  return (
    <div className="min-h-screen bg-earth-50 font-display">
      <Navigation />

      <div className="max-w-7xl mx-auto p-12">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white animate-on-scroll">
              <CardHeader className="pb-8">
                <CardTitle className="text-3xl text-soil-800">
                  Send Us a Message
                </CardTitle>
                <p className="text-soil-600 text-lg font-body">
                  Fill out the form below and we'll get back to you within 24
                  hours to help plan your perfect garden experience.
                </p>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="name"
                        className="text-soil-800 font-medium text-base font-body"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="mt-2 h-12 border-earth-300 focus:border-forest-500 text-base font-body"
                        required
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="text-soil-800 font-medium text-base font-body"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="mt-2 h-12 border-earth-300 focus:border-forest-500 text-base font-body"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="phone"
                        className="text-soil-800 font-medium text-base font-body"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="mt-2 h-12 border-earth-300 focus:border-forest-500 text-base font-body"
                        placeholder=""
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="organization"
                        className="text-soil-800 font-medium text-base font-body"
                      >
                        School/Organization
                      </Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) =>
                          handleInputChange("organization", e.target.value)
                        }
                        className="mt-2 h-12 border-earth-300 focus:border-forest-500 text-base font-body"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="subject"
                      className="text-soil-800 font-medium text-base font-body"
                    >
                      What can we help you with? *
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("subject", value)
                      }
                      value={formData.subject}
                    >
                      <SelectTrigger className="mt-2 h-12 border-earth-300 focus:border-forest-500 text-base font-body">
                        <SelectValue
                          placeholder="Select the type of inquiry"
                          className="font-body"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="school-visit" className="font-body ">
                          School & Environmental Learning
                        </SelectItem>
                        <SelectItem
                          value="meetings-picnics"
                          className="font-body"
                        >
                          Meetings & Picnics
                        </SelectItem>
                        <SelectItem value="photography" className="font-body">
                          Photography & Videography
                        </SelectItem>
                        <SelectItem value="conferencing" className="font-body">
                          Conferencing
                        </SelectItem>
                        <SelectItem value="accommodation" className="font-body">
                          Accommodation & Camping
                        </SelectItem>
                        <SelectItem value="general" className="font-body">
                          General Information
                        </SelectItem>
                        <SelectItem value="partnership" className="font-body">
                          Partnership Opportunity
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="message"
                      className="text-soil-800 font-medium text-base font-body"
                    >
                      Tell us more about your needs *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      placeholder="Please include details like preferred dates, group size, specific requirements, or any questions you have..."
                      rows={6}
                      className="mt-2 border-earth-300 focus:border-forest-500 text-base font-body"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-forest-600 hover:bg-forest-700 text-white py-6 text-lg rounded-full shadow-xl font-body"
                    disabled={loading}
                  >
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="mr-3 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>

                  {/* Feedback Message */}
                  {submitStatus === "success" && (
                    <div className="text-green-600 font-semibold text-center pt-2">
                      Thank you! Your message was sent successfully.
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="text-red-600 font-semibold text-center pt-2">
                      There was a problem sending your message. Please try
                      again.
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Sidebar */}
          {/* ... Sidebar and FAQ unchanged ... */}
          {/* (Copy your existing sidebar/FAQ code here) */}
        </div>
        {/* ... FAQ Section ... */}
      </div>
      <Footer />
    </div>
  );
}
