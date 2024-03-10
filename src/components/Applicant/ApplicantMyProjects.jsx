// projectsToBeReviewed.jsx
import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  useToast,
  Flex,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DashboardApplicant from "./dashboardApplicant";

const MyProjects = () => {
  const showToast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [AllProjects, setAllProjects] = useState([]);
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("userToken");
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}projects/getallprojectsapplicant`,
          {
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setAllProjects(data.data);
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        setIsLoading(false);
        showToast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 500,
        });
      }
    })();
  }, [showToast]);
  let projectCount = 0;

  return (
    <ChakraProvider>
      <Flex w="100vw" h="full">
        <VStack w="30%" h="100vh" overflowY="scroll">
          <DashboardApplicant></DashboardApplicant>
        </VStack>
        <Box
          p={8}
          bg="gray.100"
          borderRadius="lg"
          w="70%"
          h="100vh"
          overflowY={"scroll"}
          overflowX={"hidden"}
        >
          <Heading as="h1" size="xl" mb={6} textAlign="center" color="blue.500">
            My Applied Projects
          </Heading>

          <VStack spacing={6} align="stretch">
            {/* {projectList.getAllHOI.map((project) => (
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
                to={`/ReviewHIO/${encodeURIComponent(
                  JSON.stringify(project.project)
                )}`} // Update this route as needed
                mb={2}
                borderRadius="full"
              >
                Review
              </Button>
            </Box>
          ))} */}
            {isLoading ? (
              <Center>
                <Spinner />
              </Center>
            ) : (
              AllProjects &&
              AllProjects.map((ele, key) => (
                <React.Fragment key={key}>
                  {/* {console.log(ele.data[0].provincial_superior_agree)} */}
                  {ele.data.map((project, k) => {
                    // console.log(ele.name + '    ' + project.project_code + '   ' + project.project_coordinator_agree)
                    console.log( (project.provincial_superior_agree.agree === false && project.comment_box_provincial_superior !== null) || (project.project_coordinator_agree.agree === false && project.comment_box_project_coordinator !== null ) )
                    if ((project.provincial_superior_agree.agree === false && project.comment_box_provincial_superior !== null) || (project.project_coordinator_agree.agree === false && project.comment_box_project_coordinator !== null )) {
                      return <></>;
                    } else {
                      projectCount = projectCount + 1;
                      console.log( projectCount )
                      return (
                        <Center>
                          <Box
                            key={k}
                            bg="white"
                            p={6}
                            borderRadius="lg"
                            boxShadow="md"
                            width="70%"
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                          >
                            <Heading
                              size="md"
                              mb={2}
                              color="blue.500"
                              display={"flex"}
                              alignItems={"center"}
                              justifyContent={"center"}
                            >
                              <Text color={"black"} fontSize={"lg"}>
                                Project Id- #
                              </Text>
                              {project.project_code}
                            </Heading>

                            <Box>
                              {project.project_coordinator_agree_swz.agree !== true && <Button
                                colorScheme="blue"
                                as={Link}
                                to={`/View${ele.name}/${encodeURIComponent(
                                  JSON.stringify(project)
                                )}`} // Update this route as needed
                                mb={2}
                                mx="2"
                                borderRadius="full"
                              >
                                View
                              </Button>}
                              {project.provincial_superior_agree.agree === false && <Button
                                colorScheme="red"
                                as={Link}
                                to={`/Edit${ele.name}/${encodeURIComponent(
                                  JSON.stringify(project)
                                )}`} // Update this route as needed
                                mb={2}
                                mx="2"
                                borderRadius="10"
                              >
                                Edit
                              </Button>}

                              {project.project_coordinator_agree_swz.agree === true && <Button
                                colorScheme="green"
                                as={Link}
                                to={`/View${ele.name}/${encodeURIComponent(
                                  JSON.stringify(project)
                                )}`}
                                // Update this route as needed
                                mb={2}
                                borderRadius="full"
                              >
                                Approved
                              </Button>}
                            </Box>
                          </Box>
                        </Center>
                      );
                    }
                  })}
                </React.Fragment>
              ))
            )}
          </VStack>
          {!isLoading && projectCount === 0 && (
            <Center>
              <Text color={"red"} size={"15"} my={"4"}>
                No Application found !!
              </Text>
            </Center>
          )}
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default MyProjects;
