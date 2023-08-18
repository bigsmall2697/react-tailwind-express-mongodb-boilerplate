import { Layout } from '../../Layout';
import CheckDomainForm from './CheckDomainForm';
import { getUrls, TargetUrl, validateUrl } from '../../services/CheckTargetService';
import DomainTable from './DomainTable';
import { useEffect, useState } from 'react';

export default function CheckDomain() {
  const [data, setData] = useState<TargetUrl[]>([]);

  const getData = async () => {
    const result = await getUrls();
    setData(result);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (url: string) => {
    const result = await validateUrl(url);
    getData();
    return result;
  };

  return (
    <Layout header='Check Domain'>
      <CheckDomainForm onSubmit={handleSubmit} />
      <DomainTable data={data} />
    </Layout>
  );
}
