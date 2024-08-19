import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"

const PricingContent = () => (
  <div className="grid gap-4 md:grid-cols-3">
    <Card>
      <CardHeader>
        <CardTitle>Basic</CardTitle>
        <CardDescription>For occasional users</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">$9.99</p>
        <p className="text-sm text-muted-foreground">per month</p>
        <ul className="mt-4 space-y-2">
          <li>Up to 5 hours of transcription</li>
          <li>Basic formatting options</li>
          <li>Email support</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Choose Plan</Button>
      </CardFooter>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Pro</CardTitle>
        <CardDescription>For regular users</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">$24.99</p>
        <p className="text-sm text-muted-foreground">per month</p>
        <ul className="mt-4 space-y-2">
          <li>Up to 20 hours of transcription</li>
          <li>Advanced formatting options</li>
          <li>Priority email support</li>
          <li>Speaker diarization</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Choose Plan</Button>
      </CardFooter>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Enterprise</CardTitle>
        <CardDescription>For heavy users</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">Custom</p>
        <p className="text-sm text-muted-foreground">Contact us for pricing</p>
        <ul className="mt-4 space-y-2">
          <li>Unlimited transcription</li>
          <li>All formatting options</li>
          <li>24/7 phone and email support</li>
          <li>Custom AI integrations</li>
          <li>Dedicated account manager</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Contact Sales</Button>
      </CardFooter>
    </Card>
  </div>
);

export default PricingContent;
