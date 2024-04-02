import { z } from "zod";
const mbti = [
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
] as const;

const zodiac = [
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
  "Gemini",
] as const;

export const personalitySchema = z.object({
  mbti: z.enum(mbti).optional(),
  zodiac: z.enum(zodiac).optional(),
  personality: z.array(z.union([z.enum(mbti), z.enum(zodiac)])).optional(),
});
