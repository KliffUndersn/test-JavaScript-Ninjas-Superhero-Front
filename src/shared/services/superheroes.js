import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

export async function getAll(credentials) {
  const { data } = await instance.get(`/superheroes/${credentials}`);
  return { data };
}
export async function getById(credentials) {
  const { data } = await instance.get(`/superheroes/hero/${credentials}`);
  return { data };
}
export async function createNew (credentials) {
  const { data } = await instance.post("/superheroes", credentials);
  return { data };
};
export async function updateById(credentials) {
  const { data } = await instance.patch(`/superheroes/hero/${credentials._id}`, credentials);
  return { data };
}
export async function removeById(credentials) {
  console.log(credentials)
  const { data } = await instance.delete(`/superheroes/hero/${credentials}`);
  return { data };
}