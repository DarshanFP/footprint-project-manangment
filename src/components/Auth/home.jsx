// Home.jsx
import React from "react";
import {
  VStack,
  Heading,
  Button,
  Link,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

import main_img from "../../Images/main-img - Copy.png";

const Home = () => {
  return (
    <Flex
      w="80vw"
      m="auto"
      my="8"
      shadow="0px 0px 50px gray"
      border="1px solid black"
      rounded="35"
      background="#30415b"
    >
      <Flex
        w="50%"
        p="4"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Heading color="#fba95c" size="xl" mb="8">
          Welcome to SalesProject
        </Heading>
        <Text w="70%" color="white" textAlign="center" mb="4">
          {" "}
          We are here .. to serve you, Support you as a friend in your need. We
          are SalesProject, always with you, just for you, in your country !!{" "}
        </Text>
        <Link as={ReactRouterLink} to="/login" width="60%">
          <Button
            my="4"
            w="100%"
            rounded="xl"
            _hover={{ bg: "#fba95c", color: "white" }}
          >
            {" "}
            Login Into Existing Account
          </Button>
        </Link>
        <Link as={ReactRouterLink} to="/register" width="60%">
          <Button
            w="100%"
            rounded="xl"
            _hover={{ bg: "#fba95c", color: "white" }}
          >
            {" "}
            Register here{" "}
          </Button>
        </Link>
      </Flex>
      <VStack w="50%" p="0">
        <img src={main_img} alt="" w="100%" />
      </VStack>
    </Flex>
    // <VStack
    //   height="100vh"
    //   justify="center"
    //   align="center"
    //   bgGradient="linear(to-r, teal.200, cyan.400)"
    //   color="white"
    //   spacing={6}
    //   p={4}
    // >
    //   {/* Welcome Text */}
    //   <VStack>
    //     <Heading mb={2} fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>
    //       Welcome to -
    //     </Heading>
    //     <Heading as="h1" size={{ base: "2xl", md: "3xl", lg: "4xl" }}>
    //       Salsproject
    //     </Heading>
    //   </VStack>

    //   {/* Buttons */}
    //   <VStack width="100%" spacing={4} align="center" justify="center">
    //     <Link as={ReactRouterLink} to="/login" width="100%">
    //       <Button
    //         colorScheme="teal"
    //         size="lg"
    //         w="20%"
    //         bgGradient="linear(to-r, teal.500, teal.300)"
    //         _hover={{ bgGradient: "linear(to-r, teal.600, teal.200)" }}
    //       >
    //         <Text fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>Login</Text>
    //       </Button>
    //     </Link>
    //     <Link as={ReactRouterLink} to="/register" width="100%">
    //       <Button
    //         colorScheme="purple"
    //         size="lg"
    //         w="20%"
    //         bgGradient="linear(to-r, purple.500, purple.300)"
    //         _hover={{ bgGradient: "linear(to-r, purple.600, purple.200)" }}
    //         p={5}
    //       >
    //         <Text fontSize={{ base: "l", md: "xl", lg: "2xl" }}>Register</Text>
    //       </Button>
    //     </Link>
    //   </VStack>
    // </VStack>
  );
};

export default Home;
