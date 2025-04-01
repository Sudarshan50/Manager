
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import ActiveUsers from "./pages/ActiveUsers";
import AllCards from "./pages/AllCards";
import RechargePlans from "./pages/RechargePlans";
import BillDetails from "./pages/BillDetails";
import NotFound from "./pages/NotFound";

// Create a new QueryClient instance outside of the component
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/add-user/:userHash" element={
            <Layout>
              <AddUser />
            </Layout>
          } />
          <Route path="/active-users" element={
            <Layout>
              <ActiveUsers />
            </Layout>
          } />
          <Route path="/all-cards" element={
            <Layout>
              <AllCards />
            </Layout>
          } />
          <Route path="/recharge/:userId" element={
            <Layout>
              <RechargePlans />
            </Layout>
          } />
          <Route path="/bill-details" element={
            <Layout>
              <BillDetails />
            </Layout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
