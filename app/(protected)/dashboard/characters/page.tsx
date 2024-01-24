import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import CharacterList from "./_components/character-list";

export default function CharactersPage() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <h1
          className="text-2xl m-2"
        >
          Your Characters
        </h1>
        <Button
          asChild
          className="bg-blue-500 hover:bg-blue-600 text-white w-28 h-10 m-2"
        >
          <Link
            href="/dashboard/characters/create"
          >
            <div className="flex flex-row justify-between items-center">
              <FaPlus />
              <span className="ml-1 w-full text-center">Create</span>
            </div>
          </Link>
        </Button>
      </div>
      <div
        className="w-full h-full flex justify-center items-center"
      >
        <CharacterList />
      </div>
    </div>
  )
}