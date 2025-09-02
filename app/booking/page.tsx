"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Globe,
  Info,
  School,
  UsersRound,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Types
type ServiceColor = "emerald" | "amber" | "rose";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  groupSize: string;
  price: string;
  color: ServiceColor;
  usd: string;
  perPerson?: boolean; // marks per-person pricing
  note?: string;
  students?: string;
  FBO?: string; // extra note line under the card
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  organisation: string;
  groupSize: string;
  preferredDate: string;
  alternateDate: string;
  inquiry: string;
  service: string;
}

type ServiceId = Service["id"];
type FormField = keyof BookingFormData;

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState<ServiceId | "">("");
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    organisation: "",
    groupSize: "",
    preferredDate: "",
    alternateDate: "",
    inquiry: "",
    service: "",
  });

  const formRef = useRef<HTMLDivElement | null>(null);

  // Services data
  const services: Service[] = [
    {
      id: "Conferencing",
      name: "Conferencing (room hire only)",
      description:
        "Elevate your professional gatherings with the inspiring power of nature.",
      duration: "- hours",
      groupSize: "maximum of 30 people",
      price: "KES 15,000",
      color: "emerald",
      usd: "USD 200",
      perPerson: false,
    },
    {
      id: "Picnic/team building only",
      name: "Picnic / Team Building Only",
      description: "Outdoor picnics and team-building activities.",
      duration: "- hours",
      groupSize: "5–30 participants",
      price: "350 KES",
      color: "amber",
      usd: "10 USD ",
      students: "200 KES",
      perPerson: true,
      FBO: "9,000 KES for FBO",
      note: "Rates are per person except for indicated group rates, up to 30 people. Additional attendees charged an extra rate.",
    },
    {
      id: "Tour-of-Spice-Enclave",
      name: "Tour of Spice Enclave (Herb Garden)",
      description:
        "Enjoy a guided tour through the Spice Enclave, where fragrant herbs and ancient remedies come to life.",
      duration: "-hours",
      groupSize: "minimum of 5 people ",
      price: "450 KES",
      students: "250 KES",
      color: "rose",
      usd: "10 USD",
      perPerson: true,
      note: "Rates are per person.",
    },
    {
      id: "Tour of Bee Garden",
      name: "Tour of Bee Garden",
      description:
        "Explore the fascinating world of bees and their role in our ecosystem.",
      duration: "-hours",
      groupSize: "minimum of 5 people ",
      price: "150 KES",
      students: "100 KES",
      color: "emerald",
      usd: "10 USD",
      perPerson: true,
      note: "Rates are per person.",
    },
    {
      id: "Combined: Spice Enclave and Bee Garden",
      name: "Combined: Spice Enclave & Bee Garden",
      description:
        "Experience the harmony of nature with a guided tour through the Spice Enclave and Bee Garden.",
      duration: "-hours",
      groupSize: "minimum of 5 people ",
      price: "600 KES",
      students: "350 KES",
      color: "amber",
      usd: "15 USD",
      perPerson: true,
      note: "Rates are per person.",
    },
    {
      id: "Photography/Video shooting",
      name: "Photography/Video Shooting",
      description:
        "Capture the beauty of your experience with professional photography and video services.",
      duration: "-hours",
      groupSize: "Up to 30 people",
      price: "12,500 KES",
      color: "rose",
      usd: "150 USD",
      FBO: "10,500 KES for FBO",
      perPerson: false,
      note: "Photography/Videography rates cover up to 30 people; extras at an agreed rate.",
    },
    {
      id: "Single room occupancy B&B",
      name: "Single Room Occupancy B&B",
      description:
        "Relax in comfort with our cozy single room occupancy bed and breakfast stay.",
      duration: "-hours",
      groupSize: "1–30 people",
      price: "KES 3000/day",
      color: "emerald",
      usd: "USD 30",
      perPerson: false,
    },
    {
      id: "Double Room Sharing B&B",
      name: "Double Room Sharing B&B",
      description:
        "Enjoy a comfortable stay in our double room sharing bed and breakfast.",
      duration: "-hours",
      groupSize: "1–30 people",
      price: "KES 2000/day",
      color: "rose",
      usd: "USD 20",
      perPerson: false,
    },
  ];

  const handleInputChange = (field: FormField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  function handleServiceSelect(serviceId: ServiceId) {
    const serviceObj = services.find((s) => s.id === serviceId);
    setSelectedService(serviceId);
    setFormData((prev) => ({
      ...prev,
      service: serviceObj ? serviceObj.name : "",
    }));
    // Smooth scroll to form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage("");
    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking: {
            name: formData.name,
            email: formData.email,
            phone_number: formData.phone,
            organisation: formData.organisation,
            number_of_persons: formData.groupSize,
            date_of_booking: formData.preferredDate,
            alternate_date: formData.alternateDate,
            inquiry: formData.inquiry,
            service: formData.service,
          },
        }),
      });

      if (response.ok) {
        setSubmitMessage(
          "Booking submitted successfully! We will contact you soon."
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          organisation: "",
          groupSize: "",
          preferredDate: "",
          alternateDate: "",
          inquiry: "",
          service: "",
        });
        setSelectedService("");
      } else {
        setSubmitMessage(
          "There was an error submitting your booking. Please try again."
        );
      }
    } catch (error) {
      setSubmitMessage("Network error. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-display">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-stone-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
            Book Your Visit
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed font-body">
            Take the first step towards an unforgettable experience at Garden of
            Ancients. We'll work with you to create the perfect visit for your
            group.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Service Selection */}
          <div className="lg:col-span-2">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-stone-800 mb-6">
                Choose Your Experience
              </h2>
              <div className="grid gap-6">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    className={`cursor-pointer transition-all transform hover:scale-[1.02] ${
                      selectedService === service.id
                        ? `border-2 border-${service.color}-500 shadow-lg`
                        : "border border-stone-200 hover:border-stone-300"
                    }`}
                    onClick={() => handleServiceSelect(service.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-3">
                            <h3 className="text-xl font-semibold text-stone-800 mr-3">
                              {service.name}
                            </h3>
                            {selectedService === service.id && (
                              <CheckCircle className="h-5 w-5 text-emerald-600" />
                            )}
                          </div>

                          <p className="text-stone-600 mb-4 font-body">
                            {service.description}
                          </p>

                          <div className="flex flex-wrap gap-4 text-sm text-stone-600 font-body">
                            {service.duration && (
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {service.duration}
                              </div>
                            )}

                            {service.groupSize && (
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {service.groupSize}
                              </div>
                            )}

                            <div className="flex items-center gap-2">
                              {service.usd && (
                                <Badge
                                  className={`bg-${service.color}-100 text-${service.color}-700 font-body`}
                                >
                                  <Globe className="h-4 w-4 mr-1" />
                                  {service.usd}
                                  {service.perPerson ? " per person" : ""}
                                </Badge>
                              )}

                              {service.students && (
                                <Badge
                                  className={`bg-${service.color}-100 text-${service.color}-700 font-body`}
                                >
                                  <School className="h-4 w-4 mr-1" />
                                  {service.students}
                                  {service.perPerson ? " per student" : ""}
                                </Badge>
                              )}

                              {service.FBO && (
                                <Badge
                                  className={`bg-${service.color}-100 text-${service.color}-700 font-body`}
                                >
                                  <UsersRound className="h-4 w-4 mr-1" />
                                  {service.FBO}
                                </Badge>
                              )}
                            </div>
                          </div>

                          {service.note && (
                            <div className="mt-3 flex items-start text-xs text-stone-600">
                              <Info className="h-4 w-4 mr-2 mt-0.5" />
                              <p className="font-body">{service.note}</p>
                            </div>
                          )}
                        </div>

                        <div className="text-right">
                          <Badge
                            className={`bg-${service.color}-100 text-${service.color}-700 font-body`}
                          >
                            {service.price}
                            {service.perPerson ? " per person" : ""}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Booking Form */}
            {selectedService && (
              <Card className="shadow-lg" ref={formRef}>
                <CardHeader>
                  <CardTitle className="text-stone-800">
                    Booking Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="font-body">
                          Contact Person Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          required
                          className="font-body"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="font-body">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          required
                          className="font-body"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="font-body">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          required
                          className="font-body"
                        />
                      </div>
                      <div>
                        <Label htmlFor="organisation" className="font-body">
                          School/Organisation
                        </Label>
                        <Input
                          id="organisation"
                          value={formData.organisation}
                          onChange={(e) =>
                            handleInputChange("organisation", e.target.value)
                          }
                          className="font-body"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="groupSize" className="font-body">
                          Expected Group Size *
                        </Label>
                        <Input
                          id="groupSize"
                          name="groupSize"
                          type="number"
                          min={1}
                          placeholder="Enter group size"
                          className="font-body"
                          value={formData.groupSize}
                          onChange={(e) =>
                            handleInputChange("groupSize", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="preferredDate" className="font-body">
                          Preferred Date *
                        </Label>
                        <Input
                          id="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) =>
                            handleInputChange("preferredDate", e.target.value)
                          }
                          required
                          className="font-body"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="alternateDate" className="font-body">
                        Alternate Date (Optional)
                      </Label>
                      <Input
                        id="alternateDate"
                        type="date"
                        value={formData.alternateDate}
                        onChange={(e) =>
                          handleInputChange("alternateDate", e.target.value)
                        }
                        className="font-body"
                      />
                    </div>

                    <div>
                      <Label htmlFor="inquiry" className="font-body">
                        Special Requests or Questions
                      </Label>
                      <Textarea
                        id="inquiry"
                        value={formData.inquiry}
                        onChange={(e) =>
                          handleInputChange("inquiry", e.target.value)
                        }
                        placeholder="Tell us about any specific needs, dietary requirements, accessibility needs, or questions you have..."
                        rows={4}
                        className="font-body"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-full font-body"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting..." : "Submit Booking Request"}
                    </Button>
                    {submitMessage && (
                      <div
                        className="text-center mt-4 font-body text-emerald-700"
                        aria-live="polite"
                      >
                        {submitMessage}
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar (unchanged) */}
          <div className="space-y-8">
            {/* Contact Info */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-stone-800">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-emerald-600 mr-3" />
                  <div>
                    <p className="font-semibold text-stone-800">Call Us</p>
                    <p className="text-stone-600 font-body">+254 755710225</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-emerald-600 mr-3" />
                  <div>
                    <p className="font-semibold text-stone-800">Email Us</p>
                    <p className="text-stone-600 font-body">
                      info@gardenofancients.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-emerald-600 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold text-stone-800">Visit Us</p>
                    <p className="text-stone-600 font-body">
                      Nyamira County, Kenya
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-stone-800">How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-emerald-600 font-bold text-sm font-body">
                        1
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-stone-800">
                        Submit Request
                      </p>
                      <p className="text-stone-600 text-sm font-body">
                        Fill out the booking form with your details
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-emerald-600 font-bold text-sm font-body">
                        2
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-stone-800">
                        We'll Contact You
                      </p>
                      <p className="text-stone-600 text-sm font-body">
                        Our team will call within 24 hours to confirm details
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-emerald-600 font-bold text-sm font-body">
                        3
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-stone-800">
                        Confirm & Pay
                      </p>
                      <p className="text-stone-600 text-sm font-body">
                        Secure your booking with a deposit
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-emerald-600 font-bold text-sm font-body">
                        4
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-stone-800">
                        Enjoy Your Visit
                      </p>
                      <p className="text-stone-600 text-sm font-body">
                        Experience the magic of Garden of Ancients
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="shadow-lg bg-amber-50 border-amber-200 border">
              <CardHeader>
                <CardTitle className="text-amber-800">
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-amber-900 text-sm font-body list-disc pl-5">
                  <li>
                    <span className="font-semibold">Pricing policy:</span> Rates
                    for tours and picnics are{" "}
                    <span className="font-semibold">per person.</span> Indicated
                    group rates cover a maximum of{" "}
                    <span className="font-semibold">30 people</span>. Additional
                    attendees are charged an{" "}
                    <span className="font-semibold">extra rate.</span>
                  </li>
                  <li>
                    <span className="font-semibold">
                      Photography/Videography:
                    </span>{" "}
                    Rates cover{" "}
                    <span className="font-semibold">up to 30 people</span>;
                    extras at an{" "}
                    <span className="font-semibold">agreed rate</span>.
                  </li>
                  <li>
                    <span className="font-semibold">Please Note:</span> Group
                    Packages cover 30 people maximum. Additional attendees
                    charged extra rates per person.
                  </li>
                  <li>
                    <span className="font-semibold">Kindly Note:</span>{" "}
                    Additional services including meals will need to be
                    pre-arranged and agreed upon prior to visiting.
                  </li>
                  <li>
                    <span className="font-semibold">
                      All payments via MPESA prior to visiting:
                    </span>
                    <br />
                    <span className="block">
                      PAYBILL: <span className="font-mono">400200</span>
                    </span>
                    <span className="block">
                      ACCOUNT: <span className="font-mono">857053</span>
                    </span>
                    <span className="block">
                      ACCOUNT NAME:{" "}
                      <span className="font-mono">GARDEN OF ANCIENTS</span>
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <Card className="shadow-lg bg-emerald-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="font-semibold text-stone-800 mb-4">
                    Trusted by 500+ Groups
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-stone-600 font-body">
                  <div>
                    <p className="font-semibold text-stone-800">200+</p>
                    <p>Schools Visited</p>
                  </div>
                  <div>
                    <p className="font-semibold text-stone-800">150+</p>
                    <p>Events Hosted</p>
                  </div>
                  <div>
                    <p className="font-semibold text-stone-800">1000+</p>
                    <p>Farmers Trained</p>
                  </div>
                  <div>
                    <p className="font-semibold text-stone-800">4.9/5</p>
                    <p>Average Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
