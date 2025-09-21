import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Leaf, Users, Building2, Brain, Shield, BarChart3, Sprout } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

const Landing = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');
  const [isSignUp, setIsSignUp] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const roleConfig = {
    farmer: {
      icon: Sprout,
      title: 'Farmers',
      description: 'AI-powered crop predictions, yield optimization, and smart farming recommendations',
      features: ['Crop Yield Predictions', 'Pest & Disease Alerts', 'Resource Optimization', 'Multilingual Support'],
      demoCredentials: { email: 'farmer@demo.com', password: 'demo123' }
    },
    government: {
      icon: Users,
      title: 'Government & Policymakers',
      description: 'Regional analytics, policy insights, and climate impact assessments',
      features: ['Regional Analytics', 'Policy Dashboard', 'Climate Impact Reports', 'Food Security Metrics'],
      demoCredentials: { email: 'gov@demo.com', password: 'demo123' }
    },
    business: {
      icon: Building2,
      title: 'Agri-businesses & Financial',
      description: 'Market insights, demand forecasting, and investment risk analysis',
      features: ['Demand-Supply Analytics', 'ROI Projections', 'Insurance Risk Assessment', 'Market Trends'],
      demoCredentials: { email: 'business@demo.com', password: 'demo123' }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Error",
            description: "Passwords do not match",
            variant: "destructive"
          });
          return;
        }
        
        const success = await signup(formData.email, formData.password, formData.name, selectedRole);
        if (success) {
          toast({
            title: "Success",
            description: "Account created successfully!"
          });
          navigate(`/${selectedRole}`);
        } else {
          toast({
            title: "Error",
            description: "User already exists",
            variant: "destructive"
          });
        }
      } else {
        const success = await login(formData.email, formData.password, selectedRole);
        if (success) {
          toast({
            title: "Success",
            description: "Logged in successfully!"
          });
          navigate(`/${selectedRole}`);
        } else {
          toast({
            title: "Error",
            description: "Invalid credentials",
            variant: "destructive"
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: UserRole) => {
    const config = roleConfig[role];
    setIsLoading(true);
    
    try {
      const success = await login(config.demoCredentials.email, config.demoCredentials.password, role);
      if (success) {
        toast({
          title: "Demo Access",
          description: `Logged in as ${config.title} demo user`
        });
        navigate(`/${role}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-primary text-primary-foreground">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Leaf className="h-12 w-12 text-primary-foreground" />
              <h1 className="text-4xl md:text-6xl font-bold">CropAI Portal</h1>
            </div>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
              AI-Powered Crop Yield Prediction & Optimization Platform
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Badge variant="secondary" className="px-4 py-2 text-lg">
                <Brain className="h-4 w-4 mr-2" />
                AI Predictions
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-lg">
                <Shield className="h-4 w-4 mr-2" />
                Blockchain Verified
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-lg">
                <BarChart3 className="h-4 w-4 mr-2" />
                Real-time Analytics
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Role Selection */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground mb-6">Choose Your Role</h2>
            
            {Object.entries(roleConfig).map(([role, config]) => {
              const IconComponent = config.icon;
              return (
                <Card 
                  key={role}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-glow ${
                    selectedRole === role ? 'ring-2 ring-primary shadow-glow' : ''
                  }`}
                  onClick={() => setSelectedRole(role as UserRole)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{config.title}</CardTitle>
                        <CardDescription className="mt-1">{config.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {config.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDemoLogin(role as UserRole);
                      }}
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      disabled={isLoading}
                    >
                      Try Demo
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Login/Signup Form */}
          <div className="lg:sticky lg:top-6">
            <Card className="shadow-earth">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </CardTitle>
                <CardDescription>
                  Access your {roleConfig[selectedRole].title.toLowerCase()} dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {isSignUp && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                    />
                  </div>

                  {isSignUp && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        required
                      />
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <Button 
                    variant="link" 
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-primary"
                  >
                    {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                  </Button>
                </div>

                {!isSignUp && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Demo Credentials:</p>
                    <p className="text-xs font-mono">
                      {roleConfig[selectedRole].demoCredentials.email} / {roleConfig[selectedRole].demoCredentials.password}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;