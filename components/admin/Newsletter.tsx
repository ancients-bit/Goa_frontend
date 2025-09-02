import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Newsletter() {
  return (
    <Card className="border-0 shadow-sm blurred">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Newsletter</CardTitle>
        <CardDescription>Create and send newsletters to subscribers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Newsletter subject..." />
        <Textarea placeholder="Write your newsletter content..." rows={4} />
        <div className="flex space-x-2">
          <Button className="bg-emerald-600 hover:bg-emerald-700">Send Newsletter</Button>
          <Button variant="outline">Send Test to Myself</Button>
        </div>
        <div className="pt-2 border-t">
          <p className="text-sm text-gray-600">Last sent: Jan 10, 2024 • 2,847 subscribers</p>
        </div>
      </CardContent>
    </Card>
  );
}
