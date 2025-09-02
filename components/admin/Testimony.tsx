import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Alice Cooper",
    rating: 5,
    text: "Amazing experience! The garden tour was absolutely magical...",
    status: "pending",
  },
  {
    id: 2,
    name: "Bob Martinez",
    rating: 5,
    text: "Peaceful and rejuvenating. Highly recommend to anyone...",
    status: "pending",
  },
  {
    id: 3,
    name: "Carol Davis",
    rating: 4,
    text: "Beautiful gardens with rich history. Our guide was knowledgeable...",
    status: "approved",
  },
];

export default function Testimony() {
  return (
    <Card className="border-0 shadow-sm blurred">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Recent Testimonials
        </CardTitle>
        <CardDescription>Review and approve testimonials</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-sm">{testimonial.name}</p>
              <div className="flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">{testimonial.text}</p>
            {testimonial.status === "pending" && (
              <div className="flex space-x-2">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-xs">Approve</Button>
                <Button size="sm" variant="outline" className="text-xs bg-transparent">Deny</Button>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
