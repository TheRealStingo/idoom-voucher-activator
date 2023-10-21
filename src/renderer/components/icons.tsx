import {
  Link,
  useColorMode,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import { FaMoon, FaSun, FaGithub } from 'react-icons/fa';

export const ColorModeSwitcher = (props: any) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};
export const GithubIcon = (props: any) => {
  return (
    <Link href="https://github.com/TheRealStingo/" isExternal>
      <IconButton
        size="md"
        fontSize="lg"
        variant="ghost"
        color="current"
        marginLeft="2"
        icon={<FaGithub />}
        {...props}
      ></IconButton>
    </Link>
  );
};
