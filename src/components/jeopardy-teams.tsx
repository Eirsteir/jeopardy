"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TeamMember = {
  id: number;
  name: string;
};

type Team = {
  id: number;
  name: string;
  members: TeamMember[];
  points: number;
};

/**
 * ENDRE PÅ LAG HER
 */
const initialTeams: Team[] = [
  {
    id: 1,
    name: "Lag 1 ",
    members: [
      { id: 1, name: "Navn" },
      { id: 2, name: "Navn" },
      { id: 3, name: "Navn" },
      { id: 4, name: "Navn" },
    ],
    points: 0,
  },
  {
    id: 2,
    name: "Lag 2",
    members: [
      { id: 6, name: "Navn" },
      { id: 7, name: "Navn" },
      { id: 8, name: "Navn" },
      { id: 9, name: "Navn" },
    ],
    points: 0,
  },
  {
    id: 3,
    name: "Lag 3",
    members: [
      { id: 11, name: "Navn" },
      { id: 12, name: "Navn" },
      { id: 13, name: "Navn" },
      { id: 14, name: "Navn" },
    ],
    points: 0,
  },
  {
    id: 4,
    name: "Lag 4",
    members: [
      { id: 16, name: "Navn" },
      { id: 17, name: "Navn" },
      { id: 18, name: "Navn" },
      { id: 19, name: "Navn" },
    ],
    points: 0,
  },
  {
    id: 5,
    name: "Lag 5",
    members: [
      { id: 21, name: "Navn" },
      { id: 22, name: "Navn" },
      { id: 23, name: "Navn" },
      { id: 24, name: "Navn" },
    ],
    points: 0,
  },
];

export default function JeopardyTeams() {
  const [teams, setTeams] = useState<Team[]>(() => {
    if (typeof window !== "undefined") {
      const savedTeams = localStorage.getItem("jeopardyTeams");
      return savedTeams ? JSON.parse(savedTeams) : initialTeams;
    }
    return initialTeams;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTeams = localStorage.getItem("jeopardyTeams");
      setTeams(savedTeams ? JSON.parse(savedTeams) : initialTeams);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("jeopardyTeams", JSON.stringify(teams));
  }, [teams]);

  const handlePointsChange = (teamId: number, newPoints: number) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId ? { ...team, points: newPoints } : team,
      ),
    );
  };

  const handleNameChange = (teamId: number, newName: string) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId ? { ...team, name: newName } : team,
      ),
    );
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {teams.map((team) => (
          <Card key={team.id} className="w-full">
            <CardHeader>
              <CardTitle>
                <Input
                  value={team.name}
                  onChange={(e) => handleNameChange(team.id, e.target.value)}
                  className="text-xl font-bold"
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`points-${team.id}`}>Poeng:</Label>
                  <Input
                    id={`points-${team.id}`}
                    type="number"
                    value={team.points}
                    onChange={(e) =>
                      handlePointsChange(team.id, parseInt(e.target.value, 10))
                    }
                    className="w-20 text-right"
                  />
                </div>
                <div>
                  {/*<Label>Medlemmer:</Label>*/}
                  <ul className="mt-2 list-inside list-disc">
                    {team.members.map((member) => (
                      <li key={member.id}>{member.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
