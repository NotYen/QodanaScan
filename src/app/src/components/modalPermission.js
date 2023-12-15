import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Image,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from '@chakra-ui/react'

import audio from '../assecs/images/source/permission_audio.png';
import video from '../assecs/images/source/permission_video.png';

function PermissionRequest({isOpen}) {
  // const { onOpen, onClose } = useDisclosure()

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal closeOnOverlayClick={false} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>請允許你的攝影機或是麥克風</ModalHeader>
          <ModalBody>
            <Image src={audio} alt='' />
            <br />
            <Image src={video} alt='' />
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PermissionRequest