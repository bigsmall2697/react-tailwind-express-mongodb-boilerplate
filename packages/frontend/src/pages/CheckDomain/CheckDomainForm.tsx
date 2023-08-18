import { FormEvent, useState } from 'react';
import Notification from '../Design/Notification';

interface CheckDomainFormProps {
  onSubmit: (url: string) => Promise<void>;
}

export default function CheckDomainForm({ onSubmit }: CheckDomainFormProps) {
  const [url, setUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const isValidUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
      if (!isValidUrl) {
        throw new Error('Please enter a valid URL');
      }

      await onSubmit(url);
      setSuccess(true);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form className='space-y-8 divide-y divide-gray-200' onSubmit={handleSubmit}>
        <div className='space-y-6 pt-8 sm:space-y-5 sm:pt-10'>
          <div>
            <h3 className='text-base font-semibold leading-6 text-gray-900'>Check Domain</h3>
            <p className='mt-1 max-w-2xl text-sm text-gray-500'>
              Protect your website with comprehensive security checks and monitor the results in real-time.
            </p>
          </div>
          <div className='space-y-6 sm:space-y-5'>
            <div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
              <label htmlFor='first-name' className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>
                URL
              </label>
              <div className='mt-2 sm:col-span-2 sm:mt-0'>
                <input
                  type='text'
                  name='url'
                  id='url'
                  autoComplete='url'
                  className='block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='pt-5'>
          <div className='flex justify-end gap-x-3'>
            <button
              type='button'
              className='rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              onClick={() => setUrl('')}
              disabled={submitting}
            >
              Reset
            </button>
            <button
              type='submit'
              className='inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              disabled={submitting}
            >
              Save
            </button>
          </div>
        </div>
      </form>

      {!submitting && success ? (
        <Notification
          open
          onClose={() => setSuccess(false)}
          type='success'
          message='Form submitted!'
          description='Your URL is submitted successfully and saved into our database!'
        />
      ) : error ? (
        <Notification open onClose={() => setError('')} type='error' message='Form submission failed!' description={error} />
      ) : null}
    </>
  );
}
