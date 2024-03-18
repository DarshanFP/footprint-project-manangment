import React, { useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import DashboardApplicant from "../Applicant/dashboardApplicant";

// Fields editable
// Same as the previous

const EducationGroup = () => {
  const navigate = useNavigate();
  const projectData = JSON.parse(decodeURIComponent(useParams().project));
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useToast();
  console.log(projectData.project_code)

  const [formData, setFormData] = useState({
    insOrNot: projectData.insOrNot || "Institutional",
    childOrYouth: projectData.childOrYouth || "Child",
    projectID: projectData.project_code,
    NAMEOFTHESOCIETY: projectData.NameOfSociety || "",
    dATEOFSUBMISSION: projectData.DateOfSubmission || "",
    TITLEOFTHEPROJECT: projectData.TitleOfProject || "",
    address: projectData.address || "",
    projectInChargeName: projectData.applicant.name || "",
    projectInChargeCellNumber: projectData.applicant.mobile || "",
    projectInChargeEmail: projectData.applicant.email || "",
    overallProjectPeriod: projectData.OverallProjectPeriod || "",
    currentPhase: projectData.currentPhase || "",
    overallProjectBudget: projectData.OverallProjectBudget || "",
    beneficiariesSupported: projectData.beneficiariesSupported || "",
    outcomeImpact: projectData.outcomeImpact || "",
    projectGoal: projectData.goal || "",
    objectives: projectData.objectives || [""],
    otherActivities: projectData.otherActivities || "",
    monitoringMethods: projectData.monitoringMethods || "",
    evaluationProcess: projectData.evaluationProcess || "",
    conclusion: projectData.conclusion || "",
    projectInChargeAgreement:
      projectData.project_in_charge_agree.agree || false,
    projectInChargeAgreementDate:
      projectData.project_in_charge_agree.date || "",
      approver_cmt : projectData.comment_box_project_coordinator || "",
      swz_approver_cmt : projectData.comment_box_project_coordinator_swz || "",
      reviewer_cmt : projectData.comment_box_provincial_superior || "",
  });

  // Populate studiesTableData from req
  const [studiesTableData, setStudiesTableData] = useState(
    projectData.targetGroupStudies.map((row) => ({
      serialNo: row.serialNo || "",
      name: row.name || "",
      studyProposed: row.studyProposed || "",
      college_fee: row.college_fee || "",
      hostel_fee: row.hostel_fee || "",
      totalExpense: row.totalExpense || "",
      contribution: row.contribution || "",
      scholarshipEligibility: row.scholarshipEligibility || "",
      expectedAmount: row.expectedAmount || "",
    }))
    );

  const [informationTableData, setInformationTableData] = useState(
    projectData.targetGroupInformation.map((row) => ({
      serialNo: row.serialNo || "",
      name: row.name || "",
      caste: row.caste || "",
      address: row.address || "",
      year_of_study: row.year_of_study || "",
      familyBackground: row.familyBackground || "",
    }))
  );
  const [tableData, setTableData] = useState(
    projectData.peopleDetails.map((row) => ({
      class: row.class || "",
      totalFemale: row.totalFemale || 0,
      totalMale: row.totalMale || 0,
      total: row.total || 0,
    }))
  );
  const [ongoingBeneficiary, setOngoingBeneficiary] = useState(
    projectData.ongoingBeneficiary.map((row) => ({
      name: row.name || "",
      caste: row.caste || "",
      address: row.address || "",
      year_of_study : row.year_of_study || "",
      performance : row.performance || 0,
    }))
  );

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e, index) => {
    // console.log(e.target.value);
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
  const handleDeleteObjective = (index) => {
    setFormData({
      ...formData,
      objectives: formData.objectives.filter((ele, ind) => ind !== index), // Add a new empty objective
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Add your form submission logic here
    // for Project Coordinator no logic can be written as of now
    const req = {
      insOrNot: formData.insOrNot,
      childOrYouth: formData.childOrYouth,
      projectID: formData.projectID,
      NameOfSociety: formData.NAMEOFTHESOCIETY,
      DateOfSubmission: formData.dATEOFSUBMISSION,
      TitleOfProject: formData.TITLEOFTHEPROJECT,
      address: formData.address,
      OverallProjectPeriod: formData.overallProjectPeriod,
      currentPhase: formData.currentPhase,
      OverallProjectBudget: formData.overallProjectBudget,
      beneficiariesSupported: formData.beneficiariesSupported,
      outcomeImpact: formData.outcomeImpact,
      goal: formData.projectGoal,
      objectives: formData.objectives,
      peopleDetails: tableData.map((row) => ({
        class: row.class,
        totalFemale: parseInt(row.totalFemale),
        totalMale: parseInt(row.totalMale),
        total: row.total,
      })),
      targetGroupInformation: informationTableData.map((row) => ({
        serialNo: row.serialNo,
        name: row.name,
        caste: row.caste,
        address: row.address,
        year_of_study: row.year_of_study,
        familyBackground: row.familyBackground,
      })),
      targetGroupStudies: studiesTableData.map((row) => ({
        serialNo: row.serialNo,
        name: row.name,
        studyProposed: row.studyProposed,
        college_fee: parseInt(row.college_fee),
        hostel_fee: parseInt(row.hostel_fee),
        totalExpense: parseInt(row.college_fee) + parseInt(row.hostel_fee),
        contribution: parseInt(row.contribution),
        scholarshipEligibility: parseInt(row.scholarshipEligibility),
        expectedAmount: (parseInt(row.college_fee) + parseInt(row.hostel_fee)) - (parseInt(row.contribution) + parseInt(row.scholarshipEligibility)),
      })),
      ongoingBeneficiary: ongoingBeneficiary.map((row) => ({
        name: row.name,
        caste: row.caste,
        address: row.address,
        year_of_study: row.year_of_study,
        performance: parseInt(row.performance)
      })),
      otherActivities: formData.otherActivities,
      monitoringMethods: formData.monitoringMethods,
      evaluationProcess: formData.evaluationProcess,
      conclusion: formData.conclusion,
      project_in_charge_agree: {
        agree: true,
      },
      project_coordinator_agree: {
        agree: false,
      },
      project_coordinator_agree_swz: {
        agree: false,
      },
      provincial_superior_agree: {
        agree: false,
      },
      comment_box_provincial_superior: null,
      comment_box_project_coordinator: null,
      comment_box_project_coordinator_swz: null,
      amount_approved: 0
    };

    try {
      const res = await authAxios.put("/projects/editEG", req);
      console.log(res);
      setIsLoading(false);
      if (res.data.success) {
        showToast({
          title: "Successful submission",
          duration: 5000,
          status: "success",
        });
        setTimeout(() => {
          navigate("/myProjects"); 
        },2000)
        setIsSubmitted(true);
      } else {
        showToast({
          title: res.data.msg,
          duration: 5000,
          status: "error",
        });
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      showToast({
        title: e?.response?.data?.msg || "Unsuccessful submission",
        duration: 5000,
        status: "error",
      });
    }

    // Now you can use this request object to send data to your server for validation.
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

    // console.log(tableData.map((row, ind) => {
    //   console.log( row.class );
    // }))
    // console.log( tableData );

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
              <Th>Delete</Th>
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
                  />
                </Td>
                <Td>{row.total}</Td>
                <Td>
                  <Button
                    my={2}
                    bg={"red.500"}
                    onClick={() => handleDeleteRow(index)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Button onClick={handleAddRow}>Add Row</Button>
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
                />
              </Box>
              <Box>
                <Button
                  my={2}
                  bg={"red.500"}
                  onClick={() => handleDeleteInformation(index)}
                >
                  Delete Row
                </Button>
              </Box>
            </Box>
          ))}
        </Box>

        <Button onClick={handleAddInformationRow}>Add Row</Button>
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
                />
              </Box>
              <Box>
                <Button
                  my={2}
                  bg={"red.500"}
                  onClick={() => handleDeleteStudies(index)}
                >
                  Delete Row
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
        <Box>
          Total Budget : <span color="green">{studiesTableData.reduce((total, row) => {
            return ((parseInt(row.college_fee) + parseInt(row.hostel_fee)) - (parseInt(row.scholarshipEligibility) + parseInt(row.contribution))) + total;
          }, 0)}</span>
        </Box>

        <Button onClick={handleAddStudiesRow}>Add Row</Button>
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
                  required
                />
              </Box>
              <Box>
                <Button
                  my={2}
                  bg={"red.500"}
                  onClick={() => handleDeleteOngoing(index)}
                >
                  Delete Row
                </Button>
              </Box>
            </Box>
          ))}
        </Box>

        <Button onClick={handleAddOngoingRow}>Add Row</Button>
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

        <form onSubmit={handleSubmit}>
          <VStack align="start" spacing={4} mb={8}>

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

            <FormControl isRequired>
                <FormLabel>Select One</FormLabel>
                <Select
                  name="insOrNot"
                  value={formData.insOrNot}
                  onChange={handleChange}
                  required
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
                >
                  <option value="Child">Child</option>
                  <option value="Youth">Youth</option>
                </Select>
              </FormControl>

            {/* NAME OF THE SOCIETY */}
            <FormControl isRequired>
              <FormLabel>NAME OF THE SOCIETY</FormLabel>
              <Input
                type="text"
                name="NAMEOFTHESOCIETY"
                value={formData.NAMEOFTHESOCIETY}
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* DATE OF SUBMISSION */}
            <FormControl isRequired>
              <FormLabel>DATE OF SUBMISSION</FormLabel>
              <Input
                type="date"
                name="dATEOFSUBMISSION"
                value={formData.dATEOFSUBMISSION}
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* TITLE OF THE PROJECT */}
            <FormControl isRequired>
              <FormLabel>TITLE OF THE PROJECT </FormLabel>
              <Input
                type="text"
                name="TITLEOFTHEPROJECT"
                value={formData.TITLEOFTHEPROJECT}
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* ADDRESS*/}
            <FormControl isRequired>
              <FormLabel>ADDRESS</FormLabel>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
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
            <FormControl isRequired>
              <FormLabel>Overall Project Period (in months)</FormLabel>
              <Input
                type="number"
                name="overallProjectPeriod"
                value={formData.overallProjectPeriod}
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Overall Project Budget */}
            <FormControl isRequired>
              <FormLabel>Overall Project Budget</FormLabel>
              <Input
                type="number"
                name="overallProjectBudget"
                value={formData.overallProjectBudget}
                onChange={handleChange}
                required
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
              />
            </FormControl>

            {/* Number of Beneficiaries supported in the previous years */}
            <FormControl isRequired>
              <FormLabel>
                Number of Beneficiaries supported in the previous years
              </FormLabel>
              <Input
                type="number"
                name="beneficiariesSupported"
                value={formData.beneficiariesSupported}
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Outcome / Impact in the lives of the passed-out students */}
            <FormControl isRequired>
              <FormLabel>
                Outcome / Impact in the lives of the passed-out students
              </FormLabel>
              <Textarea
                name="outcomeImpact"
                onChange={handleChange}
                value={formData.outcomeImpact}
                required
              />
            </FormControl>

            {/* Goal of the project */}
            <FormControl isRequired>
              <FormLabel>Goal of the project</FormLabel>
              <Textarea
                name="projectGoal"
                onChange={handleChange}
                value={formData.projectGoal}
                required
              />
            </FormControl>
            {/* Objectives of the project */}
            <FormControl isRequired>
                <FormLabel>Objectives of the project</FormLabel>
                <Table variant="simple" mb={4}>
                  <Thead>
                    <Tr>
                      <Th>Sl No.</Th>
                      <Th>Objective</Th>
                      <Th>Delete</Th>
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
                          <Button
                            my={2}
                            bg={"red.500"}
                            onClick={() => handleDeleteObjective(index)}
                          >
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                <Button onClick={handleAddObjective} colorScheme="teal">
                  Add Objective
                </Button>
              </FormControl>
            {PeopleDetailsTable()}
            <Heading as="h1" size="xl" mb={6}>
              TARGE GROUP
            </Heading>
            {TargetGroupOngoing()}
            {TargetGroupInformationTable()}
            {TargetGroupStudiesTable()}
            {/* Other Proposed Activities */}
            <FormControl isRequired>
              <FormLabel>
                Apart from academic studies, what are the other proposed
                activities for the overall development of the beneficiary
                individually and as a group?
              </FormLabel>
              <Textarea
                name="otherActivities"
                onChange={handleChange}
                value={formData.otherActivities}
                required
              />
            </FormControl>

            {/* Monitoring Methods */}
            <FormControl isRequired>
              <FormLabel>
                Propose the methods of monitoring the beneficiary's overall
                growth and development:
              </FormLabel>
              <Textarea
                name="monitoringMethods"
                onChange={handleChange}
                value={formData.monitoringMethods}
                required
              />
            </FormControl>

            {/* Evaluation Process and Responsible Person */}
            <FormControl isRequired>
              <FormLabel>
                Mention the process of evaluation of the growth of the
                beneficiaries and who would be responsible.
              </FormLabel>
              <Textarea
                name="evaluationProcess"
                onChange={handleChange}
                value={formData.evaluationProcess}
                required
              />
            </FormControl>

            {/* Conclusion */}
            <FormControl isRequired>
              <FormLabel>Conclusion</FormLabel>
              <Textarea
                name="conclusion"
                onChange={handleChange}
                value={formData.conclusion}
                required
              />
            </FormControl>

            {/* Project Coordinator agreement */}
            {/* <FormControl isRequired>
    <Checkbox
      name="projectCoordinatorAgreement"
      onChange={handleChange}
      size="lg"
    >
      The Project Coordinator agree
    </Checkbox>
    <Input
      type="date"
      name="projectCoordinatorAgreementDate"
      onChange={handleChange}
      required
    />
  </FormControl> */}

            {/* Project-In-Charge agreement */}
            <FormControl isRequired>
              {/* <Checkbox
                name="projectInChargeAgreement"
                onChange={handleChange}
                size="lg"
                defaultChecked={formData.projectInChargeAgreement}
              >
                The Project-In-Charge agree
              </Checkbox> */}
              <Input
                type="date"
                name="projectInChargeAgreementDate"
                onChange={handleChange}
                value={formData.projectInChargeAgreementDate}
                required
              />
            </FormControl>

            {/* Provincial Superior agreement */}
            {/* <FormControl isRequired>
    <Checkbox
      name="provincialSuperiorAgreement"
      onChange={handleChange}
      size="lg"
    >
      The Provincial Superior agree
    </Checkbox>
    <Input
      type="date"
      name="provincialSuperiorAgreementDate"
      onChange={handleChange}
      required
    />
  </FormControl>
           */}
          </VStack>

          {/* Submit Button */}
          <Button colorScheme="blue" type="submit">
            Submit
          </Button>
        </form>
      </Box>
      </Flex>
    </ChakraProvider>
  );
};
export default EducationGroup;
