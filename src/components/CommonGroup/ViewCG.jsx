import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Text,
  HStack,
  Flex,
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
} from "@chakra-ui/react";
import authAxios from "../../AuthAxios";
import { useNavigate, useParams } from "react-router-dom";
import DashboardApplicant from './../Applicant/dashboardApplicant';

export const ApproveCG = () => {
  const navigate = useNavigate();

  const projectData = JSON.parse(decodeURIComponent(useParams().project));
  console.log(projectData)

  const [formData, setformData] = useState({
    currentPhase: projectData.currentPhase || "",
    currentPhaseProjectBudget:projectData.currentPhaseProjectBudget ||  "",
    reportingMethodology: projectData.reportingMethodology || " ", //
    // project_title: "", //
    president: projectData.president ||  " ", //
    NAMEOFTHESOCIETY: projectData.nameOfSociety || "", //
    dATEOFSUBMISSION: projectData.DateOfSubmission || "",
    TITLEOFTHEPROJECT: projectData.TitleOfProject || "", //
    address: projectData.address || "", //
    provincialSuperiorName: projectData.provincialSuperiorName || "",
    provincialSuperiorCellNumber: projectData.provincialSuperiorCellNumber || "",
    provincialSuperiorEmail: projectData.provincialSuperiorEmail || "",
    projectInChargeName: projectData.projectInChargeName ||  "",
    projectInChargeCellNumber: projectData.projectInChargeCellNumber || "",
    projectInChargeEmail: projectData.projectInChargeEmail || "",
    projOfIntialProject: "",
    overallProjectPeriod: projectData.OverallProjectPeriod || "", //
    overallProjectBudget: projectData.OverallProjectBudget || "",
    problemAnalysis: projectData.problemAnalysis || "", //
    // solutionAnalysis: "",
    sustainability: projectData.sustainability || "", // Add sustainability //
    monitoringProcess: projectData.monitoringProcess || "", // Add monitoringProcess //
    projectInChargeAgreement: false,
    projectInChargeAgreementDate: projectData.projectInChargeAgreementDate ||  "",
    projectArea:  projectData.ProjectArea || "", // Add projectArea //
    directBeneficiaries: projectData.directBeneficiaries || "", // Add directBeneficiaries //
    indirectBeneficiaries:projectData.indirectBeneficiaries || "", // Add indirectBeneficiaries //
    evaluationMethodology: projectData.evaluationMethodology || "", // Add evaluationMethodology //
    logicalFramework: {
      goal: projectData.goal || "",
      objectives: projectData.objectives.map((ele, ind) => ({
        objective: ele.objective,
        results: ele.results || [""],
        activities: ele.activities || [],
      }))
    }, //
    approver_cmt : projectData.comment_box_project_coordinator || "",
    swz_approver_cmt : projectData.comment_box_project_coordinator_swz || "",
    reviewer_cmt : projectData.comment_box_provincial_superior || "",
    amountApprovedByProjectCoordinator: projectData.amount_approved || ""
  });
  // const [budgetData, setBudgetData] = useState([{ budget: "", cost: "" }]);
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useToast();
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [personalBudget, setpersonalBudget] = useState(projectData.personalBudget.map((ele) => (
    {
      particulars: ele.particulars || "",
      staff: ele.staff ||  0,
      rate: ele.rate || 0,
      year_1: ele.year_1 || 0,
      year_2: ele.year_2 || 0,
      year_3: ele.year_3 || 0,
      year_4: ele.year_4 || 0,
    }
  )));
  const [programmeBudget, setProgrammeBudget] = useState(projectData.programmeBudget.map((ele, ind) => (
    {
      particulars: ele.particulars || "",
      year_1: ele.year_1 || 0,
      year_2: ele.year_2 || 0,
      year_3: ele.year_3 || 0,
      year_4: ele.year_4 || 0,
    }
  )));

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
      projectID: projectData.project_code,
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
    // console.log( req );

    try {
      // console.log("req", req);
      setIsLoading((prevLoading) => !prevLoading);
      const response = await authAxios.put("/projects/editCG", req);
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
        title: e.response?.data?.msg,
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
                  readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
                  />
                </Box>
                {/* <Box>
                  <Button
                    my={2}
                    bg={"red.500"}
                    onClick={() => handleDeletePersonalProject(index)}
                  >
                    Delete Row
                  </Button>
                </Box> */}
              </Box>
            ))}

            {/* <Button onClick={handleAddPersonalProject}>Add Row</Button> */}

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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
                  />
                </Box>
                {/* <Box>
                  <Button
                    my={2}
                    bg={"red.500"}
                    onClick={() => handleDeleteProgrammePsroject(index)}
                  >
                    Delete Row
                  </Button>
                </Box> */}
              </Box>
            ))}

            {/* <Button onClick={handleAddProgrammeProject}>Add Row</Button> */}

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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  const [timeFrame, setTimeFrame] = useState(projectData.timeFrame.map((ele) => (
    {
      activities: ele.activities || "",
      months: ele.months,
    }
  )));

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
                    readOnly
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
                        readOnly
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
                {/* <Box>
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
                </Box> */}
              </VStack>
            ))}
          {/* <Button
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
          </Button> */}
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
            <FormControl>
              <FormLabel color={'red'}> ## Amount Approved by Project Coordinator</FormLabel>
              <Input
                type="number"
                name="amountApprovedByProjectCoordinator"
                value={formData.amountApprovedByProjectCoordinator}
                color={'red'}
                readOnly
              />
            </FormControl>

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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
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
                    readOnly
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
                    readOnly
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
                  readOnly
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
                  value={formData.logicalFramework.goal}
                  onChange={(e) => handleChange(e)}
                  required
                  readOnly
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
                        readOnly
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
                            readOnly
                          />
                          {/* <Button
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
                          </Button> */}
                        </VStack>
                      ))}
                      {/* <Button
                        onClick={() => handleAddResult(index)}
                        colorScheme="teal"
                      >
                        Add Result
                      </Button> */}
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
                            {/* <Th>Delete</Th> */}
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
                                  readOnly
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
                                  readOnly
                                />
                              </Td>
                              {/* <Td>
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
                              </Td> */}
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>

                      {/* <Button
                        onClick={() => handleAddActivity(index)}
                        colorScheme="teal"
                      >
                        Add Activity
                      </Button> */}
                    </FormControl>

                    {/* <Button
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
                    </Button> */}
                  </VStack>
                </Box>
              ))}
              {/* <Button
                onClick={handleAddObjective}
                colorScheme="purple"
                ml="auto"
              >
                Add Objective
              </Button> */}

              {TimeFrame()}

              {/* Sustainability of the Project */}
              <FormControl isRequired>
                <FormLabel>Explain the sustainability of the Project</FormLabel>
                <Textarea
                  name="sustainability"
                  value={formData.sustainability}
                  onChange={(e) => handleChange(e)}
                  required
                  readOnly
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
                  readOnly
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
                  readOnly
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
                  readOnly
                />
              </FormControl>

              {BudgetTable()}

              

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

            {/* Submit Button */}
            <Button
              colorScheme="blue"
              // type="submit"
              // onClick={() => (formData.projectInChargeAgreement = true)}
            >
              print
            </Button>
          </form>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};
export default ApproveCG;
