import { Icon16Dropdown } from '@vkontakte/icons';
import { ReactNode, useRef, useState, useEffect } from 'react';
import { ActionSheet, ActionSheetItem, Tabs, TabsItem } from '@vkontakte/vkui';
import type { Group as GroupI } from '../types';

interface FiltersPropsI {
  setPopout: (popout: ReactNode | null) => void;
  groupsInitial: GroupI[];
  setGroupsInView: (groups: GroupI[]) => void;
}

interface FiltersI {
  friends: 'all' | 'with' | 'without';
  type: 'all' | 'open' | 'closed';
  color: 'all' | string | undefined;
}

interface ActionItem {
  type: keyof FiltersI;
  label: string;
  value: FiltersI[keyof FiltersI];
}

const actionItemsFriends: ActionItem[] = [
  { type: 'friends', label: 'Все', value: 'all' },
  { type: 'friends', label: 'С друзьями', value: 'with' },
  { type: 'friends', label: 'Без друзей', value: 'without' },
];

const actionItemsTypes: ActionItem[] = [
  { type: 'type', label: 'Все', value: 'all' },
  { type: 'type', label: 'Открытые', value: 'open' },
  { type: 'type', label: 'Закрытые', value: 'closed' },
];

const Filters: React.FC<FiltersPropsI> = ({
  setPopout,
  groupsInitial,
  setGroupsInView,
}) => {
  const friendsTargetRef = useRef(null);
  const typeTargetRef = useRef(null);
  const colorTargetRef = useRef(null);
  const onClose = () => setPopout(null);

  const [filter, setFilter] = useState<FiltersI>({
    friends: 'all',
    type: 'all',
    color: 'all',
  });

  useEffect(() => {
    let filteredGroups = groupsInitial;

    if (filter.friends !== 'all') {
      filteredGroups = filteredGroups.filter((item) => {
        if (filter.friends === 'with') return item.friends;
        if (filter.friends === 'without') return !item.friends;
      });
    }

    if (filter.type !== 'all') {
      filteredGroups = filteredGroups.filter((item) => {
        if (filter.type === 'closed') return item.closed;
        if (filter.type === 'open') return !item.closed;
      });
    }

    if (filter.color !== 'all' && filter.color !== undefined) {
      filteredGroups = filteredGroups.filter((item) => {
        return item.avatar_color === filter.color;
      });
    }

    setGroupsInView(filteredGroups);
  }, [filter, groupsInitial, setGroupsInView]);

  const handleFilterChange = (
    type: keyof FiltersI,
    value: FiltersI[keyof FiltersI]
  ) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [type]: value,
    }));
  };

  const colors = groupsInitial
    .filter((group) => 'avatar_color' in group)
    .map((item) => item.avatar_color?.trim());
  const uniqColors = colors
    .filter((color, index) => colors.indexOf(color) === index)
    .map((color) => (
      <ActionSheetItem
        key={color}
        onClick={() => handleFilterChange('color', color)}
      >
        {color}
      </ActionSheetItem>
    ));

  const openFriends = () =>
    setPopout(
      <ActionSheet onClose={onClose} toggleRef={friendsTargetRef}>
        {actionItemsFriends.map((item) => (
          <ActionSheetItem
            key={item.label}
            onClick={() => handleFilterChange(item.type, item.value)}
          >
            {item.label}
          </ActionSheetItem>
        ))}
      </ActionSheet>
    );

  const openType = () =>
    setPopout(
      <ActionSheet onClose={onClose} toggleRef={typeTargetRef}>
        {actionItemsTypes.map((item) => (
          <ActionSheetItem
            key={item.label}
            onClick={() => handleFilterChange(item.type, item.value)}
          >
            {item.label}
          </ActionSheetItem>
        ))}
      </ActionSheet>
    );

  const openColor = () => {
    setPopout(
      <ActionSheet onClose={onClose} toggleRef={colorTargetRef}>
        <ActionSheetItem
          key={'Все'}
          onClick={() => handleFilterChange('color', 'all')}
        >
          Все
        </ActionSheetItem>
        {uniqColors}
      </ActionSheet>
    );
  };

  return (
    <Tabs>
      <TabsItem
        onClick={openFriends}
        getRootRef={friendsTargetRef}
        after={<Icon16Dropdown />}
      >
        По друзьям
      </TabsItem>
      <TabsItem
        onClick={openType}
        getRootRef={typeTargetRef}
        after={<Icon16Dropdown />}
      >
        По типу группы
      </TabsItem>
      <TabsItem
        onClick={openColor}
        getRootRef={colorTargetRef}
        after={<Icon16Dropdown />}
      >
        По цвету аватарки
      </TabsItem>
    </Tabs>
  );
};

export default Filters;
