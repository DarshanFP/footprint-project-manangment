import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Checkbox,
  Button,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  ChakraProvider,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import authAxios from "../../AuthAxios";

const ReviewSocialIndividual = () => {
  const navigate=useNavigate();
  const showToast = useToast();
  const projectData = JSON.parse(
    decodeURIComponent(useParams()?.project ?? "{}")
  );
  console.log(projectData);
  // Define formData object
  const [formData, setFormData] = useState({
    estimatedIncome: projectData.estimated_income || {
      currentYear: 0,
      year1: 0,
      year2: 0,
      year3: 0,

    },
    photographFile: projectData.photograph_benificary,
    nameOfSelfEmployment: projectData.nameOfSelfEmployment,
    projectInchargeName: projectData.applicant.name,
    projectInchargeContact: projectData.applicant.mobile,
    projectInchargeEmail: projectData.applicant.email,
    beneficiaryName: projectData.name,
    beneficiaryContact: projectData.mobile,
    beneficiaryEmail: projectData.email,
    beneficiaryAddress: projectData.address,
    aadharCardNo: projectData.aadhar_no,
    gender: projectData.gender,
    dob: projectData.DOB,
    amountRequested: projectData.amount_requested,
    beneficiaryContribution: projectData.beneficiary_contribution,
    projectInChargeAgreementDate: projectData.project_in_charge_agree.date,
    projectInChargeAgreement: projectData.project_in_charge_agree.agree,
    benificiaryAgree: projectData.benificary_agree.agree,
    benificiaryAgreeDate: projectData.benificary_agree.date,
    maritalStatus: projectData.married,
    spouseName: projectData.spouse_name,
    child: projectData.no_of_children,
    eduStatus: projectData.education_status,
    religion: projectData.religion,
    casteTribe: projectData.caste,
    presentFamilySituationDetails: projectData.present_family_situation,
    smallScaleBusinessDetails: projectData.smallScaleBusinessDetails,
    monthlyEarnings: projectData.monthlyEarnings,
    businessIdeaDetails: projectData.businessIdeaDetails,
    businessStrengthsPreviousYear: projectData.businessStrengthsPreviousYear,
    businessWeaknessesPreviousYear: projectData.businessWeaknessesPreviousYear,
    riskIdentification: projectData.riskIdentification,
    riskMitigationMeasures: projectData.riskMitigationMeasures,
    businessSustainability: projectData.businessSustainability,
    expectedBenefits: projectData.expectedBenefits,
    // Revenue Goals
    revenueData: projectData.revenueGoals,
    // Budget Details
    budgetData: projectData.budget_cost_table,
    // Document Upload
    documents: [
      { name: "aadhar_img", file: projectData.aadhar_img },
      { name: "request_letter_img", file: projectData.request_letter_img },
      {
        name: "quotations_regarding_the_purchase_img",
        file: projectData.quotations_regarding_the_purchase_img,
      },
      {
        name: "other_supporting_documents",
        file: projectData.other_supporting_documents,
      },
    ],
    provincialSuperiorAgree: false,
    provincialSuperiorComment: null,
  });

  const calculateTotals = (column) => {
    return formData.revenueData.reduce((total, row) => {
      return total + (parseInt(row[column], 10) || 0);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authAxios.put("/projects/editreviewerSI/", {
        provincial_superior_agree: {
          agree: formData.provincialSuperiorAgree,
        },
        projectID: projectData._id,
        comment_box_provincial_superior: formData.provincialSuperiorComment,
      });
      if (res.data.success) {
        showToast({
          title: formData.provincialSuperiorAgreement ? "Reviewed successfully" : "Reverted successfully",
          status: "success",
          duration: 5000,
        });navigate("/dashboardApplicant");
      } else {
        showToast({
          title: "Error",
          status: "error",
          duration: 5000,
        });
      }
      console.log(res.data);
    } catch (error) {
      showToast({
        title: "Error",
        status: "error",
        duration: 5000,
      });
      console.log(error);
    }
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <Heading
          as="h1"
          size="xl"
          mb={6}
          align="center"
          justifyContent="center"
        >
          Social individual Project Application Form
        </Heading>

        <form onSubmit={handleSubmit}>
          {/* All the read-only fields */}
          <VStack align="start" spacing={4} mb={8}>
            <FormControl isReadOnly>
              <FormLabel>Name of self employment</FormLabel>
              <Input
                type="text"
                value={formData.nameOfSelfEmployment}
                readOnly
              />
            </FormControl>
          </VStack>

          <VStack align="start" spacing={4} mb={8}>
            {/* Name of Project Incharge */}
            <FormControl isReadOnly>
              <FormLabel>Name of Project Incharge</FormLabel>
              <Input
                type="text"
                value={formData.projectInchargeName}
                readOnly
              />
            </FormControl>

            {/* Contact of Project Incharge */}
            <FormControl isReadOnly>
              <FormLabel>Contact of Project Incharge</FormLabel>
              <Input
                type="text"
                value={formData.projectInchargeContact}
                readOnly
              />
            </FormControl>

            {/* Email of Project Incharge */}
            <FormControl isReadOnly>
              <FormLabel>Email of Project Incharge</FormLabel>
              <Input
                type="email"
                value={formData.projectInchargeEmail}
                readOnly
              />
            </FormControl>
          </VStack>
          <VStack>
            {/* Personal Information of the Beneficiary */}
            <Heading as="h1" size="xl" mb={6}>
              Personal Information of the Beneficiary
            </Heading>
            {/* Photograph */}
            <FormControl isReadOnly>
              <FormLabel>Photograph</FormLabel>
              <img src={formData.photographFile} alt="Photograph" />
            </FormControl>

            {/* Name */}
            <FormControl isReadOnly>
              <FormLabel>Name</FormLabel>
              <Input type="text" value={formData.beneficiaryName} readOnly />
            </FormControl>
            {/* Contact */}
            <FormControl isReadOnly>
              <FormLabel>Contact</FormLabel>
              <Input type="tel" value={formData.beneficiaryContact} readOnly />
            </FormControl>

            {/* Email */}
            <FormControl isReadOnly>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={formData.beneficiaryEmail} readOnly />
            </FormControl>

            {/* Address */}
            <FormControl isReadOnly>
              <FormLabel>Address</FormLabel>
              <Textarea value={formData.beneficiaryAddress} readOnly />
            </FormControl>

            {/* Aadhar Card No. */}
            <FormControl isReadOnly>
              <FormLabel>Aadhar Card No.</FormLabel>
              <Input type="text" value={formData.aadharCardNo} readOnly />
            </FormControl>

            {/* Gender */}
            <FormControl isReadOnly>
              <FormLabel>Gender</FormLabel>
              <Select value={formData.gender} readOnly>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>

            {/* Date of Birth */}
            <FormControl isReadOnly>
              <FormLabel>Date of Birth</FormLabel>
              <Input type="date" value={formData.dob} readOnly />
            </FormControl>

            {/* Marital Status */}
            <FormControl isReadOnly>
              <FormLabel>Marital Status</FormLabel>
              <Select value={formData.maritalStatus} readOnly>
                <option value="married">married</option>
                <option value="unmarried">unmarried</option>
                <option value="divorced">Divorced</option>
                <option value="spouse dead">Spouse dead</option>
              </Select>
            </FormControl>

            {/* Name of spouse */}
            <FormControl isReadOnly>
              <FormLabel>Spouse's name</FormLabel>
              <Input type="text" value={formData.spouseName} readOnly />
            </FormControl>

            {/* Number of children */}
            <FormControl isReadOnly>
              <FormLabel>Number of Children</FormLabel>
              <Input type="number" value={formData.child} readOnly />
            </FormControl>

            {/* Educational status of children */}
            <FormControl isReadOnly>
              <FormLabel>Educational status of children</FormLabel>
              <Input type="text" value={formData.eduStatus} readOnly />
            </FormControl>

            {/* Religion */}
            <FormControl isReadOnly>
              <FormLabel>Religion</FormLabel>
              <Input type="text" value={formData.religion} readOnly />
            </FormControl>

            {/* Caste / Tribe */}
            <FormControl isReadOnly>
              <FormLabel>Caste / Tribe</FormLabel>
              <Input type="text" value={formData.casteTribe} readOnly />
            </FormControl>
          </VStack>

          {/* Revenue Goals Table */}
          {/* Revenue Goals Table */}
          <Heading as="h1" size="xl" mb={6}>
            Revenue Goals – Facts and Figures
          </Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Business Plans</Th>
                <Th>Year {new Date().getFullYear()}</Th>
                <Th>Year {new Date().getFullYear() + 1}</Th>
                <Th>Year {new Date().getFullYear() + 2}</Th>
                <Th>Year {new Date().getFullYear() + 3}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {formData.revenueData.map((row, index) => (
                <Tr key={index}>
                  <Td>{row.businessPlan}</Td>
                  <Td>{row.currentYear}</Td>
                  <Td>{row.year1}</Td>
                  <Td>{row.year2}</Td>
                  <Td>{row.year3}</Td>
                </Tr>
              ))}
              <Tr>
                <Td>Total Expenses</Td>
                <Td>{calculateTotals("currentYear")}</Td>
                <Td>{calculateTotals("year1")}</Td>
                <Td>{calculateTotals("year2")}</Td>
                <Td>{calculateTotals("year3")}</Td>
              </Tr>
              <Tr>
                <Td>Estimated Income per Year</Td>
                <Td>{formData.estimatedIncome.currentYear}</Td>
                <Td>{formData.estimatedIncome.year1}</Td>
                <Td>{formData.estimatedIncome.year2}</Td>
                <Td>{formData.estimatedIncome.year3}</Td>
              </Tr>
            </Tbody>
          </Table>

          {/* Budget Table */}
          <Heading as="h1" size="xl" mb={6}>
            Budget Details
          </Heading>

          <Box p={4}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Budget</Th>
                  <Th>Cost</Th>
                </Tr>
              </Thead>
              <Tbody>
                {formData.budgetData.map((row, index) => (
                  <Tr key={index}>
                    <Td>
                      <Input type="text" value={row.budget} isReadOnly />
                    </Td>
                    <Td>
                      <Input type="number" value={row.cost} isReadOnly />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          <FormControl>
            <FormLabel>Beneficiary Contribution</FormLabel>
            <Input
              type="text"
              value={formData.beneficiaryContribution}
              readOnly
            />
          </FormControl>
          <FormControl>
            <FormLabel>Amount Requested</FormLabel>
            <Input type="text" value={formData.amountRequested} readOnly />
          </FormControl>

          {/* Document Upload */}
          <Heading as="h1" size="xl" mb={6}>
            Uploaded Documents
          </Heading>
          <Flex justify="center" align="center" wrap="wrap">
            {formData.documents.map((doc, index) => (
              <Box key={index} w="50%">
                <Image src={doc.file} alt={doc.name} />
              </Box>
            ))}
          </Flex>

          <VStack align="start" spacing={4} mb={8}>
            {/* Signatures */}
            <Heading as="h1" size="xl" mb={6}>
              Signatures
            </Heading>

            <FormControl isReadOnly>
              <Checkbox isChecked isReadOnly>
                The Beneficiary / Family member agree
              </Checkbox>
              <Input
                type="date"
                value={formData.beneficiaryAgreementDate}
                readOnly
              />
            </FormControl>
            {/* Signatures */}
            <Heading as="h1" size="xl" mb={6}>
              Signatures
            </Heading>
            <VStack align="start" spacing={4} mb={8}>
              {/* Beneficiary / Family member agreement */}
              <FormControl isRequired>
                <Checkbox name="beneficiaryAgreement" isChecked isReadOnly>
                  The Beneficiary / Family member agree
                </Checkbox>
                <Input
                  type="date"
                  name="beneficiaryAgreementDate"
                  value={formData.benificiaryAgreeDate.substring(0, 10)}
                  readOnly
                />
              </FormControl>
              {/* Project-In-Charge agreement */}
              <FormControl isRequired>
                <Checkbox name="projectInChargeAgreement" isChecked readOnly>
                  The Project-In-Charge agree
                </Checkbox>
                <Input
                  type="date"
                  name="projectInChargeAgreementDate"
                  value={formData.projectInChargeAgreementDate.substring(0, 10)}
                  readOnly
                />
              </FormControl>
              <FormControl isRequired>
                Provincial Superior Comment
                <Textarea
                  required
                  type="text"
                  onChange={(e) => {
                    setFormData((prevData) => {
                      prevData.provincialSuperiorComment = e.target.value;
                      return { ...prevData };
                    });
                  }}
                  name="provincialSuperiorComment"
                  value={formData.provincialSuperiorComment}
                />
              </FormControl>
            </VStack>
          </VStack>

          {/* Submit Button */}
          <Button
            colorScheme="blue"
            mx="3"
            type="submit"
            onClick={() => (formData.provincialSuperiorAgree = true)}
          >
            Accept
          </Button>
          <Button
            colorScheme="red"
            mx="3"
            type="submit"
            flex={1}
            onClick={() => (formData.provincialSuperiorAgree = false)}
          >
            Revert
          </Button>
          {/* The submit button can be hidden or disabled for read-only view */}
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default ReviewSocialIndividual;
