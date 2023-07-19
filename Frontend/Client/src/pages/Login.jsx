import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Box,
  Stack,
  Image,
} from '@chakra-ui/react';
import {baseUrl } from "../components/utils/baseUrl"
import { useNavigate } from 'react-router-dom';
import loginImage from "../images/educating1.svg"
export default function SplitScreen() {
  const navigate = useNavigate();
  
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
       
         
          <Button onClick={()=>{window.location.href=`${baseUrl}/auth/google`}} colorScheme={'gray'} variant={'outline'}>
            <Image width={"20px"} mr={2} src='https://static.vecteezy.com/system/resources/previews/022/484/503/original/google-lens-icon-logo-symbol-free-png.png' />
          continue with google
          </Button>
          <Box width={"100%"} textAlign={"center"} >or</Box>
          <FormControl id="email">
           
            <Input type="email" placeholder='email' />
          </FormControl>
          <FormControl id="password">
            <Input type="password" placeholder='password' />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              {/* <Checkbox>Remember me</Checkbox> */}
              
            </Stack>
            <Button colorScheme={'blue'} variant={'solid'}>Log in</Button>
             <Link color={'blue.500'}>Dont have an account? register here</Link>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'include'}
          src={
            loginImage
          }
        />
      </Flex>
    </Stack>
  );
}
