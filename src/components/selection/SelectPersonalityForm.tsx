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

type Props = {};

type Input = z.infer<typeof personalitySchema>;

const SelectPersonalityForm = (props: Props) => {
  const form = useForm<Input>({
    resolver: zodResolver(personalitySchema),
    defaultValues: {
      mbti: "ENTP",
      zodiac: "leo",
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
                <FormLabel>MBTI</FormLabel>
                <div className="justify-center items-center flex gap-4 mt-4 md:grid-cols-2">
                  <Button
                    size="lg"
                    type="button"
                    variant={
                      form.getValues("mbti") === "ENTP"
                        ? "default"
                        : "secondary"
                    }
                    onClick={() => form.setValue("mbti", "ENTP")}
                  >
                    ENTP
                  </Button>
                  <Button
                    size="lg"
                    type="button"
                    variant={
                      form.getValues("mbti") === "INTJ"
                        ? "default"
                        : "secondary"
                    }
                    onClick={() => form.setValue("mbti", "INTJ")}
                  >
                    INTJ
                  </Button>
                </div>
                <FormDescription>Select your MBTI</FormDescription>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Zodiac</FormLabel>
                <div className="justify-center items-center flex gap-4 mt-4 md:grid-cols-2">
                  <Button
                    size="lg"
                    type="button"
                    variant={
                      form.getValues("zodiac") === "leo"
                        ? "default"
                        : "secondary"
                    }
                    onClick={() => form.setValue("zodiac", "leo")}
                  >
                    LEO
                  </Button>
                  <Button
                    size="lg"
                    type="button"
                    variant={
                      form.getValues("zodiac") === "cancer"
                        ? "default"
                        : "secondary"
                    }
                    onClick={() => form.setValue("zodiac", "cancer")}
                  >
                    CANCER
                  </Button>
                </div>
                <FormDescription>Select your Zodiac</FormDescription>
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
