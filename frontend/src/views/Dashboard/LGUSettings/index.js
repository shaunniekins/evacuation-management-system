// Chakra imports
import { Flex } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import React from "react";
// import View from "components/EvacueeList/View";
import View from "./components/ResidentList/View";
import ViewResEvac from "./components/ResidentInEvacuation/View";

function Tables() {
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Tabs align="end" variant="soft-rounded" colorScheme="blue">
        <TabList>
          <Tab>Residents List</Tab>
          <Tab>In Evacuation Center</Tab>
          <Tab>Distribute Goods</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <View />
          </TabPanel>
          <TabPanel>
            <ViewResEvac />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Tables;
