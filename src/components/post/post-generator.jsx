import { useEffect, useRef, useState } from "react";

import { DownloadIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DropdownMenu,
  Button,
  ButtonGroup,
  Select,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import PostCanvas from "./post-canvas";
import PostConfigurator from "./post-configurator";

export default function PostGenerator() {
  const canvasRef = useRef();
  const sceneRef = useRef();

  const [exportScale, setExportScale] = useState("1x");
  const [config, setConfig] = useState({});

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = sceneRef.current;

    const ctx = canvas.getContext("2d");

    canvas.onpaint = () => {
      ctx.reset();
      ctx.drawElementImage(scene, 0, 0);
    };

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;

      const scale = exportScale === "1x" ? 1 : exportScale === "2x" ? 2 : 3;

      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);

      canvas.requestPaint();
    });

    resizeObserver.observe(canvas);
  }, [exportScale]);

  const handleDownload = () => {
    const canvas = canvasRef.current;

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "canvas.png";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    }, "image/png");
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Gönderi Oluşturucu</CardTitle>
          <CardDescription>
            Gönderi görseli için ayarları yapılandırın ve görseli indirin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PostCanvas
            canvasRef={canvasRef}
            sceneRef={sceneRef}
            config={config}
          />
        </CardContent>
        <CardFooter>
          <ButtonGroup className="mx-auto">
            <Button onClick={handleDownload}>
              <DownloadIcon />
              İndir
            </Button>
            <DropdownMenu>
              <Select
                value={exportScale}
                onValueChange={(value) => setExportScale(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1x">1x</SelectItem>
                    <SelectItem value="2x">2x</SelectItem>
                    <SelectItem value="3x">3x</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </DropdownMenu>
          </ButtonGroup>
        </CardFooter>
      </Card>

      <PostConfigurator onConfigChange={setConfig} />
    </div>
  );
}
