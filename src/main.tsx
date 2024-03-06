import React from "react";
import {
  Box,
  VStack,
  Avatar,
  HStack,
  Text,
  Spacer,
  Input,
  Button,
  Portal,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { LuSendHorizonal } from "react-icons/lu";
import { GrAttachment } from "react-icons/gr";
import { MdOutlineCameraAlt } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useState, useRef } from "react";

interface Message {
  id: string;
  message: string;
  sender: {
    image: string;
    is_kyc_verified: boolean;
    self: boolean;
    user_id: string;
  };
  time: string;
}

interface ChatProps {
  chats: Message[];
}

const ChatApp: React.FC<ChatProps> = ({ chats }) => {
  const [popUp, setPopUp] = useState(false);
  const [videoOn, setVideoOn] = useState(false);

  const Camera = useRef<HTMLVideoElement>(null);

  const handleCameraClick = async () => {
    try {
      if (videoOn) {
        const stream = Camera.current?.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop);

        if (Camera.current) {
          Camera.current.srcObject = null;
        }
      } else {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (Camera.current) {
          Camera.current.srcObject = stream;
        }
      }

      setVideoOn(true);
    } catch (error) {
      console.log("Error from the camera button : ", error);
    }
  };

  return (
    <VStack spacing={4} align="stretch" bg="#E5E5E0" pb={[11]} zIndex="1">
      {chats.map((chat) => (
        <Box
          key={chat.id}
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          alignSelf={chat.sender.self ? "flex-end" : "flex-start"}
          width={["100%", "80%", "60%", "40%"]}
        >
          <HStack alignItems={chat.sender.self ? "flex-end" : "flex-start"}>
            <div>
              {chat.sender.self ? null : (
                <Avatar
                  width={["24px"]}
                  height={["24px"]}
                  src={chat.sender.image}
                />
              )}
            </div>
            <VStack
              p={[8]}
              align="start"
              bg={chat.sender.self ? "#1C63D5" : "white"}
              color={chat.sender.self ? "white" : "gray"}
              borderRadius={["12px"]}
              borderBottomRightRadius={chat.sender.self ? "0px" : "12px"}
              borderTopLeftRadius={chat.sender.self ? "12px" : "0px"}
            >
              <Text>{chat.message}</Text>
            </VStack>
            <Spacer />
          </HStack>
        </Box>
      ))}
      <video
        ref={Camera}
        width="640px"
        height="480px"
        autoPlay
        playsInline
      ></video>
      <Box
        p={4}
        borderWidth="0px"
        borderRadius="lg"
        position="fixed"
        bottom="0"
        left="0"
        width="100%"
      >
        <HStack height="58px" bg={["white"]} px={[2]} borderRadius={[4]}>
          <Input
            border="none"
            p={[2]}
            bg={["white"]}
            placeholder="reply..."
            variant="unstyled"
          />
          <HStack spacing={1}>
            <Popover isOpen={popUp}>
              <PopoverTrigger>
                <Button
                  variant="unstyled"
                  bg={["white"]}
                  onClick={() => setPopUp(!popUp)}
                >
                  <GrAttachment />
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent
                  zIndex={4}
                  bg="white"
                  borderColor="gray.200"
                  borderWidth="1px"
                  borderRadius="lg"
                  p={2}
                  width="12em"
                  position="absolute"
                  bottom="58px"
                  right="0"
                >
                  <PopoverBody>
                    <HStack spacing={[1]}>
                      <Button colorScheme="blue">
                        <MdOutlineCameraAlt />
                      </Button>
                      <Button colorScheme="blue" onClick={handleCameraClick}>
                        <IoVideocamOutline />
                      </Button>
                      <Button colorScheme="blue">
                        <IoDocumentTextOutline />
                      </Button>
                    </HStack>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
            <Button variant="unstyled" bg={["white"]}>
              <LuSendHorizonal />
            </Button>
          </HStack>
        </HStack>
      </Box>
    </VStack>
  );
};

export default ChatApp;
