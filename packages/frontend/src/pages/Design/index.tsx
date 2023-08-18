import { Layout } from '../../Layout';
import Alert from './Alert';
import Card from './Card';
import Forms from './Forms';
import Headings from './Headings';
import Notification from './Notification';
import Table from './Table';

const columns = [
  { field: 'name', label: 'Name' },
  { field: 'title', label: 'Title' },
  { field: 'email', label: 'Email' },
  { field: 'role', label: 'Role' },
  {
    field: 'edit',
    label: '',
    render: (record: { name: string }) => (
      <a href='#' className='text-indigo-600 hover:text-indigo-900'>
        Edit<span className='sr-only'>, {record.name}</span>
      </a>
    ),
  },
];

const people = [
  { name: 'James Bond', title: 'Fixer', email: 'james.bond@example.com', role: 'Member' },
  { name: 'James Bond', title: 'Fixer', email: 'james.bond@example.com', role: 'Member' },
  { name: 'James Bond', title: 'Fixer', email: 'james.bond@example.com', role: 'Member' },
  { name: 'James Bond', title: 'Fixer', email: 'james.bond@example.com', role: 'Member' },
  { name: 'James Bond', title: 'Fixer', email: 'james.bond@example.com', role: 'Member' },
  { name: 'James Bond', title: 'Fixer', email: 'james.bond@example.com', role: 'Member' },
  // More people...
];

export default function Design() {
  return (
    <Layout header='Design'>
      <h2 className='text-4xl font-bold mb-8'>Forms</h2>
      <Forms />
      <hr className='py-12' />
      <h2 className='text-4xl font-bold mb-8'>Card</h2>
      <Card />
      <hr className='py-12' />
      <h2 className='text-4xl font-bold mb-8'>Heading</h2>
      <Headings />
      <hr className='py-12' />
      <h2 className='text-4xl font-bold mb-8'>Table</h2>
      <Table
        title='People'
        subtitle='A list of all the people in this organization.'
        columns={columns}
        data={people}
        onAdd={() => {
          // TODO: Add new user
        }}
      />
      <hr className='py-12' />
      <h2 className='text-4xl font-bold mb-8'>Alert</h2>
      <Alert />
      <Notification open message='A Notification!' />
    </Layout>
  );
}
