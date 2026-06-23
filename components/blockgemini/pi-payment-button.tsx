"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle, Zap } from "lucide-react";
import { usePiAuth } from "@/contexts/pi-auth-context";
import { PRODUCT_CONFIG } from "@/lib/product-config";

type PaymentState = "idle" | "processing" | "success" | "error";

interface PiPaymentButtonProps {
  className?: string;
  variant?: "primary" | "gold" | "outline";
}

export function PiPaymentButton({ className = "", variant = "primary" }: PiPaymentButtonProps) {
  const { products } = usePiAuth();
  const [paymentState, setPaymentState] = useState<PaymentState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const product = products?.find(
    (p) => p.id === PRODUCT_CONFIG.PRODUCT_69b17e90a3ffc3fc896138bb
  );

  const amount = product?.price_in_pi ?? null;

  const handlePay = () => {
    if (!product || amount === null) return;

    setPaymentState("processing");
    setErrorMsg(null);

    window.pay({
      amount,
      memo: product.name,
      metadata: { productId: product.id },
      onComplete: () => {
        setPaymentState("success");
        setTimeout(() => setPaymentState("idle"), 3500);
      },
      onError: (error: Error) => {
        setPaymentState("error");
        setErrorMsg(error?.message ?? "Payment failed. Please try again.");
        setTimeout(() => {
          setPaymentState("idle");
          setErrorMsg(null);
        }, 4000);
      },
    });
  };

  const isProcessing = paymentState === "processing";
  const isSuccess = paymentState === "success";
  const isError = paymentState === "error";
  const isDisabled = !product || isProcessing || isSuccess;

  /* ── style variants ── */
  const baseStyle: React.CSSProperties =
    variant === "gold"
      ? {
          background: isSuccess
            ? "rgba(34,197,94,0.18)"
            : isError
            ? "rgba(239,68,68,0.15)"
            : "linear-gradient(135deg, #d97706 0%, #F59E0B 60%, #fbbf24 100%)",
          color: isSuccess ? "#22c55e" : isError ? "#ef4444" : "#000",
          border: isSuccess
            ? "1px solid rgba(34,197,94,0.4)"
            : isError
            ? "1px solid rgba(239,68,68,0.4)"
            : "1px solid rgba(251,191,36,0.6)",
        }
      : variant === "outline"
      ? {
          background: isSuccess
            ? "rgba(34,197,94,0.12)"
            : isError
            ? "rgba(239,68,68,0.12)"
            : "rgba(124,58,237,0.12)",
          color: isSuccess ? "#22c55e" : isError ? "#ef4444" : "#a78bfa",
          border: isSuccess
            ? "1px solid rgba(34,197,94,0.35)"
            : isError
            ? "1px solid rgba(239,68,68,0.35)"
            : "1px solid rgba(124,58,237,0.45)",
        }
      : /* primary */
        {
          background: isSuccess
            ? "linear-gradient(135deg, #15803d, #16a34a)"
            : isError
            ? "linear-gradient(135deg, #991b1b, #dc2626)"
            : "linear-gradient(135deg, #5b21b6 0%, #7C3AED 60%, #9333ea 100%)",
          color: "#fff",
          border: "none",
          boxShadow: isSuccess
            ? "0 4px 20px rgba(34,197,94,0.3)"
            : isError
            ? "0 4px 20px rgba(239,68,68,0.3)"
            : "0 4px 20px rgba(124,58,237,0.4)",
        };

  const labelText = () => {
    if (!product) return "Loading product...";
    if (isProcessing) return "Processing...";
    if (isSuccess) return "Payment Successful!";
    if (isError) return "Payment Failed";
    return `${product.name} · π ${amount?.toFixed(1)}`;
  };

  const labelTextAr = () => {
    if (!product) return "جارٍ التحميل...";
    if (isProcessing) return "جارٍ المعالجة...";
    if (isSuccess) return "تم الدفع بنجاح!";
    if (isError) return "فشل الدفع";
    return `ادفع بـ Pi · π ${amount?.toFixed(1)}`;
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <button
        onClick={handlePay}
        disabled={isDisabled}
        aria-label={labelText()}
        className="w-full flex items-center justify-center gap-2.5 rounded-xl py-3 px-4 font-bold text-sm transition-all duration-300 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
        style={baseStyle}
      >
        {isProcessing ? (
          <Loader2 size={15} className="animate-spin" />
        ) : isSuccess ? (
          <CheckCircle2 size={15} />
        ) : isError ? (
          <AlertCircle size={15} />
        ) : (
          <Zap size={15} />
        )}

        <div className="flex flex-col items-start leading-tight">
          <span>{labelText()}</span>
          {!isProcessing && !isSuccess && !isError && (
            <span
              className="text-[10px] font-normal opacity-70"
              dir="rtl"
            >
              {labelTextAr()}
            </span>
          )}
        </div>
      </button>

      {isError && errorMsg && (
        <p
          className="text-[11px] text-center px-2"
          style={{ color: "#ef4444" }}
        >
          {errorMsg}
        </p>
      )}

      {!product && products !== null && (
        <p className="text-[10px] text-center" style={{ color: "#6b7280" }}>
          Product unavailable · المنتج غير متاح
        </p>
      )}
    </div>
  );
}
