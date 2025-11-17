import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { useBudgetComparison } from '@/hooks/useBudgetComparison';
import { Loader2 } from 'lucide-react';

const chartConfig = {
  budgeted: {
    label: 'Budgeted',
    color: 'hsl(var(--primary))',
  },
  actual: {
    label: 'Actual',
    color: 'hsl(var(--chart-2))',
  },
};

export const BudgetComparisonChart = () => {
  const { data: comparisonData, isLoading } = useBudgetComparison(6);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Budget vs Actual Spending</CardTitle>
          <CardDescription>Compare budgeted amounts against actual expenses</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!comparisonData || comparisonData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Budget vs Actual Spending</CardTitle>
          <CardDescription>Compare budgeted amounts against actual expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No budget data available. Add budget items to see comparison.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget vs Actual Spending</CardTitle>
        <CardDescription>Last 6 months comparison of budgeted amounts vs actual expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="month" 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `$${value}`}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              formatter={(value: number) => [`$${value.toFixed(2)}`]}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="rect"
            />
            <Bar 
              dataKey="budgeted" 
              fill="var(--color-budgeted)" 
              radius={[4, 4, 0, 0]}
              name="Budgeted"
            />
            <Bar 
              dataKey="actual" 
              fill="var(--color-actual)" 
              radius={[4, 4, 0, 0]}
              name="Actual"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
