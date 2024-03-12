import { ModalPage, ModalPageHeader, ModalRoot } from '@vkontakte/vkui';
import type { User as UserI } from '../types';
import User from './User';

const MODAL_PAGE_USERS_IN_GROUPE = 'users-in-groupe';

interface ModalPropsI {
  activeModal: string | null;
  onClose: () => void;
  users?: UserI[] | null;
}

const Modal: React.FC<ModalPropsI> = (props) => {
  const users = props.users
    ? props.users.map((user, index) => (
        <User
          key={index}
          first_name={user.first_name}
          last_name={user.last_name}
        />
      ))
    : null;

  return (
    <ModalRoot activeModal={props.activeModal} onClose={props.onClose}>
      <ModalPage id={MODAL_PAGE_USERS_IN_GROUPE}>
        <ModalPageHeader>Ваши друзья в этой группе:</ModalPageHeader>
        {users}
      </ModalPage>
    </ModalRoot>
  );
};

export default Modal;
