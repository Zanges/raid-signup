"use client";

import { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table"
import { RxCaretSort } from "react-icons/rx";

import { useCurrentUser } from "@/hooks/use-current-user";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { getCharacters } from "@/actions/get-characters";
import { CLASS_COLORS } from "@/lib/static";
import { cn } from "@/lib/utils";

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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <RxCaretSort className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "realm",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Realm
          <RxCaretSort className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "faction",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Faction
          <RxCaretSort className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const faction = row.getValue("faction") as string || "";
      const correctCaseFaction = faction.charAt(0) + faction.slice(1).toLowerCase();
      const factionColor = faction === "HORDE" ? "red" : "blue";
      return (
        <div
          className={cn(
            "flex flex-row items-center",
            factionColor === "red" ? "text-red-500" : "text-sky-400",
          )}
        >
          {correctCaseFaction}
        </div>
      );
    },
  },
  {
    accessorKey: "characterClass",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Class
          <RxCaretSort className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const characterClass = row.getValue("characterClass") as string || "";
      const correctCaseClass = characterClass.charAt(0) + characterClass.slice(1).toLowerCase();
      const classColor = CLASS_COLORS[correctCaseClass as keyof typeof CLASS_COLORS];
      return (
        <div className="flex flex-row items-center">
          <div
            className="w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: classColor }}
          />
          <div>{correctCaseClass}</div>
        </div>
      );
    },
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
        setCharacters(results.data ? results.data as Character[] : []);
      });
    }
  }

  useEffect(() => {
    updateCharacterList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <Button
        className="bg-blue-500 hover:bg-blue-600 text-white h-10 m-2"
        onClick={updateCharacterList}
      >
        Refresh Character List
      </Button>
      <div className="container mx-auto w-full h-full m-2">
        <DataTable columns={columns} data={characters} />
      </div>
    </div>
  )
};
