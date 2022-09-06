import React, { useState } from "react";
import {
  ActionIcon,
  Button,
  ColorScheme,
  Loader,
  Skeleton,
} from "@mantine/core";
import {
  IconBrightnessDown,
  IconMoon,
  IconLogin,
  IconLayoutSidebarRightExpand,
} from "@tabler/icons";
import { signIn, signOut, useSession } from "next-auth/react";

import Modal from "../Modal";

interface LayoutProps {
  children: React.ReactNode;
  colorScheme: ColorScheme;
  toggleColorScheme: (value?: ColorScheme) => void;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children, colorScheme, toggleColorScheme } = props;
  const isDark = colorScheme === "dark";

  const { data: session, status } = useSession();
  const [loggingOut, setLoggingOut] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setLoggingOut(true);
    signOut().finally(() => setLoggingOut(false));
  };

  const handleLogoutButtonClick = () => {
    setShowLogoutModal(true);
  };

  return (
    <div className="w-full h-full">
      <div className="absolute top-4 right-4 flex gap-4">
        <Skeleton visible={status === "loading"}>
          {session ? (
            <Button
              className="!w-[112px]"
              color="teal"
              variant="light"
              rightIcon={loggingOut ? null : <IconLogin />}
              onClick={handleLogoutButtonClick}
            >
              {loggingOut ? <Loader color="white" size={20} /> : "Logout"}
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
      <Modal
        opened={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Are you sure you want to logout?"
        transition="fade"
      >
        <div className="flex flex-col gap-4">
          Please press the button below to confirm logout.
          <Button variant="light" onClick={handleLogout}>
            {loggingOut ? <Loader color="white" size={20} /> : "Logout"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Layout;
