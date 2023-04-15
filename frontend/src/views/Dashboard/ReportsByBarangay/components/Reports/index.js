import { useState } from "react";
import { Select } from "@chakra-ui/react";
// Chakra imports
import {
  Button,
  Flex,
  Icon,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import React from "react";
import { GenderReport, BarangayReport, PWDReport, AgeReport } from "./Report";

const Report = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#dee2e6", "gray.500");

  const [selectedReport, setSelectedReport] = useState("gender");

  const handleSelectChange = (event) => {
    setSelectedReport(event.target.value);
  };

  const renderReport = () => {
    switch (selectedReport) {
      case "gender":
        return <GenderReport />;
      case "barangay":
        return <BarangayReport />;
      case "pwd":
        return <PWDReport />;
      case "age":
        return <AgeReport />;
      default:
        return <GenderReport />;
    }
  };

  return (
    <>
      <Card p="16px" align={"start"}>
        <CardHeader>
          <Flex
            justify="space-between"
            align="center"
            minHeight="60px"
            w="100%"
          >
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Reports
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <Flex direction={"column"} w={"100%"}>
            <Select
              value={selectedReport}
              onChange={handleSelectChange}
              //   px="1rem"
              py="0.75rem"
              //   mb={4}
              border="1px solid"
              borderRadius="15px"
              borderColor={borderColor}
              bg="transparent"
              h={12}
            >
              <option value="gender">Gender Report</option>
              <option value="barangay">Barangay Report</option>
              <option value="pwd">PWD Report</option>
              <option value="age">Age Report</option>
            </Select>
            <Flex direction={"column"} width={"100%"} my="1rem">
              {renderReport()}
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default Report;
