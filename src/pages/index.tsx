import Head from "next/head";
import Link from "next/link";
import { Button, Loader, Skeleton } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons";
import { useSession } from "next-auth/react";

import type { NextPage } from "next";

import { useQuery } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  const { data: posts } = useQuery(["post.getAll"]);

  return (
    <>
      <Head>
        <title>T3 Blog - Home</title>
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700 dark:text-gray-200">
          Welcome to <span className="text-purple-300">T3 Blog</span>
          {session && session.user && (
            <span>
              ,
              <span className="text-red-500 dark:text-red-400">
                {session.user.name || "User"}
              </span>
            </span>
          )}
        </h1>
        <h2 className="text-4xl md:text-[4rem] leading-normal font-bold text-amber-700 dark:text-amber-200">
          Posts
        </h2>
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex items-center justify-center gap-4 my-6">
            {posts ? (
              <>
                {posts.map(({ id, title }) => (
                  <Link key={id} href={`/posts/${id}`} passHref>
                    <Button component="a" size="lg" variant="outline">
                      <span className="text-2xl">{title}</span>
                    </Button>
                  </Link>
                ))}
              </>
            ) : (
              <Loader variant="bars" />
            )}
          </div>
          <Skeleton
            visible={status === "loading"}
            className="!w-auto flex justify-center items-center"
          >
            {session ? (
              <Link href="/posts/create" passHref>
                <Button
                  component="a"
                  size="lg"
                  rightIcon={<IconPencilPlus />}
                  variant="white"
                >
                  Create a new Post
                </Button>
              </Link>
            ) : (
              <h3 className="text-3xl md:text-[2rem] leading-normal font-bold text-blue-900 dark:text-blue-200">
                Please log in to create posts!
              </h3>
            )}
          </Skeleton>
        </div>
      </main>
    </>
  );
};

export default Home;
