export type User = {
  id: string;
  username: string;
};

export type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};
