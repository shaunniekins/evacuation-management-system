import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
} from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { StockinAdd } from "api/stockinAPI";
import { InventoryList, InventoryAdd, InventoryUpdate } from "api/inventoryAPI";
import { ItemList } from "api/itemAPI";

const AddModal = ({
  // addEntries,
  // itemName,
  // itemUnit,
  isOpen,
  onClose,
  initialRef,
  finalRef,
}) => {
  const addEntries = ItemList();

  const inventoryList = InventoryList();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const givenBy = event.target.givenBy.value;
    const donor = event.target.donor.value;
    const dateReceived = event.target.dateReceived.value;
    const itemIDValueSubmit = itemIDValue;
    const qty = event.target.qty.value;

    try {
      const result = await StockinAdd(
        givenBy,
        donor,
        dateReceived,
        itemIDValueSubmit,
        qty
      ); // call the API function
    } catch (error) {
      alert("Failed");
    }

    try {
      let itemExists = false;

      inventoryList.map(async (entry) => {
        if (entry.item === parseInt(itemIDValueSubmit)) {
          itemExists = true;
          const newQty = parseFloat(entry.qty) + parseFloat(qty);
          const resultInventory = await InventoryUpdate(
            entry.id,
            itemIDValueSubmit,
            newQty
          );
        }
      });

      if (!itemExists) {
        const resultInventory = await InventoryAdd(itemIDValueSubmit, qty);
      }

      onClose();
    } catch (error) {
      alert("Failed");
    }
  };

  const [date, setDate] = useState(new Date());
  const formattedDate = date.toISOString().slice(0, 10);

  const [unitValue, setUnitValue] = useState("");
  const [itemIDValue, setItemIDValue] = useState("");

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    // Find the entry with a matching name
    const matchingEntry = addEntries.find(
      (entry) => entry.name === selectedValue
    );

    if (matchingEntry) {
      // Set the unit value to the matching entry's unit
      setUnitValue(matchingEntry.unit);
    } else {
      // If no matching entry is found, reset the unit value
      setUnitValue("");
    }

    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedID = selectedOption.getAttribute("data-id");
    setItemIDValue(selectedID);
  };

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
          <ModalHeader>Stock In</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>From</FormLabel>
              <Select
                required
                id="givenBy-field"
                name="givenBy"
                placeholder="--Select option--">
                <option value="Government">Government</option>
                <option value="Private">Private</option>
              </Select>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                id="donor-field"
                name="donor"
                ref={initialRef}
                placeholder="Name (Optional)"
              />
              <FormLabel>Date Received</FormLabel>
              <Input
                required
                type="date"
                id="dateReceived-field"
                name="dateReceived"
                defaultValue={formattedDate}
                ref={initialRef}
                placeholder="Date Received"
              />
              <FormLabel>Item</FormLabel>
              <Flex justify={"space-between"} gap={2}>
                <Select
                  required
                  id="item-field"
                  name="item"
                  placeholder="--Select option--"
                  onChange={handleSelectChange}>
                  {addEntries.map((entry) => (
                    <option
                      key={entry.id}
                      value={entry.name}
                      data-id={entry.id}>
                      {entry.name}
                    </option>
                  ))}
                </Select>
                <Input
                  required
                  disabled
                  type="text"
                  id="unit-field"
                  name="unit"
                  ref={initialRef}
                  placeholder="Unit"
                  w={"20%"}
                  value={unitValue}
                />
              </Flex>

              <FormLabel>Quantity</FormLabel>
              <Input
                required
                type="number"
                id="qty-field"
                name="qty"
                ref={initialRef}
                placeholder="Quantity"
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
