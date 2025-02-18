import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

interface NavigationButtonProps {
  timestamp?: number;
  previewUrl?: string;
  title?: string;
  onClick?: () => void;
  position?: {
    x: number;
    y: number;
  };
}

const NavigationButton = ({
  timestamp = 0,
  previewUrl = "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200&h=120&fit=crop",
  title = "Continue to next video",
  onClick = () => {},
  position = { x: 50, y: 50 },
}: NavigationButtonProps) => {
  return (
    <div
      className="absolute bg-background"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              className="group relative w-[200px] h-[120px] p-0 overflow-hidden"
              onClick={onClick}
            >
              <img
                src={previewUrl}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity group-hover:opacity-50"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-8 h-8 text-white mb-2" />
                <span className="text-white text-sm font-medium px-2 text-center">
                  {title}
                </span>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to navigate at {timestamp}s</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default NavigationButton;
