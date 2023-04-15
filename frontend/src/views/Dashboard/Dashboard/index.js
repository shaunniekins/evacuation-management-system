// Chakra imports
import { Flex, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
// assets
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
  PersonIcon,
  SupportIcon,
} from "components/Icons/Icons.js";
import React, { useEffect, useState } from "react";
import {
  getEvacueeCount,
  getFamilyCount,
  getMaleCount,
  getFemaleCount,
  getEvacuationCenterCount,
  getBarangayCount,
  getBarangayList,
} from "api/getListAPI";
import MiniStatistics from "./components/MiniStatistics";

export default function Dashboard() {
  const iconBoxInside = useColorModeValue("white", "white");
  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="24px">
        <MiniStatistics
          title={"Number of Evacuees"}
          amount={getEvacueeCount()}
          // percentage={55}
          icon={<PersonIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Number of Families"}
          amount={getFamilyCount()}
          // percentage={5}
          icon={<PersonIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Number of Male"}
          amount={getMaleCount()}
          // percentage={-14}
          icon={<PersonIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Number of Female"}
          amount={getFemaleCount()}
          // percentage={8}
          icon={<PersonIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Number of Evacuation Center"}
          amount={getEvacuationCenterCount()}
          // percentage={8}
          icon={<SupportIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Number of Barangay"}
          amount={getBarangayCount()}
          // percentage={8}
          icon={<SupportIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
      </SimpleGrid>
    </Flex>
  );
}
