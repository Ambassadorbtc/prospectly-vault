
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { KanbanBoard } from "@/components/pipeline/KanbanBoard";
import { leads, stages } from "@/data/mockData";

const Pipeline = () => {
  return (
    <PageLayout title="Pipeline">
      <div className="p-6">
        <KanbanBoard leads={leads} stages={stages} />
      </div>
    </PageLayout>
  );
};

export default Pipeline;
