import { TargetUrl } from '../../services/CheckTargetService';
import Table from '../Design/Table';

const columns = [
  { field: 'url', label: 'URL' },
  { field: 'xFrameOptions', label: 'X-Frame-Options' },
  { field: 'hsts', label: 'HSTS' },
  { field: 'csp', label: 'CSP' },
];

interface DomainTableProps {
  data: TargetUrl[];
}

export default function DomainTable({ data }: DomainTableProps) {
  return <Table title='Domains' subtitle='A list of validated domains.' columns={columns} data={data} />;
}
