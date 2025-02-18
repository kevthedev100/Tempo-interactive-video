import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import TimestampMarker from "./TimestampMarker";
import { Plus, Trash2 } from "lucide-react";

interface TimelineEditorProps {
  duration?: number;
  markers?: Array<{
    id: string;
    timestamp: number;
    linkedVideoId?: string;
  }>;
  onAddMarker?: (timestamp: number) => void;
  onUpdateMarker?: (id: string, timestamp: number) => void;
  onDeleteMarker?: (id: string) => void;
  onSelectMarker?: (id: string) => void;
}

const TimelineEditor = ({
  duration = 300, // 5 minutes default duration
  markers = [
    { id: "1", timestamp: 30, linkedVideoId: "video-1" },
    { id: "2", timestamp: 120, linkedVideoId: "video-2" },
    { id: "3", timestamp: 240, linkedVideoId: "video-3" },
  ],
  onAddMarker = () => {},
  onUpdateMarker = () => {},
  onDeleteMarker = () => {},
  onSelectMarker = () => {},
}: TimelineEditorProps) => {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [draggingMarkerId, setDraggingMarkerId] = useState<string | null>(null);

  const handleMarkerDragStart = (id: string) => {
    setDraggingMarkerId(id);
  };

  const handleMarkerDragEnd = () => {
    setDraggingMarkerId(null);
  };

  const handleAddMarker = () => {
    onAddMarker(duration / 2); // Add marker at middle of timeline by default
  };

  return (
    <Card className="w-full p-6 bg-background">
      <div className="space-y-6">
        {/* Timeline controls */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Timeline Editor</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleAddMarker}>
              <Plus className="w-4 h-4 mr-2" />
              Add Marker
            </Button>
            {selectedMarkerId && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  onDeleteMarker(selectedMarkerId);
                  setSelectedMarkerId(null);
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Marker
              </Button>
            )}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative h-40 bg-muted rounded-lg">
          {/* Time indicators */}
          <div className="absolute top-0 left-0 right-0 flex justify-between px-4 py-2 text-sm text-muted-foreground">
            <span>0:00</span>
            <span>
              {Math.floor(duration / 60)}:
              {(duration % 60).toString().padStart(2, "0")}
            </span>
          </div>

          {/* Timeline track */}
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-primary/20 transform -translate-y-1/2">
            {/* Markers */}
            {markers.map((marker) => (
              <TimestampMarker
                key={marker.id}
                timestamp={marker.timestamp}
                position={(marker.timestamp / duration) * 100}
                isDragging={draggingMarkerId === marker.id}
                onDragStart={() => handleMarkerDragStart(marker.id)}
                onDragEnd={handleMarkerDragEnd}
                onClick={() => {
                  setSelectedMarkerId(marker.id);
                  onSelectMarker(marker.id);
                }}
              />
            ))}
          </div>

          {/* Current time indicator */}
          <div className="absolute bottom-0 left-0 right-0 px-4 py-2">
            <Slider
              value={[0]}
              min={0}
              max={duration}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Selected marker info */}
        {selectedMarkerId && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium">
              Selected Marker:{" "}
              {markers
                .find((m) => m.id === selectedMarkerId)
                ?.timestamp.toFixed(2)}
              s
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TimelineEditor;
