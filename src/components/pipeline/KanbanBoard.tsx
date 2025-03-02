
import { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Lead, StageConfig } from "@/types";
import { KanbanColumn } from "./KanbanColumn";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";

interface KanbanBoardProps {
  leads: Lead[];
  stages: StageConfig[];
}

export function KanbanBoard({ leads, stages }: KanbanBoardProps) {
  const [activeStages, setActiveStages] = useState(stages);
  const [items, setItems] = useState(leads);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      // Handle item sorting logic here
      console.log(`Moved item ${active.id} over ${over.id}`);
      
      // This is a simplified version - in a real app, you'd update the backend
      const updatedItems = items.map(item => {
        if (item.id === active.id) {
          const targetStage = over.id.toString().split("-")[0];
          return { ...item, stage: targetStage as any };
        }
        return item;
      });
      
      setItems(updatedItems);
    }
  };

  const getLeadsByStage = (stageId: string) => {
    return items.filter(lead => lead.stage === stageId);
  };

  return (
    <div className="animate-on-load" style={{ "--anim-delay": 5 } as React.CSSProperties}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Pipeline</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
          >
            <Settings className="h-4 w-4" />
            <span>Customize</span>
          </Button>
          <Button 
            size="sm" 
            className="flex items-center gap-1 bg-crm-purple-600 hover:bg-crm-purple-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add Lead</span>
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto pb-4">
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 min-w-max">
            {activeStages.map((stage) => (
              <KanbanColumn
                key={stage.id}
                id={stage.id}
                title={stage.name}
                color={stage.color}
                leads={getLeadsByStage(stage.id)}
              />
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
}
