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
} from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { CalamityUpdate } from "api/calamityAPI";

const UpdateModal = ({
  id,
  name,
  date,
  isOpen,
  onClose,
  initialRef,
  finalRef,
}) => {
  //   console.log("date:", date);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await CalamityUpdate(
        id,
        event.target.name.value,
        event.target.date.value
      ); // call the API function
      onClose();
    } catch (error) {
      alert("Failed");
    }
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Update Calamity</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Calamity name</FormLabel>
              <Input
                required
                type="text"
                id="name-field"
                name="name"
                defaultValue={name}
                ref={initialRef}
                placeholder="Calamity name"
              />
              <FormLabel>Calamity date</FormLabel>
              <Input
                required
                type="date"
                id="date-field"
                name="date"
                defaultValue={date}
                ref={initialRef}
                placeholder="Calamity date"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorscheme="blue" mr={3} type="submit">
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UpdateModal;
