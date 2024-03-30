`use client`;

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

type Props = {
  onClick: (selection: string, event: React.FormEvent) => void;
  personalityCategory: string[];
  title: string;
};

const SelectionSection = ({ onClick, personalityCategory, title }: Props) => {
  const [selectedChoice, setSelectedChoice] = React.useState<number>();

  return (
    <div>
      <h2>{title}</h2>
      <div className="grid gap-4 mt-4 md:grid-cols-2">
        {personalityCategory.map((sign, index) => (
          <Button
            key={index}
            onClick={(event) => {
              onClick(sign, event);
              setSelectedChoice(index);
            }}
            variant={selectedChoice === index ? "default" : "secondary"}
          >
            {sign}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SelectionSection;
