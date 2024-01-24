"use client";

import { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table"

import { useCurrentUser } from "@/hooks/use-current-user";
import { CharacterSchema } from "@/schemas"
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { getCharacters } from "@/actions/get-characters";

type Character = {
  name: string;
  realm: string;
  faction: "HORDE" | "ALLIANCE";
  characterClass: "DRUID" | "HUNTER" | "MAGE" | "PALADIN" | "PRIEST" | "ROGUE" | "SHAMAN" | "WARLOCK" | "WARRIOR";
  spec: string;
};

// TODO: move this to a shared file
const columns: ColumnDef<Character>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "realm",
    header: "Realm",
  },
  {
    accessorKey: "faction",
    header: "Faction",
  },
  {
    accessorKey: "characterClass",
    header: "Class",
  },
  {
    accessorKey: "spec",
    header: "Spec",
  }
];

export default function CharacterList() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const user = useCurrentUser();
  
  function updateCharacterList() {
    if (user) {
      getCharacters(user.id).then((results) => {
        console.log(results);
        
        setCharacters(results.data ? results.data as Character[] : []);
      });
    }
  }

  useEffect(() => {
    updateCharacterList();
  }, [user]);

  return (
    <div className="w-full h-full flex flex-col">
      <Button
        className="bg-blue-500 hover:bg-blue-600 text-white h-10 m-2"
        onClick={updateCharacterList}
      >
        Refresh Character List
      </Button>
      <div className="container m-0 mt-2">
        <DataTable columns={columns} data={characters} />
      </div>
    </div>
  )
};
