import api from './Api';

export interface TargetUrl {
  _id: string;
  url: string;
  xFrameOptions?: string;
  hsts?: string;
  csp?: string;
}

export const validateUrl = async (url: string) => {
  const response = await api.post('/check-target', { url });
  return response.data;
};

export const getUrls = async (): Promise<TargetUrl[]> => {
  const response = await api.get('/check-target');
  return response.data.targets;
};
