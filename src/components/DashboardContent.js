import React, { useState, useEffect } from 'react';
import { Mic, Upload, DollarSign, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const DashboardContent = () => {
  const [stats, setStats] = useState({
    totalTranscriptions: 0,
    storageUsed: 0,
    totalRevenue: 0,
    activeUsers: 0
  });

  useEffect(() => {
    // Simulate fetching dashboard data
    const fetchStats = () => {
      setStats({
        totalTranscriptions: Math.floor(Math.random() * 1000),
        storageUsed: (Math.random() * 20).toFixed(1),
        totalRevenue: (Math.random() * 10000).toFixed(2),
        activeUsers: Math.floor(Math.random() * 5000)
      });
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Transcriptions</CardTitle>
          <Mic className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalTranscriptions}</div>
          <p className="text-xs text-muted-foreground">+20% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
          <Upload className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.storageUsed} GB</div>
          <p className="text-xs text-muted-foreground">of 20 GB limit</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.totalRevenue}</div>
          <p className="text-xs text-muted-foreground">+10% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeUsers}</div>
          <p className="text-xs text-muted-foreground">+7% from last week</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContent;
