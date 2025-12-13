'use client';

import { ArrowRight, BarChart3, Brain, CheckCircle, Sparkles, Upload } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Footer } from '~/components/ui/footer';
import { Navbar } from '~/components/ui/navbar';
import { url } from '~/lib/utils/converter';
import { navigationGuest } from '../navigation';

export function PageLanding() {
  const { status, data } = useSession();
  const { push } = useRouter();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <>
  useEffect(() => {
    if (status === 'authenticated') {
      push(url('/[clientId]/dashboard', { clientId: String(data.user.id) }));
    }
  }, []);
  return (
    <section className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Navbar navigation={navigationGuest} />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/30 to-background" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 text-sm font-medium text-accent-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Powered by AI & RAG Technology
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Analisis CV Kandidat dengan{' '}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Artificial Intelligence
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Sistem analisis CV yang terus belajar dan berkembang. Menggunakan RAG untuk hasil yang lebih akurat seiring waktu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all">
                  Mulai Sekarang
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Fitur Unggulan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Platform analisis CV dengan teknologi terdepan untuk membantu proses rekrutmen Anda
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-border/50 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Upload Mudah</h3>
                <p className="text-muted-foreground">
                  Upload CV dalam berbagai format. Sistem kami otomatis mengekstrak informasi penting.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">AI yang Belajar</h3>
                <p className="text-muted-foreground">
                  Teknologi RAG membuat sistem terus belajar dari data terbaru untuk hasil yang lebih akurat.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Analisis Mendalam</h3>
                <p className="text-muted-foreground">
                  Dapatkan insight lengkap tentang kualifikasi, pengalaman, dan kesesuaian kandidat.
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Mengapa Memilih CVAnalyzer?</h2>
              <div className="space-y-4">
                {[
                  'Analisis otomatis dengan akurasi tinggi',
                  'Sistem yang terus belajar dan berkembang',
                  'Dashboard intuitif dan mudah digunakan',
                  'Hemat waktu dalam proses screening kandidat',
                  'Laporan detail dan actionable insights',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/30 p-8 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Brain className="h-32 w-32 text-primary mx-auto" />
                  <p className="text-lg font-semibold text-foreground">Powered by Advanced AI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Meningkatkan Proses Rekrutmen Anda?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan perusahaan-perusahaan yang sudah mempercayai CVAnalyzer untuk proses rekrutmen mereka.
          </p>
          <Link href="/login">
            <Button size="lg" variant="secondary" className="shadow-lg">
              Coba Gratis Sekarang
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </section>
  );
}
