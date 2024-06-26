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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

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

type Props = {
  userId: string | undefined;
};

type Input = z.infer<typeof personalitySchema>;

const SelectPersonalityForm = ({ userId }: Props) => {
  const router = useRouter();

  const { mutate: getPersonality, isPending: isPendingPersonality } =
    useMutation({
      mutationFn: async ({ personality }: Input) => {
        const response = await axios.post("/api/personality", { personality });
        return response.data;
      },
    });

  const { mutate: getContent, isPending: isPendingContent } = useMutation({
    mutationFn: async ({ contentType }: { contentType: string }) => {
      const response = await axios.post("/api/content", { contentType });
      return response.data;
    },
  });

  const onSubmit = async (input: Input) => {
    if (input.mbti && input.zodiac) {
      input.personality = [input.mbti, input.zodiac];

      getPersonality(
        {
          personality: input.personality,
          mbti: input.mbti,
          zodiac: input.zodiac,
        },
        {
          onSuccess: ({ user }) => {
            getContent(
              {
                contentType: "summary",
              },
              {
                onSuccess: ({ user }) => router.push(`/`),
              }
            );
          },
        }
      );
    }
  };

  const form = useForm<Input>({
    resolver: zodResolver(personalitySchema),
    defaultValues: {
      mbti: "ENTP",
      zodiac: "Cancer",
    },
  });

  form.watch();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold text-3xl">Kepribadianmu</CardTitle>
        <CardDescription>Pilih dengan menklik pilihan dibawah</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-2xl font-bold block">MBTI</FormLabel>
              </div>
              <div className="flex flex-wrap gap-4">
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
                    onClick={() => form.setValue("mbti", sign as Input["mbti"])}
                  >
                    {sign}
                  </SelectionButton>
                ))}
              </div>
              <FormMessage />
            </FormItem>
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-2xl font-bold block">
                  Zodiac
                </FormLabel>
              </div>
              <div className="flex flex-wrap gap-4">
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

            {isPendingPersonality || isPendingContent ? (
              <p>Loading...</p>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SelectPersonalityForm;
