import React from "react";
import { Modal as MatineModal } from "@mantine/core";

import type { ModalProps } from "@mantine/core";

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <MatineModal
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      transition="fade"
      transitionDuration={600}
      transitionTimingFunction="ease"
      overlayOpacity={0.55}
      overlayBlur={3}
      centered
    />
  );
};

export default Modal;
