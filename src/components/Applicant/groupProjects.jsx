// IndividualProjects.jsx

import React from "react";
import {
  ChakraProvider,
  Center,
  Heading,
  Button,
  VStack,
  Card,
  Image,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Link, useParams } from "react-router-dom";

const GroupProjects = () => {
  const selectedApostolate = useParams().selectedAppostolate;
  const navigate = useNavigate();
  return (
    <ChakraProvider>
      <VStack spacing={6}>
        <Heading
          as="h1"
          fontFamily="Georgia, serif"
          fontSize={40}
          fontWeight="bold"
          textAlign="center"
          color="purple.500"
        >
          Group Projects Forms
        </Heading>
        <Heading
          as="h1"
          fontFamily="Georgia, serif"
          fontSize={30}
          fontWeight="bold"
          textAlign="center"
          color="purple.500"
        >
          ( Apostolate: {selectedApostolate} )
        </Heading>

        {selectedApostolate === "health" && (
          // <>
          //   <Button as={Link} to="/common" colorScheme="teal" fontSize="xl">
          //     Development Project - Application
          //   </Button>
          //   <Button
          //     as={Link}
          //     to="/HIVAffectedOutreach"
          //     colorScheme="green"
          //     fontSize="xl"
          //   >
          //     HIV Affected Outfreach Application form
          //   </Button>
          // </>
          <Center
          m={4}
          width={"100%"}
          display={"flex"}
          flexWrap={"wrap"}
          gap={4}
        >
           <Card
              direction={["column", "column", "column", "row"]}
              width={"25%"}
              overflow="hidden"
              variant="outline"
              alignItems={"center"}
              gap={3}
              cursor={"pointer"}
              boxShadow="dark-lg"
              _hover={{ transform: "scale(1.02)" }}
              transition="transform 0.3s ease-in-out"
              onClick={() => {
                navigate("/common");
              }}
            >
              <Image
                objectFit="cover"
                w={"100px"}
                h={"100px"}
                src="/assets/project.png"
                alt="project"
              />
              <Text
                as="h2"
                fontFamily="Georgia, serif"
                fontSize={20}
                fontWeight="bold"
                color={"#4169E1"}
                textAlign={"center"}
              >
                 Development Project - Application
              </Text>
            </Card>
            <Card
              direction={["column", "column", "column", "row"]}
              width={"25%"}
              overflow="hidden"
              variant="outline"
              alignItems={"center"}
              gap={3}
              cursor={"pointer"}
              boxShadow="dark-lg"
              _hover={{ transform: "scale(1.02)" }}
              transition="transform 0.3s ease-in-out"
              onClick={() => {
                navigate("/HIVAffectedOutreach");
              }}
            >
              <Image
                objectFit="cover"
                w={"100px"}
                h={"100px"}
                src="/assets/project.png"
                alt="project"
              />
              <Text
                as="h2"
                fontFamily="Georgia, serif"
                fontSize={20}
                fontWeight="bold"
                color={"#4169E1"}
                textAlign={"center"}
              >
             HIV Affected Outfreach Application form
              </Text>
            </Card>
        </Center>
        )}
        {selectedApostolate === "others" && (
          // <>
          //   <Button as={Link} to="/common" colorScheme="teal" fontSize="xl">
          //     Development Project - Application
          //   </Button>
          // </>
          <Center
          m={4}
          width={"100%"}
          display={"flex"}
          flexWrap={"wrap"}
          gap={4}
        >
          <Card
              direction={["column", "column", "column", "row"]}
              width={"25%"}
              overflow="hidden"
              variant="outline"
              alignItems={"center"}
              gap={3}
              cursor={"pointer"}
              boxShadow="dark-lg"
              _hover={{ transform: "scale(1.02)" }}
              transition="transform 0.3s ease-in-out"
              onClick={() => {
                navigate("/common");
              }}
            >
              <Image
                objectFit="cover"
                w={"100px"}
                h={"100px"}
                src="/assets/project.png"
                alt="project"
              />
              <Text
                as="h2"
                fontFamily="Georgia, serif"
                fontSize={20}
                fontWeight="bold"
                color={"#4169E1"}
                textAlign={"center"}
              >
                {" "}
                Development Project - Application
              </Text>
            </Card>
        </Center>
        )}

        {selectedApostolate === "social" && (
          <Center
            m={4}
            width={"100%"}
            display={"flex"}
            flexWrap={"wrap"}
            gap={4}
          >
            <Card
              direction={["column", "column", "column", "row"]}
              width={"25%"}
              overflow="hidden"
              variant="outline"
              alignItems={"center"}
              gap={3}
              cursor={"pointer"}
              boxShadow="dark-lg"
              _hover={{ transform: "scale(1.02)" }}
              transition="transform 0.3s ease-in-out"
              onClick={() => {
                navigate("/devProjLivliGroup");
              }}
            >
              <Image
                objectFit="cover"
                w={"100px"}
                h={"100px"}
                src="/assets/project.png"
                alt="project"
              />
              <Text
                as="h2"
                fontFamily="Georgia, serif"
                fontSize={20}
                fontWeight="bold"
                color={"#4169E1"}
                textAlign={"center"}
              >
                {" "}
                Development project - Livlihood
              </Text>
            </Card>
            <Card
              direction={["column", "column", "column", "row"]}
              width={"25%"}
              overflow="hidden"
              variant="outline"
              alignItems={"center"}
              gap={3}
              cursor={"pointer"}
              boxShadow="dark-lg"
              _hover={{ transform: "scale(1.02)" }}
              transition="transform 0.3s ease-in-out"
              onClick={() => {
                navigate("/institutionalSkillGroup");
              }}
            >
              <Image
                objectFit="cover"
                w={"100px"}
                h={"100px"}
                src="/assets/project.png"
                alt="project"
              />
              <Text
                as="h2"
                fontFamily="Georgia, serif"
                fontSize={20}
                fontWeight="bold"
                color={"#4169E1"}
                textAlign={"center"}
              >
                {" "}
                Institutional Skill Training Proposal
              </Text>
            </Card>
            <Card
              direction={["column", "column", "column", "row"]}
              width={"25%"}
              overflow="hidden"
              variant="outline"
              alignItems={"center"}
              gap={3}
              cursor={"pointer"}
              boxShadow="dark-lg"
              _hover={{ transform: "scale(1.02)" }}
              transition="transform 0.3s ease-in-out"
              onClick={() => {
                navigate("/WelfareHomeGroup");
              }}
            >
              <Image
                objectFit="cover"
                w={"100px"}
                h={"100px"}
                src="/assets/project.png"
                alt="project"
              />
              <Text
                as="h2"
                fontFamily="Georgia, serif"
                fontSize={20}
                fontWeight="bold"
                color={"#4169E1"}
                textAlign={"center"}
              >
                Welfare Home and Child
              </Text>
            </Card>
            <Card
              direction={["column", "column", "column", "row"]}
              width={"25%"}
              overflow="hidden"
              variant="outline"
              alignItems={"center"}
              gap={3}
              cursor={"pointer"}
              boxShadow="dark-lg"
              _hover={{ transform: "scale(1.02)" }}
              transition="transform 0.3s ease-in-out"
              onClick={() => {
                navigate("/NextPhaseDevelopmentProject");
              }}
            >
              <Image
                objectFit="cover"
                w={"100px"}
                h={"100px"}
                src="/assets/project.png"
                alt="project"
              />
              <Text
                as="h2"
                fontFamily="Georgia, serif"
                fontSize={20}
                fontWeight="bold"
                color={"#4169E1"}
                textAlign={"center"}
              >
                Next Phase of Development Proposal
              </Text>
            </Card>
          </Center>
        )}

        {selectedApostolate === "education" && (
          // <>
          //   <Button
          //     as={Link}
          //     to="/educationGroup"
          //     colorScheme="teal"
          //     fontSize="xl"
          //   >
          //     Education Group- Institutional Template
          //   </Button>
          //   <Button
          //     as={Link}
          //     to="/EducationRuralUrbanTribalGroup"
          //     colorScheme="green"
          //     fontSize="xl"
          //   >
          //     Education Rural Urban Tribal Group
          //   </Button>
          //   <Button as={Link} to="/common" colorScheme="pink" fontSize="xl">
          //     Development Project - Application
          //   </Button>
          // </>
          <Center
          m={4}
          width={"100%"}
          display={"flex"}
          flexWrap={"wrap"}
          gap={4}
        >
           <Card
              direction={["column", "column", "column", "row"]}
              width={"25%"}
              overflow="hidden"
              variant="outline"
              alignItems={"center"}
              gap={3}
              cursor={"pointer"}
              boxShadow="dark-lg"
              _hover={{ transform: "scale(1.02)" }}
              transition="transform 0.3s ease-in-out"
              onClick={() => {
                navigate("/common");
              }}
            >
              <Image
                objectFit="cover"
                w={"100px"}
                h={"100px"}
                src="/assets/project.png"
                alt="project"
              />
              <Text
                as="h2"
                fontFamily="Georgia, serif"
                fontSize={20}
                fontWeight="bold"
                color={"#4169E1"}
                textAlign={"center"}
              >
                   Development Project - Application
              </Text>
            </Card>
        </Center>


        )}
      </VStack>
    </ChakraProvider>
  );
};

export default GroupProjects;
