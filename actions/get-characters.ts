"use server";

import { getCharactersByUserId } from "@/data/character"

export async function getCharacters(userId: string | undefined) {
  if (!userId) {
    return { error: "User is not authenticated!" } // Should never happen
  }

  const characters = await getCharactersByUserId(userId);

  return {
    data: characters
  };
}