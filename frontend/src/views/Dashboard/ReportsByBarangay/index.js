// Chakra imports
import { Flex } from "@chakra-ui/react";
import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import View from "./components/EvacueeList/View";
import Report from "./components/Reports/index";

function Tables() {
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }} mt="24px">
      <Tabs align="end" variant="soft-rounded" colorScheme="blue">
        <TabList>
          {/* <Tab>Inventory</Tab> */}
          <Tab>Evacuees' List</Tab>
          <Tab>Reports by Category</Tab>
        </TabList>
        <TabPanels>
          {/* <TabPanel>
            <Projects
              title={"Projects Table"}
              captions={["Companies", "Budget", "Status", "Completion", ""]}
              data={dashboardTableData}
            />
          </TabPanel> */}
          <TabPanel>
            <View />
          </TabPanel>
          <TabPanel>
            <Report />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Tables;
