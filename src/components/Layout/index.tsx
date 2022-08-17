import React from "react";

import { ActionIcon, Button, ColorScheme, Skeleton } from "@mantine/core";
import {
  IconBrightnessDown,
  IconMoon,
  IconLogin,
  IconLayoutSidebarRightExpand,
} from "@tabler/icons";
import { signIn, signOut, useSession } from "next-auth/react";

interface LayoutProps {
  children: React.ReactNode;
  colorScheme: ColorScheme;
  toggleColorScheme: (value?: ColorScheme) => void;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children, colorScheme, toggleColorScheme } = props;
  const isDark = colorScheme === "dark";

  const { data: session, status } = useSession();

  return (
    <div className="w-full h-full">
      <div className="absolute top-4 right-4 flex gap-4">
        <Skeleton visible={status === "loading"}>
          {session ? (
            <Button
              color="teal"
              variant="light"
              rightIcon={<IconLogin />}
              onClick={() => signOut()}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="teal"
              variant="light"
              rightIcon={<IconLayoutSidebarRightExpand />}
              onClick={() => signIn()}
            >
              Login
            </Button>
          )}
        </Skeleton>
        <ActionIcon
          color="teal"
          variant="light"
          size="lg"
          onClick={() => toggleColorScheme()}
        >
          {isDark ? <IconBrightnessDown /> : <IconMoon />}
        </ActionIcon>
      </div>
      {children}
    </div>
  );
};

export default Layout;
