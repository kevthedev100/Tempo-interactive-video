import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import TimelineEditor from "./TimelineEditor/TimelineEditor";

const Home = () => {
  const [currentVideo, setCurrentVideo] = useState(
    "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  );

  const [buttons, setButtons] = useState([
    {
      id: "1",
      timestamp: 5,
      previewUrl:
        "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200&h=120&fit=crop",
      title: "Path A: The Adventure Begins",
      position: { x: 25, y: 50 },
      onClick: () =>
        handleVideoNavigation(
          "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        ),
    },
    {
      id: "2",
      timestamp: 5,
      previewUrl:
        "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=200&h=120&fit=crop",
      title: "Path B: The Mystery Unfolds",
      position: { x: 75, y: 50 },
      onClick: () =>
        handleVideoNavigation(
          "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        ),
    },
  ]);

  const handleVideoNavigation = (videoUrl: string) => {
    setCurrentVideo(videoUrl);
  };

  const handleAddMarker = (markerData: {
    timestamp: number;
    linkedVideoUrl: string;
    buttonTitle: string;
    position: { x: number; y: number };
  }) => {
    const newButton = {
      id: `button-${Date.now()}`,
      timestamp: markerData.timestamp,
      previewUrl:
        "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200&h=120&fit=crop",
      title: markerData.buttonTitle,
      position: markerData.position,
      onClick: () => handleVideoNavigation(markerData.linkedVideoUrl),
    };
    setButtons([...buttons, newButton]);
  };

  const handleUpdateMarker = (id: string, timestamp: number) => {
    setButtons(
      buttons.map((button) =>
        button.id === id ? { ...button, timestamp } : button,
      ),
    );
  };

  const handleDeleteMarker = (id: string) => {
    setButtons(buttons.filter((button) => button.id !== id));
  };

  const handleSelectMarker = (id: string) => {
    // This could be used to show additional editing options
    console.log(`Selected marker: ${id}`);
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">
          Interactive Video Navigation System
        </h1>

        <div className="space-y-6">
          {/* Video Player Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Video Player</h2>
            <div className="w-full aspect-video bg-card rounded-lg overflow-hidden shadow-lg">
              <VideoPlayer
                src={currentVideo}
                buttons={buttons}
                autoPlay={false}
                isEditing={true}
              />
            </div>
          </section>

          {/* Timeline Editor Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Timeline Editor</h2>
            <TimelineEditor
              duration={300}
              markers={buttons.map((button) => ({
                id: button.id,
                timestamp: button.timestamp,
                linkedVideoUrl: currentVideo,
                buttonTitle: button.title,
                position: button.position,
              }))}
              onAddMarker={handleAddMarker}
              onUpdateMarker={handleUpdateMarker}
              onDeleteMarker={handleDeleteMarker}
              onSelectMarker={handleSelectMarker}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
