import { Group as VKGroup } from '@vkontakte/vkui';
import Group from './Group';
import type { User, Group as GroupI } from '../types';

interface GroupsPropsI {
  groups: GroupI[];
  changeActiveModal: (activeModal: string) => void;
  setUsersInGroup: (users: User[]) => void;
}

const Groups: React.FC<GroupsPropsI> = ({
  changeActiveModal,
  setUsersInGroup,
  groups,
}) => {
  const groupsComponents = groups
    ? groups.map((group) => (
        <Group
          key={group.id}
          id={group.id}
          name={group.name}
          closed={group.closed}
          members_count={group.members_count}
          avatar_color={group.avatar_color}
          friends={group.friends}
          changeActiveModal={changeActiveModal}
          setUsersInGroup={setUsersInGroup}
        />
      ))
    : null;

  return <VKGroup>{groupsComponents}</VKGroup>;
};

export default Groups;
