// Import necessary libraries and components
import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  IconButton,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginPage = () => {
  // Use Formik for form management
  const formik = useFormik({
    // Initial values and form validation schema using Yup
    initialValues: {
      email: "",
      password: "",
      showPassword: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(6, "Password must be at least 6 characters")
        .matches(
          /^(?=.*[!@#$%^&*(),.?":{}|<>])/,
          "Password must contain at least 1 special character"
        ),
    }),
    // Form submission logic
    onSubmit: (values) => {
      // Implement your login logic here
      console.log("Logging in with:", values.email, values.password);
    },
  });

  // Function to toggle password visibility
  const handleTogglePasswordVisibility = () => {
    formik.setFieldValue("password", ""); // Reset password field when toggling visibility
    formik.setFieldTouched("password", false); // Reset touched state
    formik.setFieldValue("showPassword", !formik.values.showPassword);
  };

  return (
    <VStack spacing={8} p={8} align="center" justify="center">
      <Heading mb={4} fontSize="3xl" fontWeight="bold">
        Welcome back!
      </Heading>
      <Text fontSize="2x9" color="gray.600">
        Login to your account to continue.
      </Text>
      <Box width="100%" maxW="400px">
        {/* Form element with Formik handleSubmit */}
        <form onSubmit={formik.handleSubmit}>
          {/* Email input */}
          <FormControl
            id="email"
            isInvalid={formik.touched.email && formik.errors.email}
            isRequired
          >
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="john.doe@example.com"
              {...formik.getFieldProps("email")}
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>
          {/* Password input */}
          <FormControl
            id="password"
            isInvalid={formik.touched.password && formik.errors.password}
            isRequired
            mt={2}
          >
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={formik.values.showPassword ? "text" : "password"}
                placeholder="********"
                {...formik.getFieldProps("password")}
              />
              {/* Toggle password visibility button */}
              <InputRightElement>
                <IconButton
                  variant="ghost"
                  icon={
                    formik.values.showPassword ? <FaEyeSlash /> : <FaEye />
                  }
                  onClick={handleTogglePasswordVisibility}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
          {/* Submit button */}
          <Button
            colorScheme="blue"
            type="submit"
            mt={4}
            width="100%"
            borderRadius="full"
          >
            Login
          </Button>
        </form>
      </Box>
      {/* Forgot password link */}
      <Link mt={2} color="blue.500" fontSize="sm">
        Forgot password?
      </Link>
      {/* Registration link */}
      <Text mt={4} fontSize="sm" color="gray.600">
        Don't have an account?{" "}
        <ChakraLink color="blue.500" as={Link} to="/register">
        Register here.
      </ChakraLink>
      </Text>
    </VStack>
  );
};

export default LoginPage;