'use client'

import { pages } from "@/app/data/pages";
import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const Flipbook: React.FC = () => {
  // Fixing the ref type error
//   const flipBookRef = useRef<HTMLFlipBook | null>(null);
const flipBookRef = useRef<any | null>(null);
  const fullScreenHandle = useFullScreenHandle();

  const goToNextPage = () => {
    console.log("Next button clicked");
    flipBookRef.current?.flipNext();
  };

  const goToPrevPage = () => {
    console.log("Previous button clicked");
    flipBookRef.current?.flipPrev();
  };

  return (
    <FullScreen handle={fullScreenHandle}>
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        {/* Fullscreen Toggle Button */}
        <button
          onClick={fullScreenHandle.active ? fullScreenHandle.exit : fullScreenHandle.enter}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
        >
          {fullScreenHandle.active ? "Exit Fullscreen" : "Enter Fullscreen"}
        </button>

        {/* Flipbook Viewer */}
        <HTMLFlipBook
          ref={flipBookRef}
          width={300}
          height={400}
          size="stretch"
          minWidth={100}
          maxWidth={1000}
          minHeight={100}
          maxHeight={1000}
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          useMouseEvents={true}
          showCover={true} // Ensure covers are shown
          className="shadow-lg"
        >
          {pages.map((page, index) => (
            <div
              key={page.id}
              className={`flex justify-center items-center text-center p-4 ${
                index === 0
                  ? "bg-cover bg-blue-500 text-white" // Front cover
                  : index === pages.length - 1
                  ? "bg-cover bg-gray-800 text-white" // Back cover
                  : "bg-white" // Regular pages
              }`}
            >
              <p className="text-lg font-medium">
                {index === 0
                  ? "Magazine Cover"
                  : index === pages.length - 1
                  ? "Back Cover"
                  : page.content}
              </p>
            </div>
          ))}
        </HTMLFlipBook>

        {/* Navigation Buttons */}
        <div className="mt-4 flex gap-4">
          <button
            onClick={goToPrevPage}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            Previous
          </button>
          <button
            onClick={goToNextPage}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            Next
          </button>
        </div>

        {/* Thumbnail Navigation */}
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {pages.map((page, index) => (
            <div
              key={page.id}
              onClick={() => flipBookRef.current?.pageFlip(index)} // Use pageFlip for navigation
              className="w-16 h-20 flex justify-center items-center bg-gray-200 border rounded cursor-pointer hover:bg-gray-300"
            >
              <p className="text-xs">{`Page ${page.id}`}</p>
            </div>
          ))}
        </div>
      </div>
    </FullScreen>
  );
};

export default Flipbook;

