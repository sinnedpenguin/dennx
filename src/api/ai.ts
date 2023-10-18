import axios from "axios";

export async function sendPrompt(message: string) {
  try {
    const response = await axios.post(import.meta.env.VITE_API_URL, { prompt: message });
    return response.data.message;
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      return "I'm sorry, but I cannot answer that.";
    }
  }
}