"use client";

import * as z from "zod";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useCurrentUser } from "@/hooks/use-current-user";
import { NewCharacterSchema } from "@/schemas";
import { CharacterClass } from "@/lib/enums";
import { cn } from "@/lib/utils";

const characterClasses = Object.keys(CharacterClass).map((key) => {
  return {
      value: key,
      label: key.charAt(0) + key.slice(1).toLowerCase(),
    }
  })

const factions = [
  {
    value: "ALLIANCE",
    label: "Alliance"
  },
  {
    value: "HORDE",
    label: "Horde"
  }
]

export function NewCharacterForm() {
  const user = useCurrentUser();

  const form = useForm<z.infer<typeof NewCharacterSchema>>({
    resolver: zodResolver(NewCharacterSchema),
  });

  const onSubmit = (values: z.infer<typeof NewCharacterSchema>) => {
    console.log("submitting");
    console.log(user);
    console.log(values);
  };

  return (
    <Card className="w-[450px] shadow-md">
      <CardHeader>
        <h1>
          Create a new character
        </h1>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="realm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Realm</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Realm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="faction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Faction</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {
                            field.value
                              ? factions.find((faction) => faction.value.toUpperCase() === field.value)?.label
                              : "Select a faction"
                          }
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Select a class..."
                          className="h-9"
                        />
                        <CommandEmpty>No class found.</CommandEmpty>
                        <CommandGroup>
                          {factions.map((faction) => (
                            <CommandItem
                              value={faction.label}
                              key={faction.value}
                              onSelect={() => {
                                form.setValue("faction", faction.value.toUpperCase() as "ALLIANCE" | "HORDE")
                              }}
                            >
                              {faction.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  faction.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                              )}
                            />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="characterClass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {
                            field.value
                              ? characterClasses.find((characterClass) => characterClass.value.toUpperCase() === field.value)?.label
                              : "Select a character class"
                          }
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Select a class..."
                          className="h-9"
                        />
                        <CommandEmpty>No class found.</CommandEmpty>
                        <CommandGroup>
                          {characterClasses.map((characterClass) => (
                            <CommandItem
                              value={characterClass.label}
                              key={characterClass.value}
                              onSelect={() => {
                                form.setValue("characterClass", characterClass.value.toUpperCase() as "DEATHKNIGHT" | "DEMONHUNTER" | "DRUID" | "EVOKER" | "HUNTER" | "MAGE" | "MONK" | "PALADIN" | "PRIEST" | "ROGUE" | "SHAMAN" | "WARLOCK" | "WARRIOR")
                              }}
                            >
                              {characterClass.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  characterClass.value?.toLowerCase() === field.value?.toLowerCase()
                                    ? "opacity-100"
                                    : "opacity-0"
                              )}
                            />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="spec"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spec</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Spec"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
            >
              Create character
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}