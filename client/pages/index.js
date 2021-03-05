import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>This is the main content</main>

      <footer>This is the footer</footer>
    </div>
  );
}
