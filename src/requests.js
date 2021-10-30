import axios from "axios";

const API_URL = process.env.REACT_APP_TODO_API_URL || "http://localhost:6969" || "";

export async function login(loginDTO) {
	return axios.post(`${API_URL}/login`, loginDTO, {withCredentials: true});
}

export async function register(registerDTO) {
	return axios.post(`${API_URL}/register`, registerDTO, {withCredentials: true});
}

export async function logout() {
	return axios.post(`${API_URL}/logout`, {}, {withCredentials: true});
}

export async function me() {
	return axios.get(`${API_URL}/me`, {withCredentials: true});
}

export async function getTodos() {
	return axios.get(`${API_URL}/todos`, {withCredentials: true});
}

export async function postTodo(todoDTO) {
	return axios.post(`${API_URL}/todos`, todoDTO, {withCredentials: true});
}

export async function patchTodo(todoDTO) {
	return axios.patch(`${API_URL}/todos/${todoDTO.id}`, todoDTO, {withCredentials: true});
}

export async function deleteTodo(todoId) {
	return axios.delete(`${API_URL}/todos/${todoId}`, {withCredentials: true});
}
