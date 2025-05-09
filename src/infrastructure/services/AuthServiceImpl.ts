import axios from "axios";
import { User } from "../../core/domain/User";
import { AuthService } from "../../core/ports/AuthService";

const API_URL = "http://localhost:8000/api/auth";

export class AuthServiceImpl implements AuthService {
  async login(email: string, password: string): Promise<User | null> {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });

      if (response.status === 200) {
        const { id, name, email, token } = response.data;
        return { id, name, email, token };
      }
    } catch (error) {
      console.error("Error en login:", error);
      return null;
    }
    return null;
  }

  async register(firstName: string, lastName: string, email: string, password: string): Promise<User | null> {
    try {
      const name = `${firstName} ${lastName}`;
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password
      });

      if (response.status === 201 || response.status === 200) {
        const { id, name, email, token } = response.data;
        return { id, name, email, token };
      }
    } catch (error) {
      console.error("Error en register:", error);
      return null;
    }
    return null;
  }

  async logout(): Promise<void> {
    // Aquí puedes limpiar localStorage o tokens si decides implementarlo
    localStorage.removeItem("token");
  }
}


    