import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from '~/components/contexts/UserContext';
import { Head } from '~/components/shared/Head';
import { useFirestore } from '~/lib/firebase';

type Tool = {
  id: string;
  title: string;
  description: string;
  url: string;
};

function Index() {
  const { state } = useAuthState();
  const [tools, setTools] = useState<Array<Tool>>([]);
  const firestore = useFirestore();

  useEffect(() => {
    async function fetchData() {
      const toolsCollection = collection(firestore, 'recos');
      const toolsQuery = query(toolsCollection);
      const querySnapshot = await getDocs(toolsQuery);

      const fetchedData: Array<Tool> = [];

      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() } as Tool);
      });
      console.table(fetchedData);
      setTools(fetchedData);
    }
    fetchData();
  }, []);

  return (
    <>
      <Head title="TOP PAGE" />
      <div className="hero min-h-screen"></div>
    </>
  );
}

export default Index;
