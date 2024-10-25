"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

type Question = {
  points: number;
  question: string;
  answer: string;
};

type Category = {
  name: string;
  questions: Question[];
};


/**
 * ENDRE PÅ KATEGORIER HER
 * 
 * QUESTIONS BRUKES IKKE, MEN POINTS BRUKES SÅ IKKE FJERN DE. 
 */
const jeopardyData: Category[] = [
  {
    name: "FARGER",
    questions: [
      {
        points: 100,
        question: "This president was on the penny",
        answer: "Abraham Lincoln",
      },
      { points: 200, question: "Year World War II ended", answer: "1945" },
      {
        points: 300,
        question: "Ancient wonder in Egypt",
        answer: "The Great Pyramid",
      },
      {
        points: 400,
        question: "Magna Carta was signed in this year",
        answer: "1215",
      },
      {
        points: 500,
        question: "First European to reach India by sea",
        answer: "Vasco da Gama",
      },
    ],
  },
  {
    name: "MAT OG DRIKKE",
    questions: [
      {
        points: 100,
        question: "H2O is the chemical formula for this",
        answer: "Water",
      },
      {
        points: 200,
        question: "Number of planets in our solar system",
        answer: "8",
      },
      { points: 300, question: "Smallest unit of matter", answer: "Atom" },
      {
        points: 400,
        question: "This scientist developed the theory of relativity",
        answer: "Albert Einstein",
      },
      { points: 500, question: "The study of fossils", answer: "Paleontology" },
    ],
  },
  {
    name: "TALL",
    questions: [
      { points: 100, question: "Largest continent", answer: "Asia" },
      { points: 200, question: "Capital of France", answer: "Paris" },
      { points: 300, question: "Longest river in the world", answer: "Nile" },
      { points: 400, question: "Country shaped like a boot", answer: "Italy" },
      {
        points: 500,
        question: "Driest desert in the world",
        answer: "Atacama Desert",
      },
    ],
  },
  {
    name: "TRONDHEIM",
    questions: [
      {
        points: 100,
        question: "Author of Romeo and Juliet",
        answer: "William Shakespeare",
      },
      {
        points: 200,
        question: "This novel features a character named Atticus Finch",
        answer: "To Kill a Mockingbird",
      },
      { points: 300, question: "Author of 1984", answer: "George Orwell" },
      {
        points: 400,
        question: "This Russian wrote War and Peace",
        answer: "Leo Tolstoy",
      },
      { points: 500, question: "Ancient Greek epic poet", answer: "Homer" },
    ],
  },
  {
    name: "DYR",
    questions: [
      {
        points: 100,
        question: "Wizard in Harry Potter series",
        answer: "Dumbledore",
      },
      {
        points: 200,
        question: "This superhero is known as the Dark Knight",
        answer: "Batman",
      },
      {
        points: 300,
        question: "Animated movie featuring a lion cub named Simba",
        answer: "The Lion King",
      },
      {
        points: 400,
        question: "TV show about paper company Dunder Mifflin",
        answer: "The Office",
      },
      {
        points: 500,
        question: "Artist who painted The Starry Night",
        answer: "Vincent van Gogh",
      },
    ],
  },
];

const LOCALSTORAGE_KEY = "answeredQuestions";

export default function Component() {
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    // Load answered questions from localStorage when component mounts
    const savedAnsweredQuestions = localStorage.getItem(LOCALSTORAGE_KEY);

    if (savedAnsweredQuestions) {
      setAnsweredQuestions(new Set(JSON.parse(savedAnsweredQuestions)));
    }
  }, []);

  const handleQuestionClick = (
    categoryIndex: number,
    questionIndex: number,
  ) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setAnsweredQuestions((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }

      localStorage.setItem(
        LOCALSTORAGE_KEY,
        JSON.stringify(Array.from(newSet)),
      );
      return newSet;
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-5 gap-4">
        {jeopardyData.map((category, categoryIndex) => (
          <Card
            key={category.name}
            className="bg-primary text-primary-foreground"
          >
            <CardContent className="p-4">
              <h2 className="text-center text-xl font-semibold">
                {category.name}
              </h2>
            </CardContent>
          </Card>
        ))}
        {[0, 1, 2, 3, 4].map((questionIndex) =>
          jeopardyData.map((category, categoryIndex) => (
            <Card
              key={`${categoryIndex}-${questionIndex}`}
              className={`cursor-pointer transition-colors ${
                answeredQuestions.has(`${categoryIndex}-${questionIndex}`)
                  ? "bg-muted text-muted-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
              onClick={() => handleQuestionClick(categoryIndex, questionIndex)}
            >
              <CardContent className="flex items-center justify-center p-4">
                <span className="text-2xl font-bold">
                  {answeredQuestions.has(`${categoryIndex}-${questionIndex}`)
                    ? ""
                    : `${category.questions[questionIndex]!.points}`}
                </span>
              </CardContent>
            </Card>
          )),
        )}
      </div>
    </div>
  );
}
