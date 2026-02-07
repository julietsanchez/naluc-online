"use client";

import { useRef, useState } from "react";

interface SignaturePadProps {
  onSignatureChange: (dataUrl: string | null) => void;
}

export default function SignaturePad({ onSignatureChange }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const hasStrokesRef = useRef(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  function getCtx(): CanvasRenderingContext2D | null {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1a1a1a";
    return ctx;
  }

  function getCoords(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e && e.touches.length > 0) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    const me = e as React.MouseEvent;
    return {
      x: (me.clientX - rect.left) * scaleX,
      y: (me.clientY - rect.top) * scaleY,
    };
  }

  function startDrawing(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    const ctx = getCtx();
    if (!ctx) return;
    const { x, y } = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    isDrawingRef.current = true;
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    if (!isDrawingRef.current) return;
    const ctx = getCtx();
    if (!ctx) return;
    const { x, y } = getCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    hasStrokesRef.current = true;
    if (!hasDrawn) setHasDrawn(true);
  }

  function stopDrawing() {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    if (hasStrokesRef.current) {
      const canvas = canvasRef.current;
      if (canvas) {
        onSignatureChange(canvas.toDataURL("image/png"));
      }
    }
  }

  function clear() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasStrokesRef.current = false;
    setHasDrawn(false);
    onSignatureChange(null);
  }

  return (
    <div>
      <div className="border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          width={600}
          height={200}
          className="w-full cursor-crosshair touch-none"
          style={{ height: "150px" }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-gray-500">Dibujá tu firma en el recuadro</p>
        {hasDrawn && (
          <button
            type="button"
            onClick={clear}
            className="text-xs text-primary-600 hover:text-primary-700 font-medium"
          >
            Limpiar firma
          </button>
        )}
      </div>
    </div>
  );
}
