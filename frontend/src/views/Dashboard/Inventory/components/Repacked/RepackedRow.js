import {
  Box,
  Button,
  Icon,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
// import { StockinDelete } from "api/stockinAPI";
import { RepackedDelete } from "api/repackedAPI";
import { useDisclosure } from "@chakra-ui/react";

import UpdateModal from "./UpdateModal";
import { ItemList } from "api/itemAPI";
import { InventoryList, InventoryUpdate } from "api/inventoryAPI";

function RepackedRow(props) {
  const { entries, id, items, units, qty, instance, reason } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const nameColor = useColorModeValue("gray.500", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const entry1 = ItemList();
  const inventoryList = InventoryList();

  const handleDelete = async () => {
    const itemsArr = items.split(","); // convert to array
    const qtyArr = qty.split(","); // convert to array
    // console.log("itemsArr: ", itemsArr);
    // console.log("qtyArr: ", qtyArr);

    const results = [];

    for (let i = 0; i < itemsArr.length; i++) {
      const item = parseInt(itemsArr[i].trim());
      const matchingInventoryItem = inventoryList.find(
        (inventoryItem) => inventoryItem.item === item
      );

      if (matchingInventoryItem) {
        const id = matchingInventoryItem.id;
        const qtyEach = qtyArr[i].trim();
        const qty = parseFloat(matchingInventoryItem.qty) + parseFloat(qtyEach);

        const resultInventory = await InventoryUpdate(id, item, qty);
        results.push(resultInventory);
        // console.log("qty: ", qty);
      }
    }

    try {
      await RepackedDelete(id);
      onClose();
    } catch (error) {
      alert("Failed");
    }
  };

  return (
    <>
      <Box px="24px" bg={bgColor} my="15px" borderRadius="12px">
        <Flex justify="space-between" w="100%">
          <Flex direction="column" justify={"center"} maxWidth="70%">
            {/* <Text color={nameColor} fontSize="md" fontWeight="bold" mb="10px">
              
            </Text> */}
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Items:{" "}
              <Text as="span" color="gray.500">
                {items.split(", ").map((item, index) => {
                  // console.log("item: ", item);
                  const suffix =
                    index === items.split(", ").length - 1 ? "" : "; ";
                  const selectedItem = entry1.find(
                    (itemList) => itemList.id === parseInt(item)
                  );
                  const itemName = selectedItem
                    ? selectedItem.name
                    : "Item not found";
                  return `${itemName} (${qty.split(", ")[index]}${
                    units.split(", ")[index]
                  })${suffix}`;
                })}
              </Text>
            </Text>

            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Deliverables:{" "}
              <Text as="span" color="gray.500">
                {instance}
              </Text>
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              Reason:{" "}
              <Text as="span" color="gray.500">
                {reason}
              </Text>
            </Text>
          </Flex>
          <Flex
            direction={{ sm: "column", md: "row" }}
            align="center"
            p={{ md: "24px" }}>
            <Button
              p="0px"
              bg="transparent"
              mb={{ sm: "10px", md: "0px" }}
              me={{ md: "12px" }}
              onClick={() => handleDelete(id)}>
              <Flex color="red.500" cursor="pointer" align="center" p="12px">
                <Icon as={FaTrashAlt} me="4px" />
                <Text fontSize="sm" fontWeight="semibold">
                  DELETE
                </Text>
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default RepackedRow;
