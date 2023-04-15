import React from "react";
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
import { BarangayAdd } from "api/barangayAPI";
import { getMunicipalityList } from "api/getListAPI";
import { MunicipalityList } from "api/municipalityAPI";

const AddModal = ({ isOpen, onClose, initialRef, finalRef }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await BarangayAdd(
        event.target.name.value,
        event.target.municipality.value
      ); // call the API function
      onClose();
    } catch (error) {
      alert("Failed");
    }
  };

  const municipalityEntries = MunicipalityList();

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
          <ModalHeader>Add New Barangay</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Barangay</FormLabel>
              <Input
                required
                type="text"
                id="name-field"
                name="name"
                ref={initialRef}
                placeholder="Barangay"
              />
              <FormLabel>Municipality</FormLabel>
              <Select
                required
                id="municipality-field"
                name="municipality"
                placeholder="-- Select municipality --">
                {municipalityEntries
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((municipality, index) => (
                    <option key={index} value={municipality.name}>
                      {municipality.name}
                    </option>
                  ))}
              </Select>
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
