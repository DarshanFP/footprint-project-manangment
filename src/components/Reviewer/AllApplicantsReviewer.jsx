// verifyApplicant.jsx
import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  Button,
  VStack,
  Heading,
  Text,
  Divider,
  List,
  ListIcon,
  Flex,
  useToast,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "../../AuthAxios.js";
import DashboardReviewer from "./dashboardReviewer.jsx";

const AllApplicantsReviewer = ({ loggedInReviewerId }) => {
  const [applicants, setApplicants] = useState([]);
  const showToast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // to get all applicants
  console.log(localStorage.getItem("userToken"));

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/users/allapplicant")
      .then((response) => {
        console.log(response.data);
        setApplicants(
          response.data.data
            .filter((applicant) => applicant.isVarified === true)
            .map((applicant) => {
              return {
                id: applicant._id,
                name: applicant.name,
                email: applicant.email,
                contact: applicant.mobile,
                apostolate: applicant.apostolate,
                status: "pending",
              };
            })
        );
        setIsLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        setIsLoading(false);
        showToast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 500,
        });
      });
  }, [showToast]);

  // Create a function for addition

  return (
    <ChakraProvider>
      <Flex w="100vw" h="full">
        <VStack w="30%" h="100vh" overflowY="scroll">
          <DashboardReviewer></DashboardReviewer>
        </VStack>
        <Box
          p={8}
          w="70%"
          h="100vh"
          overflowY={"scroll"}
          overflowX={"hidden"}
          bg="gray.100"
          borderRadius="lg"
        >
          <Heading as="h1" size="xl" mb={6} textAlign="center" color="blue.500">
            Verify Applicants
          </Heading>

          {isLoading === true ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <List spacing={3} width="100%">
              {applicants.length > 0 ? (
                applicants.map((applicant) => (
                  <Box
                    key={applicant.id}
                    bg="white"
                    p={4}
                    borderRadius="lg"
                    boxShadow="md"
                    width="70%"
                    mx={"auto"}
                  >
                    <Flex justify="space-between" align="center">
                      <Heading size="md" color="blue.500">
                        {applicant.name}
                      </Heading>
                      <VStack align="flex-end" spacing={2}>
                        <Text fontSize="md" color="gray.600">
                          Email: {applicant.email}
                        </Text>
                        <Text fontSize="md" color="gray.600">
                          Contact: {applicant.contact}
                        </Text>
                        <Text fontSize="md" color="gray.600">
                          Appostolate: {applicant.apostolate}
                        </Text>
                      </VStack>
                    </Flex>
                    <Divider mt={4} mb={4} />
                  </Box>
                ))
              ) : (
                <Text textAlign="center" color="gray.600">
                  No applicants for the logged-in reviewer.
                </Text>
              )}
            </List>
          )}
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default AllApplicantsReviewer;
