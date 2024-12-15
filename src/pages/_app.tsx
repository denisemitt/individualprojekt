
import { type AppType } from 'next/app'
import { trpc } from 'src/utils/trpc'
import { ChakraProvider, defaultSystem} from '@chakra-ui/react'
import '../components/Calendar.css'
import '../styles/globals.css'
import '../styles/Spinner.css'


const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider value = {defaultSystem}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default trpc.withTRPC(MyApp)
