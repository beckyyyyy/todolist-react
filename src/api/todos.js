import axios from 'axios';

const baseUrl = 'https://todo-list.alphacamp.io/api';

// 發送request前驗證token
const axiosInterceptor = axios.create({
  baseUrl: baseUrl,
});
axiosInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);

// 瀏覽功能
export const getTodos = async () => {
  try {
    const res = await axiosInterceptor.get(`${baseUrl}/todos`);
    return res.data.data;
  } catch (error) {
    console.error('[Get Todos failed]: ', error);
  }
};

// 新增功能 (payload: 用來表示「打包後的資訊」)
export const createTodo = async (payload) => {
  const { title, isDone } = payload;
  try {
    const res = await axiosInterceptor.post(`${baseUrl}/todos`, {
      title,
      isDone,
    });
    return res.data;
  } catch (error) {
    console.error('[Create Todo failed]: ', error);
  }
};

// 修改功能
export const patchTodo = async (payload) => {
  const { id, title, isDone } = payload;
  try {
    const res = await axiosInterceptor.patch(`${baseUrl}/todos/${id}`, {
      title,
      isDone,
    });
    return res.data;
  } catch (error) {
    console.error('[Patch Todo failed]: ', error);
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await axiosInterceptor.delete(`${baseUrl}/todos/${id}`);
  } catch (error) {
    console.error('[Delete Todo failed]: ', error);
  }
};
