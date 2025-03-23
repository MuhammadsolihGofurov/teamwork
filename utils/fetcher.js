import { REGISTERAUTHKEY } from "./data";

function getAuthHeader() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(REGISTERAUTHKEY);
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }
  return {};
}

// auth fetcher
function updateOptions(options, auth) {
  return {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options.headers,
      ...(auth ? getAuthHeader() : {}), // Faqat auth kerak bo‘lsa qo‘shish
    },
  };
}

export default async function fetcher(
  url = "",
  options = {},
  params = {},
  auth = false
) {
  try {
    const __url = new URL(process.env.API + url);

    Object.keys(params).forEach((key) =>
      __url.searchParams.append(key, params[key])
    );

    const response = await fetch(__url, updateOptions(options, auth));

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetcher Error:", error);
    throw error;
  }
}
