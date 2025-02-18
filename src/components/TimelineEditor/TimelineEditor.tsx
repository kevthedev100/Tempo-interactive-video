import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TimestampMarker from "./TimestampMarker";
import { Plus, Trash2, Link } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface TimelineEditorProps {
  duration?: number;
  markers?: Array<{
    id: string;
    timestamp: number;
    linkedVideoUrl?: string;
    buttonTitle?: string;
    position?: {
      x: number;
      y: number;
    };
  }>;
  onAddMarker?: (markerData: {
    timestamp: number;
    linkedVideoUrl: string;
    buttonTitle: string;
    position: { x: number; y: number };
  }) => void;
  onUpdateMarker?: (id: string, timestamp: number) => void;
  onDeleteMarker?: (id: string) => void;
  onSelectMarker?: (id: string) => void;
}

const TimelineEditor = ({
  duration = 300,
  markers = [],
  onAddMarker = () => {},
  onUpdateMarker = () => {},
  onDeleteMarker = () => {},
  onSelectMarker = () => {},
}: TimelineEditorProps) => {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [draggingMarkerId, setDraggingMarkerId] = useState<string | null>(null);
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [newMarkerData, setNewMarkerData] = useState({
    timestamp: duration / 2,
    linkedVideoUrl: "",
    buttonTitle: "",
    position: { x: 50, y: 50 },
  });

  const handleMarkerDragStart = (id: string) => {
    setDraggingMarkerId(id);
  };

  const handleMarkerDragEnd = () => {
    setDraggingMarkerId(null);
  };

  const handleAddMarkerClick = () => {
    setIsAddingMarker(true);
  };

  const handleAddMarkerSubmit = () => {
    onAddMarker(newMarkerData);
    setIsAddingMarker(false);
    setNewMarkerData({
      timestamp: duration / 2,
      linkedVideoUrl: "",
      buttonTitle: "",
      position: { x: 50, y: 50 },
    });
  };

  const selectedMarker = markers.find((m) => m.id === selectedMarkerId);

  return (
    <Card className="w-full p-6 bg-background">
      <div className="space-y-6">
        {/* Timeline controls */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Timeline Editor</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleAddMarkerClick}>
              <Plus className="w-4 h-4 mr-2" />
              Add Interactive Button
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
                Delete Button
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
                isSelected={selectedMarkerId === marker.id}
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
        {selectedMarker && (
          <div className="p-4 bg-muted rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Selected Button Details</h4>
              <p className="text-sm text-muted-foreground">
                At {selectedMarker.timestamp.toFixed(2)}s
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Linked Video</Label>
                <p className="text-sm text-muted-foreground">
                  {selectedMarker.linkedVideoUrl || "No video linked"}
                </p>
              </div>
              <div>
                <Label>Button Title</Label>
                <p className="text-sm text-muted-foreground">
                  {selectedMarker.buttonTitle || "No title set"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Marker Dialog */}
      <Dialog open={isAddingMarker} onOpenChange={setIsAddingMarker}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Interactive Button</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="timestamp">Timestamp (seconds)</Label>
              <Input
                id="timestamp"
                type="number"
                min={0}
                max={duration}
                value={newMarkerData.timestamp}
                onChange={(e) =>
                  setNewMarkerData({
                    ...newMarkerData,
                    timestamp: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="videoUrl">Linked Video URL</Label>
              <Input
                id="videoUrl"
                type="url"
                placeholder="https://example.com/video.mp4"
                value={newMarkerData.linkedVideoUrl}
                onChange={(e) =>
                  setNewMarkerData({
                    ...newMarkerData,
                    linkedVideoUrl: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buttonTitle">Button Title</Label>
              <Input
                id="buttonTitle"
                placeholder="Continue to next scene..."
                value={newMarkerData.buttonTitle}
                onChange={(e) =>
                  setNewMarkerData({
                    ...newMarkerData,
                    buttonTitle: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="positionX">Position X (%)</Label>
                <Input
                  id="positionX"
                  type="number"
                  min={0}
                  max={100}
                  value={newMarkerData.position.x}
                  onChange={(e) =>
                    setNewMarkerData({
                      ...newMarkerData,
                      position: {
                        ...newMarkerData.position,
                        x: parseFloat(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="positionY">Position Y (%)</Label>
                <Input
                  id="positionY"
                  type="number"
                  min={0}
                  max={100}
                  value={newMarkerData.position.y}
                  onChange={(e) =>
                    setNewMarkerData({
                      ...newMarkerData,
                      position: {
                        ...newMarkerData.position,
                        y: parseFloat(e.target.value),
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingMarker(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMarkerSubmit}>
              <Link className="w-4 h-4 mr-2" />
              Add Interactive Button
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TimelineEditor;
