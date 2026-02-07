'use client';

import { Eye, MessageSquare, Sparkles } from 'lucide-react';
import { FC, useState } from 'react';
import { Main } from '~/components/layouts/main';
import { Section } from '~/components/layouts/section';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '~/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { ChatInterface } from './chat-interface';
import { CVSummary } from './cv-summary';
import { FilePreview } from './file-preview';
import { FileUpload } from './file-upload';

export const Component: FC = () => {
  const [files, setFiles] = useState<File[] | undefined>(undefined);
  const [previewFile, setPreviewFile] = useState<File | undefined>(undefined);

  return (
    <div className="max-h-[80vh] overflow-y-scroll bg-background">
      <Main fluid className="min-h-[80vh]">
        <ResizablePanelGroup
          autoSave="analyze-horizontal"
          orientation="horizontal"
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[80vh] min-w-full"
        >
          {/* Left Column */}
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup
              autoSave="analyze-vertical"
              orientation="vertical"
              className="min-h-[80vh] w-full flex flex-col gap-4"
            >
              <ResizablePanel defaultSize={30}>
                <Section className="h-full">
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <h2 className="text-sm font-medium text-foreground">Upload CV</h2>
                  </div>
                  <div className="h-full overflow-y-scroll">
                    <div className="p-3">
                      <FileUpload files={files} setFiles={setFiles} setPreviewFile={setPreviewFile} previewFile={previewFile} />
                    </div>
                  </div>
                </Section>
              </ResizablePanel>

              <ResizableHandle />

              <ResizablePanel defaultSize={70}>
                <Section className="h-full">
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30">
                    <Eye className="w-4 h-4 text-primary" />
                    <h2 className="text-sm font-medium text-foreground">Preview File</h2>
                  </div>
                  <div className="p-3 h-full">
                    <FilePreview previewFile={previewFile} />
                  </div>
                </Section>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle />

          {/* Right Column */}
          <ResizablePanel defaultSize={50}>
            <div className="flex flex-col gap-4 max-h-[80vh] w-full">
              <Section>
                <Tabs defaultValue="summaries" className="h-full flex flex-col">
                  <TabsList>
                    <TabsTrigger value="summaries">Summaries</TabsTrigger>
                    <TabsTrigger value="chats">Chats</TabsTrigger>
                  </TabsList>
                  <TabsContent value="summaries">
                    <Section className="h-[73vh]">
                      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <h2 className="text-sm font-medium text-foreground">Ringkasan Analisis</h2>
                      </div>
                      <CVSummary hasFile={!!files} />
                    </Section>
                  </TabsContent>
                  <TabsContent value="chats">
                    <Section className="max-h-[73vh] overflow-y-scroll">
                      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        <h2 className="text-sm font-medium text-foreground">Chat with Agent AI</h2>
                      </div>
                      <ChatInterface hasFile={!!files} />
                    </Section>
                  </TabsContent>
                </Tabs>
              </Section>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Main>
    </div>
  );
};
