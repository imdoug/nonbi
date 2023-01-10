import '../styles/globals.css'
import { AuthProvider } from '../src/service/AuthContext'
import { ChatProvider } from '../src/service/ChatContext'
function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <ChatProvider>
        <Component {...pageProps} />
      </ChatProvider>
    </AuthProvider>
  )
}

export default MyApp
  