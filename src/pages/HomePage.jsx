import React, { useState } from "react";
import {
  Menu,
  X,
  BarChart3,
  Users,
  Calendar,
  Shield,
  ArrowRight,
  Check,
  Star,
} from "lucide-react";

export default function OrganivoHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-blue-500 rounded-lg p-2 mr-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-6 bg-white rounded-sm"></div>
                  <div className="w-2 h-4 bg-white rounded-sm mt-2"></div>
                  <div className="w-2 h-8 bg-white rounded-sm"></div>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-800">ORGANIVO</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="/login"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Login
              </a>
              <a
                href="/signup"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Sign Up Free
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#features" className="block px-3 py-2 text-gray-700">
                  Features
                </a>
                <a href="#pricing" className="block px-3 py-2 text-gray-700">
                  Pricing
                </a>
                <a href="#about" className="block px-3 py-2 text-gray-700">
                  About
                </a>
                <a href="#contact" className="block px-3 py-2 text-gray-700">
                  Contact
                </a>
                <div className="px-3 py-2 space-y-2">
                  <a
                    href="/login"
                    className="block w-full text-left text-gray-700"
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="block w-full bg-blue-500 text-white py-2 px-4 rounded-lg"
                  >
                    Sign Up Free
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              Organize Your Business
              <span className="text-blue-500 block mt-5">Like Never Before</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline your workflow, boost productivity, and grow your
              business with Organivo's powerful suite of organizational tools
              designed for modern teams.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center transition-colors">
                Get Started Free
                <ArrowRight className="ml-2" size={20} />
              </button>
              <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Stay Organized
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you manage projects, teams, and
              workflows efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="text-blue-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Advanced Analytics
              </h3>
              <p className="text-gray-600">
                Get deep insights into your business performance with
                comprehensive analytics and reporting tools.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Users className="text-green-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Team Collaboration
              </h3>
              <p className="text-gray-600">
                Work seamlessly with your team through real-time collaboration
                and communication features.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Calendar className="text-purple-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Smart Scheduling
              </h3>
              <p className="text-gray-600">
                Intelligent scheduling system that adapts to your workflow and
                optimizes your time management.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Shield className="text-red-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Enterprise Security
              </h3>
              <p className="text-gray-600">
                Bank-level security with end-to-end encryption to keep your
                business data safe and secure.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="text-yellow-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Custom Workflows
              </h3>
              <p className="text-gray-600">
                Create custom workflows that match your business processes and
                automate repetitive tasks.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Users className="text-indigo-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Round-the-clock customer support to help you get the most out of
                your Organivo experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that's right for your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$9</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3" size={20} />
                  Up to 5 users
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3" size={20} />
                  Basic analytics
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3" size={20} />
                  Email support
                </li>
              </ul>
              <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:border-gray-400 transition-colors">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-blue-500 rounded-2xl shadow-xl p-8 text-white relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-blue-200">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="text-white mr-3" size={20} />
                  Up to 25 users
                </li>
                <li className="flex items-center">
                  <Check className="text-white mr-3" size={20} />
                  Advanced analytics
                </li>
                <li className="flex items-center">
                  <Check className="text-white mr-3" size={20} />
                  Priority support
                </li>
                <li className="flex items-center">
                  <Check className="text-white mr-3" size={20} />
                  Custom integrations
                </li>
              </ul>
              <button className="w-full bg-white text-blue-500 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                Get Started
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Enterprise
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$99</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3" size={20} />
                  Unlimited users
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3" size={20} />
                  Enterprise analytics
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3" size={20} />
                  24/7 phone support
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3" size={20} />
                  Advanced security
                </li>
              </ul>
              <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:border-gray-400 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by 10,000+ Companies
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-400 fill-current"
                    size={20}
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "Organivo has transformed how we manage our projects. The team
                collaboration features are incredible!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  JD
                </div>
                <div>
                  <div className="font-semibold text-gray-900">John Doe</div>
                  <div className="text-gray-600">CEO, Tech Corp</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-400 fill-current"
                    size={20}
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "The analytics dashboard gives us insights we never had before.
                Highly recommended!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  SM
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Sarah Miller
                  </div>
                  <div className="text-gray-600">CTO, StartupXYZ</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-400 fill-current"
                    size={20}
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "Simple, powerful, and exactly what our growing team needed to
                stay organized."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  MJ
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Mike Johnson
                  </div>
                  <div className="text-gray-600">Founder, Design Studio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of companies using Organivo to streamline their
            operations and boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-blue-500 hover:bg-gray-50 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-500 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-blue-500 rounded-lg p-2 mr-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-6 bg-white rounded-sm"></div>
                    <div className="w-2 h-4 bg-white rounded-sm mt-2"></div>
                    <div className="w-2 h-8 bg-white rounded-sm"></div>
                  </div>
                </div>
                <span className="text-2xl font-bold">ORGANIVO</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering businesses to organize, collaborate, and grow with
                innovative productivity solutions.
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Organivo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
