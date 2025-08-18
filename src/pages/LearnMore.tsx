import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  TrendingUp, 
  Cloud, 
  Droplets, 
  Sprout, 
  Users, 
  Smartphone, 
  BarChart3,
  CheckCircle,
  Star,
  Quote,
  ArrowRight,
  MapPin,
  Thermometer,
  Leaf
} from "lucide-react";
import AuthModal from "@/components/AuthModal";

const LearnMore = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setIsAuthModalOpen(true);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const features = [
    {
      icon: <Sprout className="w-8 h-8" />,
      title: "Soil Health & Biodiversity Insights",
      description: "Gain deep insights into your soil's health and biodiversity. Learn how to improve your land's resilience, organic matter, and microbial life for a thriving ecosystem.",
      image: "https://images.pexels.com/photos/169677/pexels-photo-169677.jpeg?auto=compress&fit=crop&w=1260&q=80",
      benefits: ["Boost soil fertility sustainably", "Enhance biodiversity", "Combat land degradation"]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Region-Specific Crop Recommendations",
      description: "Get personalized crop suggestions based on your soil, climate, and region. Our tool helps you choose crops that thrive and support local biodiversity.",
      image: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&fit=crop&w=1260&q=80",
      benefits: ["Grow crops suited to your land", "Support sustainable agriculture", "Increase resilience to climate change"]
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Weather Prediction for Smart Decisions",
      description: "Receive accurate weather forecasts to plan your farming activities. Make informed decisions on when to till, plant, and harvest, reducing risk and supporting soil conservation.",
      image: "https://www.roadscience.co.nz/assets/images/weather.jpg",
      benefits: ["Plan ahead for rainfall and drought", "Reduce soil erosion", "Optimize farm operations"]
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Desertification Prevention & Land Restoration",
      description: "Get actionable advice to prevent desertification and restore degraded land. Learn best practices for water retention, cover cropping, and organic amendments.",
      image: "https://www.iberdrola.com/documents/20125/42541/Desertificacion_746x419.jpg/c83c1c04-5a1f-c171-733b-d132b852f6fb?t=1631776118778",
      benefits: ["Protect your land from desertification", "Restore soil vitality", "Promote a greener future"]
    }
  ];

  const testimonials = [
    {
      name: "John Mwangi",
      role: "Environmentalist",
      location: "Nakuru, Kenya",
      rating: 5,
      content: "This app has transformed my approach to land management. I've seen a 30% improvement in soil biodiversity since using the recommendations. The weather alerts are incredibly accurate!",
      avatar: "https://images.pexels.com/photos/20371811/pexels-photo-20371811/free-photo-of-smiling-farmer-standing-on-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      name: "Sarah Ochieng",
      role: "Soil Conservationist",
      location: "Kiambu, Kenya",
      rating: 5,
      content: "The soil analysis feature helped me understand exactly what my land needed. My restoration projects have improved significantly, and I'm seeing better ecosystem health.",
      avatar: "https://images.pexels.com/photos/1719669/pexels-photo-1719669.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
      name: "David Kamau",
      role: "Environmental Advocate",
      location: "Eldoret, Kenya",
      rating: 5,
      content: "As a community environmentalist, I was skeptical about technology, but this app is so easy to use. The biodiversity insights are spot-on, and I've reduced land degradation by 40%.",
      avatar: "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Land Stewards Empowered" },
    { number: "30%", label: "Improved Soil Biodiversity" },
    { number: "95%", label: "Weather Forecast Accuracy" },
    { number: "100+", label: "Regions Supported" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <div className="flex items-center gap-2">
              <Sprout className="w-6 h-6 text-green-600" />
              <span className="text-xl font-bold text-gray-900">Climate-Smart Soil Advisor</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Empowering Sustainable Land Management
            <span className="block text-green-200">for a Greener Planet</span>
          </h1>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Our platform helps you understand your soil, select the right crops, and take action to improve biodiversity and prevent desertification. Make every decision count for your land and the environment.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Farming
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of tools combines cutting-edge AI technology with 
              practical farming knowledge to deliver real results.
            </p>
          </div>

          <div className="space-y-20">
            {features.map((feature, index) => (
              <div key={index} className={`flex flex-col lg:flex-row gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                <div className="lg:w-1/2">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                          {feature.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                      <div className="space-y-2">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                      <Leaf className="w-4 h-4" />
                      Feature #{index + 1}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">{feature.description}</p>
                    <div className="grid grid-cols-1 gap-4">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="font-medium text-gray-900">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Environmentalists Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of dedicated environmentalists who have transformed their land management practices with our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-green-200 mb-4" />
                  <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Restore and Protect Your Land?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join a growing community of environmentalists using technology to enhance soil health, boost biodiversity, and fight desertification. Start your journey to a more sustainable future today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-green-700 hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-lg"
              onClick={handleGetStarted}
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="default" 
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
              onClick={handleBackToHome}
            >
              Back to Home
            </Button>
          </div>
          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-green-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm">No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm">Promotes Biodiversity</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm">Supports Land Restoration</span>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
};

export default LearnMore; 