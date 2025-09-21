import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/dashboard/StatCard';
import { 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  AlertTriangle, 
  Building2,
  Shield,
  FileText,
  Target
} from 'lucide-react';
import { mockMarketData } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

const BusinessDashboard = () => {
  const { user } = useAuth();
  
  const marketTrends = {
    totalMarketValue: 45.7, // billion USD
    avgPriceIncrease: 6.8,
    highDemandCrops: 3,
    riskAssessmentScore: 72
  };

  const investmentOpportunities = [
    {
      crop: 'Cotton',
      region: 'Gujarat',
      roi: 18.5,
      risk: 'Medium',
      investment: 2.5,
      timeframe: '6-8 months'
    },
    {
      crop: 'Wheat',
      region: 'Punjab',
      roi: 12.3,
      risk: 'Low',
      investment: 4.2,
      timeframe: '4-6 months'
    },
    {
      crop: 'Rice',
      region: 'Haryana',
      roi: 15.7,
      risk: 'Medium',
      investment: 3.8,
      timeframe: '5-7 months'
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-gradient-earth min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Business Intelligence Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Market insights, demand forecasting, and investment analytics for agri-business
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-success border-success">
            <Shield className="h-3 w-3 mr-1" />
            Data Verified
          </Badge>
          <Button className="bg-gradient-primary">
            <FileText className="h-4 w-4 mr-2" />
            Export Analysis
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Market Value"
          value={marketTrends.totalMarketValue}
          unit="B USD"
          icon={DollarSign}
          verified
          trend="up"
          change={8.2}
          changeLabel="YoY growth"
        />
        <StatCard
          title="Avg Price Increase"
          value={marketTrends.avgPriceIncrease}
          unit="%"
          icon={TrendingUp}
          trend="up"
          change={marketTrends.avgPriceIncrease}
          changeLabel="this quarter"
        />
        <StatCard
          title="High Demand Crops"
          value={marketTrends.highDemandCrops}
          icon={Target}
          trend="up"
          change={50}
          changeLabel="increase"
        />
        <StatCard
          title="Risk Assessment"
          value={marketTrends.riskAssessmentScore}
          unit="/100"
          icon={BarChart3}
          trend="up"
          change={5.3}
          changeLabel="improvement"
          verified
        />
      </div>

      {/* Market Overview */}
      <Card className="shadow-earth">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Market Overview & Price Trends
          </CardTitle>
          <CardDescription>
            Real-time commodity prices and market dynamics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {mockMarketData.map((market) => (
              <div key={market.crop} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{market.crop}</h3>
                    <p className="text-sm text-muted-foreground">
                      ₹{market.currentPrice.toLocaleString()}/quintal
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant={market.demand === 'high' ? 'default' : 'secondary'}
                        className={market.demand === 'high' ? 'bg-success text-success-foreground' : ''}
                      >
                        {market.demand} demand
                      </Badge>
                      <Badge 
                        variant={market.supply === 'deficit' ? 'destructive' : market.supply === 'surplus' ? 'secondary' : 'outline'}
                      >
                        {market.supply}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-semibold ${
                    market.priceChange > 0 ? 'text-success' : 'text-destructive'
                  }`}>
                    {market.priceChange > 0 ? '+' : ''}{market.priceChange}%
                  </p>
                  <p className="text-sm text-muted-foreground">Price change</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    <span className="text-xs text-primary">
                      6-month forecast: ₹{market.forecast[market.forecast.length - 1].toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Investment Opportunities */}
        <Card className="shadow-earth">
          <CardHeader>
            <CardTitle>Investment Opportunities</CardTitle>
            <CardDescription>
              AI-analyzed investment prospects with ROI projections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investmentOpportunities.map((opportunity, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{opportunity.crop}</h3>
                      <p className="text-sm text-muted-foreground">{opportunity.region}</p>
                    </div>
                    <Badge 
                      variant={opportunity.risk === 'Low' ? 'default' : 'secondary'}
                      className={opportunity.risk === 'Low' ? 'bg-success text-success-foreground' : ''}
                    >
                      {opportunity.risk} Risk
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Expected ROI</p>
                      <p className="font-semibold text-primary">{opportunity.roi}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Investment</p>
                      <p className="font-semibold">₹{opportunity.investment}M</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Timeframe</p>
                      <p className="font-semibold">{opportunity.timeframe}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <Badge variant="outline" className="text-xs">Available</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Analysis */}
        <Card className="shadow-earth">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Risk Analysis & Insurance
            </CardTitle>
            <CardDescription>
              Comprehensive risk assessment for agricultural investments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-start gap-3">
                  <Badge className="bg-destructive text-destructive-foreground">High Risk</Badge>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Climate Change Impact</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Increasing temperature and unpredictable rainfall patterns affecting crop cycles.
                    </p>
                    <p className="text-sm text-primary">Mitigation: Climate-resilient crop insurance</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-start gap-3">
                  <Badge className="bg-warning text-warning-foreground">Medium Risk</Badge>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Market Volatility</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Commodity price fluctuations due to global supply chain disruptions.
                    </p>
                    <p className="text-sm text-primary">Hedge: Forward contracts available</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-start gap-3">
                  <Badge className="bg-success text-success-foreground">Low Risk</Badge>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Technology Adoption</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      High farmer acceptance of AI and IoT solutions showing stable returns.
                    </p>
                    <p className="text-sm text-primary">Opportunity: Scale technology investments</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-primary mb-2">Insurance Recommendations</h4>
                <ul className="text-sm space-y-1">
                  <li>• Crop yield insurance: 85% coverage recommended</li>
                  <li>• Weather-based insurance: Essential for rainfall-dependent crops</li>
                  <li>• Price volatility protection: Consider for export-oriented crops</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessDashboard;