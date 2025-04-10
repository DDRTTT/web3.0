import './globals.css';
import { Layout } from 'antd';
import SideMenu from './components/SideMenu';
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>
        <Providers>
          <Layout style={{ minHeight: '100vh' }}>
            <SideMenu />
            <Layout>
              {children}
            </Layout>
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
