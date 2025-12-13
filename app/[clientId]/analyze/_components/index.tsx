'use client';

import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FC, useState } from 'react';
import { TFile, Upload } from '~/components/fragments/input/upload';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { P } from '~/components/ui/typography';
import { useExtractCV } from '../_hooks/use-extract-cv';

export const Component: FC = () => {
  const [files, setFiles] = useState<TFile[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { clientId } = useParams<{ clientId: string }>();
  const { extract, data } = useExtractCV(clientId);

  const extracted = data?.data.data;

  const handleFilesChange = (files: TFile[]) => {
    console.log(files);
  };

  const handleAnalyze = async () => {
    if (files.length === 0) return;
    setAnalyzing(true);
    setProgress(0);
    extract(
      {
        files: files.map((file) => file.file),
        onProgress: (progress) => setProgress(progress),
      },
      {
        onSuccess: () => {
          setAnalyzing(false);
          setProgress(0);
        },
      },
    );
  };

  return (
    <div className="container ">
      <div className="mb-6">
        <P>Analyze your CVs all in one place</P>
      </div>

      <div className="space-y-6">
        <Upload files={files} setFiles={setFiles} onChange={handleFilesChange} multiple mode="drag" />
        {analyzing && (
          <Card>
            <CardHeader>
              <CardTitle>Menganalisis...</CardTitle>
              <CardDescription>Mohon tunggu, sedang memproses {files.length} CV</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2 text-center">{progress}% selesai</p>
            </CardContent>
          </Card>
        )}

        <Button className="w-full" size="lg" onClick={handleAnalyze} disabled={files.length === 0 || analyzing}>
          {analyzing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Menganalisis {files.length} CV...
            </>
          ) : (
            `Analisis ${files.length} CV`
          )}
        </Button>
      </div>

      {Array.isArray(extracted) && extracted.length > 0 && (
        <div className="mt-6">
          <P>Extracted {extracted.length} CV</P>
          <pre>{JSON.stringify(extracted, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
