import Head from 'next/head';

import Navigation from './navigation';
import Icon from '../icons/icon';

function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen flex bg-gray-100">
        <Navigation />
        <section className="flex-1 flex flex-col">
          <header className="flex p-4">
            <div className="flex-1"></div>
            <div className="flex">
              <div className="px-2">
                <Icon width={24} height={24} icon="bell" />
              </div>
              <div className="px-2">
                <Icon width={24} height={24} icon="user" />
              </div>
            </div>
          </header>
          <main className="px-8 flex-1 overflow-hidden">{children}</main>
        </section>
      </div>
    </>
  );
}

export default Layout;
