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
  Tr,
  Th,
  Td,
  useToast,
  Flex,
  Text,
} from "@chakra-ui/react";
import authAxios from "../../AuthAxios";
import { useNavigate } from "react-router-dom";
import DashboardApplicant from "../Applicant/dashboardApplicant";

export const Common = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    currentPhase: "",
    currentPhaseProjectBudget: "",
    reportingMethodology: " ", //
    // project_title: "", //
    president: " ", //
    NAMEOFTHESOCIETY: "", //
    dATEOFSUBMISSION: "",
    TITLEOFTHEPROJECT: "", //
    address: "", //
    provincialSuperiorName: "",
    provincialSuperiorCellNumber: "",
    provincialSuperiorEmail: "",
    projectInChargeName: "",
    projectInChargeCellNumber: "",
    projectInChargeEmail: "",
    projOfIntialProject: "",
    overallProjectPeriod: "", //
    overallProjectBudget: "",
    problemAnalysis: "", //
    // solutionAnalysis: "",
    sustainability: "", // Add sustainability //
    monitoringProcess: "", // Add monitoringProcess //
    projectInChargeAgreement: false,
    projectInChargeAgreementDate: "",
    projectArea: "", // Add projectArea //
    directBeneficiaries: "", // Add directBeneficiaries //
    indirectBeneficiaries: "", // Add indirectBeneficiaries //
    evaluationMethodology: "", // Add evaluationMethodology //
    logicalFramework: {
      goal: "",
      objectives: [
        {
          objective: "",
          results: [""],
          activities: [],
        },
      ],
    }, //
  });
  // const [budgetData, setBudgetData] = useState([{ budget: "", cost: "" }]);
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useToast();
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [personalBudget, setpersonalBudget] = useState([
    {
      particulars: "",
      staff: 0,
      rate: 0,
      year_1: 0,
      year_2: 0,
      year_3: 0,
      year_4: 0,
    },
  ]);
  const [programmeBudget, setProgrammeBudget] = useState([
    {
      particulars: "",
      year_1: 0,
      year_2: 0,
      year_3: 0,
      year_4: 0,
    },
  ]);

  const handleChange = (e, index, subIndex) => {
    const updatedData = { ...formData };

    if (e.target.name === "goal") {
      updatedData.logicalFramework.goal = e.target.value;
    } else if (e.target.name === "objective") {
      updatedData.logicalFramework.objectives[index].objective = e.target.value;
    } else if (e.target.name === "result") {
      updatedData.logicalFramework.objectives[index].results[subIndex] =
        e.target.value;
    } else if (e.target.name === "activity") {
      updatedData.logicalFramework.objectives[index].activities[
        subIndex
      ].activity = e.target.value;
    } else if (e.target.name === "verification") {
      updatedData.logicalFramework.objectives[index].activities[
        subIndex
      ].verification = e.target.value;
    } else {
      updatedData[e.target.name] = e.target.value;
    }

    setformData(updatedData);
  };

  //   const handleMonthChange = (month) => {
  //     const updatedMonths = selectedMonths.includes(month)
  //       ? selectedMonths.filter((selectedMonth) => selectedMonth !== month)
  //       : [...selectedMonths, month];
  //     setSelectedMonths(updatedMonths);
  //   };

  const handleAddObjective = () => {
    const updatedData = { ...formData };
    updatedData.logicalFramework.objectives.push({
      objective: "",
      results: [""],
      activities: [],
    });
    setformData(updatedData);
  };

  const handleAddResult = (index) => {
    const updatedData = { ...formData };
    updatedData.logicalFramework.objectives[index].results.push("");
    setformData(updatedData);
  };

  const handleAddActivity = (index) => {
    const updatedData = { ...formData };
    updatedData.logicalFramework.objectives[index].activities.push({
      activity: "",
      verification: "",
    });
    setformData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    formData.projectInChargeAgreement = true;
    const req = {
      currentPhase: formData.currentPhase || "NA",
      currentPhaseProjectBudget: formData.currentPhaseProjectBudget || "NA",
      reportingMethodology: formData.reportingMethodology || "NA", //
      // project_title: formData.project_title || "", //
      president: formData.president || "NA",
      nameOfSociety: formData.NAMEOFTHESOCIETY,
      DateOfSubmission: JSON.stringify(Date.now()).substring(0, 10),
      TitleOfProject: formData.TITLEOFTHEPROJECT,
      address: formData.address,
      OverallProjectPeriod: formData.overallProjectPeriod,
      OverallProjectBudget: formData.overallProjectBudget,
      problemAnalysis: formData.problemAnalysis,
      // solutionAnalysis: formData.solutionAnalysis,
      sustainability: formData.sustainability, // Add sustainability
      monitoringProcess: formData.monitoringProcess, // Add monitoringProcess
      project_in_charge_agree: {
        agree: true,
      },
      beneficiaryAgreement: true,
      beneficiaryAgreementDate: new Date(),
      ProjectArea: formData.projectArea, // Add projectArea
      directBeneficiaries: formData.directBeneficiaries, // Add directBeneficiaries
      indirectBeneficiaries: formData.indirectBeneficiaries, // Add indirectBeneficiaries
      evaluationMethodology: formData.evaluationMethodology, // Add evaluationMethodology
      goal: formData.logicalFramework.goal,
      objectives: formData.logicalFramework.objectives.map((objective) => ({
        objective: objective.objective,
        results: objective.results,
        activities: objective.activities,
      })),
      // budget_cost_table: budgetData,
      personalBudget: personalBudget,
      programmeBudget: programmeBudget,
      timeFrame: timeFrame,
    };
    // console.log( req );

    try {
      // console.log("req", req);
      setIsLoading((prevLoading) => !prevLoading);
      const response = await authAxios.post("/projects/createCG", req);
      setIsLoading((prevLoading) => !prevLoading);
      console.log(response.data);
      if (response.data.success) {
        showToast({
          title: "Successfull form submission",
          status: "success",
          duration: 5000,
        });
        setTimeout(() => {
          navigate("/myProjects");
        }, 2000);
      } else {
        showToast({
          title: response.data.msg,
          duration: 5000,
          status: "error",
        });
      }
    } catch (e) {
      setIsLoading(false);
      showToast({
        title: e.response.data.msg,
        duration: 5000,
        status: "error",
      });
    }

    setIsSubmitted(true);
  };

  const BudgetTable = () => {
    const handleOngoingInputChange = (index, field, value) => {
      const newData = [...personalBudget];
      newData[index][field] = value;
      setpersonalBudget(newData);
    };
    const handleProgrammeInputChange = (index, field, value) => {
      const newData = [...programmeBudget];
      newData[index][field] = value;
      setProgrammeBudget(newData);
    };
    const handleAddPersonalProject = () => {
      setpersonalBudget([
        ...personalBudget,
        {
          particulars: "",
          staff: 0,
          rate: 0,
          year_1: 0,
          year_2: 0,
          year_3: 0,
          year_4: 0,
        },
      ]);
    };
    const handleAddProgrammeProject = () => {
      setProgrammeBudget([
        ...programmeBudget,
        {
          particulars: "",
          year_1: 0,
          year_2: 0,
          year_3: 0,
          year_4: 0,
        },
      ]);
    };
    const handleDeletePersonalProject = (index) => {
      const newData = personalBudget.filter((ele, ind) => index !== ind);
      setpersonalBudget(newData);
    };
    const handleDeleteProgrammePsroject = (index) => {
      const newData = programmeBudget.filter((ele, ind) => index !== ind);
      setProgrammeBudget(newData);
    };

    return (
      <Box p={4} w={"100%"}>
        <Heading as="h1" size="xl" mb={6}>
          Budget Details
        </Heading>
        <Text fontSize={"2xl"} my={"4"}>
          Project Budget for 4 Years
        </Text>

        <Box>
          <Text color={"blue"} fontSize={"xl"}>
            Personal cost (Table A)
          </Text>

          <Box w={"60%"}>
            {personalBudget.map((row, index) => (
              <Box key={index} borderWidth="1px" borderRadius="md" p={2} m={4}>
                <Box mx={2} color={"red.300"}>
                  S.No: {index + 1}
                </Box>
                <Box>
                  <Text mx={2}>Particulars **</Text>
                  <Input
                    type="text"
                    value={row.particulars}
                    onChange={(e) =>
                      handleOngoingInputChange(
                        index,
                        "particulars",
                        e.target.value
                      )
                    }
                    placeholder="particulars"
                    required
                  />
                </Box>
                <Box>
                  <Text mx={2}>No. Stuff **</Text>
                  <Input
                    type="number"
                    value={row.staff}
                    onChange={(e) =>
                      handleOngoingInputChange(index, "staff", e.target.value)
                    }
                    placeholder="staff"
                    required
                  />
                </Box>
                <Box>
                  <Text mx={2}>Rate **</Text>
                  <Input
                    type="number"
                    value={row.rate}
                    onChange={(e) =>
                      handleOngoingInputChange(index, "rate", e.target.value)
                    }
                    placeholder="staff"
                    required
                  />
                </Box>

                <Box>
                  <Text mx={2}>1st Year **</Text>
                  <Input
                    type="number"
                    value={row.year_1}
                    onChange={(e) =>
                      handleOngoingInputChange(index, "year_1", e.target.value)
                    }
                    placeholder="year_1"
                    required
                  />
                </Box>
                <Box>
                  <Text mx={2}>2nd Year **</Text>
                  <Input
                    type="number"
                    value={row.year_2}
                    onChange={(e) =>
                      handleOngoingInputChange(index, "year_2", e.target.value)
                    }
                    placeholder="year_2"
                    required
                  />
                </Box>
                <Box>
                  <Text mx={2}>3rd Year **</Text>
                  <Input
                    type="number"
                    value={row.year_3}
                    onChange={(e) =>
                      handleOngoingInputChange(index, "year_3", e.target.value)
                    }
                    placeholder="year_3"
                    required
                  />
                </Box>
                <Box>
                  <Text mx={2}>4th Year **</Text>
                  <Input
                    type="number"
                    value={row.year_4}
                    onChange={(e) =>
                      handleOngoingInputChange(index, "year_4", e.target.value)
                    }
                    placeholder="year_4"
                    required
                  />
                </Box>
                <Box>
                  <Text mx={2}>Total **</Text>
                  <Input
                    type="number"
                    value={
                      parseInt(row.year_1) +
                      parseInt(row.year_2) +
                      parseInt(row.year_3) +
                      parseInt(row.year_4)
                    }
                    placeholder="year_4"
                    required
                  />
                </Box>
                <Box>
                  <Button
                    my={2}
                    bg={"red.500"}
                    onClick={() => handleDeletePersonalProject(index)}
                  >
                    Delete Row
                  </Button>
                </Box>
              </Box>
            ))}

            <Button onClick={handleAddPersonalProject}>Add Row</Button>
            <Text color={"blue"} fontSize={"xl"}>
            Total Personal cost (Table A)
          </Text>
            <Box borderWidth="1px" borderRadius="md" p={2} m={4}>
              <Box>
                <Text mx={2}>No. Stuff **</Text>
                <Input
                  type="number"
                  value={personalBudget.reduce(
                    (total, ele) => (total += parseInt(ele.staff)),
                    0
                  )}
                  placeholder="Total staff"
                  required
                />
              </Box>

              <Box>
                <Text mx={2}>1st Year **</Text>
                <Input
                  type="number"
                  value={personalBudget.reduce(
                    (total, ele) => (total += parseInt(ele.year_1)),
                    0
                  )}
                  placeholder="total year_1"
                  required
                />
              </Box>
              <Box>
                <Text mx={2}>2nd Year **</Text>
                <Input
                  type="number"
                  value={personalBudget.reduce(
                    (total, ele) => (total += parseInt(ele.year_2)),
                    0
                  )}
                  placeholder="total year_2"
                  required
                />
              </Box>
              <Box>
                <Text mx={2}>3rd Year **</Text>
                <Input
                  type="number"
                  value={personalBudget.reduce(
                    (total, ele) => (total += parseInt(ele.year_3)),
                    0
                  )}
                  placeholder="Total year_3"
                  required
                />
              </Box>
              <Box>
                <Text mx={2}>4th Year **</Text>
                <Input
                  type="number"
                  value={personalBudget.reduce(
                    (total, ele) => (total += parseInt(ele.year_4)),
                    0
                  )}
                  placeholder="Total year_4"
                  required
                />
              </Box>
              <Box>
                <Text mx={2}>Total **</Text>
                <Input
                  type="number"
                  value={personalBudget.reduce(
                    (total, ele) =>
                      (total +=
                        parseInt(ele.year_1) +
                        parseInt(ele.year_2) +
                        parseInt(ele.year_3) +
                        parseInt(ele.year_4)),
                    0
                  )}
                  placeholder="All total"
                  required
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          <Text color={"blue"} fontSize={"xl"} margin={8}>
            Programme Expenses (Table B)
          </Text>

          <Box w={"60%"}>
            {programmeBudget.map((row, index) => (
              <Box key={index} borderWidth="1px" borderRadius="md" p={2} m={4}>
                <Box mx={2} color={"red.300"}>
                  S.No: {index + 1}
                </Box>
                <Box>
                  <Text mx={2}>Particulars **</Text>
                  <Input
                    type="text"
                    value={row.particulars}
                    onChange={(e) =>
                      handleProgrammeInputChange(
                        index,
                        "particulars",
                        e.target.value
                      )
                    }
                    placeholder="particulars"
                    required
                  />
                </Box>

                <Box>
                  <Text mx={2}>1st Year **</Text>
                  <Input
                    type="number"
                    value={row.year_1}
                    onChange={(e) =>
                      handleProgrammeInputChange(
                        index,
                        "year_1",
                        e.target.value
                      )
                    }
                    placeholder="year_1"
                    required
                  />
                </Box>
                <Box>
                  <Text mx={2}>2nd Year **</Text>
                  <Input
                    type="number"
                    value={row.year_2}
                    onChange={(e) =>
                      handleProgrammeInputChange(
                        index,
                        "year_2",
                        e.target.value
                      )
                    }
                    placeholder="year_2"
                    required
                  />
                </Box>
                <Box>
                  <Text mx={2}>3rd Year **</Text>
                  <Input
                    type="number"
                    value={row.year_3}
                    onChange={(e) =>
                      handleProgrammeInputChange(
                        index,
                        "year_3",
                        e.target.value
                      )
                    }
                    placeholder="year_3"
                    required
                  />
                </Box>
                <Box>
                  <Text mx={2}>4th Year **</Text>
                  <Input
                    type="number"
                    value={row.year_4}
                    onChange={(e) =>
                      handleProgrammeInputChange(
                        index,
                        "year_4",
                        e.target.value
                      )
                    }
                    placeholder="year_4"
                    required
                  />
                </Box>
                <Box>
                  <Text mx={2}>Total **</Text>
                  <Input
                    type="number"
                    value={
                      parseInt(row.year_1) +
                      parseInt(row.year_2) +
                      parseInt(row.year_3) +
                      parseInt(row.year_4)
                    }
                    placeholder="year_4"
                    required
                  />
                </Box>
                <Box>
                  <Button
                    my={2}
                    bg={"red.500"}
                    onClick={() => handleDeleteProgrammePsroject(index)}
                  >
                    Delete Row
                  </Button>
                </Box>
              </Box>
            ))}

            <Button onClick={handleAddProgrammeProject}>Add Row</Button>

            <Text color={"blue"} fontSize={"xl"} margin={8}>
            Total Programme Expenses (Table B)
          </Text>

            <Box borderWidth="1px" borderRadius="md" p={2} m={4}>
              <Box>
                <Text mx={2}>1st Year **</Text>
                <Input
                  type="number"
                  value={programmeBudget.reduce(
                    (total, ele) => (total += parseInt(ele.year_1)),
                    0
                  )}
                  placeholder="total year_1"
                  required
                />
              </Box>
              <Box>
                <Text mx={2}>2nd Year **</Text>
                <Input
                  type="number"
                  value={programmeBudget.reduce(
                    (total, ele) => (total += parseInt(ele.year_2)),
                    0
                  )}
                  placeholder="total year_2"
                  required
                />
              </Box>
              <Box>
                <Text mx={2}>3rd Year **</Text>
                <Input
                  type="number"
                  value={programmeBudget.reduce(
                    (total, ele) => (total += parseInt(ele.year_3)),
                    0
                  )}
                  placeholder="Total year_3"
                  required
                />
              </Box>
              <Box>
                <Text mx={2}>4th Year **</Text>
                <Input
                  type="number"
                  value={programmeBudget.reduce(
                    (total, ele) => (total += parseInt(ele.year_4)),
                    0
                  )}
                  placeholder="Total year_4"
                  required
                />
              </Box>
              <Box>
                <Text mx={2}>Total **</Text>
                <Input
                  type="number"
                  value={programmeBudget.reduce(
                    (total, ele) =>
                      (total +=
                        parseInt(ele.year_1) +
                        parseInt(ele.year_2) +
                        parseInt(ele.year_3) +
                        parseInt(ele.year_4)),
                    0
                  )}
                  placeholder="All total"
                  required
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box>
          <Text color={"blue"} fontSize={"xl"} margin={8}>
            Financial Summary (Table C)
          </Text>

          <Box w={"60%"}>
            <Box borderWidth="1px" borderRadius="md" p={2} m={4}>
              <Box>
                <Text mx={2}>Total 1st Year **</Text>
                <Input
                  type="number"
                  value={
                    programmeBudget.reduce(
                      (total, ele) => (total += parseInt(ele.year_1)),
                      0
                    ) +
                    personalBudget.reduce(
                      (total, ele) => (total += parseInt(ele.year_1)),
                      0
                    )
                  }
                  placeholder="total year_1"
                  required
                />
              </Box>
              <Box>
                <Text mx={2}>Total 2nd Year **</Text>
                <Input
                  type="number"
                  value={
                    programmeBudget.reduce(
                      (total, ele) => (total += parseInt(ele.year_2)),
                      0
                    ) +
                    personalBudget.reduce(
                      (total, ele) => (total += parseInt(ele.year_2)),
                      0
                    )
                  }
                  placeholder="total year_2"
                  required
                />
              </Box>
              <Box>
                <Text mx={2}>Total 3rd Year **</Text>
                <Input
                  type="number"
                  value={
                    programmeBudget.reduce(
                      (total, ele) => (total += parseInt(ele.year_3)),
                      0
                    ) +
                    personalBudget.reduce(
                      (total, ele) => (total += parseInt(ele.year_3)),
                      0
                    )
                  }
                  placeholder="Total year_3"
                  required
                />
              </Box>
              <Box>
                <Text mx={2}>Total 4th Year **</Text>
                <Input
                  type="number"
                  value={
                    programmeBudget.reduce(
                      (total, ele) => (total += parseInt(ele.year_4)),
                      0
                    ) +
                    personalBudget.reduce(
                      (total, ele) => (total += parseInt(ele.year_4)),
                      0
                    )
                  }
                  placeholder="Total year_4"
                  required
                />
              </Box>
              <Box>
                <Text mx={2}>Grand Total **</Text>
                <Input
                  type="number"
                  value={
                    programmeBudget.reduce(
                      (total, ele) =>
                        (total +=
                          parseInt(ele.year_1) +
                          parseInt(ele.year_2) +
                          parseInt(ele.year_3) +
                          parseInt(ele.year_4)),
                      0
                    ) +
                    personalBudget.reduce(
                      (total, ele) =>
                        (total +=
                          parseInt(ele.year_1) +
                          parseInt(ele.year_2) +
                          parseInt(ele.year_3) +
                          parseInt(ele.year_4)),
                      0
                    )
                  }
                  placeholder="All total"
                  required
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  const [timeFrame, setTimeFrame] = useState([
    {
      activities: "",
      months: new Array(12).fill(false),
    },
  ]);

  const TimeFrame = () => {
    const Month = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return (
      <Box my={8} w={'70%'} >
        <Heading my={4}>Time Frame</Heading>
            {timeFrame.map((ele, ind) => (
              <VStack w={"100%"} p={4} border={'2px solid gray'} my={4}>
                <Box w={'100%'} >
                  <Text size={'xxl'}>Activity **</Text> 

                  <Textarea
                    w={'100%'}
                    type="text"
                    value={ele.activities}
                    onChange={(e) => {
                      let newTimeFrame = [...timeFrame];
                      newTimeFrame[ind].activities = e.target.value;
                      setTimeFrame(newTimeFrame);
                    }}
                    placeholder={`Activities ${ind + 1}`}
                    required
                  ></Textarea>
                </Box>
                <Box>
                <Text size={'xxl'}>Month **</Text> 
                 {ele.months.map((ele, index) => (
                      <Checkbox
                        m={2}
                        isChecked={ele}
                        onChange={(e) => {
                          const newTime = [...timeFrame];
                          newTime[ind]["months"][index] = e.target.checked;
                          setTimeFrame(newTime);
                          // console.log(newTime)
                        }}
                      >
                        {Month[index]}
                      </Checkbox>
                    ))}
                  </Box>
                <Box>
                <Button
                    color={"red.500"}
                    onClick={() => {
                      const newTime = timeFrame.filter(
                        (ele, eleInd) => eleInd !== ind
                      );
                      setTimeFrame(newTime);
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </VStack>
            ))}
          <Button
            my={2}
            onClick={() => {
              setTimeFrame([
                ...timeFrame,
                {
                  activities: "",
                  months: new Array(12).fill(false),
                },
              ]);
            }}
          >
            Add Activities
          </Button>
      </Box>
    );
  };

  return (
    <ChakraProvider>
      <Flex w="full" h="full">
        <VStack w="30%" h="100vh" overflowY="scroll">
          <DashboardApplicant></DashboardApplicant>
        </VStack>
        <Box p={6} w="70%" h="100vh" overflowX={"scroll"}>
          <Heading
            as="h1"
            size="xl"
            mb={6}
            align="center"
            justifyContent="center"
          >
            PROJECT PROPOSAL FOR THE DEVELOPMENT PROJECT
          </Heading>

          {isSubmitted && (
            <Alert status="success" mb={4}>
              <AlertIcon />
              Form submitted successfully!
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <VStack align="start" spacing={4} mb={8}>
              <Heading fontSize={"xl"}>GENERAL INFORMATION</Heading>
              {/* TITLE OF THE PROJECT */}
              <FormControl isRequired>
                <FormLabel>TITLE OF THE PROJECT </FormLabel>
                <Input
                  type="text"
                  name="TITLEOFTHEPROJECT"
                  onChange={handleChange}
                  value={formData.TITLEOFTHEPROJECT}
                  required
                />
              </FormControl>
              {/* NAME OF THE SOCIETY */}
              <FormControl isRequired>
                <FormLabel>President / Chair Person</FormLabel>
                <Input
                  type="text"
                  name="president"
                  onChange={handleChange}
                  value={formData.president}
                  required
                />
              </FormControl>

              {/* ADDRESS*/}
              <FormControl isRequired>
                <FormLabel>ADDRESS</FormLabel>
                <Input
                  type="text"
                  name="address"
                  onChange={handleChange}
                  value={formData.address}
                  required
                />
              </FormControl>

              {/* NAME OF THE SOCIETY */}
              <FormControl isRequired>
                <FormLabel>NAME OF THE SOCIETY / TRUST</FormLabel>
                <Input
                  type="text"
                  name="NAMEOFTHESOCIETY"
                  onChange={handleChange}
                  value={formData.NAMEOFTHESOCIETY}
                  required
                />
              </FormControl>
              {/* Overall Project Period */}
              <FormControl isRequired>
                <FormLabel>Overall Project Period (in months)</FormLabel>
                <Input
                  type="number"
                  name="overallProjectPeriod"
                  onChange={handleChange}
                  value={formData.overallProjectPeriod}
                  required
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Current Phase</FormLabel>
                <Input
                  type="string"
                  name="currentPhase"
                  onChange={handleChange}
                  value={formData.currentPhase}
                  required
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Overall Project Budget </FormLabel>
                <Input
                  type="number"
                  name="overallProjectBudget"
                  onChange={handleChange}
                  value={formData.overallProjectBudget}
                  required
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Current Phase Project Budget</FormLabel>
                <Input
                  type="number"
                  name="currentPhaseProjectBudget"
                  onChange={handleChange}
                  value={formData.currentPhaseProjectBudget}
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

              {/* Project Area */}
              <FormControl isRequired>
                <FormLabel>Project Area</FormLabel>
                <Textarea
                  name="projectArea"
                  onChange={handleChange}
                  value={formData.projectArea}
                  required
                />
              </FormControl>

              {/* Number of Beneficiaries */}
              <FormControl>
                <FormLabel>Number of Beneficiaries</FormLabel>
                {/* Direct Beneficiaries */}
                <FormControl>
                  <FormLabel>Direct Beneficiaries</FormLabel>
                  <Input
                    type="number"
                    name="directBeneficiaries"
                    onChange={handleChange}
                    value={formData.directBeneficiaries}
                    required
                  />
                </FormControl>
                {/* Indirect Beneficiaries */}
                <FormControl>
                  <FormLabel>Indirect Beneficiaries</FormLabel>
                  <Input
                    type="number"
                    name="indirectBeneficiaries"
                    onChange={handleChange}
                    value={formData.indirectBeneficiaries}
                    required
                  />
                </FormControl>
              </FormControl>

              {/* Analysis of the Problem */}
              <FormControl isRequired>
                <FormLabel>Analysis of the Problem</FormLabel>
                <Textarea
                  name="problemAnalysis"
                  onChange={handleChange}
                  value={formData.problemAnalysis}
                  required
                />
              </FormControl>

              {/* Solution Analysis */}
              <Heading size="xl">SOLUTION ANALYSIS</Heading>

              {/* Logical Framework */}

              <Heading
                as="h1"
                size="lg"
                mb={6}
                align="center"
                justifyContent="center"
              >
                Logical Framework
              </Heading>
              <FormControl isRequired>
                <FormLabel>Goal of the Project</FormLabel>
                <Textarea
                  name="goal"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </FormControl>

              {/* Objectives */}

              <Heading
                as="h1"
                size="l"
                mb={6}
                align="center"
                justifyContent="center"
              >
                Objectives:-
              </Heading>
              {formData.logicalFramework.objectives.map((objective, index) => (
                <Box
                  key={index}
                  border="1px solid #ccc"
                  borderRadius="lg"
                  p={4}
                  mb={8}
                  w={"100%"}
                >
                  <VStack key={index} align="start" spacing={4} mb={8}>
                    {/* Objective */}
                    <FormControl isRequired>
                      <hr />
                      <FormLabel>Objective {index + 1}</FormLabel>
                      <Textarea
                        name="objective"
                        value={objective.objective}
                        onChange={(e) => handleChange(e, index)}
                        required
                      />
                    </FormControl>

                    {/* Results */}
                    <FormControl isRequired>
                      <FormLabel>Results</FormLabel>
                      {objective.results.map((result, subIndex) => (
                        <VStack key={subIndex} align="start" spacing={4} mb={8}>
                          <Textarea
                            name="result"
                            value={result}
                            onChange={(e) => handleChange(e, index, subIndex)}
                            required
                          />
                          <Button
                            bg={"red.500"}
                            onClick={() => {
                              const updatedData = { ...formData };
                              updatedData.logicalFramework.objectives[
                                index
                              ].results =
                                updatedData.logicalFramework.objectives[
                                  index
                                ].results.filter(
                                  (ele, ind) => ind !== subIndex
                                );
                              setformData(updatedData);
                            }}
                          >
                            Delete
                          </Button>
                        </VStack>
                      ))}
                      <Button
                        onClick={() => handleAddResult(index)}
                        colorScheme="teal"
                      >
                        Add Result
                      </Button>
                    </FormControl>

                    {/* Activities and Means of Verification */}
                    <FormControl isRequired>
                      <FormLabel>
                        Activities and Means of Verification
                      </FormLabel>
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>Activity</Th>
                            <Th>Means of Verification</Th>
                            <Th>Delete</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {objective.activities.map((activity, subIndex) => (
                            <Tr key={subIndex}>
                              <Td>
                                <Textarea
                                  name="activity"
                                  value={activity.activity}
                                  onChange={(e) =>
                                    handleChange(e, index, subIndex)
                                  }
                                  required
                                />
                              </Td>
                              <Td>
                                <Textarea
                                  name="verification"
                                  value={activity.verification}
                                  onChange={(e) =>
                                    handleChange(e, index, subIndex)
                                  }
                                  required
                                />
                              </Td>
                              <Td>
                                <Button
                                  onClick={() => {
                                    const updatedData = { ...formData };
                                    updatedData.logicalFramework.objectives[
                                      index
                                    ].activities =
                                      updatedData.logicalFramework.objectives[
                                        index
                                      ].activities.filter(
                                        (ele, ind) => subIndex !== ind
                                      );
                                    setformData(updatedData);
                                  }}
                                >
                                  Delete
                                </Button>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>

                      <Button
                        onClick={() => handleAddActivity(index)}
                        colorScheme="teal"
                      >
                        Add Activity
                      </Button>
                    </FormControl>

                    <Button
                      bg={"red.500"}
                      onClick={() => {
                        const updatedData = { ...formData };
                        updatedData.logicalFramework.objectives =
                          updatedData.logicalFramework.objectives.filter(
                            (ele, ind) => ind !== index
                          );
                        setformData(updatedData);
                      }}
                    >
                      Delete Objective
                    </Button>
                  </VStack>
                </Box>
              ))}
              <Button
                onClick={handleAddObjective}
                colorScheme="purple"
                ml="auto"
              >
                Add Objective
              </Button>

              {TimeFrame()}

              {/* Sustainability of the Project */}
              <FormControl isRequired>
                <FormLabel>Explain the sustainability of the Project</FormLabel>
                <Textarea
                  name="sustainability"
                  value={formData.sustainability}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </FormControl>

              {/* Explain the Monitoring Process of the Project */}
              <FormControl isRequired>
                <FormLabel>
                  Explain the Monitoring Process of the Project
                </FormLabel>
                <Textarea
                  name="monitoringProcess"
                  value={formData.monitoringProcess}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </FormControl>

              {/* Methodology of Evaluation */}
              <FormControl isRequired>
                <FormLabel>Methodology of Evaluation</FormLabel>
                <Textarea
                  name="evaluationMethodology"
                  value={formData.evaluationMethodology}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </FormControl>

              {/* Methodology of Evaluation */}
              <FormControl isRequired>
                <FormLabel>Explain the Methodology of reporting</FormLabel>
                <Textarea
                  name="reportingMethodology"
                  value={formData.reportingMethodology}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </FormControl>

              {BudgetTable()}
            </VStack>
            {/* Submit Button */}
            <Button
              colorScheme="blue"
              type="submit"
              onClick={() => (formData.projectInChargeAgreement = true)}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};
export default Common;
