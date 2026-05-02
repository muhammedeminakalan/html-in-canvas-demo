import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import { postVariants } from "./post-canvas";

export default function PostConfigurator({ onConfigChange }) {
  const [config, setConfig] = useState({
    avatar: "https://github.com/muhammedeminakalan.png",
    variant: "pardus",
    font: "Poppins",
  });

  const fonts = [
    { label: "Geist", value: "Geist Variable" },
    { label: "Geist Mono", value: "Geist Mono Variable" },
    { label: "Poppins", value: "Poppins" },
    { label: "Pixelify Sans", value: "Pixelify Sans Variable" },
  ];

  useEffect(() => {
    onConfigChange(config);
  }, [config]);

  const handleChange = (key) => (valueOrEvent) => {
    const value = valueOrEvent?.target?.value ?? valueOrEvent;

    setConfig((prevConfig) => ({
      ...prevConfig,
      [key]: value,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gönderi Ayarları</CardTitle>
        <CardDescription>Gönderi için ayarları yapılandırın</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldSet>
          <Field>
            <FieldLabel htmlFor="postAvatar">Avatar URL</FieldLabel>
            <Input
              id="postAvatar"
              placeholder="https://github.com/muhammedeminakalan.png"
              value={config.avatar}
              onChange={handleChange("avatar")}
            />
          </Field>
          <FieldGroup className="flex-row">
            <Field>
              <FieldLabel htmlFor="postVariant">Varyant</FieldLabel>
              <Select
                id="postVariant"
                value={config.variant}
                onValueChange={handleChange("variant")}
              >
                <SelectTrigger>
                  <SelectValue className="capitalize" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.keys(postVariants).map((variant) => (
                      <SelectItem key={variant} value={variant}>
                        {variant.charAt(0).toUpperCase() + variant.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="postFont">Yazı Tipi</FieldLabel>
              <Select
                id="postFont"
                value={config.font}
                onValueChange={handleChange("font")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {fonts.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        </FieldSet>
      </CardContent>
    </Card>
  );
}
