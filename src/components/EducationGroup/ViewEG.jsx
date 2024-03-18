import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
  Button,
  VStack,
  HStack,
  Alert,
  AlertIcon,
  Table,
  Thead,
  Tbody,
  useToast,
  Tr,
  Th,
  Td,
  Flex,
  Text,
  Select,
} from "@chakra-ui/react";
import authAxios from "../../AuthAxios";
import { useParams } from "react-router-dom";
import DashboardApplicant from "../Applicant/dashboardApplicant";

const ViewEG = () => {
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useToast;
  const [formData, setFormData] = useState({
    childOrYouth: "",
    insOrNot: "",
    NAMEOFTHESOCIETY: "", // Name of the Society
    dATEOFSUBMISSION: "", // Date of Submission
    TITLEOFTHEPROJECT: "", // Title of the Project
    address: "", // Address

    // Contacts Table
    provincialSuperiorName: "",
    provincialSuperiorCellNumber: "",
    provincialSuperiorEmail: "",
    projectInChargeName: "",
    projectInChargeCellNumber: "",
    projectInChargeEmail: "",

    // Overall Project Information
    overallProjectPeriod: "",
    currentPhase: "",
    overallProjectBudget: "",
    beneficiariesSupported: "",
    outcomeImpact: "",
    projectGoal: "",
    objectives: [""], // Initial empty objective

    // Other Proposed Activities
    otherActivities: "",

    // Monitoring Methods
    monitoringMethods: "",

    // Evaluation Process and Responsible Person
    evaluationProcess: "",

    // Conclusion
    conclusion: "",

    // Signatures
    projectCoordinatorAgreement: false,
    projectCoordinatorAgreementDate: "",
    projectInChargeAgreement: false,
    projectInChargeAgreementDate: "",
    provincialSuperiorAgreement: false,
    provincialSuperiorAgreementDate: "",
    approver_cmt : "",
    swz_approver_cmt : "",
    reviewer_cmt : "",
    amountApprovedByProjectCoordinator: "",
  });
  const [studiesTableData, setStudiesTableData] = useState([
    {
      serialNo: "",
      name: "",
      studyProposed: "",
      college_fee: "",
      hostel_fee: "",
      totalExpense: "",
      contribution: "",
      scholarshipEligibility: "",
      expectedAmount: "",
    },
  ]);

  const [informationTableData, setInformationTableData] = useState([
    {
      serialNo: "",
      name: "",
      casteAddress: "",
      recommendedBy: "",
      familyBackground: "",
    },
  ]);
  const [tableData, setTableData] = useState([
    { class: "", totalFemale: "", totalMale: "", total: 0 },
  ]);
  const [ongoingBeneficiary, setOngoingBeneficiary] = useState([])

  // Assuming projectData is the fetched data
  const projectData = JSON.parse(decodeURIComponent(useParams().project));

  useEffect(() => {
    // Check if projectData is available
    if (projectData) {
      setFormData({
        ...formData,
        insOrNot: projectData.insOrNot || "",
        childOrYouth : projectData.childOrYouth || "",
        NAMEOFTHESOCIETY: projectData.NameOfSociety || "",
        dATEOFSUBMISSION: projectData.DateOfSubmission || "",
        TITLEOFTHEPROJECT: projectData.TitleOfProject || "",
        address: projectData.address || "",

        // Contacts Table
        provincialSuperiorName: projectData.provincialSuperiorName || "",
        provincialSuperiorCellNumber:
          projectData.provincialSuperiorCellNumber || "",
        provincialSuperiorEmail: projectData.provincialSuperiorEmail || "",
        projectInChargeName: projectData.projectInChargeName || "",
        projectInChargeCellNumber: projectData.projectInChargeCellNumber || "",
        projectInChargeEmail: projectData.projectInChargeEmail || "",

        // Overall Project Information
        overallProjectPeriod: projectData.OverallProjectPeriod || "",
        currentPhase: projectData.currentPhase || "",
        overallProjectBudget: projectData.OverallProjectBudget || "",
        beneficiariesSupported: projectData.beneficiariesSupported || "",
        outcomeImpact: projectData.outcomeImpact || "",
        projectGoal: projectData.goal || "", // Assuming 'goal' is the correct key
        objectives: projectData.objectives || [""],

        // Other Proposed Activities
        otherActivities: projectData.otherActivities || "",

        // Monitoring Methods
        monitoringMethods: projectData.monitoringMethods || "",

        // Evaluation Process and Responsible Person
        evaluationProcess: projectData.evaluationProcess || "",

        // Conclusion
        conclusion: projectData.conclusion || "",

        // Signatures
        projectCoordinatorAgreement:
          projectData.project_in_charge_agree?.agree || false,
        projectCoordinatorAgreementDate:
          projectData.project_in_charge_agree?.date || "",
        projectInChargeAgreement:
          projectData.project_in_charge_agree?.agree || false,
        projectInChargeAgreementDate:
          projectData.project_in_charge_agree?.date || "",
        provincialSuperiorAgreement:
          projectData.provincial_superior_agree?.agree || false,
        provincialSuperiorAgreementDate:
          projectData.provincial_superior_agree?.date || "",
        commentReviewer: projectData.commentReviewer || "",
        amountApprovedByProjectCoordinator:
          projectData.amount_approved || 0,
        projectCoordinators: projectData.project_coordinators,
        approver_cmt : projectData.comment_box_project_coordinator || "",
      swz_approver_cmt : projectData.comment_box_project_coordinator_swz || "",
      reviewer_cmt : projectData.comment_box_provincial_superior || "",
      });
      // Assuming projectData has the same structure as studiesTableData and informationTableData
      setStudiesTableData(projectData.targetGroupStudies || []);
      setInformationTableData(projectData.targetGroupInformation || []);
      setTableData(projectData.peopleDetails || []);
      setOngoingBeneficiary(projectData.ongoingBeneficiary || []);
    }
  }, [projectData]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e, index) => {
    console.log(e.target.value);
    const { name, value } = e.target;

    if (name === "objectives") {
      const updatedObjectives = [...formData.objectives];
      updatedObjectives[index] = value;

      setFormData({
        ...formData,
        objectives: updatedObjectives,
      });
    } else {
      formData[name] = value;
      setFormData({ ...formData });
    }
  };

  const handleAddObjective = () => {
    setFormData({
      ...formData,
      objectives: [...formData.objectives, ""], // Add a new empty objective
    });
  };

  const PeopleDetailsTable = () => {
    const handleInputChange = (index, field, value) => {
      const newData = [...tableData];
      newData[index][field] = value;

      // Calculate total for the current row
      if (field === "totalFemale" || field === "totalMale") {
        newData[index].total = calculateTotal(
          parseInt(newData[index].totalFemale) || 0,
          parseInt(newData[index].totalMale) || 0
        );
      }
      // console.log(tableData);
      setTableData(newData);
    };

    const handleAddRow = () => {
      setTableData([
        ...tableData,
        { class: "", totalFemale: "", totalMale: "", total: 0 },
      ]);
    };
    const handleDeleteRow = (index) => {
      setTableData(tableData.filter((ele, ind) => ind !== index));
    };

    return (
      <Box p={4}>
        <Heading as="h1" size="l" mb={6}>
          Number of beneficiaries to be supported this year
        </Heading>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Class</Th>
              <Th>Total Female</Th>
              <Th>Total Male</Th>
              <Th>Total</Th>
              {/* <Th>Delete</Th> */}
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((row, index) => (
              <Tr key={index}>
                <Td>
                  <Input
                    type="text"
                    value={row.class}
                    onChange={(e) =>
                      handleInputChange(index, "class", e.target.value)
                    }
                    required
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.totalFemale}
                    onChange={(e) =>
                      handleInputChange(index, "totalFemale", e.target.value)
                    }
                    required
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.totalMale}
                    onChange={(e) =>
                      handleInputChange(index, "totalMale", e.target.value)
                    }
                    required
                    readOnly
                  />
                </Td>
                <Td>{row.total}</Td>
                {/* <Td>
                  <Button
                    my={2}
                    bg={"red.500"}
                    onClick={() => handleDeleteRow(index)}
                  >
                    Delete
                  </Button>
                </Td> */}
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* <Button onClick={handleAddRow}>Add Row</Button> */}
      </Box>
    );
  };

  const calculateTotal = (totalFemale, totalMale) => {
    return parseInt(totalFemale) + parseInt(totalMale);
  };

  const TargetGroupInformationTable = () => {
    const handleInformationInputChange = (index, field, value) => {
      const newData = [...informationTableData];
      newData[index][field] = value;
      setInformationTableData(newData);
    };

    const handleAddInformationRow = () => {
      setInformationTableData([
        ...informationTableData,
        {
          serialNo: informationTableData.length + 1,
          name: "",
          caste: "",
          address: "",
          year_of_study: "",
          familyBackground: "",
        },
      ]);
    };
    const handleDeleteInformation = (index) => {
      const newData = informationTableData.filter((ele, ind) => {
        return ind !== index;
      });
      setInformationTableData(
        newData.map((ele, ind) => {
          return { ...ele, serialNo: ind + 1 };
        })
      );
    };

    return (
      <Box p={4} width={"100%"}>
        <Heading as="h1" size="l" mb={6}>
          NEW BENEFICIARIES FOR THE CURRENT YEAR PROPOSED 
        </Heading>

        <Box width={"60%"}>
          {informationTableData.map((row, index) => (
            <Box key={index} borderWidth="1px" borderRadius="md" p={2}>
              <Box mx={2} color={"red.300"}>
                S.No: {row.serialNo}
              </Box>
              <Box>
                <Text mx={2}>Name **</Text>
                <Input
                  type="text"
                  value={row.name}
                  onChange={(e) =>
                    handleInformationInputChange(index, "name", e.target.value)
                  }
                  placeholder="Name"
                  required
                  readOnly
                />
              </Box>
              <Box>
                <Text mx={2}>Caste **</Text>
                <Input
                  type="text"
                  value={row.caste}
                  onChange={(e) =>
                    handleInformationInputChange(index, "caste", e.target.value)
                  }
                  placeholder="Caste"
                  required
                  readOnly
                />
              </Box>
              <Box>
                <Text mx={2}>Address **</Text>
                <Input
                  type="text"
                  value={row.address}
                  onChange={(e) =>
                    handleInformationInputChange(index, "address", e.target.value)
                  }
                  placeholder="Address"
                  required
                  readOnly
                />
              </Box>
              <Box>
                <Text mx={2}>Year of study **</Text>
                <Input
                  type="text"
                  value={row.year_of_study}
                  onChange={(e) =>
                    handleInformationInputChange(index, "year_of_study", e.target.value)
                  }
                  placeholder="Year of study"
                  required
                  readOnly
                />
              </Box>
              <Box>
                <Text mx={2}>Family background and need support</Text>
                <Textarea
                  value={row.familyBackground}
                  onChange={(e) =>
                    handleInformationInputChange(index, "familyBackground", e.target.value)
                  }
                  placeholder="familyBackground"
                  required
                  readOnly
                />
              </Box>
              {/* <Box>
                <Button
                  my={2}
                  bg={"red.500"}
                  onClick={() => handleDeleteInformation(index)}
                >
                  Delete Row
                </Button>
              </Box> */}
            </Box>
          ))}
        </Box>

        {/* <Button onClick={handleAddInformationRow}>Add Row</Button> */}
      </Box>
    );
  };
  const TargetGroupStudiesTable = () => {
    const handleStudiesInputChange = (index, field, value) => {
      const newData = [...studiesTableData];
      newData[index][field] = value;
      setStudiesTableData(newData);
    };

    const handleAddStudiesRow = () => {
      setStudiesTableData([
        ...studiesTableData,
        {
          serialNo: studiesTableData.length + 1,
          name: "",
          studyProposed: "",
          college_fee: "",
          hostel_fee: "",
          totalExpense: "",
          contribution: "",
          scholarshipEligibility: "",
          expectedAmount: "",
        },
      ]);
    };

    const handleDeleteStudies = (index) => {
      const newData = studiesTableData.filter((ele, ind) => {
        return ind !== index;
      });
      setStudiesTableData(
        newData.map((ele, ind) => {
          return { ...ele, serialNo: ind + 1 };
        })
      );
    };

    return (
      <Box p={4} overflowX="auto" w="100%">
        <Heading as="h1" size="l" mb={6}>
            BUDGET FOR CCURRENT YEAR
        </Heading>

        <Box
          width={'60%'}
        >
          {studiesTableData.map((row, index) => (
            <Box key={index} borderWidth="1px" borderRadius="md" p={2}>
              <Box mx={2} color={'red.300'}>S.No: {row.serialNo}</Box>
              <Box>
                <Text mx={2}>Name **</Text>
                <Input
                  type="text"
                  value={row.name}
                  onChange={(e) =>
                    handleStudiesInputChange(index, "name", e.target.value)
                  }
                  placeholder="Name"
                  required
                  readOnly
                />
              </Box>
              <Box>
              <Text mx={2}>Study proposed **</Text>
                <Input
                  type="text"
                  value={row.studyProposed}
                  onChange={(e) =>
                    handleStudiesInputChange(
                      index,
                      "studyProposed",
                      e.target.value
                    )
                  }
                  placeholder="Study Proposed"
                  required
                  readOnly
                />
              </Box>
              <Box>
              <Text mx={2}>College Fees **</Text>
                <Input
                  type="number"
                  value={row.college_fee}
                  onChange={(e) =>
                    handleStudiesInputChange(
                      index,
                      "college_fee",
                      parseInt(e.target.value)
                    )
                  }
                  placeholder="College Fees"
                  required
                  readOnly
                />
              </Box>
              <Box>
              <Text mx={2}>Hostel Fees **</Text>
                <Input
                  type="number"
                  value={row.hostel_fee}
                  onChange={(e) =>
                    handleStudiesInputChange(
                      index,
                      "hostel_fee",
                      parseInt(e.target.value)
                    )
                  }
                  placeholder="Hostel Fees"
                  required
                  readOnly
                />
              </Box>
              <Box>
              <Text mx={2}>Total expense **</Text>
                <Input
                  type="number"
                  value={parseInt(row.college_fee) + parseInt(row.hostel_fee)}
                  onChange={(e) =>
                    handleStudiesInputChange(
                      index,
                      "totalExpense",
                      e.target.value
                    )
                  }
                  placeholder="Total Expense"
                  required
                  readOnly
                />
              </Box>
              <Box>
              <Text mx={2}>Contribution from family**</Text>
                <Input
                  type="number"
                  value={row.contribution}
                  onChange={(e) =>
                    handleStudiesInputChange(
                      index,
                      "contribution",
                      e.target.value
                    )
                  }
                  placeholder="Contribution"
                  required
                  readOnly
                />
              </Box>
              <Box>
              <Text mx={2}>Scholarship Elegibility **</Text>
                <Input
                  type="text"
                  value={row.scholarshipEligibility}
                  onChange={(e) =>
                    handleStudiesInputChange(
                      index,
                      "scholarshipEligibility",
                      e.target.value
                    )
                  }
                  placeholder="Scholarship Eligibility"
                  required
                  readOnly
                />
              </Box>
              <Box>
              <Text mx={2}>Expected Amount **</Text>
                <Input
                  type="number"
                  value={(parseInt(row.college_fee) + parseInt(row.hostel_fee)) - (parseInt(row.scholarshipEligibility) + parseInt(row.contribution))}
                  onChange={(e) =>
                    handleStudiesInputChange(
                      index,
                      "expectedAmount",
                      e.target.value
                    )
                  }
                  placeholder="Expected Amount"
                  required
                  readOnly
                />
              </Box>
              {/* <Box>
                <Button
                  my={2}
                  bg={"red.500"}
                  onClick={() => handleDeleteStudies(index)}
                >
                  Delete Row
                </Button>
              </Box> */}
            </Box>
          ))}
        </Box>
        <Box>
          Total Budget : <span color="green">{studiesTableData.reduce((total, row) => {
            return ((parseInt(row.college_fee) + parseInt(row.hostel_fee)) - (parseInt(row.scholarshipEligibility) + parseInt(row.contribution))) + total;
          }, 0)}</span>
        </Box>

        {/* <Button onClick={handleAddStudiesRow}>Add Row</Button> */}
      </Box>
    );
  };
  const TargetGroupOngoing = () => {
    const handleOngoingInputChange = (index, field, value) => {
      const newData = [...ongoingBeneficiary];
      newData[index][field] = value;
      setOngoingBeneficiary(newData);
    };

    const handleAddOngoingRow = () => {
      setOngoingBeneficiary([
        ...ongoingBeneficiary,
        {
          name: "",
          caste: "",
          address: "",
          year_of_study: "",
          performance: 0,
        },
      ]);
    };

    const handleDeleteOngoing = (index) => {
      setOngoingBeneficiary(
        ongoingBeneficiary.filter((ele, ind) => ind !== index)
      );
      // console.log(ongoingBeneficiary.filter((ele, ind) => ind !== index))
    };

    return (
      <Box p={4} overflowX="auto" w={"100%"}>
        <Heading as="h1" size="2" mb={6}>
          Ongoing Beneficiaries -
        </Heading>
        <Heading as="h2" size="l" mb={6}>
          - Students who were supported previous year and requesting support
          this academic year
        </Heading>

        <Box w={"60%"}>
          {ongoingBeneficiary.map((row, index) => (
            <Box key={index} borderWidth="1px" borderRadius="md" p={2}>
              <Box mx={2} color={"red.300"}>
                S.No: {index + 1}
              </Box>
              <Box>
                <Text mx={2}>Name **</Text>
                <Input
                  type="text"
                  value={row.name}
                  onChange={(e) =>
                    handleOngoingInputChange(index, "name", e.target.value)
                  }
                  placeholder="Name"
                  required
                  readOnly
                />
              </Box>
              <Box>
                <Text mx={2}>Caste **</Text>
                <Input
                  type="text"
                  value={row.caste}
                  onChange={(e) =>
                    handleOngoingInputChange(index, "caste", e.target.value)
                  }
                  placeholder="Caste"
                  required
                  readOnly
                />
              </Box>
              <Box>
                <Text mx={2}>Address **</Text>
                <Input
                  type="text"
                  value={row.address}
                  onChange={(e) =>
                    handleOngoingInputChange(index, "address", e.target.value)
                  }
                  placeholder="Address"
                  required
                  readOnly
                />
              </Box>
              <Box>
                <Text mx={2}>Present Group/ Year of study ** </Text>
                <Input
                  type="text"
                  value={row.year_of_study}
                  onChange={(e) =>
                    handleOngoingInputChange(
                      index,
                      "year_of_study",
                      e.target.value
                    )
                  }
                  placeholder="Present Group/ Year of study"
                  required
                  readOnly
                />
              </Box>
              <Box>
                <Text mx={2}>Performance of the student in % ** </Text>
                <Input
                  type="number"
                  value={row.performance}
                  onChange={(e) =>
                    handleOngoingInputChange(
                      index,
                      "performance",
                      e.target.value
                    )
                  }
                  placeholder="Performance of the student in %"
                  readOnly
                />
              </Box>
              {/* <Box>
                <Button
                  my={2}
                  bg={"red.500"}
                  onClick={() => handleDeleteOngoing(index)}
                >
                  Delete Row
                </Button>
              </Box> */}
            </Box>
          ))}
        </Box>

        {/* <Button onClick={handleAddOngoingRow}>Add Row</Button> */}
      </Box>
    );
  };

  return (
    <ChakraProvider>
      <Flex w="100vw" h="full" >
        <VStack w="30%" h="100vh" overflowY="scroll">
          <DashboardApplicant></DashboardApplicant>
        </VStack>
      <Box p={8}  w="70%" h='100vh' overflowY={'scroll'} overflowX={'hidden'}>
        <Heading
          as="h1"
          size="xl"
          mb={6}
          align="center"
          justifyContent="center"
        >
          Education Group Project Application Form
        </Heading>

        {isSubmitted && (
          <Alert status="success" mb={4}>
            <AlertIcon />
            Form submitted successfully!
          </Alert>
        )}

        <form>
          <VStack align="start" spacing={4} mb={8}>
            

          <FormControl isRequired>
                <FormLabel>Select One</FormLabel>
                <Select
                  name="insOrNot"
                  value={formData.insOrNot}
                  onChange={handleChange}
                  required
                  readOnly
                >
                  <option value="Institutional">Institutional</option>
                  <option value="Non-Institutional">Non-Institutional</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Select One</FormLabel>
                <Select
                  name="childOrYouth"
                  value={formData.childOrYouth}
                  onChange={handleChange}
                  required
                  readOnly
                >
                  <option value="Child">Child</option>
                  <option value="Youth">Youth</option>
                </Select>
              </FormControl>
            {/* NAME OF THE SOCIETY */}

            <FormControl>
              <FormLabel>NAME OF THE SOCIETY</FormLabel>
              <Input
                type="text"
                name="NAMEOFTHESOCIETY"
                value={formData.NAMEOFTHESOCIETY}
                onChange={handleChange}
                readOnly
              />
            </FormControl>

            {/* DATE OF SUBMISSION */}
            <FormControl>
              <FormLabel>DATE OF SUBMISSION</FormLabel>
              <Input
                type="date"
                name="dATEOFSUBMISSION"
                value={formData.dATEOFSUBMISSION}
                onChange={handleChange}
                readOnly
              />
            </FormControl>

            {/* TITLE OF THE PROJECT */}
            <FormControl>
              <FormLabel>TITLE OF THE PROJECT </FormLabel>
              <Input
                type="text"
                name="TITLEOFTHEPROJECT"
                value={formData.TITLEOFTHEPROJECT}
                onChange={handleChange}
                readOnly
              />
            </FormControl>

            {/* ADDRESS*/}
            <FormControl>
              <FormLabel>ADDRESS</FormLabel>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </FormControl>

            {/* Contacts Table */}
            <Table variant="simple" mb={4}>
              <Thead>
                <Tr>
                  <Th>Role</Th>
                  <Th>Name</Th>
                  <Th>Cell Number</Th>
                  <Th>Email</Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* Provincial Superior */}
                {/* <Tr>
                  <Td>Provincial Superior</Td>
                  <Td>
                    <Input
                      type="text"
                      name="provincialSuperiorName"
                      value={formData.provincialSuperiorName}
                      onChange={handleChange}
                      readOnly
                    />
                  </Td>
                  <Td>
                    <Input
                      type="tel"
                      name="provincialSuperiorCellNumber"
                      value={formData.provincialSuperiorCellNumber}
                      onChange={handleChange}
                      readOnly
                    />
                  </Td>
                  <Td>
                    <Input
                      type="email"
                      name="provincialSuperiorEmail"
                      value={formData.provincialSuperiorEmail}
                      onChange={handleChange}
                      readOnly
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td>Project In-Charge</Td>
                  <Td>
                    <Input
                      type="text"
                      name="projectInChargeName"
                      value={formData.projectInChargeName}
                      onChange={handleChange}
                      readOnly
                    />
                  </Td>
                  <Td>
                    <Input
                      type="tel"
                      name="projectInChargeCellNumber"
                      value={formData.projectInChargeCellNumber}
                      onChange={handleChange}
                      readOnly
                    />
                  </Td>
                  <Td>
                    <Input
                      type="email"
                      name="projectInChargeEmail"
                      value={formData.projectInChargeEmail}
                      onChange={handleChange}
                      readOnly
                    />
                  </Td>
                </Tr> */}
                {/* Project Coordinators */}
                <Tr>
                  <Td>Project Coordinator India</Td>
                  <Td>Sr. Nirmala Mathew</Td>
                  <Td>Not Available</Td>
                  <Td>micostannsindia@gmail.com</Td>
                </Tr>
                <Tr>
                  <Td>Project Coordinator Luzern, Switzerland</Td>
                  <Td>Mr. Samuel Imbach</Td>
                  <Td>Not Available</Td>
                  <Td>s.imbach@mission-stanna.ch</Td>
                </Tr>
              </Tbody>
            </Table>
            {/* Overall Project Period */}
            <FormControl>
              <FormLabel>Overall Project Period (in months)</FormLabel>
              <Input
                type="number"
                name="overallProjectPeriod"
                value={formData.overallProjectPeriod}
                onChange={handleChange}
                readOnly
              />
            </FormControl>

            {/* Overall Project Budget */}
            <FormControl>
              <FormLabel>Overall Project Budget</FormLabel>
              <Input
                type="number"
                name="overallProjectBudget"
                value={formData.overallProjectBudget}
                onChange={handleChange}
                readOnly
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Current Phase</FormLabel>
              <Input
                type="text"
                name="currentPhase"
                value={formData.currentPhase}
                onChange={handleChange}
                required
                readOnly
              />
            </FormControl>

            {/* Number of Beneficiaries supported in the previous years */}
            <FormControl>
              <FormLabel>
                Number of Beneficiaries supported in the previous years
              </FormLabel>
              <Input
                type="number"
                name="beneficiariesSupported"
                value={formData.beneficiariesSupported}
                onChange={handleChange}
                readOnly
              />
            </FormControl>

            {/* Outcome / Impact in the lives of the passed-out students */}
            <FormControl>
              <FormLabel>
                Outcome / Impact in the lives of the passed-out students
              </FormLabel>
              <Textarea
                name="outcomeImpact"
                onChange={handleChange}
                value={formData.outcomeImpact}
                readOnly
              />
            </FormControl>

            {/* Goal of the project */}
            <FormControl>
              <FormLabel>Goal of the project</FormLabel>
              <Textarea
                name="projectGoal"
                onChange={handleChange}
                value={formData.projectGoal}
                readOnly
              />
            </FormControl>
            {/* Objectives of the project */}
            <FormControl>
              <FormLabel>Objectives of the project</FormLabel>
              <Table variant="simple" mb={4}>
                <Thead>
                  <Tr>
                  <Th>Sl No.</Th>
                    <Th>Objective</Th>
                      {/* <Th>Delete</Th> */}
                  </Tr>
                </Thead>
                <Tbody>
                {formData.objectives.map((objective, index) => (
                      <Tr key={index}>
                        <Td>{index + 1}</Td>
                        <Td>
                          <Input
                            type="text"
                            name="objectives"
                            value={objective}
                            onChange={(e) => handleChange(e, index)}
                            required
                          />
                        </Td>
                        <Td>
                          {/* <Button
                            my={2}
                            bg={"red.500"}
                            onClick={() => handleDeleteObjective(index)}
                          >
                            Delete
                          </Button> */}
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
              {/* <Button onClick={handleAddObjective} colorScheme="teal">
                Add Objective
              </Button> */}
            </FormControl>
            {PeopleDetailsTable()}
            <Heading as="h1" size="xl" mb={6}>
              TARGET GROUP
            </Heading>
            {TargetGroupOngoing()}
            {TargetGroupInformationTable()}
            {TargetGroupStudiesTable()}
            {/* Other Proposed Activities */}
            <FormControl>
              <FormLabel>
                Apart from academic studies, what are the other proposed
                activities for the overall development of the beneficiary
                individually and as a group?
              </FormLabel>
              <Textarea
                name="otherActivities"
                onChange={handleChange}
                value={formData.otherActivities}
                readOnly
              />
            </FormControl>

            {/* Monitoring Methods */}
            <FormControl>
              <FormLabel>
                Propose the methods of monitoring the beneficiary's overall
                growth and development:
              </FormLabel>
              <Textarea
                name="monitoringMethods"
                onChange={handleChange}
                value={formData.monitoringMethods}
                readOnly
              />
            </FormControl>

            {/* Evaluation Process and Responsible Person */}
            <FormControl>
              <FormLabel>
                Mention the process of evaluation of the growth of the
                beneficiaries and who would be responsible.
              </FormLabel>
              <Textarea
                name="evaluationProcess"
                onChange={handleChange}
                value={formData.evaluationProcess}
                readOnly
              />
            </FormControl>

            {/* Conclusion */}
            <FormControl>
              <FormLabel>Conclusion</FormLabel>
              <Textarea
                name="conclusion"
                onChange={handleChange}
                value={formData.conclusion}
                readOnly
              />
            </FormControl>

            <Heading as="h1" size="xl" mb={6}>
              Signatures
            </Heading>

            <FormControl>
              <FormLabel color={'red'}>## SWZ Approver Comment *</FormLabel>
              <Input
                type="text"
                name="approver_cmt"
                value={formData.swz_approver_cmt}
                readOnly
                color={'red'}
              />
            </FormControl>
            <FormControl>
              <FormLabel color={'red'}>## Approver Comment *</FormLabel>
              <Input
                type="text"
                name="approver_cmt"
                value={formData.approver_cmt}
                readOnly
                color={'red'}
              />
            </FormControl>
            <FormControl>
              <FormLabel color={'red'}>## Reviewer Comment *</FormLabel>
              <Input
                type="text"
                name="approver_cmt"
                value={formData.reviewer_cmt}
                readOnly
                color={'red'}
              />
            </FormControl>

            {/* <FormControl isRequired>
              {formData.projectCoordinators.map((projectCoordinator, index) => (
                <Box borderWidth={1} p={4} mt={4}>
                  <FormLabel>{`Project Coordinator - ${index + 1}`}</FormLabel>
                  <Input
                    name="projectCoordinatorName"
                    type="text"
                    value={projectCoordinator.ref.name}
                    readOnly
                  />
                  <FormLabel>{`Email`}</FormLabel>
                  <Input
                    name="projectCoordinatorEmail"
                    type="text"
                    value={projectCoordinator.ref.email}
                    readOnly
                  />
                  <FormLabel>{`Comment`}</FormLabel>
                  <Input
                    name="projectCoordinatorComment"
                    type="text"
                    value={projectCoordinator.comment}
                    readOnly
                  />
                  <FormLabel>{`Agree`}</FormLabel>
                  <Checkbox
                    name="projectCoordinatorAgree"
                    type="text"
                    isChecked={projectCoordinator.agree}
                    readOnly
                  />
                  <Input
                    name="prjectCoordinatorDate"
                    type="date"
                    value={projectCoordinator.date.substring(0, 10)}
                    readOnly
                  />
                </Box>
              ))}
            </FormControl> */}

            {/* Amount Approved by Project Coordinator */}
            <FormControl>
              <FormLabel>Amount Approved by Project Coordinator</FormLabel>
              <Input
                type="number"
                name="amountApprovedByProjectCoordinator"
                value={formData.amountApprovedByProjectCoordinator}
              />
            </FormControl>
          </VStack>

          <Heading as="h2" size="lg" mb={4} textAlign="center">
                Manual Signatures
              </Heading>
              <HStack align="start" spacing={8} mb={8}>            
          <Box mt={'10'} width="100%" mb={4}>
            <hr width='100%' />
              <Heading as="h2" size="sm" mb={7} textAlign="center" color="grey">
              Project Executor
              </Heading>
            </Box>
          <Box mt={'10'} width="100%" mb={4}>
            <hr width='100%' />
              <Heading as="h2" size="sm" mb={7} textAlign="center" color="grey">
              Project Applicant
              </Heading>
            </Box>
          <Box mt={'10'} width="100%" mb={4}>
            <hr width='100%' />
              <Heading as="h2" size="sm" mb={7} textAlign="center" color="grey">
              President of Society
              </Heading>
            </Box>
          <Box mt={'10'} width="100%" mb={4}>
            <hr width='100%' />
              <Heading as="h2" size="sm" mb={7} textAlign="center" color="grey">
              Sanctioning Authority
              </Heading>
            </Box>
          <Box mt={'10'} width="100%" mb={4}>
            <hr width='100%' />
              <Heading as="h2" size="sm" mb={7} textAlign="center" color="grey">
               Project Co-ordinator
              </Heading>
            </Box>


          </HStack>
          <Button
            type="submit"
            colorScheme="blue"
            onClick={() => {
              window.print();
            }}
          >
            Print
          </Button>
        </form>
      </Box>
      </Flex>
    </ChakraProvider>
  );
};
export default ViewEG;
