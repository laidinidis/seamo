import Layout from '../components/layout/layout';

function Stats() {
  return (
    <Layout title="Statistics">
      <h1 className="text-4xl mb-4">Statistics</h1>
    </Layout>
  );
}

// export async function getServerSideProps() {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery('students', getStudents);

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient)
//     }
//   };
// }

export default Stats;
