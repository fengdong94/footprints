"use client";

import React, { useState, useMemo } from "react";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Camera, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadWallProps {
  images: string[];
  onChange: (newImages: string[]) => void;
  isEditing: boolean;
  maxNumber?: number;
}

const ImageUploadWall: React.FC<ImageUploadWallProps> = ({
  images = [],
  onChange,
  isEditing,
  maxNumber = 12,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  // react-images-uploading needs { data_url: string }
  const formattedImages: ImageType[] = useMemo(
    () => images.map((url) => ({ data_url: url })),
    [images]
  );
  const handleChange = (imageList: ImageListType) => {
    const newUrls = imageList.map((img) => img.data_url);
    onChange(newUrls);
  };

  const handlePreview = (index: number) => {
    setImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="w-full">
      <ImageUploading
        multiple
        value={formattedImages}
        onChange={handleChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <>
            <div className="grid grid-cols-4 gap-2">
              {imageList.map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    "group relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm transition-all",
                    !isEditing
                      ? "cursor-zoom-in hover:shadow-md"
                      : "cursor-default"
                  )}
                  onClick={() => !isEditing && handlePreview(index)}
                >
                  <Image
                    src={image["data_url"]}
                    alt="photo"
                    fill
                    className="object-cover"
                  />
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onImageRemove(index);
                        }}
                        className="p-2 bg-white text-red-500 rounded-full shadow-lg hover:bg-red-50 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {isEditing && imageList.length < maxNumber && (
                <button
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                  className={cn(
                    "aspect-square flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-200 group cursor-pointer",
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/50"
                  )}
                >
                  <div className="p-2.5 bg-blue-50 text-blue-500 rounded-full mb-2 group-hover:scale-110 transition-transform shadow-sm">
                    <Camera size={20} />
                  </div>
                  <span className="text-xs text-gray-500 font-medium group-hover:text-blue-600">
                    Add photos
                  </span>
                  <span className="text-[10px] text-gray-400 mt-1">
                    {imageList.length} / {maxNumber}
                  </span>
                </button>
              )}
            </div>
            {!isEditing && images.length === 0 && (
              <div className="p-6 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-sm text-gray-400">no photos for now...</p>
              </div>
            )}
          </>
        )}
      </ImageUploading>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={imageIndex}
        slides={images.map((src) => ({ src }))}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
          navigationPrev: { color: "#fff" },
          navigationNext: { color: "#fff" },
        }}
      />
    </div>
  );
};

export default ImageUploadWall;
