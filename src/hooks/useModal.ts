import { useState } from 'react';
import useGroupUsers from './useGroupUsers';

const useModal = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalHistory, setModalHistory] = useState<string[]>([]);
  const { usersInGroup, groupUsersDiscard } = useGroupUsers();

  const changeActiveModal = (activeModal: string | null) => {
    activeModal = activeModal || null;
    let localModalHistory = modalHistory ? [...modalHistory] : [];

    if (activeModal === null) {
      localModalHistory = [];
    } else if (modalHistory.indexOf(activeModal) !== -1) {
      localModalHistory = localModalHistory.splice(
        0,
        localModalHistory.indexOf(activeModal) + 1
      );
    } else {
      localModalHistory.push(activeModal);
    }

    setActiveModal(activeModal);
    setModalHistory(localModalHistory);
  };

  const modalBack = () => {
    changeActiveModal(modalHistory[modalHistory.length - 2]);
    if (usersInGroup) groupUsersDiscard;
  };

  return { activeModal, changeActiveModal, modalBack };
};

export default useModal;
