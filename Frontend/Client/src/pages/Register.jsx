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
import { useState } from 'react';
export default function SplitScreen() {
  const navigate = useNavigate();
  let [user,setUser] =useState({});
  function handleSubmit(){
    alert(JSON.stringify(user))
  }





  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
        
        
          <Button onClick={()=>{window.location.href=`${baseUrl}/auth/google`}} colorScheme={'gray'} variant={'outline'}>
            <Image width={"20px"} mr={2} src='https://static.vecteezy.com/system/resources/previews/022/484/503/original/google-lens-icon-logo-symbol-free-png.png' />
          continue with google
          </Button>
          <Box width={"100%"} textAlign={"center"} >or</Box>
          <FormControl >
            <Text color={"red"}>error here</Text>
            <Input onChange={(e)=>{setUser({...user,name:e.target.value})}} type="text" placeholder='name' />
          </FormControl>
          <FormControl id="email">
            <Input onChange={(e)=>{setUser({...user,email:e.target.value})}} type="email" placeholder='email' />
          </FormControl>
          <FormControl id="password">
            <Input onChange={(e)=>{setUser({...user,password:e.target.value})}} type="password" placeholder='password' />
          </FormControl>
          <FormControl >
            <Input onChange={(e)=>{setUser({...user,cPassword:e.target.value})}} type="password" placeholder='confirm password' />
          </FormControl>
         
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              {/* <Checkbox>Remember me</Checkbox> */}
              {/* <Link color={'blue.500'}>Forgot password?</Link> */}
            </Stack>
            <Button onClick={handleSubmit} colorScheme={'blue'} variant={'solid'}>register </Button>
             <Link href="/login" color={'blue.500'}>Already have an account?Login</Link>
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
