import { db } from "@/lib/db";
import {
  CharacterClass,
  Faction,
  GameVersion
} from "@/lib/enums";


export async function createNewCharacter(
  userId: string, 
  name: string,
  realm: string,
  faction: Faction,
  gameVersion: GameVersion,
  characterClass: CharacterClass,
  spec: string,
) {
  const character = await db.character.create({
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

  return character;
}