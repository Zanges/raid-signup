import { db } from "@/lib/db";

export async function getCharacterById(id: string){
  try {
    const character = await db.character.findUnique({ where: { id } })

    return character;
  } catch {
    return null;
  }
}

export async function getCharacterByNameAndRealm(name: string, realm: string){
  try {
    const character = await db.character.findUnique({ where: { name_realm: { name, realm } } })

    return character;
  } catch {
    return null;
  }
}

export async function getCharactersByUserId(userId: string){
  try {
    const characters = await db.character.findMany({ where: { userId } })

    return characters;
  } catch {
    return null;
  }
}