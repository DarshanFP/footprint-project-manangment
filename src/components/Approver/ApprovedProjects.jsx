// projectsToBeReviewed.jsx
import React, { useEffect, useReducer, useState } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import DashboardApprover from "./dashboardApprover";

const ApproveProjects = () => {

  const showToast = useToast();
  const[ projectList, setProjectList] = useState([]);

  useEffect(() => {
    

    return () => {};
  }, []);

  return (
    <ChakraProvider>
      <Flex w="100vw" h="full">
        <VStack w="30%" h="100vh" overflowY="scroll">
          <DashboardApprover></DashboardApprover>
        </VStack>
      <Box p={8} bg="gray.100" borderRadius="lg" w="70%" h="100vh" overflowY={"scroll"} overflowX={"hidden"}>
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="blue.500">
          Projects to Be Approved
        </Heading>

        <VStack spacing={6} align="stretch">
          {Object.keys(projectList).map((key) => (
            <React.Fragment key={key}>
              {projectList[key].map((project) => (
                <Box
                  key={project.id}
                  bg="white"
                  p={6}
                  borderRadius="lg"
                  boxShadow="md"
                  width="100%"
                >
                  <Heading size="md" mb={2} color="blue.500">
                    {project.id}
                  </Heading>

                  <Button
                    colorScheme="blue"
                    as={Link}
                    to={`/View${key}/${encodeURIComponent(
                      JSON.stringify(project.project)
                    )}`} // Update this route as needed
                    mb={2}
                    borderRadius="full"
                  >
                    Approve
                  </Button>
                </Box>
              ))}
            </React.Fragment>
          ))}
        </VStack>
      </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default ApproveProjects;
