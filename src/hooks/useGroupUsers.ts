import type { User } from '../types';
import { useState } from 'react';

const useGroupUsers = () => {
  const [usersInGroup, setUsersInGroup] = useState<User[] | null>(null);

  const groupUsersDiscard = () => {
    setUsersInGroup(null);
  };

  return { usersInGroup, setUsersInGroup, groupUsersDiscard };
};

export default useGroupUsers;
