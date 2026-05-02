import { ImageIcon, InfoIcon, VideoIcon } from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui";
import PostGenerator from "./components/post/post-generator";
import VideoGenerator from "./components/video/video-generator";
import About from "./components/about";

export default function App() {
  const tabs = [
    { label: "Gönderi Oluşturucu", value: "post", icon: <ImageIcon /> },
    { label: "Video Kaydedici", value: "video", icon: <VideoIcon /> },
    { label: "Hakkında", value: "about", icon: <InfoIcon /> },
  ];

  return (
    <div className="p-8">
      <Tabs defaultValue="post" className="mx-auto max-w-3xl">
        <div className="flex">
          <TabsList className="mb-6 w-full">
            {tabs.map((tabItem) => (
              <TabsTrigger value={tabItem.value} key={tabItem.value}>
                {tabItem.icon}
                {tabItem.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value="post" keepMounted>
          <PostGenerator />
        </TabsContent>
        <TabsContent value="video" keepMounted>
          <VideoGenerator />
        </TabsContent>
        <TabsContent value="about">
          <About />
        </TabsContent>
      </Tabs>
    </div>
  );
}
