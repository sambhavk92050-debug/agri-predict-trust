import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeLabel?: string;
  icon?: React.ComponentType<{ className?: string }>;
  trend?: 'up' | 'down' | 'neutral';
  verified?: boolean;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  change,
  changeLabel,
  icon: IconComponent,
  trend,
  verified,
  className
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3" />;
      case 'down':
        return <TrendingDown className="h-3 w-3" />;
      default:
        return <Minus className="h-3 w-3" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className={cn("relative", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="flex items-center gap-2">
          {verified && (
            <Badge variant="outline" className="text-success border-success text-xs">
              Verified
            </Badge>
          )}
          {IconComponent && (
            <div className="p-1 bg-primary/10 rounded">
              <IconComponent className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">
              {value}
            </span>
            {unit && (
              <span className="text-sm text-muted-foreground">
                {unit}
              </span>
            )}
          </div>
          
          {change !== undefined && (
            <div className={cn("flex items-center gap-1 text-xs", getTrendColor())}>
              {getTrendIcon()}
              <span>
                {change > 0 ? '+' : ''}{change}%
              </span>
              {changeLabel && (
                <span className="text-muted-foreground">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};