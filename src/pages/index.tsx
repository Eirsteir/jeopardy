"use client";

import Head from "next/head";
import JeopardyBoard from "@/components/jeopardy-board";
import JeopardyTeams from "@/components/jeopardy-teams";

export default function Home() {
  return (
    <>
      <Head>
        <title>JEOPARDY</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <JeopardyTeams />
        <JeopardyBoard />
      </main>
    </>
  );
}