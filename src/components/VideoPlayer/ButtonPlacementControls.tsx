import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Position {
  x: number;
  y: number;
}

interface ButtonPlacementControlsProps {
  position: Position;
  onPositionChange: (position: Position) => void;
  onAddButton: () => void;
  currentTime: number;
}

const ButtonPlacementControls = ({
  position,
  onPositionChange,
  onAddButton,
  currentTime,
}: ButtonPlacementControlsProps) => {
  const handlePositionChange = (axis: "x" | "y", value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      onPositionChange({
        ...position,
        [axis]: numValue,
      });
    }
  };

  return (
    <Card className="p-4 space-y-4 bg-background">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Button Placement</h3>
        <p className="text-xs text-muted-foreground">
          Current Time: {currentTime.toFixed(2)}s
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="x-position">Left (%)</Label>
          <Input
            id="x-position"
            type="number"
            min="0"
            max="100"
            value={position.x}
            onChange={(e) => handlePositionChange("x", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="y-position">Top (%)</Label>
          <Input
            id="y-position"
            type="number"
            min="0"
            max="100"
            value={position.y}
            onChange={(e) => handlePositionChange("y", e.target.value)}
          />
        </div>
      </div>

      <Button className="w-full" onClick={onAddButton}>
        Add Button at {currentTime.toFixed(2)}s
      </Button>
    </Card>
  );
};

export default ButtonPlacementControls;
