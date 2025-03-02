
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Lead } from "@/types";
import { LeadCard } from "@/components/leads/LeadCard";

interface KanbanColumnProps {
  id: string;
  title: string;
  color: string;
  leads: Lead[];
}

export function KanbanColumn({ id, title, color, leads }: KanbanColumnProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col w-80 h-[calc(100vh-220px)] glass-card rounded-lg"
    >
      <div 
        className="p-3 font-medium flex items-center justify-between border-b"
        style={{ borderLeftColor: color, borderLeftWidth: '4px' }}
      >
        <div className="flex items-center">
          <span>{title}</span>
          <div className="ml-2 bg-muted rounded-full px-2 py-0.5 text-xs">
            {leads.length}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">${totalValue.toLocaleString()}</div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
        
        {leads.length === 0 && (
          <div className="h-20 flex items-center justify-center border border-dashed rounded-lg border-muted">
            <p className="text-sm text-muted-foreground">No leads in this stage</p>
          </div>
        )}
      </div>
    </div>
  );
}
