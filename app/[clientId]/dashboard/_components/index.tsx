'use client';

import { Bookmark, FileText, List, TrendingUp, Upload, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

export const Component: FC = () => {
  const { push } = useRouter();

  const stats = [
    { label: 'Total CV Dianalisis', value: '245', icon: FileText, color: 'text-primary' },
    { label: 'Kandidat Potensial', value: '89', icon: Users, color: 'text-primary' },
    { label: 'Tingkat Akurasi', value: '94.5%', icon: TrendingUp, color: 'text-primary' },
    { label: 'CV Tersimpan', value: '34', icon: Bookmark, color: 'text-primary' },
  ];

  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-sm border-border/50 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            className="shadow-sm border-border/50 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => push('/analyze/single')}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Single CV Analyzer
              </CardTitle>
              <CardDescription>Analisis satu CV</CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="shadow-sm border-border/50 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => push('/analyze/bulk')}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Bulk CV Analyzer
              </CardTitle>
              <CardDescription>Analisis banyak CV</CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="shadow-sm border-border/50 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => push('/job-descriptions')}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <List className="h-5 w-5 text-primary" />
                Job Descriptions
              </CardTitle>
              <CardDescription>Kelola job desc</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Analysis */}
        <Card className="shadow-sm border-border/50">
          <CardHeader>
            <CardTitle>Analisis Terbaru</CardTitle>
            <CardDescription>CV yang baru saja diproses oleh sistem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Ahmad Rizki', position: 'Frontend Developer', score: 92 },
                { name: 'Siti Nurhaliza', position: 'UI/UX Designer', score: 88 },
                { name: 'Budi Santoso', position: 'Backend Developer', score: 85 },
              ].map((candidate, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{candidate.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{candidate.name}</p>
                      <p className="text-sm text-muted-foreground">{candidate.position}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{candidate.score}</p>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
