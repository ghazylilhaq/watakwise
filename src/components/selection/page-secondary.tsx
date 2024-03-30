"use client";

import React, { useState } from "react";
import SelectionSection from "./SelectionSection";
import { Button } from "@/components/ui/button";

type Props = {};

const SelectionPage = (props: Props) => {
  // Assume you have fetched these data from an API
  const mbtiTypes = ["INTJ", "ENTP" /*...*/];
  const zodiacSigns = ["Cancer", "Leo" /*...*/];

  const [mbtiSelection, setMbtiSelection] = useState("");
  const [zodiacSelection, setZodiacSelection] = useState("");

  const handleMbtiSelection = (selection: string, event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior
    setMbtiSelection(selection);
  };

  const handleZodiacSelection = (selection: string, event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior
    setZodiacSelection(selection);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("MBTI Selection:", mbtiSelection);
    console.log("Zodiac Selection:", zodiacSelection);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <SelectionSection
            title="Your Zodiac Sign"
            onClick={handleZodiacSelection}
            personalityCategory={zodiacSigns}
          />
        </div>
        <div className="mb-4">
          <SelectionSection
            title="Your MBTI Type"
            onClick={handleMbtiSelection}
            personalityCategory={mbtiTypes}
          />
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="px-4 py-2 text-white rounded-md">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SelectionPage;
