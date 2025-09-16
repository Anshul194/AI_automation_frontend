import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useRef } from "react";
import { Avatar } from "./ui/avatar";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  TrendingUp, 
  Target, 
  BarChart3, 
  Users, 
  MapPin, 
  Smartphone,
  Star,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export function LandingPage({ onLogin }: { onLogin: () => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    // Get user info from localStorage
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("user") || "null");
    } catch {}

    // Hide dropdown on outside click
    useEffect(() => {
      function handleClick(e: MouseEvent) {
        if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
          setShowProfile(false);
        }
      }
      if (showProfile) {
        document.addEventListener("mousedown", handleClick);
      } else {
        document.removeEventListener("mousedown", handleClick);
      }
      return () => document.removeEventListener("mousedown", handleClick);
    }, [showProfile]);
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("accessToken"));
    window.addEventListener("storage", () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    });
    return () => window.removeEventListener("storage", () => {});
  }, []);
  const features = [
    {
      icon: <TrendingUp className="h-8 w-8 text-dark-cta" />,
      title: "ROAS Tracking",
      description: "Monitor return on ad spend across all campaigns with real-time insights and performance breakdowns."
    },
    {
      icon: <Target className="h-8 w-8 text-dark-cta" />,
      title: "RTO Prediction",
      description: "Predict return to operations and identify high-risk regions before they impact your bottom line."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-dark-cta" />,
      title: "Scaling Insights",
      description: "Get AI-powered recommendations on when to scale, pause, or optimize your advertising campaigns."
    },
    {
      icon: <Users className="h-8 w-8 text-dark-cta" />,
      title: "Audience Analytics",
      description: "Understand performance by gender, age, and demographics to optimize targeting strategies."
    },
    {
      icon: <MapPin className="h-8 w-8 text-dark-cta" />,
      title: "Geo Performance",
      description: "India-specific heatmaps and state-wise analysis to identify your best and worst performing regions."
    },
    {
      icon: <Smartphone className="h-8 w-8 text-dark-cta" />,
      title: "Platform Insights",
      description: "Compare performance across Facebook, Instagram, Threads, and Audience Network placements."
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Founder, StyleCo",
      content: "Increased our ROAS by 340% in just 2 months. The geo-targeting insights were game-changing.",
      rating: 5
    },
    {
      name: "Rahul Gupta",
      role: "Marketing Head, FitLife",
      content: "Finally understand which states to avoid. Saved us ₹50L in wasted ad spend last quarter.",
      rating: 5
    },
    {
      name: "Anita Desai",
      role: "CEO, BeautyBox",
      content: "The audience breakdown by age and gender helped us 3x our conversion rate.",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "₹2,999",
      period: "/month",
      features: ["Up to ₹10L ad spend", "Basic ROAS tracking", "Email support", "Weekly reports"],
      popular: false
    },
    {
      name: "Growth",
      price: "₹7,999",
      period: "/month",
      features: ["Up to ₹50L ad spend", "Advanced analytics", "Priority support", "Daily insights", "Custom alerts"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "₹19,999",
      period: "/month",
      features: ["Unlimited ad spend", "White-label reports", "Dedicated manager", "API access", "Custom integrations"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="border-b border-dark-border bg-dark-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
            <span className="font-bold text-xl text-dark-primary">GenZway Marketing</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-dark-secondary hover:text-dark-primary transition-colors">Features</a>
            <a href="#pricing" className="text-dark-secondary hover:text-dark-primary transition-colors">Pricing</a>
            <a href="#testimonials" className="text-dark-secondary hover:text-dark-primary transition-colors">Reviews</a>
            {isLoggedIn ? (
                <div className="relative ml-4" ref={profileRef}>
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-dark-hover hover:bg-dark-border border border-dark-border transition-colors"
                    onClick={() => setShowProfile((v) => !v)}
                    aria-label="Profile"
                  >
                    <User className="w-6 h-6 text-dark-primary" />
                  </button>
                  {showProfile && (
                    <div className="absolute right-0 mt-2 w-56 bg-dark-card border border-dark-border rounded-xl shadow-lg p-4 z-50">
                      <div className="mb-2 font-semibold text-dark-primary">{user?.name || "User"}</div>
                      <div className="text-sm text-dark-secondary break-all">{user?.email || "No email"}</div>
                    </div>
                  )}
                </div>
            ) : (
              <Button 
                onClick={onLogin}
                className="dark-button-primary"
              >
                Login
              </Button>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-dark-tag text-dark-primary border-dark-cta">
                🚀 Your AI Growth Partner for D2C Brands
              </Badge>
              <h1 className="text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Scale Your D2C Brand with AI-Powered ROAS & RTO Intelligence
              </h1>
              <p className="text-xl text-dark-secondary leading-relaxed">
                Connect Facebook Ads + Shopify to get actionable insights on performance, 
                audience targeting, and geographic optimization. Stop wasting ad spend on low-converting regions.
              </p>
              <div className="flex gap-4">
                <Button 
                  onClick={onLogin}
                  size="lg" 
                  className="dark-button-primary text-lg px-8 py-4"
                >
                  Connect Meta Ads
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  onClick={onLogin}
                  size="lg" 
                  variant="outline" 
                  className="dark-button-secondary text-lg px-8 py-4"
                >
                  Connect Shopify
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="dark-card dark-shadow-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-dark-primary">Dashboard Preview</h3>
                  <Badge className="bg-dark-positive/20 text-dark-positive">Live Data</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-dark-hover rounded-lg">
                    <div className="text-2xl font-bold text-dark-positive">₹45.2L</div>
                    <div className="text-sm text-dark-secondary">Revenue</div>
                  </div>
                  <div className="p-4 bg-dark-hover rounded-lg">
                    <div className="text-2xl font-bold text-dark-cta">4.2x</div>
                    <div className="text-sm text-dark-secondary">ROAS</div>
                  </div>
                  <div className="p-4 bg-dark-hover rounded-lg">
                    <div className="text-2xl font-bold text-dark-negative">12%</div>
                    <div className="text-sm text-dark-secondary">RTO Rate</div>
                  </div>
                  <div className="p-4 bg-dark-hover rounded-lg">
                    <div className="text-2xl font-bold text-dark-primary">₹890</div>
                    <div className="text-sm text-dark-secondary">AOV</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-dark-primary">Everything You Need to Scale</h2>
            <p className="text-xl text-dark-secondary">Comprehensive analytics and insights for D2C success</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="dark-card dark-shadow p-6 hover:shadow-lg transition-all duration-300">
                <div className="space-y-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-dark-primary">{feature.title}</h3>
                  <p className="text-dark-secondary">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-dark-hover/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-dark-primary">Loved by 500+ D2C Brands</h2>
            <p className="text-xl text-dark-secondary">See how brands like yours are scaling with our platform</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="dark-card dark-shadow p-6">
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-dark-secondary">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-dark-primary">{testimonial.name}</div>
                    <div className="text-sm text-dark-secondary">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-dark-primary">Simple, Transparent Pricing</h2>
            <p className="text-xl text-dark-secondary">Choose the plan that fits your growth stage</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`dark-card dark-shadow p-8 relative ${
                plan.popular ? 'ring-2 ring-dark-cta' : ''
              }`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-dark-cta text-white">
                    Most Popular
                  </Badge>
                )}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-dark-primary">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold text-dark-primary">{plan.price}</span>
                      <span className="text-dark-secondary">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-dark-positive" />
                        <span className="text-dark-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={onLogin}
                    className={`w-full ${plan.popular ? 'dark-button-primary' : 'dark-button-secondary'}`}
                  >
                    Get Started
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-dark-primary">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            <Card className="dark-card p-6">
              <h3 className="font-semibold text-dark-primary mb-2">How quickly can I see results?</h3>
              <p className="text-dark-secondary">Most brands see actionable insights within 24 hours of connecting their accounts. Full optimization recommendations typically appear within 3-5 days.</p>
            </Card>
            <Card className="dark-card p-6">
              <h3 className="font-semibold text-dark-primary mb-2">Which platforms do you integrate with?</h3>
              <p className="text-dark-secondary">We currently support Facebook Ads, Instagram Ads, Shopify, and Google Analytics. More integrations are coming soon.</p>
            </Card>
            <Card className="dark-card p-6">
              <h3 className="font-semibold text-dark-primary mb-2">Is my data secure?</h3>
              <p className="text-dark-secondary">Yes, we use enterprise-grade encryption and never store sensitive payment information. Your data is processed securely and never shared with third parties.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-border bg-dark-card py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded"></div>
              <span className="font-semibold text-dark-primary">GenZway Marketing</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-dark-secondary">
              <a href="#" className="hover:text-dark-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-dark-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-dark-primary transition-colors">Contact</a>
            </div>
            <div className="text-sm text-dark-secondary">
              © 2024 GenZway Marketing. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}