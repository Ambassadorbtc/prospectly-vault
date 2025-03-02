
import { Lead } from "@/types";
import { Calendar, DollarSign, User } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface LeadCardProps {
  lead: Lead;
}

export function LeadCard({ lead }: LeadCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: lead.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Format date to display only month and day
  const formattedDate = lead.lastContact
    ? new Date(lead.lastContact).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "No contact";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="pipeline-card"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-sm">{lead.name}</h3>
          <p className="text-xs text-muted-foreground mt-1">{lead.companyName}</p>
        </div>
        <div className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
          {lead.status === "lead" ? "Lead" : "Prospect"}
        </div>
      </div>
      
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-1 text-muted-foreground">
          <User className="h-3 w-3" />
          <span>{lead.contactName}</span>
        </div>
        
        <div className="flex items-center gap-1 text-muted-foreground">
          <DollarSign className="h-3 w-3" />
          <span>${lead.value.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center gap-1 text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{formattedDate}</span>
        </div>
      </div>
      
      {lead.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {lead.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px]"
            >
              {tag}
            </span>
          ))}
          {lead.tags.length > 2 && (
            <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px]">
              +{lead.tags.length - 2}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
