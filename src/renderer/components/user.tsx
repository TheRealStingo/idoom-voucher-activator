import {
  Center,
  VStack,
  Box,
  Text,
  Heading,
  HStack,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useDataStore } from '../hooks/session';
import { activateBackup } from '../utils/fetch';
import { useState } from 'react';
function User(props: any) {
  const { userData } = props;
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const logout = useDataStore((state: any) => state.unsetUserData);
  return (
    <>
      <Center mt={10}>
        <VStack gap={4}>
          <Heading fontSize={'4xl'}>Idoom Account Data</Heading>
          <VStack
            minW="xl"
            borderWidth="2px"
            borderRadius="lg"
            overflow="hidden"
            paddingBlock={8}
          >
            <HStack>
              <Text fontWeight={'700'}>Clients Full Name : </Text>
              <Text>
                {userData.nom} {userData.prenom}
              </Text>
            </HStack>
            <HStack>
              <Text fontWeight={'700'}>Idoom Number : </Text>
              <Text>{userData.nd}</Text>
            </HStack>
            <HStack>
              <Text fontWeight={'700'}>Idoom Subscription Status : </Text>
              <Text>{userData.status}</Text>
            </HStack>
            <HStack>
              <Text fontWeight={'700'}>Idoom Subscription Type : </Text>
              <Text>{userData.type1}</Text>
            </HStack>

            <HStack>
              <Text fontWeight={'700'}>Idoom Subscription : </Text>
              <Text>{userData.offre}</Text>
            </HStack>
            <HStack>
              <Text fontWeight={'700'}>Expires on : </Text>
              <Text>{userData.dateexp}</Text>
            </HStack>
            <HStack>
              <Text fontWeight={'700'}>Days Left : </Text>
              <Text>{userData.balance}</Text>
            </HStack>
            <HStack>
              <Text fontWeight={'700'}>Debt amount and Unpaid Invoices : </Text>
              <Text>
                {userData.dette} DZD total in {userData.nbfact} Invoices
              </Text>
            </HStack>
          </VStack>
          <Button
            minW={'xl'}
            isLoading={loading}
            onClick={async () => {
              const { jwt, nd, type1 } = userData;
              setLoading(true);
              const { data, error } = await activateBackup(jwt, nd, type1);
              setLoading(false);
              console.log(data, error, userData);
              if (data && !error) {
                toast({
                  title: `Backup Recharge Activated successfully`,
                  status: 'success',
                  isClosable: true,
                });
              }
              if (error && !data) {
                toast({
                  title: error.error,
                  status: 'error',
                  isClosable: true,
                });
              }
            }}
          >
            Activate Backup Recharge ( 96 hours )
          </Button>
          <Button minW={'xl'} onClick={logout}>
            Log out ( you can just close the app instead )
          </Button>
        </VStack>
      </Center>
    </>
  );
}

export default User;
