import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GripVertical } from "lucide-react";

interface TimestampMarkerProps {
  timestamp?: number;
  position?: number;
  isDragging?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onClick?: () => void;
}

const TimestampMarker = ({
  timestamp = 0,
  position = 50,
  isDragging = false,
  onDragStart = () => {},
  onDragEnd = () => {},
  onClick = () => {},
}: TimestampMarkerProps) => {
  return (
    <div
      className={`absolute bg-background ${isDragging ? "z-50" : "z-10"}`}
      style={{
        left: `${position}%`,
        transform: "translateX(-50%)",
      }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={`w-6 h-10 p-1 flex flex-col items-center justify-center gap-1 cursor-grab ${isDragging ? "cursor-grabbing shadow-lg" : ""}`}
              onClick={onClick}
              onMouseDown={onDragStart}
              onMouseUp={onDragEnd}
            >
              <GripVertical className="h-4 w-4" />
              <div className="w-1 h-1 rounded-full bg-primary" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Marker at {timestamp.toFixed(2)}s</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default TimestampMarker;
