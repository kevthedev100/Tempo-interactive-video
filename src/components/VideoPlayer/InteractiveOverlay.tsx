import React from "react";
import NavigationButton from "./NavigationButton";

interface InteractiveOverlayProps {
  buttons?: Array<{
    id: string;
    timestamp: number;
    previewUrl: string;
    title: string;
    position: {
      x: number;
      y: number;
    };
    onClick: () => void;
  }>;
  currentTime?: number;
}

const InteractiveOverlay = ({
  buttons = [
    {
      id: "1",
      timestamp: 5,
      previewUrl:
        "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200&h=120&fit=crop",
      title: "Path A: The Adventure Begins",
      position: { x: 25, y: 50 },
      onClick: () => console.log("Clicked Path A"),
    },
    {
      id: "2",
      timestamp: 5,
      previewUrl:
        "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=200&h=120&fit=crop",
      title: "Path B: The Mystery Unfolds",
      position: { x: 75, y: 50 },
      onClick: () => console.log("Clicked Path B"),
    },
  ],
  currentTime = 0,
}: InteractiveOverlayProps) => {
  // Filter buttons to only show ones that should be visible at the current timestamp
  const visibleButtons = buttons.filter((button) => {
    // Show buttons within 0.5 seconds of their timestamp
    return Math.abs(currentTime - button.timestamp) <= 0.5;
  });

  return (
    <div className="absolute inset-0 pointer-events-none bg-transparent">
      <div className="relative w-full h-full pointer-events-auto">
        {visibleButtons.map((button) => (
          <NavigationButton
            key={button.id}
            timestamp={button.timestamp}
            previewUrl={button.previewUrl}
            title={button.title}
            position={button.position}
            onClick={button.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveOverlay;
