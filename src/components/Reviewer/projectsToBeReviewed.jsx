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
import DashboardReviewer from "./dashboardReviewer";

const ProjectsToBeReviewed = () => {
  const [yearFilter, setYearFilter] = useState(0);
  const [typeFilter, setTypeFilter] = useState(null);

  // What I want is a filtering feature
  // the selected feature filter shall determine the course of action
  // filter by type can be one
  // filter by year can be other
  // by default one of the updated at or created at shall be made the default thingy
  // that will affect the code at the end

  // Code ??

  const filterByYear = (object, year) => {
    // this shall modify the project list
    // filter will work as follows
    //mapped project.filter((project)=>project.created_at.getFullYear() === year)
  };

  const showToast = useToast();

  // useEffect(() => {
  //   const getAllProject = async () => {
  //     // get all the three types of projects
  //     async function fetchDataForReviewerRoute(route) {
  //       try {
  //         const response = await authAxios.get(`projects/${route}`);
  //         console.log(route, response);
  //         const data = response.data.data ?? [];
  //         return data;
  //       } catch (error) {
  //         console.log(route, error);
  //         return [];
  //       }
  //     }

  //     try {
  //       const getAllHOIData = await fetchDataForReviewerRoute(
  //         "getAllHOIReviewer"
  //       );
  //       const getAllHOI = getAllHOIData ?? [];

  //       const getAllEGData = await fetchDataForReviewerRoute(
  //         "getAllEGReviewer"
  //       );
  //       const getAllEGReviewer = getAllEGData ?? [];

  //       const getAllEIReviewerData = await fetchDataForReviewerRoute(
  //         "getallEIReviewer"
  //       );
  //       const getAllEIReviewer = getAllEIReviewerData ?? [];

  //       const getAllSIReviewerData = await fetchDataForReviewerRoute(
  //         "getallSIReviewer"
  //       );
  //       const getAllSIReviewer = getAllSIReviewerData ?? [];

  //       const getAllDPLGReviewerData = await fetchDataForReviewerRoute(
  //         "getallDPLGReviewer"
  //       );
  //       const getAllDPLGReviewer = getAllDPLGReviewerData ?? [];

  //       const getAllHIVReviewerData = await fetchDataForReviewerRoute(
  //         "getAllHIVReviewer"
  //       );
  //       const getAllHIVReviewer = getAllHIVReviewerData ?? [];

  //       const getAllWHFCReviewerData = await fetchDataForReviewerRoute(
  //         "getAllWHFCReviewer"
  //       );
  //       const getAllWHFCReviewer = getAllWHFCReviewerData ?? [];

  //       const getAllEGSReviewerData = await fetchDataForReviewerRoute(
  //         "getAllEGSReviewer"
  //       );
  //       const getAllEGSReviewer = getAllEGSReviewerData ?? [];

  //       const getAllNPDPReviewerData = await fetchDataForReviewerRoute(
  //         "getAllNPDPReviewer"
  //       );
  //       const getAllNPDPReviewer = getAllNPDPReviewerData ?? [];

  //       const getAllEOIReviewerData = await fetchDataForReviewerRoute(
  //         "getallEOIReviewer"
  //       );
  //       const getAllEOIReviewer = getAllEOIReviewerData ?? [];

  //       const getAllISGReviewerData = await fetchDataForReviewerRoute(
  //         "/getallISGReviewer"
  //       );
  //       const getAllISGReviewer = getAllISGReviewerData ?? [];

  //       const getAllCGReviewerData = await fetchDataForReviewerRoute(
  //         "/getallCGReviewer"
  //       );
  //       const getAllCGReviewer = getAllCGReviewerData ?? [];

  //       const newProjectList = {
  //         HOI: getAllHOI
  //           .filter((value) => value.comment_box_provincial_superior === null)
  //           .map((project) => {
  //             return {
  //               id: project.project_code,
  //               project: project,
  //             };
  //           }),
  //         EGS: getAllEGSReviewer
  //           .filter(
  //             (value) =>
  //               value.general_information.provincial_superior.comment === null
  //           )
  //           .map((project) => {
  //             return {
  //               id: project._id,
  //               project: project,
  //             };
  //           }),
  //         EI: getAllEIReviewer
  //           .filter((value) => value.comment_box_provincial_superior === null)
  //           .map((project) => {
  //             return {
  //               id: project.project_code,
  //               project: project,
  //             };
  //           }),
  //         SI: getAllSIReviewer
  //           .filter((value) => value.comment_box_provincial_superior === null)
  //           .map((project) => {
  //             return {
  //               id: project.project_code,
  //               project: project,
  //             };
  //           }),
  //         DPLG: getAllDPLGReviewer
  //           .filter((value) => value.comment_box_provincial_superior === null)
  //           .map((project) => {
  //             return {
  //               id: project.project_code,
  //               project: project,
  //             };
  //           }),
  //         HIV: getAllHIVReviewer
  //           .filter(
  //             (value) =>
  //               value.mailing_list.provincial_superior.comment === null
  //           )
  //           .map((project) => {
  //             return {
  //               id: project.project_number,
  //               project: project,
  //             };
  //           }),
  //         WHFC: getAllWHFCReviewer
  //           .filter(
  //             (value) => value.mailing_list.provincial_superior.comment === null
  //           )
  //           .map((project) => {
  //             return {
  //               id: project.project_number,
  //               project: project,
  //             };
  //           }),
  //         NPDP: getAllNPDPReviewer
  //           .filter(
  //             (value) => value.mailing_list.provincial_superior.comment === null
  //           )
  //           .map((project) => {
  //             return {
  //               id: project.project_number,
  //               project: project,
  //             };
  //           }),
  //         EOI: getAllEOIReviewer
  //           .filter((value) => value.comment_box_provincial_superior === null)
  //           .map((project) => {
  //             return {
  //               id: project.project_code,
  //               project: project,
  //             };
  //           }),
  //         ISG: getAllISGReviewer
  //           .filter((value) => value.comment_box_provincial_superior === null)
  //           .map((project) => {
  //             return {
  //               id: project.project_code,
  //               project: project,
  //             };
  //           }),
  //         CG: getAllCGReviewer
  //           .filter((value) => value.comment_box_provincial_superior === null)
  //           .map((project) => {
  //             return {
  //               id: project.project_code,
  //               project: project,
  //             };
  //           }),
  //         EG: getAllEGReviewer
  //           .filter((value) => value.comment_box_provincial_superior === null)
  //           .map((project) => {
  //             return {
  //               id: project.project_code,
  //               project: project,
  //             };
  //           }),
  //       };

  //       setProjectList(newProjectList);
  //       console.log("projectList", projectList);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getAllProject();

  //   return () => {};
  // }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [AllProjects, setAllProjects] = useState([]);
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("userToken");
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}projects/getallprojectsreviewer`,
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
        // console.log( data );
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
          <DashboardReviewer></DashboardReviewer>
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
            Projects to Be Reviewed
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
                  {ele.data.map((project, k) => {
                    if (
                      project.provincial_superior_agree.agree !== true &&
                      project.comment_box_provincial_superior === null )
                    {
                      projectCount = projectCount + 1;
                      return (
                        <Box
                          key={k}
                          bg="white"
                          p={6}
                          borderRadius="lg"
                          boxShadow="md"
                          width="100%"
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

                          <Button
                            colorScheme="blue"
                            as={Link}
                            to={`/Review${ele.name}/${encodeURIComponent(
                              JSON.stringify(project)
                            )}`} // Update this route as needed
                            mb={2}
                            borderRadius="full"
                          >
                            Review
                          </Button>
                        </Box>
                      );
                    } else {
                      return <></>;
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

export default ProjectsToBeReviewed;
