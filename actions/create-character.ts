"use server";

import * as z from "zod";

import { CharacterSchema } from "@/schemas";
import { db } from "@/lib/db";
import {
  GameVersion
} from "@/lib/enums";
import { getCharacterByNameAndRealm } from "@/data/character";

export async function createCharacter(
  userId: string | undefined, 
  values: z.infer<typeof CharacterSchema>
) {
  if (!userId) {
    return { error: "User is not authenticated!" } // Should never happen
  }

  const validatedValues = CharacterSchema.safeParse(values);

  if (!validatedValues.success) {
    return {
      error: "Invalid values!"
    };
  }

  const {
    name,
    realm,
    faction,
    characterClass,
    spec
  } = validatedValues.data;
  const gameVersion = GameVersion.Classic;

  const existingCharacter = await getCharacterByNameAndRealm(name, realm);

  if (existingCharacter) {
    return { error: "Character already exists!" }
  }
  
  await db.character.create({
    data: {
      name,
      realm,
      faction,
      gameVersion,
      characterClass,
      spec,
      user: {
        connect: {
          id: userId
        }
      }
    }
  });

  return {
    success: "Character created!"
  };
}