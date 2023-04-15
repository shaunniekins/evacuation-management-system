// Chakra imports
import { Box, Flex, Grid, Icon } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
// Assets
import React from "react";
import ViewStockin from "./components/Stockin/View";
import ViewCashDonation from "./components/CashDonation/View";
import ViewAddItem from "./components/AddItem/View";

function Calamity() {
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }} mt="24px">
      <Tabs align="end" variant="soft-rounded" colorScheme="blue">
        <TabList>
          <Tab>Add Item</Tab>
          <Tab>Stock-in</Tab>
          <Tab>Cash Donation</Tab>
          <Tab>Repack</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ViewAddItem />
          </TabPanel>
          <TabPanel>
            <ViewStockin />
          </TabPanel>
          <TabPanel>
            <ViewCashDonation />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Calamity;
