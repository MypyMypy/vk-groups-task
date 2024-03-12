import type { Group } from '../types';
import { SimpleCell, Avatar, Header, Button } from '@vkontakte/vkui';
import type { User } from '../types';

interface GroupI extends Group {
  changeActiveModal: (activeModal: string) => void;
  setUsersInGroup: (users: User[]) => void;
}

const Group: React.FC<GroupI> = (props) => {
  const avatar = props.avatar_color ? (
    <Avatar
      size={56}
      gradientColor="custom"
      style={{ backgroundColor: `${props.avatar_color}` }}
    />
  ) : null;

  const friendsButtonHandler = (activeModal: string) => {
    props.changeActiveModal(activeModal);
    if (props.friends) props.setUsersInGroup(props.friends);
  };

  const friendsButton = props.friends ? (
    <Button onClick={() => friendsButtonHandler('users-in-groupe')}>
      Количество друзей в группе: {props.friends.length}
    </Button>
  ) : null;

  return (
    <SimpleCell before={avatar}>
      <Header mode="primary">{props.name}</Header>
      <Header mode="secondary">
        {props.closed ? <p>Закрытая</p> : <p>Открытая</p>}
      </Header>
      <Header mode="secondary">
        Количество участников: {props.members_count}
      </Header>
      {friendsButton}
    </SimpleCell>
  );
};

export default Group;
