"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, CheckCircle, Camera } from "lucide-react";

interface FileUploadProps {
  label: string;
  accept?: string;
  hint?: string;
  optional?: boolean;
  onFileSelect: (file: File | null) => void;
  error?: string;
  /** En mobile, "environment" abre cámara trasera, "user" la frontal */
  capture?: "user" | "environment";
  required?: boolean;
}

export default function FileUpload({
  label,
  accept = "image/*",
  hint,
  optional = false,
  onFileSelect,
  error,
  capture,
  required = false,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("El archivo no puede superar 10 MB.");
      return;
    }

    setFileName(file.name);

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    onFileSelect(file);
  };

  const handleRemove = () => {
    setFileName(null);
    setPreview(null);
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
        {optional && <span className="text-gray-400 font-normal ml-1">(opcional)</span>}
      </label>

      {!fileName ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`w-full flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed transition-colors cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 ${
            error ? "border-red-400 bg-red-50/20" : "border-gray-300 bg-gray-50/50"
          }`}
        >
          {capture ? (
            <Camera className="w-6 h-6 text-gray-400" />
          ) : (
            <Upload className="w-6 h-6 text-gray-400" />
          )}
          <span className="text-sm text-gray-500">
            {capture ? "Tocá para sacar foto" : "Tocá para subir archivo"}
          </span>
        </button>
      ) : (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-green-200 bg-green-50/50">
          {preview ? (
            <Image src={preview} alt="Preview" width={48} height={48} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
          ) : (
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
          )}
          <span className="text-sm text-gray-700 truncate flex-1">{fileName}</span>
          <button
            type="button"
            onClick={handleRemove}
            className="p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 flex-shrink-0"
            aria-label="Eliminar archivo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
        aria-hidden="true"
        {...(capture ? { capture } : {})}
      />

      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="mt-1 text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
}
