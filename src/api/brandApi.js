import axiosClient from './axiosClient';

const brandApi = {
   getAll(params) {
      const url = '/brand';
      return axiosClient.get(url, { params });
   },
   getId(id) {
      const url = `/brand/${id}`;
      return axiosClient.get(url);
   },
   add(data) {
      const url = '/brand';
      return axiosClient.post(url, data);
   },
   update(data) {
      const url = `/brand/${data.id}`;
      return axiosClient.patch(url, data);
   },
   remove(id) {
      const url = `/brand/${id}`;
      return axiosClient.get(url);
   }
}
export default brandApi;