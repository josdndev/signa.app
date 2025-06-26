import type { Metadata } from "next";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Pacientes from "@/components/tables/Pacientes";
import React from "react";


export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-16 gap-4 md:gap-6">
      <div className="col-span-14">
         <PageBreadcrumb pageTitle="Welcome" />
         <div className="space-y-6">
          <ComponentCard title="Pacientes por Atender">
          <Pacientes />
         </ComponentCard>
      </div>
    </div>
    </div>
  );
}
