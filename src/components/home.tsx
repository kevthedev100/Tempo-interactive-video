import React from "react";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import TimelineEditor from "./TimelineEditor/TimelineEditor";

const Home = () => {
  const handleVideoNavigation = (videoId: string) => {
    console.log(`Navigating to video: ${videoId}`);
  };

  const demoButtons = [
    {
      id: "1",
      timestamp: 5,
      previewUrl:
        "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200&h=120&fit=crop",
      title: "Path A: The Adventure Begins",
      position: { x: 25, y: 50 },
      onClick: () => handleVideoNavigation("video-a"),
    },
    {
      id: "2",
      timestamp: 5,
      previewUrl:
        "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=200&h=120&fit=crop",
      title: "Path B: The Mystery Unfolds",
      position: { x: 75, y: 50 },
      onClick: () => handleVideoNavigation("video-b"),
    },
  ];

  const handleAddMarker = (timestamp: number) => {
    console.log(`Adding marker at timestamp: ${timestamp}`);
  };

  const handleUpdateMarker = (id: string, timestamp: number) => {
    console.log(`Updating marker ${id} to timestamp: ${timestamp}`);
  };

  const handleDeleteMarker = (id: string) => {
    console.log(`Deleting marker: ${id}`);
  };

  const handleSelectMarker = (id: string) => {
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
                src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                buttons={demoButtons}
                autoPlay={false}
              />
            </div>
          </section>

          {/* Timeline Editor Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Timeline Editor</h2>
            <TimelineEditor
              duration={300}
              markers={[
                { id: "1", timestamp: 30, linkedVideoId: "video-1" },
                { id: "2", timestamp: 120, linkedVideoId: "video-2" },
                { id: "3", timestamp: 240, linkedVideoId: "video-3" },
              ]}
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
