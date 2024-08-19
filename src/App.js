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
