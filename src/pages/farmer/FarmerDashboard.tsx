import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/dashboard/StatCard';
import { YieldChart } from '@/components/charts/YieldChart';
import { 
  Sprout, 
  Droplets, 
  Thermometer, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  Calendar,
  MapPin,
  Shield
} from 'lucide-react';
import { mockCrops, mockPredictions, yieldTrendData, resourceOptimization } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

const FarmerDashboard = () => {
  const { user } = useAuth();
  const activeCrops = mockCrops.filter(crop => crop.currentStage !== 'Harvested');
  const harvestedCrops = mockCrops.filter(crop => crop.currentStage === 'Harvested');

  return (
    <div className="p-6 space-y-6 bg-gradient-earth min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor your crops and optimize your farming operations with AI insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-success border-success">
            <Shield className="h-3 w-3 mr-1" />
            Data Verified
          </Badge>
          <Button className="bg-gradient-hero hover:shadow-glow">
            <Sprout className="h-4 w-4 mr-2" />
            Add New Crop
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Crop Area"
          value={mockCrops.reduce((sum, crop) => sum + crop.area, 0).toFixed(1)}
          unit="acres"
          icon={MapPin}
          verified
          trend="up"
          change={12.5}
          changeLabel="vs last season"
        />
        <StatCard
          title="Active Crops"
          value={activeCrops.length}
          icon={Sprout}
          trend="neutral"
        />
        <StatCard
          title="Avg Predicted Yield"
          value={41.7}
          unit="q/acre"
          icon={TrendingUp}
          trend="up"
          change={8.3}
          changeLabel="vs last year"
          verified
        />
        <StatCard
          title="Water Efficiency"
          value={85}
          unit="%"
          icon={Droplets}
          trend="up"
          change={15.2}
          changeLabel="optimized"
        />
      </div>

      {/* Active Crops Status */}
      <Card className="shadow-earth">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sprout className="h-5 w-5 text-primary" />
            Active Crops Status
          </CardTitle>
          <CardDescription>
            Real-time monitoring of your current crop cycles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {activeCrops.map((crop) => {
              const prediction = mockPredictions[crop.id];
              return (
                <div key={crop.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Sprout className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{crop.cropType} - {crop.variety}</h3>
                      <p className="text-sm text-muted-foreground">
                        {crop.area} acres • Current: {crop.currentStage}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant={crop.healthStatus === 'excellent' ? 'default' : 'secondary'}
                          className={crop.healthStatus === 'excellent' ? 'bg-success text-success-foreground' : ''}
                        >
                          {crop.healthStatus}
                        </Badge>
                        {crop.verified && (
                          <Badge variant="outline" className="text-success border-success">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-primary">
                      {crop.predictedYield} q/acre
                    </p>
                    <p className="text-sm text-muted-foreground">Predicted yield</p>
                    {prediction && (
                      <p className="text-xs text-success">
                        {prediction.confidence}% confidence
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Yield Trends */}
        <Card className="shadow-earth">
          <CardHeader>
            <CardTitle>Yield Trends & AI Predictions</CardTitle>
            <CardDescription>
              Historical yield data vs AI predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <YieldChart data={yieldTrendData} />
          </CardContent>
        </Card>

        {/* Resource Optimization */}
        <Card className="shadow-earth">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Resource Optimization
            </CardTitle>
            <CardDescription>
              AI-recommended optimizations for sustainable farming
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(resourceOptimization).map(([resource, data]) => (
                <div key={resource} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium capitalize">{resource}</p>
                    <p className="text-sm text-muted-foreground">
                      Current: {data.current} {data.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-success">
                      -{data.savings}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {data.optimized} {data.unit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="shadow-earth">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            AI Recommendations & Alerts
          </CardTitle>
          <CardDescription>
            Actionable insights based on current crop conditions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.values(mockPredictions).map((prediction) => {
              const crop = mockCrops.find(c => c.id === prediction.cropId);
              return (
                <div key={prediction.cropId} className="p-4 border border-border rounded-lg">
                  <h3 className="font-semibold mb-2">{crop?.cropType} - {crop?.variety}</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-warning">Risk Factors:</p>
                      <ul className="text-sm text-muted-foreground ml-4 list-disc">
                        {prediction.riskFactors.map((risk, index) => (
                          <li key={index}>{risk}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-primary">Recommendations:</p>
                      <ul className="text-sm text-muted-foreground ml-4 list-disc">
                        {prediction.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerDashboard;