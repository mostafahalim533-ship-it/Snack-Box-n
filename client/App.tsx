import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Global error handler for TikTok embed errors
const setupGlobalErrorHandler = () => {
  // Handle uncaught promise rejections (common with TikTok embed script)
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason &&
        (event.reason.message?.includes('length') ||
         event.reason.stack?.includes('embed_lib'))) {
      console.warn('TikTok embed error caught globally:', event.reason);
      event.preventDefault(); // Prevent error from being logged to console
    }
  });

  // Handle regular errors
  window.addEventListener('error', (event) => {
    if (event.filename?.includes('embed_lib') ||
        event.error?.stack?.includes('embed_lib') ||
        (event.error?.message?.includes('length') && event.filename?.includes('tiktok'))) {
      console.warn('TikTok embed script error caught globally:', event.error);
      event.preventDefault(); // Prevent error from being logged to console
    }
  });
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/snack-box-35-count" element={<ProductPage />} />
          <Route
            path="/chip-variety-snack-box-42-count"
            element={<ProductPage />}
          />
          <Route path="/variety-snack-box-52-count" element={<ProductPage />} />
          <Route
            path="/ultimate-snack-box-105-count"
            element={<ProductPage />}
          />
          <Route path="/:slug" element={<ProductPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
