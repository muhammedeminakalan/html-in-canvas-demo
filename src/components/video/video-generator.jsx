import { useEffect, useRef, useState, useCallback } from "react";

import {
  VideoIcon,
  StopCircleIcon,
  DownloadIcon,
  PlayIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  ButtonGroup,
  DropdownMenu,
  CardFooter,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import VideoCanvas from "./video-canvas";
import VideoConfigurator from "./video-configurator";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);

  return m + ":" + String(s).padStart(2, "0");
}

export default function VideoGenerator() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  const [config, setConfig] = useState({});

  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [elapsed, setElapsed] = useState("0:00");
  const [exportScale, setExportScale] = useState("1x");
  const [fps, setFps] = useState("30 FPS");

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const startTimeRef = useRef(0);
  const timerRef = useRef(null);
  const blobUrlRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = sceneRef.current;

    const ctx = canvas.getContext("2d");

    canvas.onpaint = () => {
      ctx.reset();
      ctx.drawElementImage(scene, 0, 0);
    };

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;

      const scale = exportScale === "1x" ? 1 : exportScale === "2x" ? 2 : 3;

      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
    });

    ro.observe(canvas);
  }, [exportScale]);

  const startRecording = useCallback(() => {
    const canvas = canvasRef.current;

    chunksRef.current = [];

    const stream = canvas.captureStream(parseInt(fps));

    const mr = new MediaRecorder(stream);

    mr.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    mr.onstop = () => {
      const blob = new Blob(chunksRef.current);
      blobUrlRef.current = URL.createObjectURL(blob);

      setIsRecording(false);
      setHasRecording(true);
    };

    mr.start();
    mediaRecorderRef.current = mr;

    startTimeRef.current = performance.now();

    setIsRecording(true);
    setHasRecording(false);

    timerRef.current = setInterval(() => {
      const secs = (performance.now() - startTimeRef.current) / 1000;

      setElapsed(formatTime(secs));
    }, 1000);
  }, [fps]);

  const stopRecording = useCallback(() => {
    const mr = mediaRecorderRef.current;

    if (mr.state === "recording") mr.stop();
  }, []);

  const download = useCallback(() => {
    const a = document.createElement("a");

    a.href = blobUrlRef.current;
    a.download = "canvas.webm";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
  }, []);

  const replay = useCallback(() => {
    window.open(blobUrlRef.current, "_blank");
  }, []);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Video Kaydedici</CardTitle>
          <CardDescription>
            HTML animasyonlarını canvas üzerinden WebM videoya kaydedin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <VideoCanvas
              canvasRef={canvasRef}
              sceneRef={sceneRef}
              config={config}
            />
            {isRecording && (
              <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1 font-bold text-red-500 tracking-widest">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                {elapsed}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <ButtonGroup className="mx-auto">
            {!isRecording ? (
              <Button onClick={startRecording}>
                <VideoIcon /> Kaydet
              </Button>
            ) : (
              <Button variant="destructive" onClick={stopRecording}>
                <StopCircleIcon /> Durdur
              </Button>
            )}
            <DropdownMenu>
              <Select
                value={exportScale}
                disabled={isRecording}
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
            <DropdownMenu>
              <Select
                value={fps}
                disabled={isRecording}
                onValueChange={(value) => setFps(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="30 FPS">30 FPS</SelectItem>
                    <SelectItem value="60 FPS">60 FPS</SelectItem>
                    <SelectItem value="120 FPS">120 FPS</SelectItem>
                    <SelectItem value="144 FPS">144 FPS</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </DropdownMenu>
            <Button
              variant="outline"
              disabled={!hasRecording}
              onClick={download}
            >
              <DownloadIcon /> İndir
            </Button>
            <Button variant="outline" disabled={!hasRecording} onClick={replay}>
              <PlayIcon /> Oynat
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>

      <VideoConfigurator onConfigChange={setConfig} />
    </div>
  );
}
