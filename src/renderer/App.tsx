import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
  Center,
  Heading,
  Link,
} from '@chakra-ui/react';
import { ColorModeSwitcher, GithubIcon } from './components/icons';
import ActivatorLine from './components/activatorLine';
import Login from './components/login';
import ActivatorLte from './components/activatorLte';
import useNetwork from './hooks/connection';

function Hello() {
  let connnection = useNetwork();
  return !connnection ? (
    <Heading fontSize={'4xl'} textAlign={'center'} marginBlock={'300px'}>
      Please make sure you are connected to an internet connection
    </Heading>
  ) : (
    <>
      <ColorModeSwitcher
        style={{
          position: 'fixed',
          right: '25px',
          top: '20px',
        }}
      />
      <GithubIcon
        style={{
          position: 'fixed',
          right: '75px',
          top: '20px',
        }}
      />
      <Tabs size={'lg'} mt={16} isFitted variant="enclosed" minH={'100vw'}>
        <Center>
          <TabList minW={'80%'}>
            <Tab minW={'33%'}>Activator Line </Tab>
            <Tab minW={'33%'}>Activator LTE</Tab>
            <Tab minW={'33%'}>Client Help</Tab>
          </TabList>
        </Center>
        <TabPanels>
          <TabPanel>
            <ActivatorLine />
          </TabPanel>
          <TabPanel>
            <ActivatorLte />
          </TabPanel>
          <TabPanel>
            <Login />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Center>
        <Heading size={'md'} position={'absolute'} bottom={'0'}>
          Made with 💖 by{' '}
          <Link
            letterSpacing={'0.8px'}
            href="https://github.com/TheRealStingo/"
            isExternal
          >
            TheRealStingo
          </Link>
        </Heading>
      </Center>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
