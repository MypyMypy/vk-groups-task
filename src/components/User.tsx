import { Header, SimpleCell } from '@vkontakte/vkui';
import type { User } from '../types';

const User: React.FC<User> = (props) => {
  return (
    <SimpleCell>
      <Header>
        {props.first_name} {props.last_name}
      </Header>
    </SimpleCell>
  );
};

export default User;
