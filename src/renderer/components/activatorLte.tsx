import React from 'react';
import {
  Button,
  Center,
  Heading,
  Input,
  VStack,
  Text,
  Box,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { getNumberData, redeemVoucher } from '../utils/fetchLte';
function ActivatorLte() {
  const [nd, setNd] = useState('');
  const [voucher, setVoucher] = useState('');
  const [isFetched, setIsfetched] = useState(false);
  const [numberData, setNumberData] = useState({
    nd: '',
    offre: '',
    ncli: '',
    type1: '',
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  return (
    <>
      <Center mt={10}>
        <VStack gap={4}>
          <Heading fontSize={'4xl'}>Idoom Voucher Activator</Heading>

          <Box w={'80%'}>
            <Text fontSize={'lg'} fontWeight={600} mb={2}>
              Phone Number :
            </Text>
            <Input
              type={'number'}
              onChange={(e) => {
                setNd(e.target.value);
              }}
            />
          </Box>
          <Text
            maxW={'80%'}
            textAlign={'center'}
            fontWeight={'600'}
            fontSize={'lg'}
            display={isFetched ? 'block' : 'none'}
          >
            Your Subscription is {numberData.offre}
          </Text>
          <Box w={'80%'} display={isFetched ? 'block' : 'none'}>
            <Text fontSize={'lg'} fontWeight={600} mb={2}>
              Voucher Code :
            </Text>
            <Input
              type={'number'}
              onChange={(e) => {
                setVoucher(e.target.value);
              }}
            />
          </Box>

          <Button
            display={isFetched ? 'none' : 'flex'}
            isLoading={loading}
            w={'80%'}
            onClick={async () => {
              setLoading(true);
              const { data, error } = await getNumberData(nd);
              if (data && !error) {
                setLoading(false);
                setNumberData(data);
                setIsfetched(true);
              }
              if (!data && error) {
                setLoading(false);
                toast({
                  title: error.error,
                  status: 'error',
                  isClosable: true,
                });
              }
            }}
          >
            Check Number
          </Button>
          <Button
            isLoading={loading}
            display={isFetched ? 'flex' : 'none'}
            w={'80%'}
            onClick={async () => {
              setLoading(true);
              const { ncli, type1, nd } = numberData;
              const { data, error } = await redeemVoucher(
                nd,
                ncli,
                type1,
                voucher,
              );
              console.log(data, error);
              if (data && !error) {
                setLoading(false);
                toast({
                  title: `Voucher Activated , Transaction code : ${data.num_trans} .`,
                  description: 'Transaction data copied to clipboard',
                  status: 'success',
                  isClosable: true,
                });
                await navigator.clipboard.writeText(
                  `Idoom Transaction ID : ${data.num_trans}\nIdoom Transaction Date : ${data.date_transaction}\nIdoom Transaction Time : ${data.heure_transaction}\nIdoom Service Type : ${data.service}`,
                );
              }
              if (!data && error) {
                setLoading(false);
                toast({
                  title: error.error,
                  status: 'error',
                  isClosable: true,
                });
              }
            }}
          >
            Activate Voucher
          </Button>
          <Button
            display={isFetched ? 'flex' : 'none'}
            w={'80%'}
            onClick={() => {
              setNumberData({ nd: '', offre: '', ncli: '', type1: '' });
              setIsfetched(false);
            }}
          >
            Return
          </Button>
        </VStack>
      </Center>
      
    </>
  );
}

export default ActivatorLte;
