import { authAxios } from "@/utils/axios";

export const getSpecialityById = async () => {
  try {
    const response = await authAxios.get(
      `/speciality/parent-list?expand=children`
    );
    return response.data;
  } catch (error) {
    console.error("GET requestda xatolik:", error);
    throw error;
  }
};

export const findSpecialityById = async (id) => {
  try {
    const response = getSpecialityById();
    return response?.items?.find((item) => item.id === id) || null;
  } catch (error) {
    console.error("GET requestda xatolik:", error);
    throw error;
  }
};
