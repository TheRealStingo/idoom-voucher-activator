import {
  Button,
  Center,
  Heading,
  Input,
  VStack,
  Text,
  Box,
  Code,
  useToast,
} from '@chakra-ui/react';
import { login } from '../utils/fetchLine';
import { useState, useEffect } from 'react';
import User from './user';
import { useDataStore } from '../hooks/session';
function Login() {
  const [payload, setPayload] = useState({
    nd: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const setData = useDataStore((state: any) => state.setUserData);
  const data = useDataStore((state: any) => state.userData);

  return data ? (
    <User userData={data} />
  ) : (
    <>
      <Center mt={10}>
        <VStack gap={4}>
          <Heading fontSize={'4xl'}>Idoom Account Login</Heading>

          <Box w={'90%'}>
            <Text fontSize={'lg'} fontWeight={600} mb={2}>
              Phone Number :
            </Text>
            <Input
              type={'number'}
              onChange={(e) => {
                setPayload({ ...payload, nd: e.target.value });
              }}
            />
          </Box>
          <Box w={'90%'}>
            <Text fontSize={'lg'} fontWeight={600} mb={2}>
              Password :
            </Text>
            <Input
              type={'password'}
              onChange={(e) => {
                setPayload({ ...payload, password: e.target.value });
              }}
            />
          </Box>

          <Button
            w={'90%'}
            isLoading={loading}
            onClick={async () => {
              setLoading(true);
              const { data, error } = await login(payload);
              setLoading(false);
              if (data?.nd && !error) {
                toast({
                  title: `Logged in successfully . redirecting ...`,
                  status: 'success',
                  isClosable: true,
                });
                setData(data);
              }
              if (error && !data) {
                toast({
                  title: `Bad credentials .`,
                  status: 'error',
                  isClosable: true,
                });
              }
            }}
          >
            Login
          </Button>
        </VStack>
      </Center>
    
    </>
  );
}

export default Login;
