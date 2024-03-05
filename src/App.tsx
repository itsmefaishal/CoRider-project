import React, { useEffect, useState } from "react";
import ChatApp from "./main";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";


const App: React.FC = () => {
  const [apiData, setApiData] = useState<any | null>(null);
  const apiUrl = "https://qa.corider.in/assignment/chat?page=0";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const TopBar = () => {
    return (
      <Box w="100%" h="130px" bg="#E5E5E0" p={[5, 4, 4, 4]} zIndex="2">
        <VStack
          position="fixed"
          top="0"
          left="0"
          width="100%"
          spacing={2}
          bg="#E5E5E0"
          borderBottom="1px"
          borderColor="gray.300"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={[4]}
        >
          <HStack
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <HStack>
              <FaArrowLeft />
              <Text fontSize="2xl" textAlign={["center", "center"]}>
                Trip 1
              </Text>
            </HStack>
            <FaRegPenToSquare />
          </HStack>
          <HStack width="100%">
            <Text textAlign={["left", "left"]}>
              from <b>IGI Airport, T3</b> <br /> to <b>Sector 28</b>
            </Text>
            <Spacer />
            <BsThreeDotsVertical />
          </HStack>
        </VStack>
      </Box>
    );
  };

  if (!apiData) {
    return <div>Loading...</div>;
  } else {
    return (
      <ChakraProvider>
        <TopBar />
        <Box>
          <ChatApp chats={apiData.chats} />
        </Box>
      </ChakraProvider>
    );
  }
};

export default App;
