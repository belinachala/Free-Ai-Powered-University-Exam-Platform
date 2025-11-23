import axios from 'axios';

export const getDashboard = () => axios.get('/api/teacher/dashboard');

export const addExam = (data: any) => axios.post('/api/teacher/exam', data);

export const addQuestion = (data: any) => axios.post('/api/teacher/question', data);