import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Textarea,
  useToast,
  Flex,
  Select,
  HStack,
  Text,
} from "@chakra-ui/react";
import authAxios from "../../AuthAxios";
import { useNavigate } from "react-router-dom";
import DashboardApplicant from "../Applicant/dashboardApplicant";

const EducationRuralUrbanTribalGroup = () => {
  const showToast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectTitle: "",
    insOrNot: "institutional",
    childOrYouth: "children",
    // projectNumber: 0,
    overallProjectPeriod: "",
    current_phase: "",
    // overallProjectBudget: "",
    address: "",
    projectExecutorName: "",
    projectExecutorEmail: "",
    projectExecutorMobile: "",

    projectSummary: {
      category: "rural", //new
      projectLocation: "",
      workOfSisters: "",
      socioEconomicConditions: "",
      identifiedProblems: "",
      needOfProject: "",
      beneficiarySelection: "",
    
    },
    targetGroup: [
      {
        sn: 1,
        name: "",
        caste: "",
        occupationOfParents: "",
        familyBackgroundAndNeedOfSupport: "",
        classOfStudyOrInstitution: "",
        eligibilityOfScholarshipAndExpectedAmount: "",
        contributionFromFamily: "",
      },
    ],
    logicalFramework: {
      goal: "",
      objectives: [
        {
          sn: 1,
          objective: "",
          results: [""],
          activities: [
            {
              activity: "",
              verification: "",
              timeframe: Array.from({ length: 12 }).fill(false),
            },
          ],
        },
      ],
      evaluation: "",
      monitoringProcess: "",
      sustainability: "",
    },

    budget: [
      {
        description: "",
        costs: 0,
      },
    ],

  });
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    // Send requestBody to the backend
    e.preventDefault();
    // console.log("inside handle submit");

    console.log("ins",formData.insOrNot)

    const req = {
      project_title: formData.projectTitle,
      insOrNot:formData.insOrNot,
      childOrYouth:formData.childOrYouth,
      general_information: {
        full_address: formData.address,
        current_phase:formData.current_phase,
        overall_project_period: formData.overallProjectPeriod,
        projectExecutorName:formData.projectExecutorName,
        projectExecutorEmail:formData.projectExecutorEmail,
        projectExecutorMobile:formData.projectExecutorMobile,
      },

      project_summary: {
        category:formData.projectSummary.category,
        project_location_geographical_area:
          formData.projectSummary.projectLocation,
        work_of_sisters_of_st_anns_in_the_project_area:
          formData.projectSummary.workOfSisters,
        general_socio_economic_conditions_of_the_beneficiaries:
          formData.projectSummary.socioEconomicConditions,
        problems_identified_and_consequences:
          formData.projectSummary.identifiedProblems,
        need_of_the_project: formData.projectSummary.needOfProject,

        target_group: formData.targetGroup.map((target) => ({
          name: target.name,
          caste: target.caste,
          occupation_of_parents: target.occupationOfParents,
          family_background_and_need_of_support:
            target.familyBackgroundAndNeedOfSupport,
          class_of_study_or_name_of_institution:
            target.classOfStudyOrInstitution,
          eligibility_of_scholarship_and_expected_amount:
            target.eligibilityOfScholarshipAndExpectedAmount,
          contribution_from_family: target.contributionFromFamily,
        })),
        solution_analysis_logical_framework: {
          goal: formData.logicalFramework.goal,
          objectives: formData.logicalFramework.objectives.map((objective) => ({
            objective: objective.objective,
            results_and_outcomes: objective.results.join(","), // Assuming it's a string
            activities: objective.activities
              ? objective.activities.map((activity) => ({
                  activity: activity.activity,
                  months: activity.months,
                  means_of_verification: activity.verification,
                }))
              : "",
          })),
          sustainability: formData.sustainability,
          monitoring_process_of_the_project: formData.monitoringProcess,
          mode_of_evaluation: formData.evaluation,
        },

        budget: {
          expenses: formData.budget.map((item) => ({
            description: item.description,
            costs: parseInt(item.costs), // Assuming it's a number
          })),
          total: parseInt(calculateTotalCosts("cost")) ?? 0, // Should be calculated
        },
       
      },
      project_in_charge_agree: {
        agree:true
      }

   
    };

    console.log("working before try");
    // console.log(req);
    try {
      const res = await authAxios.post("/projects/createEGS", req);
      // console.log(res);
      setIsLoading(false);
      if (res.data.success) {
        showToast({
          title: "Successful submission",
          duration: 5000,
          status: "success",
        });
        setIsSubmitted(true);
        setTimeout(() => {
          navigate("/myProjects");
        },[2000])
      } else {
        showToast({
          title:  res.data.msg,
          duration: 5000,
          status: "error",
        });
      }
    } catch (e) {
      console.log(e);

      setIsLoading(false);
      showToast({
        title:  e.response.data.msg,
        duration: 5000,
        status: "error",
      });
    }

    // Handle form submission logic here
    console.log("Form submitted with data:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProjectSummaryChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      projectSummary: { ...prevData.projectSummary, [name]: value },
    }));
  };

  const handleTargetGroupChange = (index, field, value) => {
    const updatedTargetGroup = [...formData.targetGroup];
    updatedTargetGroup[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      targetGroup: updatedTargetGroup,
    }));
  };

  const handleAddTargetGroupRow = () => {
    const updatedTargetGroup = [...formData.targetGroup];
    updatedTargetGroup.push({
      sn: updatedTargetGroup.length + 1,
      name: "",
      caste: "",
      occupationOfParents: "",
      familyBackgroundAndNeedOfSupport: "",
      classOfStudyOrInstitution: "",
      eligibilityOfScholarshipAndExpectedAmount: "",
      contributionFromFamily: "",
    });
    setFormData((prevData) => ({
      ...prevData,
      targetGroup: updatedTargetGroup,
    }));
  };

  const handleAddObjective = () => {
    const updatedData = { ...formData };
    updatedData.logicalFramework.objectives.push({
      sn: updatedData.logicalFramework.objectives.length + 1,
      objective: "",
      results: [""],
      activities: [],
    });
    setFormData(updatedData);
  };

  const handleDeleteRow = (index) => {
    // setFormData(tableData.filter((ele, ind) => ind !== index) );
    const updatedTargetGroup = [...formData.targetGroup];
    // console.log(updatedTargetGroup)
    let removeTargetGroup = updatedTargetGroup.splice(index, 1)[0];

    updatedTargetGroup.forEach((item, idx) => {
      if (idx >= index) {
        item.sn = idx + 1;
      }
    });
    setFormData((prevData) => ({
      ...prevData,
      targetGroup: updatedTargetGroup,
    }));
  };

  const handleDeleteObjective = (index) => {
    const updatedData = { ...formData };

    const removedObjective = updatedData.logicalFramework.objectives.splice(
      index,
      1
    )[0];

    // Rearrange the sn numbers of remaining objectives
    updatedData.logicalFramework.objectives.forEach((objective, idx) => {
      if (idx >= index) {
        objective.sn = idx + 1;
      }
    });
    setFormData(updatedData);
  };

  const handleDeleteResult = (index, subIndex) => {
    const updatedData = { ...formData };

    updatedData.logicalFramework.objectives[index].results =
      updatedData.logicalFramework.objectives[index].results.filter(
        (ele, ind) => ind !== subIndex
      );
    setFormData(updatedData);
  };

  const handleAddActivity = (index) => {
    const updatedData = { ...formData };

    const newActivity = {
      activity: "",
      verification: "",
      timeframe: Array.from({ length: 12 }).fill(false),
    };

    updatedData.logicalFramework.objectives[index].activities.push(newActivity);
    console.log(updatedData.logicalFramework.objectives[index].activities);

    setFormData(updatedData);
  };
  const handleAddResult = (index) => {
    const updatedData = { ...formData };
    updatedData.logicalFramework.objectives[index].results.push("");
    setFormData(updatedData);
    console.log(updatedData);
  };

  const handleChangeObjective = (e, index, subIndex) => {
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
    }

    setFormData(updatedData);
  };
  const handleDeleteActivity = (index, subIndex) => {
    const updatedData = { ...formData };
    console.log(updatedData.logicalFramework.objectives[index].activities);
    console.log(index, subIndex);
    // Remove the activity at the specified index from the specified objective's activities array
    updatedData.logicalFramework.objectives[index].activities.splice(
      subIndex,
      1
    );

    // Update the state with the modified data
    setFormData(updatedData);

    setFormData(updatedData);
  };

  const handleBudgetChange = (index, field, value) => {
    const updatedBudget = [...formData.budget];
    updatedBudget[index][field] = value;
    setFormData((prevData) => ({ ...prevData, budget: updatedBudget }));
  };

  const handleAddBudgetRow = () => {
    const updatedBudget = [...formData.budget];
    updatedBudget.push({
      description: "",
      costs: 0,
    });
    setFormData((prevData) => ({ ...prevData, budget: updatedBudget }));
  };

  const calculateTotalCosts = (field) => {
    return formData.budget
      .reduce((total, row) => total + parseFloat(row[field] || 0), 0)
      .toFixed(2);
  };

  return (
    <ChakraProvider>
      <Flex w="100vw" h="full">
        <VStack w="30%" h="100vh" overflowY="scroll">
          <DashboardApplicant></DashboardApplicant>
        </VStack>
        <Box p={6} w="70%" h="100vh" overflowY={"scroll"} overflowX={"hidden"}>
          <Heading as="h2" size="lg">
            PROJECT PROPOSAL FOR GROUP EDUCATION
          </Heading>

          {isSubmitted && (
            <Alert status="success" mb={4}>
              <AlertIcon />
              Form submitted successfully!
            </Alert>
          )}

          <VStack spacing={4} align="start" p={4}>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              {/* Project Information */}

              <FormControl mb={4}>
                <FormLabel>Project Title</FormLabel>
                <Input
                  type="text"
                  name="projectTitle"
                  onChange={handleChange}
                  value={formData.projectTitle || ""}
                  required
                />
              </FormControl>
              <HStack>
                <FormControl mb={4}>
                  <FormLabel> Institutional / Non-Institutional</FormLabel>
                  <Select
                  name="insOrNot"
                  onChange={handleChange}
                  value={formData.insOrNot || ""}
                  
                  >
                    <option value="institutional"> Institutional</option>
                    <option value="non-institutional">Non-Institutional</option>
                  </Select>
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Children / Youth</FormLabel>
                  <Select
                  name="childOrYouth"
                  onChange={handleChange}
                  value={formData.childOrYouth || ""}
                  >
                    <option value="children"> Children </option>
                    <option value="youth"> Youth</option>
                  </Select>
                </FormControl>
              </HStack>

              {/* General Information */}
              <Heading as="h2" size="lg" mt={6} mb={4}>
                General Information
              </Heading>

              <FormControl mb={4}>
                <FormLabel>Overall Project Period</FormLabel>
                <Input
                  type="text"
                  name="overallProjectPeriod"
                  onChange={handleChange}
                  value={formData.overallProjectPeriod || ""}
                  required
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Current phase</FormLabel>
                <Input
                  type="text"
                  name="current_phase"
                  onChange={handleChange}
                  value={formData.current_phase || ""}
                  required
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Full Address</FormLabel>
                <Input
                  type="text"
                  name="address"
                  onChange={handleChange}
                  value={formData.address || ""}
                  required
                />
              </FormControl>

              <Table variant="simple" mb={4}>
                <Thead>
                  <Tr>
                    <Th>Role</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Mobile Number</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {/* Row 1*/}
                  <Tr>
                    <Td>Project Executor</Td>
                    <Td>
                      <Input
                        type="text"
                        name="projectExecutorName"
                        onChange={handleChange}
                        value={formData.projectExecutorName || ""}
                        required
                      />
                    </Td>
                    <Td>
                      <Input
                        type="email"
                        name="projectExecutorEmail"
                        onChange={handleChange}
                        value={formData.projectExecutorEmail || ""}
                        required
                      />
                    </Td>
                    <Td>
                      <Input
                        type="number"
                        name="projectExecutorMobile"
                        onChange={handleChange}
                        value={formData.projectExecutorMobile || ""}
                        required
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>

              {/* Project Summary */}
              <Heading as="h2" size="lg" mt={6} mb={4}>
                Basic information of Project’s operational area
              </Heading>
              <FormControl mb={4}>
                <FormLabel>Category</FormLabel>
                <Select
                name="category"
                onChange={handleChange}
                value={formData.projectSummary.category || ""}
                >
                  <option value="rural"> Rural</option>
                  <option value="urban">Urban</option>
                  <option value="tribal"> Tribal</option>
                </Select>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Project Location - Geographical Area</FormLabel>
                <Textarea
                  name="projectLocation"
                  onChange={handleProjectSummaryChange}
                  value={formData.projectSummary.projectLocation || ""}
                  required
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>
                  Work of Sisters of St. Ann’s in the project area over the
                  years
                </FormLabel>
                <Textarea
                  name="workOfSisters"
                  onChange={handleProjectSummaryChange}
                  value={formData.projectSummary.workOfSisters || ""}
                  required
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>
                  Prevailing Socio, Economic and cultural conditions of the
                  Beneficiaries
                </FormLabel>
                <Textarea
                  name="socioEconomicConditions"
                  onChange={handleProjectSummaryChange}
                  value={formData.projectSummary.socioEconomicConditions || ""}
                  required
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>
                  Problems identified and their Consequences
                </FormLabel>
                <Textarea
                  name="identifiedProblems"
                  onChange={handleProjectSummaryChange}
                  value={formData.projectSummary.identifiedProblems || ""}
                  required
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Need of the project</FormLabel>
                <Textarea
                  name="needOfProject"
                  onChange={handleProjectSummaryChange}
                  required
                  value={formData.projectSummary.needOfProject || ""}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>
                  Identification of the Beneficiaries (how are the beneficiaries
                  selected)
                </FormLabel>
                <Textarea
                  name="beneficiarySelection"
                  onChange={handleProjectSummaryChange}
                  value={formData.projectSummary.beneficiarySelection || ""}
                  required
                />
              </FormControl>

              {/* Target Group Table */}
              <Heading as="h2" size="lg" mt={6} mb={4}>
                Criteria of selecting the target group
              </Heading>

            
              {formData.targetGroup.map((row, index) => {
                return (
                  <VStack
                    display={"flex"}
                    flexDir={"column"}
                    w={"100%"}
                    key={index}
                  >
                    <Box display={"flex"} width={"100%"}>
                      <Text
                        fontWeight={"bold"}
                        w={"100%"}
                      >{`SN. ${row.sn}`}</Text>
                      <Button
                        onClick={() => handleDeleteRow(index)}
                        colorScheme="red"
                        color={"white"}
                        bg={"red.500"}
                      >
                        Delete
                      </Button>
                    </Box>

                    <HStack w={"100%"}>
                      <FormControl mb={4}>
                        <FormLabel>NAME OF THE BENEFICIARY</FormLabel>
                        <Input
                          type="text"
                          name={`targetGroup[${index}].name`}
                          onChange={(e) =>
                            handleTargetGroupChange(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          value={row.name}
                          required
                        />
                      </FormControl>
                      <FormControl mb={4}>
                        <FormLabel>CASTE</FormLabel>
                        <Input
                          type="text"
                          name={`targetGroup[${index}].caste`}
                          onChange={(e) =>
                            handleTargetGroupChange(
                              index,
                              "caste",
                              e.target.value
                            )
                          }
                          value={row.caste}
                          required
                        />
                      </FormControl>
                    </HStack>
                    <FormControl mb={4}>
                      <FormLabel>OCCUPATION OF PARENTS</FormLabel>
                      <Textarea
                      type="text"
                      name={`targetGroup[${index}].occupationOfParents`}
                      onChange={(e) =>
                        handleTargetGroupChange(
                          index,
                          "occupationOfParents",
                          e.target.value
                        )
                      }
                      value={row.occupationOfParents}
                      required
                      />
                    </FormControl>
                    <FormControl mb={4}>
                      <FormLabel>
                        FAMILY BACKGROUND AND NEED OF SUPPORT
                      </FormLabel>
                      <Textarea
                        type="text"
                        name={`targetGroup[${index}].familyBackgroundAndNeedOfSupport`}
                        onChange={(e) =>
                          handleTargetGroupChange(
                            index,
                            "familyBackgroundAndNeedOfSupport",
                            e.target.value
                          )
                        }
                        value={row.familyBackgroundAndNeedOfSupport}
                        required
                      />
                    </FormControl>
                    <FormControl mb={4}>
                      <FormLabel>
                        CLASS OF STUDY/NAME OF THE INSTITUTION
                      </FormLabel>
                      <Textarea
                        type="text"
                        name={`targetGroup[${index}].classOfStudyOrInstitution`}
                        onChange={(e) =>
                          handleTargetGroupChange(
                            index,
                            "classOfStudyOrInstitution",
                            e.target.value
                          )
                        }
                        value={row.classOfStudyOrInstitution}
                        required
                      />
                    </FormControl>
                    <FormControl mb={4}>
                      <FormLabel>
                        ELIGIBILITY OF SCHOLARSHIP & EXPECTED AMOUNT
                      </FormLabel>
                      <Textarea
                          type="text"
                          name={`targetGroup[${index}].eligibilityOfScholarshipAndExpectedAmount`}
                          onChange={(e) =>
                            handleTargetGroupChange(
                              index,
                              "eligibilityOfScholarshipAndExpectedAmount",
                              e.target.value
                            )
                          }
                          value={row.eligibilityOfScholarshipAndExpectedAmount}
                          required
                      />
                    </FormControl>
                    <FormControl mb={4}>
                      <FormLabel>CONTRIBUTION FROM FAMILY</FormLabel>
                      <Textarea
                     type="text"
                     name={`targetGroup[${index}].contributionFromFamily`}
                     onChange={(e) =>
                       handleTargetGroupChange(
                         index,
                         "contributionFromFamily",
                         e.target.value
                       )
                     }
                     value={row.contributionFromFamily}
                     required
                      />
                    </FormControl>
                  </VStack>
                );
              })}

              <Button onClick={handleAddTargetGroupRow} colorScheme="teal">
                Add Another
              </Button>

              <Heading
                as="h1"
                size="xl"
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
                  onChange={(e) => handleChangeObjective(e)}
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
                >
                  <VStack key={index} align="start" spacing={4} mb={8}>
                    {/* Objective */}
                    <FormControl isRequired>
                      <HStack w={"100%"} justifyContent={"space-between"}>
                        <FormLabel>Objective {objective.sn}</FormLabel>
                        <Button
                          onClick={() => handleDeleteObjective(index)}
                          colorScheme="red"
                          mb={2}
                        >
                          Delete Objective
                        </Button>
                      </HStack>

                      <Textarea
                        name="objective"
                        value={objective.objective}
                        onChange={(e) => handleChangeObjective(e, index)}
                        required
                      />
                    </FormControl>

                    {/* Results */}
                    <FormControl isRequired>
                      <FormLabel>Results</FormLabel>
                      {objective.results.map((result, subIndex) => (
                        <VStack key={subIndex} align="start" spacing={4} mb={8}>
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            w={"100%"}
                          >
                            <Text fontWeight={"bold"}>Write Down Result</Text>
                            <Button
                              onClick={() =>
                                handleDeleteResult(index, subIndex)
                              }
                              colorScheme="red"
                            >
                              Delete Result
                            </Button>
                          </Box>

                          <Textarea
                            name="result"
                            value={result}
                            onChange={(e) =>
                              handleChangeObjective(e, index, subIndex)
                            }
                            required
                          />
                        </VStack>
                      ))}

                      <Button
                        onClick={() => handleAddResult(index)}
                        colorScheme="teal"
                      >
                        Add Result
                      </Button>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>
                        Activities and Means of Verification
                      </FormLabel>
                      {objective.activities
                        ? objective.activities.map((activity, subIndex) => {
                            return (
                              <VStack my={8} key={subIndex}>
                                <FormControl isRequired>                        
                                  <HStack
                                    w={"100%"}
                                    justifyContent={"space-between"}
                                  >
                                    <FormLabel>ACTIVITY</FormLabel>
                                    <Button
                                      onClick={() =>
                                        handleDeleteActivity(index, subIndex)
                                      }
                                      colorScheme="red"
                                      mb={2}
                                    >
                                      Delete
                                    </Button>
                                  </HStack>

                                  <Textarea
                                    name="activity"
                                    value={activity.activity}
                                    onChange={(e) =>
                                      handleChangeObjective(e, index, subIndex)
                                    }
                                    required
                                  />
                                </FormControl>
                                <FormControl isRequired>
                                  <FormLabel>MEANS OF VERIFICATION</FormLabel>
                                  <Textarea
                                    name="verification"
                                    value={activity.verification}
                                    onChange={(e) =>
                                      handleChangeObjective(e, index, subIndex)
                                    }
                                    required
                                  />
                                </FormControl>
                                <FormControl>
                                  <FormLabel>Timeframe</FormLabel>
                                  {activity.timeframe.map(
                                    (value, monthIndex) => (
                                      <Checkbox
                                        key={monthIndex}
                                        isChecked={value}
                                        mr={2}
                                        onChange={() => {
                                          setSelectedMonths([]);
                                          activity.timeframe[monthIndex] =
                                            !activity.timeframe[monthIndex];
                                          // console.log(activity.timeframe);
                                        }}
                                      >
                                        {new Date(
                                          2024,
                                          monthIndex
                                        ).toLocaleString("default", {
                                          month: "long",
                                        })}
                                      </Checkbox>
                                    )
                                  )}
                                </FormControl>
                              </VStack>
                            );
                          })
                        : ""}

                      <Button
                        onClick={() => handleAddActivity(index)}
                        colorScheme="teal"
                      >
                        Add Activity
                      </Button>
                    </FormControl>
                  </VStack>
                </Box>
              ))}
              <Button onClick={handleAddObjective} colorScheme="purple">
                Add Objective
              </Button>
              {/* Sustainability of the Project */}
              <FormControl isRequired>
                <FormLabel>Sustainability of the Project</FormLabel>
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

              {/* Mode of Evaluation */}
              <FormControl isRequired>
                <FormLabel>Mode of Evaluation</FormLabel>
                <Textarea
                  name="evaluation"
                  value={formData.evaluation}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </FormControl>

              {/* Budget Section */}
              <Heading as="h2" size="lg" mt={6} mb={4}>
                Budget
              </Heading>

              <Table variant="simple" mb={4}>
                <Thead>
                  <Tr>
                    <Th>Description of Expense</Th>
                    <Th>Costs</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {formData.budget.map((row, index) => (
                    <Tr key={index}>
                      <Td>
                        <Input
                          type="text"
                          name={`budget[${index}].description`}
                          onChange={(e) =>
                            handleBudgetChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          value={row.description}
                          required
                        />
                      </Td>
                      <Td>
                        <Input
                          type="number"
                          name={`budget[${index}].costs`}
                          onChange={(e) =>
                            handleBudgetChange(index, "costs", e.target.value)
                          }
                          value={row.costs}
                          required
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              {/* Add Row Button */}
              <Button onClick={handleAddBudgetRow} colorScheme="teal">
                Add Expense
              </Button>
              <Heading as="h3" size="md" mb={5}>
                Total Cost: {calculateTotalCosts("costs")}
              </Heading>
              <Button
                colorScheme="blue"
                type="submit"
                onClick={() => (formData.projectInChargeAgreement = true)}
              >
                Submit
              </Button>
            </form>
          </VStack>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default EducationRuralUrbanTribalGroup;
