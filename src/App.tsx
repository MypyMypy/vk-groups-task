import { useState, ReactNode, useEffect } from 'react';
import useModal from './hooks/useModal';
import useGroupUsers from './hooks/useGroupUsers';
import { useGetGroupsQuery } from './features/groupsApi/groupsApi';
import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  usePlatform,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './App.css';
import Filters from './components/Filters';
import Groups from './components/Groups';
import Modal from './components/Modal';
import { Group as GroupI } from './types';

function App() {
  const platform = usePlatform();
  const [popout, setPopout] = useState<ReactNode | null>(null);
  const { activeModal, changeActiveModal, modalBack } = useModal();

  const { usersInGroup, setUsersInGroup, groupUsersDiscard } = useGroupUsers();
  const { data, isLoading, isError, isSuccess } = useGetGroupsQuery();
  const [groups, setGroups] = useState<GroupI[]>(data || []);

  useEffect(() => {
    setGroups(data || []);
  }, [data]);

  const modalOnCloseHandler = () => {
    modalBack();
    groupUsersDiscard();
  };

  return (
    <AppRoot>
      <SplitLayout
        popout={popout}
        header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}
        modal={
          <Modal
            activeModal={activeModal}
            onClose={modalOnCloseHandler}
            users={usersInGroup}
          />
        }
      >
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              {isLoading && <p>Loading...</p>}
              {isError && <p>Error Fetching</p>}
              {isSuccess && data && (
                <>
                  <PanelHeader>Ваши группы</PanelHeader>
                  <Filters
                    groupsInitial={data}
                    setGroupsInView={setGroups}
                    setPopout={setPopout}
                  />
                  <Groups
                    groups={groups}
                    changeActiveModal={changeActiveModal}
                    setUsersInGroup={setUsersInGroup}
                  />
                </>
              )}
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
}

export default App;
