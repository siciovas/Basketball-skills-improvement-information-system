import { Center, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideo() {
      try {
        // Replace 'your-blob-url' with the actual URL of your video in Azure Blob Storage
        const response = await fetch(
          "https://bsdistorage.blob.core.windows.net/videos/2023-10-14%2013-27-05.mkv"
        );
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setVideoUrl(blobUrl);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    }

    fetchVideo();

    return () => {
      // Clean up resources
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, []);

  return (
    <>
      {!videoUrl ? (
        <Center>
          <Spinner size="xl" textAlign="center" />
        </Center>
      ) : (
        <ReactPlayer controls={true} url={videoUrl} />
      )}
    </>
  );
};

export default VideoPlayer;
