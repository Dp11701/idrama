import React from "react";

type ImageIconProps = {
  src: string;
  alt?: string;
  size?: number;
  className?: string;
};

const ImageIcon: React.FC<ImageIconProps> = ({
  src,
  alt = "icon",
  size = 24,
  className = "",
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`inline-block object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

export default ImageIcon;
