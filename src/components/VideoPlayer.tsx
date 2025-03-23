
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Video content with narrated explanation of EduFinance Access
  const videoSrc = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"; 
  // This is a placeholder. In a real implementation, you would use your own video source.

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
    };

    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleFullScreen = () => {
    videoRef.current?.requestFullscreen();
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return;
    
    const progressWidth = progressRef.current.clientWidth;
    const clickPosition = e.nativeEvent.offsetX;
    const percentageClicked = clickPosition / progressWidth;
    const newTime = duration * percentageClicked;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <Loader className="h-12 w-12 text-primary animate-spin" />
          </div>
        )}
        
        <video 
          ref={videoRef}
          className="w-full h-full"
          poster="/placeholder.svg"
          onClick={togglePlayPause}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
          {/* Progress bar */}
          <div 
            ref={progressRef}
            className="w-full h-1 bg-gray-600 rounded-full mb-3 cursor-pointer"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-primary rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={togglePlayPause}
                className={cn(
                  "rounded-full p-1.5 text-white hover:bg-white/10 transition-colors",
                  isPlaying ? "bg-white/20" : "bg-primary"
                )}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </button>
              
              <button 
                onClick={toggleMute}
                className="rounded-full p-1.5 text-white hover:bg-white/10 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </button>
              
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            
            <button 
              onClick={handleFullScreen}
              className="rounded-full p-1.5 text-white hover:bg-white/10 transition-colors"
            >
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-secondary/50 rounded-lg p-6">
        <h2 className="text-xl font-medium mb-3">Video Content Overview</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Introduction to EduFinance Access</li>
          <li>Breaking financial barriers in education</li>
          <li>Scholarship finder and application assistance</li>
          <li>Financial planning tools for education</li>
          <li>Free and affordable educational resources</li>
          <li>How to navigate the platform effectively</li>
        </ul>
      </div>
    </div>
  );
};

export default VideoPlayer;
