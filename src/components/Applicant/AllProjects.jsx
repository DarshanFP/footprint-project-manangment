import {
  Card,
  Center,
  ChakraProvider,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardApplicant from "./dashboardApplicant";

const AllProjects = () => {
  const navigate = useNavigate();

  const AllProjects = [
    {
      projectName: "HIV effected outreach welfare - (hiv_affected_outreaches)",
      formPath: "/HIVAffectedOutreach",
    },
    {
      projectName: "Education group Support-rural,urban,tribal - (education_group_support)",
      formPath: "/EducationRuralUrbanTribalGroup",
    },
    {
      projectName: "Institutional Group Educational Support - (EGS)",
      formPath: "/common",
    },
    {
      projectName: "Development Projects - (cgs) - common group development projects",
      formPath: "/common",
    },
    {
      projectName: "Next phase developmental proposal - (npdp)",
      formPath: "/nextPhaseDevelopmentProject",
    },
    {
      projectName: "Residential skill training -(isg) International support group",
      formPath: "/common",
    },
    {
      projectName: "Development Liveihood support (DPLG) - Development Project LG",
      formPath: "/devProjLivliGroup",
    },
    {
      projectName: "Welfare home for chlidren ongoing - (waelfare_home_childrens)",
      formPath: "/WelfareHomeGroup",
    },
    {
      projectName: "Educational Support - (eis) - Educational Individual",
      formPath: "/educationIndividual",
    },
    {
      projectName: "Ongoing Educational Support - (EOI) - Educational onging Individual",
      formPath: "/educationIndividualOngoing",
    },
    {
      projectName: "Access to helth. - (hoi) - Helth ongoning individual",
      formPath: "/healthIndividualOngoing",
    },
    {
      projectName: "Livelihood Support - (sis) - social individual",
      formPath: "/socialIndividual",
    },
  ];

  return (
    <ChakraProvider>
      <Flex w="100vw" h="full" >
        <VStack w="30%" h="100vh" overflowY="scroll">
          <DashboardApplicant></DashboardApplicant>
        </VStack>
        <VStack spacing={4} w="70%" h='100vh' overflowY={'scroll'} overflowX={'hidden'}>
          <Heading
            as="h1"
            fontFamily="Georgia, serif"
            fontSize={40}
            fontWeight="bold"
            textAlign="center"
            color="purple.500"
            w='100%'
            py={4}
            bg={'gray.100'}
          >
            All Projects
          </Heading>
          <Heading
            as="h1"
            fontFamily="Georgia, serif"
            fontSize={30}
            fontWeight="bold"
            textAlign="center"
            color="purple.500"
          ></Heading>

          <Center
            m={4}
            width={"100%"}
            display={"flex"}
            flexWrap={"wrap"}
            gap={4}
          >
            {AllProjects &&
              AllProjects.map((ele, id) => (
                <Card
                  id={id}
                  direction={["column", "column", "column", "row"]}
                  width={"35%"}
                  overflow="hidden"
                  variant="outline"
                  alignItems={"center"}
                  gap={3}
                  p={4}
                  cursor={"pointer"}
                  boxShadow="0px 0px 10px #cfcfcf"
                  _hover={{ transform: "scale(1.02)" }}
                  transition="transform 0.3s ease-in-out"
                  onClick={() => {
                    navigate(ele.formPath);
                  }}
                >
                  <Image
                    objectFit="cover"
                    w={"70px"}
                    h={"70px"}
                    src="/assets/project.png"
                    alt="project"
                  />
                  <Text
                    as="h2"
                    fontFamily="Georgia, serif"
                    fontSize={16}
                    fontWeight="bold"
                    color={"#4169E1"}
                    textAlign={"center"}
                  >
                    {ele.projectName}
                  </Text>
                </Card>
              ))}
          </Center>
        </VStack>
      </Flex>
    </ChakraProvider>
  );
};

export default AllProjects;
