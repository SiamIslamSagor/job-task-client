"use client";
import Image from "next/image";
import { useState } from "react";
import { IImage } from "../app/types";
import axios from "axios";

const ImageCard = ({ image }: { image: IImage }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [showOriginalDescription, setShowOriginalDescription] =
    useState<boolean>(false);
  const [showDescriptionBox, setShowDescriptionBox] = useState<boolean>(false);
  const [englishProficiencyResult, setEnglishProficiencyResult] = useState<any>(null);

  const handleSubmitDescription = async () => {
    setIsLoading(true);
    console.log(description);
    setShowDescriptionBox((prev) => !prev);

    if (description.trim() === "") {
      return;
    }
    // send description to server
    try {
      const response = await axios.post(
        "https://back-end-job-task.vercel.app/api/analysis/score",
        {
          userText: description,
          imageId: image.id,
        }
      );
      console.log(response.data);
      if (response.data.success) {
        setEnglishProficiencyResult(response.data.data);
      }
      alert("Description submitted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to submit description");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Image
        src={image.imageUrl}
        alt={image.description}
        width={500}
        height={500}
      />
      {englishProficiencyResult && (
        <div>
          <h2>English Proficiency Result</h2> <br />
          <p>Score: {englishProficiencyResult.score}</p> <br />
          <p>Feedback: <br /> {englishProficiencyResult.feedback}</p> <br />
          <div><p>Improvements:</p> 
          {englishProficiencyResult.improvements?.map((improvement: string, idx: number) => (
            <li key={idx}>{improvement}</li>
          ))}
          </div> 
        </div>
      )}
      <button
        className="bg-blue-500 text-white p-2 px-4 rounded-md"
        onClick={() => setShowDescriptionBox((prev) => !prev)}
      >
        {isLoading ? "Analyzing..." : "Describe Image"}
      </button>
      {showDescriptionBox && (
        <div>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 px-4 rounded-md"
            onClick={handleSubmitDescription}
          >
            Submit
          </button>
        </div>
      )}
      {/* <button className="bg-blue-500 text-white p-2 px-4 rounded-md" onClick={() => setShowDescriptionBox((prev) => !prev )}>{showDescriptionBox ? "Hide Description Box" : "Show Description Box"}</button> */}
      <button
        className="bg-blue-500 text-white p-2 px-4 rounded-md"
        onClick={() => setShowOriginalDescription((prev) => !prev)}
      >
        {showOriginalDescription
          ? "Hide Original Description"
          : "Show Original Description"}
      </button>
      {showOriginalDescription && (
        <h2 className="text-base text-gray-600 max-w-md">
          Description: {image.description}
        </h2>
      )}
    </div>
  );
};

export default ImageCard;
