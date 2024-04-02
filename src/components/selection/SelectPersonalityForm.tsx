"use client";

import React, { use } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { personalitySchema } from "@/schemas/form/personality";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectionButton from "./SelectionButton";

type Props = {};

type Input = z.infer<typeof personalitySchema>;

const SelectPersonalityForm = (props: Props) => {
  const personalityTypes = {
    mbti: [
      "ENTP",
      "INTJ",
      "INFP",
      "ENFJ",
      "ISTP",
      "ISFJ",
      "ESTP",
      "ESFJ",
      "ISTJ",
      "ISFP",
      "ESTJ",
      "ESFP",
      "INTP",
      "INFJ",
      "ENTJ",
      "ENFP",
    ],
    zodiac: [
      "Cancer",
      "Leo",
      "Virgo",
      "Libra",
      "Scorpio",
      "Sagittarius",
      "Capricorn",
      "Aquarius",
      "Pisces",
      "Aries",
      "Taurus",
      "Gemini" /* ... */,
    ],
  };

  const form = useForm<Input>({
    resolver: zodResolver(personalitySchema),
    defaultValues: {
      mbti: "ENTP",
      zodiac: "Cancer",
    },
  });

  function onSubmit(input: Input) {
    alert(JSON.stringify(input, null, 2));
  }

  form.watch();

  return (
    <div className="absolute -tranlate-x-1/2 -translate-y-1/2 top-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-2xl">Personality</CardTitle>
          <CardDescription>Select my personality</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormItem>
                <FormLabel className="text-xl font-bold">MBTI</FormLabel>
                <FormDescription>Select your MBTI</FormDescription>
                <div className="justify-center items-center flex flex-wrap gap-4 mt-4  max-w-6xl md:grid-cols-2">
                  {personalityTypes.mbti.map((sign, index) => (
                    <SelectionButton
                      key={index}
                      size="lg"
                      type="button"
                      variant={
                        form.getValues("mbti") === sign
                          ? "fixedDefault"
                          : "fixedSecondary"
                      }
                      onClick={() =>
                        form.setValue("mbti", sign as Input["mbti"])
                      }
                    >
                      {sign}
                    </SelectionButton>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel className="text-xl font-bold">Zodiac</FormLabel>
                <FormDescription>Select your Zodiac</FormDescription>
                <div className="justify-center items-center flex flex-wrap gap-4 mt-4  max-w-6xl md:grid-cols-2">
                  {personalityTypes.zodiac.map((sign, index) => (
                    <SelectionButton
                      key={index}
                      size="lg"
                      type="button"
                      variant={
                        form.getValues("zodiac") === sign
                          ? "fixedDefault"
                          : "fixedSecondary"
                      }
                      onClick={() =>
                        form.setValue("zodiac", sign as Input["zodiac"])
                      }
                    >
                      {sign}
                    </SelectionButton>
                  ))}
                </div>
                <FormMessage />
              </FormItem>

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelectPersonalityForm;
