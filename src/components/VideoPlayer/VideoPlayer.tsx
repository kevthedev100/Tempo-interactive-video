import React, { useState, useRef, useEffect } from "react";
import VideoControls from "./VideoControls";
import InteractiveOverlay from "./InteractiveOverlay";

interface VideoPlayerProps {
  src?: string;
  autoPlay?: boolean;
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
}

const VideoPlayer = ({
  src = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  autoPlay = false,
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
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      const newVolume = value[0];
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleFullscreenToggle = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleSkipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const handleSkipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video bg-black overflow-hidden"
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full"
        onClick={handlePlayPause}
      />

      <InteractiveOverlay buttons={buttons} currentTime={currentTime} />

      <VideoControls
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isFullscreen={isFullscreen}
        isMuted={isMuted}
        onPlayPause={handlePlayPause}
        onVolumeChange={handleVolumeChange}
        onMuteToggle={handleMuteToggle}
        onSeek={handleSeek}
        onFullscreenToggle={handleFullscreenToggle}
        onSkipForward={handleSkipForward}
        onSkipBackward={handleSkipBackward}
      />
    </div>
  );
};

export default VideoPlayer;
