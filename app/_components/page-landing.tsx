'use client';

import { ArrowRight, BarChart3, Brain, CheckCircle, Sparkles, Zap, Layers } from 'lucide-react';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Footer } from '~/components/ui/footer';
import { Navbar } from '~/components/ui/navbar';
import { navigationGuest } from '../navigation';

export function PageLanding() {
  return (
    <section className="min-h-screen flex flex-col bg-(--bg-primary) text-(--text-primary)">
      <Navbar navigation={navigationGuest} />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-accent/30 to-background" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 text-sm font-medium text-accent-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Next-Gen Intelligence Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Supercharge Your Workflow with{' '}
              <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">Smart Automation</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              The ultimate all-in-one platform to manage your data, automate repetitive tasks, and unlock actionable insights in
              seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Core Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to scale your productivity and streamline your operations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-border/50 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Instant Integration</h3>
                <p className="text-muted-foreground">
                  Connect your existing tools seamlessly. Our system supports various data sources and formats out of the box.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Adaptive AI</h3>
                <p className="text-muted-foreground">
                  Leverage machine learning models that evolve with your data to provide increasingly accurate results.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Deep Analytics</h3>
                <p className="text-muted-foreground">
                  Transform raw data into visual stories. Monitor performance and trends through our real-time dashboard.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Why Choose Our Platform?</h2>
              <div className="space-y-4">
                {[
                  'Automate complex manual workflows',
                  'Enterprise-grade data security',
                  'Intuitive and modern user experience',
                  'Dedicated 24/7 technical support',
                  'Regular updates with new features',
                  'Cost-effective and highly scalable',
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <p className="text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-linear-to-br from-primary/20 to-accent/30 p-8 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="h-32 w-32 bg-background/50 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Layers className="h-16 w-16 text-primary" />
                  </div>
                  <p className="text-lg font-semibold text-foreground">Built for Growth & Scalability</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already improved their productivity with our intelligent solutions.
          </p>
          <Link href="/login">
            <Button size="lg" variant="secondary" className="shadow-lg">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </section>
  );
}
