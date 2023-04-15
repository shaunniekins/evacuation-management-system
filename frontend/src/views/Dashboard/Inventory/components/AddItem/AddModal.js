import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Button,
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
import { ItemAdd } from "api/itemAPI";

const AddModal = ({ isOpen, onClose, initialRef, finalRef }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await ItemAdd(
        event.target.name.value,
        event.target.unit.value
      ); // call the API function
      onClose();
    } catch (error) {
      alert("Failed");
    }
  };

  const [date, setDate] = useState(new Date());
  const formattedDate = date.toISOString().slice(0, 10);

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
          <ModalHeader>Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                id="name-field"
                name="name"
                ref={initialRef}
                placeholder="Name"
              />
              <FormLabel>Unit</FormLabel>
              <Input
                required
                type="text"
                id="unit-field"
                name="unit"
                ref={initialRef}
                placeholder="Unit (eg. kg, pcs, galloon)"
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