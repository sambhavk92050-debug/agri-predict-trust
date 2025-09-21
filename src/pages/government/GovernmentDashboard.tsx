import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/dashboard/StatCard';
import { 
  Users, 
  MapPin, 
  BarChart3, 
  AlertTriangle, 
  TrendingUp,
  Shield,
  FileText,
  Globe
} from 'lucide-react';
import { mockRegionalData, climateImpactData } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

const GovernmentDashboard = () => {
  const { user } = useAuth();
  const totalFarms = mockRegionalData.reduce((sum, region) => sum + region.totalFarms, 0);
  const totalArea = mockRegionalData.reduce((sum, region) => sum + region.totalArea, 0);
  const avgYield = mockRegionalData.reduce((sum, region) => sum + region.avgYield, 0) / mockRegionalData.length;
  const highFoodSecurity = mockRegionalData.filter(r => r.foodSecurity === 'high').length;

  return (
    <div className="p-6 space-y-6 bg-gradient-earth min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Government Policy Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Regional agricultural analytics and policy insights for informed decision making
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-success border-success">
            <Shield className="h-3 w-3 mr-1" />
            Data Verified
          </Badge>
          <Button className="bg-gradient-primary">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Registered Farms"
          value={totalFarms.toLocaleString()}
          icon={Users}
          verified
          trend="up"
          change={5.2}
          changeLabel="this quarter"
        />
        <StatCard
          title="Total Agricultural Area"
          value={(totalArea / 1000).toFixed(0)}
          unit="K acres"
          icon={MapPin}
          trend="up"
          change={2.1}
          changeLabel="expansion"
        />
        <StatCard
          title="National Avg Yield"
          value={avgYield.toFixed(1)}
          unit="q/acre"
          icon={TrendingUp}
          trend="up"
          change={12.3}
          changeLabel="improvement"
          verified
        />
        <StatCard
          title="Food Security (High)"
          value={`${highFoodSecurity}/${mockRegionalData.length}`}
          unit="regions"
          icon={Shield}
          trend="up"
          change={8.7}
          changeLabel="improved"
        />
      </div>

      {/* Regional Overview */}
      <Card className="shadow-earth">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Regional Agricultural Overview
          </CardTitle>
          <CardDescription>
            State-wise agricultural performance and food security status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {mockRegionalData.map((region) => (
              <div key={region.region} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{region.region}</h3>
                    <p className="text-sm text-muted-foreground">
                      {region.totalFarms.toLocaleString()} farms • {(region.totalArea / 1000).toFixed(0)}K acres
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant={region.foodSecurity === 'high' ? 'default' : region.foodSecurity === 'medium' ? 'secondary' : 'destructive'}
                        className={region.foodSecurity === 'high' ? 'bg-success text-success-foreground' : ''}
                      >
                        {region.foodSecurity} food security
                      </Badge>
                      <Badge variant="outline">
                        {region.majorCrops.slice(0, 2).join(', ')}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-primary">
                    {region.avgYield} q/acre
                  </p>
                  <p className="text-sm text-muted-foreground">Average yield</p>
                  <div className="flex items-center gap-1 mt-1">
                    <AlertTriangle 
                      className={`h-3 w-3 ${
                        region.climateRisk > 0.6 ? 'text-destructive' : 
                        region.climateRisk > 0.4 ? 'text-warning' : 'text-success'
                      }`} 
                    />
                    <span className={`text-xs ${
                      region.climateRisk > 0.6 ? 'text-destructive' : 
                      region.climateRisk > 0.4 ? 'text-warning' : 'text-success'
                    }`}>
                      {(region.climateRisk * 100).toFixed(0)}% climate risk
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Climate Impact Analysis */}
        <Card className="shadow-earth">
          <CardHeader>
            <CardTitle>Climate Impact Analysis</CardTitle>
            <CardDescription>
              Environmental factors affecting agricultural productivity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {climateImpactData.map((item) => (
                <div key={item.factor} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{item.factor}</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        Trend: {item.trend}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            item.impact > 70 ? 'bg-destructive' : 
                            item.impact > 50 ? 'bg-warning' : 'bg-success'
                          }`}
                          style={{ width: `${item.impact}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{item.impact}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Policy Recommendations */}
        <Card className="shadow-earth">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Policy Recommendations
            </CardTitle>
            <CardDescription>
              AI-generated policy insights based on current data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-start gap-3">
                  <Badge className="bg-warning text-warning-foreground">Priority</Badge>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Water Resource Management</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Regions showing high climate risk require immediate irrigation infrastructure investment.
                    </p>
                    <p className="text-sm text-primary">Affected: Rajasthan, parts of UP</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-start gap-3">
                  <Badge variant="outline">Medium</Badge>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Crop Diversification Program</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Encourage farmers to adopt climate-resilient crop varieties to reduce risk.
                    </p>
                    <p className="text-sm text-primary">Target: All high-risk regions</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-start gap-3">
                  <Badge className="bg-success text-success-foreground">Success</Badge>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Technology Adoption Incentives</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Continue supporting IoT and AI adoption in high-performing regions.
                    </p>
                    <p className="text-sm text-primary">Focus: Punjab, Haryana</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GovernmentDashboard;