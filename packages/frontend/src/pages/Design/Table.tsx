import { ReactNode } from 'react';

interface TableProps<T> {
  title?: string;
  subtitle?: string;
  onAdd?: VoidFunction;
  columns: Array<{
    label: string;
    field?: string;
    render?: (record: T) => ReactNode;
  }>;
  data: T[];
}

export default function Table<T>({ title, subtitle, onAdd, columns, data }: TableProps<T>) {
  return (
    <div>
      <div className='sm:flex sm:items-center'>
        {(title || subtitle) && (
          <div className='sm:flex-auto'>
            {title && <h1 className='text-base font-semibold leading-6 text-gray-900'>{title}</h1>}
            {subtitle && <p className='mt-2 text-sm text-gray-700'>{subtitle}</p>}
          </div>
        )}
        {onAdd && (
          <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
            <button
              type='button'
              className='block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              onClick={onAdd}
            >
              Add user
            </button>
          </div>
        )}
      </div>
      <div className='mt-8 flow-root'>
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead>
                <tr>
                  {columns.map(({ label, field }) => (
                    <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0' key={field || label}>
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {data.map((item, index) => (
                  <tr key={(item as any).id || index}>
                    {columns.map((col) => (
                      <td className='whitespace-normal py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0' key={col.field || col.label}>
                        {col.render ? col.render(item) : col.field ? (item as any)[col.field] : null}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
