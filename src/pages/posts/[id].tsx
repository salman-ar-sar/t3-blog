import Head from "next/head";
import { useRouter } from "next/router";
import { Button, Loader } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons";
import type { NextPage } from "next";

import { useQuery } from "../../utils/trpc";

const Posts: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: post } = useQuery(["post.getById", { id }]);

  return (
    <>
      <Head>
        <title>T3 Blog - {post?.title || "Post"}</title>
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        {post ? (
          <>
            <h2 className="text-5xl md:text-[4rem] leading-normal font-extrabold text-amber-300">
              {post.title}
            </h2>
            <div className="mb-2 text-lg text-gray-300">{post.content}</div>
            <Button
              component="a"
              size="lg"
              leftIcon={<IconArrowNarrowLeft />}
              variant="light"
              onClick={() => router.back()}
            >
              Go back
            </Button>
          </>
        ) : (
          <Loader variant="bars" />
        )}
      </main>
    </>
  );
};

export default Posts;
