import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Icon,
  Image,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { FaLeaf, FaFileExport } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiPlantFill } from "react-icons/ri";
import logo from "../img/logo.png";
import { ZoneSelect, Search } from "../button";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const variant = useBreakpointValue({
    lg: false,
    base: true,
  });

  const motionVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const ExportButton = ({ w, my }) => (
    <Button
      variant="ghost"
      rounded="full"
      w={w}
      my={my}
      onClick={() => navigate("/export")}
    >
      <Icon as={FaFileExport} mr={2} />
      Export
    </Button>
  );

  const RegisterButton = ({ w, mb }) => (
    <Button
      variant="ghost"
      rounded="full"
      w={w}
      mb={mb}
      onClick={() => navigate("/register")}
    >
      <Icon as={RiPlantFill} mr={1} />
      Register
    </Button>
  );

  useEffect(() => {
    const initPage = setTimeout(() => {
      setNavbar(variant);
      if (isOpen) {
        onClose();
      }
    }, 0);

    return () => {
      clearTimeout(initPage);
    };
  }, [variant]);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={1}
      >
        {/* Logo */}
        <Box onClick={() => navigate("/snc-layout")} pointerEvents="stroke">
          <Image
            srcSet={logo}
            h="3vh"
            fallbackSrc="http://10.1.8.114/ccs/assets/logo.63ae820a.png"
          />
          <Box color="green" display="flex" alignItems="center">
            <Text fontWeight="bold">iCarbon Credit System</Text>
            <Icon as={FaLeaf} ml={1} />
          </Box>
        </Box>

        {navbar ? (
          <Box mr={3}>
            <Icon as={GiHamburgerMenu} h="3vh" onClick={onOpen} />
          </Box>
        ) : (
          <motion.div
            variants={motionVariant}
            initial="hidden"
            animate="visible"
          >
            <Box display="flex" gap={5} mr={2}>
              {window.location.pathname == "/ccs/snc-layout" && (
                <Search w="30%" />
              )}
              {/* <Search w="30%" /> */}
              <ZoneSelect w="30%" />
              <ExportButton w="30%" />
              <RegisterButton w="30%" />
            </Box>
          </motion.div>
        )}
      </Box>

      {/* Sidebar */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody pt={14}>
            <ZoneSelect textAlign="center" />
            <ExportButton w="100%" my={6} />
            <RegisterButton w="100%" mb={6} />
            {window.location.pathname == "/snc-layout" && <Search w="100%" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}