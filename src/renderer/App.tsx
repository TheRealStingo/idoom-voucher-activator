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
import Activator from './components/activator';

import Login from './components/login';
function Hello() {
  return (
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
          <TabList minW={'70%'}>
            <Tab minW={'50%'}>Activator</Tab>
            <Tab minW={'50%'}>Client Help</Tab>
          </TabList>
        </Center>

        <TabPanels>
          <TabPanel>
            <Activator />
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
