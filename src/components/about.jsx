import React from "react";
import ReactMarkdown from "react-markdown";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";

const markdownContent = `
Bu uygulama, HTML içeriğini canvas üzerinde görsel öğelere dönüştürmek için geliştirilmiş bir araçtır. Kullanıcılar, HTML öğelerini (metin, buton, form elemanları vb.) **canvas** üzerinde görsel olarak yerleştirebilir, düzenleyebilir ve çeşitli efektler uygulayabilirler.

Web üzerinde HTML içeriği ile etkileşimli ve dinamik görseller oluşturmak, özellikle grafik tasarım, medya dışa aktarımı ve 3D görselleştirme gibi alanlarda faydalıdır. Bu uygulama, HTML içeriğini doğrudan bir **canvas** üzerine çizerek, görsel içeriği zenginleştirme imkanı sunar.
`;

export default function About() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Hakkında</CardTitle>
          <CardDescription>Bu uygulama hakkında bilgiler</CardDescription>
        </CardHeader>
        <CardContent className="markdown-content">
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </CardContent>
        <CardFooter className="justify-center underline text-blue-400">
          <a
            href="https://github.com/muhammedeminakalan/html-in-canvas-demo"
            target="_blank"
          >
            OPEN SOURCE
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
