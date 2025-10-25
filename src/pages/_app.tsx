import { AppProps } from 'next/app';
import { beVietnamPro, playfair } from '@/lib/fonts';
import '@/styles/main.css';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00b96b', // Customize your primary color
        borderRadius: 4,
      },
    }}
  >
    <div className={`${beVietnamPro.className} ${playfair.variable}`}>
      <Component {...pageProps} />
    </div>
  </ConfigProvider>
);

export default MyApp;