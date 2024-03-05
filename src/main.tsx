import React from "react";
import {
  Box,
  VStack,
  Avatar,
  HStack,
  Text,
  Spacer,
  Input,
  Button
} from "@chakra-ui/react";
import { LuSendHorizonal } from "react-icons/lu";
import { GrAttachment } from "react-icons/gr";

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
            {chat.sender.self ? null : (
              <Avatar
                width={["24px"]}
                height={["24px"]}
                src={chat.sender.image}
              />
            )}
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
      <Box
        p={4}
        borderWidth="0px"
        borderRadius="lg"
        position="fixed"
        bottom="0"
        left="0"
        width="100%"
      >
        <HStack height = '58px' bg={['white']} px={[2]} borderRadius={[4]}>
          <Input
            border='none'
            p={[2]}
            bg={["white"]}
            placeholder="reply..."
            variant='unstyled'
          />
          <Button 
            variant='unstyled'
            bg={['white']}
          >
            <HStack spacing={2}>
                <GrAttachment />
                <LuSendHorizonal />
            </HStack>
          </Button>
        </HStack>
      </Box>
    </VStack>
  );
};

export default ChatApp;
