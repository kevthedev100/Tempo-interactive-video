import React from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
} from "lucide-react";

interface VideoControlsProps {
  isPlaying?: boolean;
  currentTime?: number;
  duration?: number;
  volume?: number;
  isFullscreen?: boolean;
  isMuted?: boolean;
  onPlayPause?: () => void;
  onVolumeChange?: (value: number[]) => void;
  onMuteToggle?: () => void;
  onSeek?: (value: number[]) => void;
  onFullscreenToggle?: () => void;
  onSkipForward?: () => void;
  onSkipBackward?: () => void;
}

const VideoControls = ({
  isPlaying = false,
  currentTime = 0,
  duration = 100,
  volume = 1,
  isFullscreen = false,
  isMuted = false,
  onPlayPause = () => {},
  onVolumeChange = () => {},
  onMuteToggle = () => {},
  onSeek = () => {},
  onFullscreenToggle = () => {},
  onSkipForward = () => {},
  onSkipBackward = () => {},
}: VideoControlsProps) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-background/90 p-2 flex flex-col gap-2">
      {/* Progress bar */}
      <div className="px-4">
        <Slider
          value={[currentTime]}
          min={0}
          max={duration}
          step={1}
          onValueChange={onSeek}
          className="cursor-pointer"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {/* Play/Pause button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onPlayPause}
            className="hover:bg-accent"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>

          {/* Skip buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onSkipBackward}
            className="hover:bg-accent"
          >
            <SkipBack className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onSkipForward}
            className="hover:bg-accent"
          >
            <SkipForward className="h-5 w-5" />
          </Button>

          {/* Volume controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onMuteToggle}
              className="hover:bg-accent"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
            <Slider
              value={[volume * 100]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => onVolumeChange([value[0] / 100])}
              className="w-24"
            />
          </div>

          {/* Time display */}
          <span className="text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Fullscreen button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onFullscreenToggle}
          className="hover:bg-accent"
        >
          {isFullscreen ? (
            <Minimize className="h-5 w-5" />
          ) : (
            <Maximize className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default VideoControls;
