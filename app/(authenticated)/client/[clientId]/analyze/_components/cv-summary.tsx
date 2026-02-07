import { Award, Briefcase, GraduationCap, Star, Target, TrendingUp } from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import { Progress } from '~/components/ui/progress';
import { cn } from '~/lib/utils';

interface CVSummaryProps {
  hasFile: boolean;
}

const mockAnalysis = {
  overallScore: 78,
  relevanceScore: 82,
  experienceYears: 5,
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'SQL'],
  education: 'S1 Teknik Informatika',
  strengths: ['Pengalaman solid di bidang frontend', 'Kemampuan problem solving baik'],
  improvements: ['Kurang pengalaman leadership', 'Sertifikasi profesional belum ada'],
};

export function CVSummary({ hasFile }: CVSummaryProps) {
  if (!hasFile) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Target className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">Belum ada CV</h3>
        <p className="text-sm text-muted-foreground max-w-[280px]">
          Upload CV Anda untuk mendapatkan analisis lengkap tentang kualifikasi dan relevansi
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-4 space-y-5 animate-slide-up">
      {/* Overall Score */}
      <div className="p-4 rounded-lg bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">Skor Keseluruhan</span>
          <span className="text-2xl font-bold text-primary">{mockAnalysis.overallScore}%</span>
        </div>
        <Progress value={mockAnalysis.overallScore} className="h-2" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={Target} label="Relevansi" value={`${mockAnalysis.relevanceScore}%`} color="info" />
        <StatCard icon={Briefcase} label="Pengalaman" value={`${mockAnalysis.experienceYears} Tahun`} color="success" />
      </div>

      {/* Education */}
      <div className="p-3 rounded-lg bg-muted/50 border border-border">
        <div className="flex items-center gap-2 mb-1">
          <GraduationCap className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">Pendidikan</span>
        </div>
        <p className="text-sm font-medium text-foreground">{mockAnalysis.education}</p>
      </div>

      {/* Skills */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">Keahlian Utama</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {mockAnalysis.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* Strengths */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-success" />
          <span className="text-xs font-medium text-muted-foreground">Kekuatan</span>
        </div>
        <ul className="space-y-1.5">
          {mockAnalysis.strengths.map((strength, i) => (
            <li key={i} className="text-sm text-foreground flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 shrink-0" />
              {strength}
            </li>
          ))}
        </ul>
      </div>

      {/* Improvements */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-4 h-4 text-warning" />
          <span className="text-xs font-medium text-muted-foreground">Perlu Ditingkatkan</span>
        </div>
        <ul className="space-y-1.5">
          {mockAnalysis.improvements.map((item, i) => (
            <li key={i} className="text-sm text-foreground flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: 'info' | 'success' | 'warning';
}) {
  return (
    <div className="p-3 rounded-lg bg-card border border-border shadow-soft">
      <div className="flex items-center gap-2 mb-1">
        <Icon
          className={cn(
            'w-4 h-4',
            color === 'info' && 'text-info',
            color === 'success' && 'text-success',
            color === 'warning' && 'text-warning',
          )}
        />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className="text-lg font-semibold text-foreground">{value}</p>
    </div>
  );
}
