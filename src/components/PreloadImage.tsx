"use client";

import { useState, useEffect } from "react";
import { Box, Text, Image } from "@chakra-ui/react";

interface PreloadImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

export default function PreloadImage({
  src,
  alt,
  fallbackSrc,
  width = "100%",
  height = "100%",
  borderRadius,
  objectFit = "cover",
}: PreloadImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImageSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);

    // Try fallback image if available
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setIsLoading(true);
    }
  };

  return (
    <Box
      position="relative"
      width={width}
      height={height}
      borderRadius={borderRadius}
      overflow="hidden"
    >
      {hasError && !fallbackSrc && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={1}
          textAlign="center"
        >
          <Text fontSize="sm" color="gray.500">
            Failed to load image
          </Text>
        </Box>
      )}

      <Image
        src={imageSrc}
        alt={alt}
        width="100%"
        height="100%"
        objectFit={objectFit}
        opacity={isLoading ? 0 : 1}
        transition="opacity 0.3s ease-in-out"
        onLoad={handleLoad}
        onError={handleError}
      />
    </Box>
  );
}
