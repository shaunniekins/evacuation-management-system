import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Box,
  Button,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { InventoryList, InventoryAdd, InventoryUpdate } from "api/inventoryAPI";
import { evacDistributeList } from "api/distributedEvacuees";

import { useHistory } from "react-router-dom";

import {
  BarangayInventoryList,
  BarangayInventoryAdd,
  BarangayInventoryUpdate,
} from "api/inventoryPerBarangayAPI";

import { ItemList } from "api/itemAPI";
import {
  evacDistributeAdd,
  evacDistributeUpdate,
} from "api/distributedEvacuees";
import { resEvacList } from "api/residentInEvacuationAPI";
import { CalamityList } from "api/calamityAPI";
import { EvacueeList } from "api/evacueeAPI";
import { RepackedList, RepackedUpdate } from "api/repackedAPI";

import { useContext } from "react";
import AuthContext from "context/AuthContext";

const AddModal = ({ isOpen, onClose, initialRef, finalRef }) => {
  const addEntries = ItemList();
  const history = useHistory();

  const inventoryList = InventoryList();
  const evacueesList = resEvacList();
  const calamityList = CalamityList();
  const residentEntries = EvacueeList();
  const repackedList = RepackedList();
  const barangayInventoryList = BarangayInventoryList();
  const evacueeDistributeList = evacDistributeList();

  let { userPosition, userBarangay } = useContext(AuthContext);
  const isAdmin = userPosition == "Personnel" ? false : true;

  const textColor = useColorModeValue("gray.700", "white");
  const [date, setDate] = useState(new Date());
  const formattedDate = date.toISOString().slice(0, 10);

  const [unitValue, setUnitValue] = useState("");
  const [itemIDValue, setItemIDValue] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const repackedItem = parseInt(event.target.item.value);
    const calamity = event.target.calamity.value;

    const matchingEntry = calamityList.find((entry) => entry.name === calamity);
    const calamityDate = matchingEntry.date;

    const dateDistributed = event.target.dateDistributed.value;
    const evacuee = displayName;
    const headFamily = event.target.isHead.value === "Head" ? "yes" : "no";
    const is_distributed = 0;

    // console.log("repackedItem: ", repackedItem);
    // console.log("calamity: ", calamity);
    // console.log("calamityDate: ", calamityDate);
    // console.log("dateDistributed: ", dateDistributed);
    // console.log("evacuee: ", evacuee);
    // console.log("headFamily: ", headFamily);

    try {
      const result = await evacDistributeAdd(
        repackedItem,
        calamity,
        calamityDate,
        dateDistributed,
        evacuee,
        headFamily,
        is_distributed
      );
    } catch (error) {
      alert("Failed");
    }

    try {
      // let itemExists = false;

      repackedList.map(async (entry) => {
        if (entry.id === repackedItem) {
          // itemExists = true;
          const newInstance = parseInt(entry.instance) - 1;
          await RepackedUpdate(
            entry.id,
            entry.items,
            entry.units,
            entry.qty,
            newInstance,
            entry.reason,
            entry.barangay
          );
        }
      });

      // if (!itemExists) {
      //   const resultInventory = await InventoryAdd(itemIDValueSubmit, qty);
      // }

      // console.log("itemExists", itemExists);

      onClose();
      history.push("/admin/resident-information");
    } catch (error) {
      alert("Failed");
    }
  };

  const entry1 = ItemList();
  // const [countItems, setCountItems] = useState(1);
  let count = 1;
  let countItem = 1;

  const idConvertName = (itemID, itemUnit, itemQty, instance) => {
    return `Repacked #${count++} ✖ ${instance} items`;
  };

  const handleSelectChange = (event) => {
    const selectedValue = parseInt(event.target.value);
    setDisplayName(selectedValue);

    const matchingEntry = residentEntries.find(
      (entry) => entry.id === selectedValue
    );
    if (matchingEntry) {
      setUnitValue(
        matchingEntry.is_head.toLowerCase() === "yes" ? "Head" : "Member"
      );
    } else {
      setUnitValue("");
    }

    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedID = selectedOption.getAttribute("data-id");
    setItemIDValue(selectedID);
  };

  const uniqueEvacuees = [];
  const uniqueEvacueesSet = new Set();

  // Loop through the evacueesList and add unique values to uniqueEvacuees array
  evacueesList.forEach((entry) => {
    if (!uniqueEvacueesSet.has(entry.resident)) {
      uniqueEvacueesSet.add(entry.resident);
      uniqueEvacuees.push(entry);
    }
  });

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      isCentered>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Distribute Goods</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Card border="1px" borderColor="gray.200" mb="1rem">
              <CardHeader>
                <Flex justify="center" align="center" w="100%">
                  <Text
                    align={"center"}
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold">
                    Available Repacked Items in {userBarangay} Inventory
                  </Text>
                </Flex>
              </CardHeader>
              <CardBody>
                <Box
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, auto)",
                    columnGap: "1rem",
                    columnWidth: "50%",
                  }}>
                  {repackedList
                    // .filter((item) => parseFloat(item.qty) !== 0)
                    .map((item) => (
                      <Text key={item.id}>
                        {idConvertName(
                          item.items,
                          item.units,
                          item.qty,
                          item.instance
                        )}
                      </Text>
                    ))}
                </Box>
              </CardBody>
            </Card>
            <FormControl>
              <FormLabel>Evacuee</FormLabel>
              <Flex justify={"space-between"} gap={2}>
                <Select
                  required
                  id="evacuee-field"
                  name="evacuee"
                  placeholder="--Select option--"
                  onChange={handleSelectChange}>
                  {uniqueEvacuees
                    .filter((entry) => {
                      const resident = residentEntries.find(
                        (resident) => resident.id === entry.resident
                      );
                      return resident && resident.barangay === userBarangay;
                    })
                    .map((entry) => {
                      const resident = residentEntries.find(
                        (resident) => resident.id === entry.resident
                      );
                      const residentName = resident
                        ? `${resident.first_name} ${resident.last_name}`
                        : "";
                      return (
                        <option
                          key={entry.id}
                          value={entry.resident}
                          data-id={entry.resident}>
                          {residentName}
                        </option>
                      );
                    })}
                </Select>
                <Input
                  required
                  disabled
                  // w={"2rem"}
                  type="text"
                  id="isHead-field"
                  name="isHead"
                  ref={initialRef}
                  placeholder="Function"
                  w={"30%"}
                  value={unitValue}
                />
              </Flex>
              <FormLabel>Calamity</FormLabel>
              <Select
                required
                id="calamity-field"
                name="calamity"
                placeholder="--Select option--"
                // onChange={handleSelectChange}
              >
                {calamityList.map((entry) => (
                  <option key={entry.id} value={entry.name} data-id={entry.id}>
                    {entry.name}
                  </option>
                ))}
              </Select>
              <FormLabel>Item</FormLabel>
              <Select
                required
                id="item-field"
                name="item"
                placeholder="--Select option--"
                // onChange={handleSelectChange}
              >
                {repackedList.map((entry) => (
                  <option key={entry.id} value={entry.id} data-id={entry.id}>
                    {`Repacked #${countItem++}`}
                  </option>
                ))}
              </Select>

              <FormLabel>Date Received</FormLabel>
              <Input
                required
                type="date"
                id="dateDistributed-field"
                name="dateDistributed"
                defaultValue={formattedDate}
                ref={initialRef}
                placeholder="Date Distributed"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorscheme="blue" mr={3} type="submit">
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddModal;
