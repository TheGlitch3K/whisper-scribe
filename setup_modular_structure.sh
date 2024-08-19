#!/bin/bash

mkdir -p src/components

cat << 'EOF' > src/components/DashboardContent.js
import React from 'react';
import { Mic, Upload, DollarSign, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const DashboardContent = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Transcriptions</CardTitle>
        <Mic className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">254</div>
        <p className="text-xs text-muted-foreground">+20% from last month</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
        <Upload className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">15.3 GB</div>
        <p className="text-xs text-muted-foreground">of 20 GB limit</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$5,231</div>
        <p className="text-xs text-muted-foreground">+10% from last month</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">1,234</div>
        <p className="text-xs text-muted-foreground">+7% from last week</p>
      </CardContent>
    </Card>
  </div>
);

export default DashboardContent;
EOF

cat << 'EOF' > src/components/TranscriptionContent.js
import React from 'react';
import { Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"

const TranscriptionContent = () => (
  <Card>
    <CardHeader>
      <CardTitle>Start New Transcription</CardTitle>
      <CardDescription>Upload your audio or video file to begin transcription</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">MP3, MP4, WAV, or MOV (MAX. 800MB)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline">Cancel</Button>
      <Button>Start Transcription</Button>
    </CardFooter>
  </Card>
);

export default TranscriptionContent;
EOF

cat << 'EOF' > src/components/PricingContent.js
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
EOF

cat << 'EOF' > src/App.js
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import DashboardContent from './components/DashboardContent';
import TranscriptionContent from './components/TranscriptionContent';
import PricingContent from './components/PricingContent';
import './index.css';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Transcription App</h1>
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="transcription">New Transcription</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <DashboardContent />
        </TabsContent>
        <TabsContent value="transcription">
          <TranscriptionContent />
        </TabsContent>
        <TabsContent value="pricing">
          <PricingContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
EOF

echo "Modular structure has been set up successfully."
