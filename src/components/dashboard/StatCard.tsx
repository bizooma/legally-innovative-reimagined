
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, description }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="text-2xl font-bold">{value}</div>
      <div className="font-medium text-lg mt-2 mb-1">{title}</div>
      <div className="text-sm text-gray-500">{description}</div>
    </CardContent>
  </Card>
);
