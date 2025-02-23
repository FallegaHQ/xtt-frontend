import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

type MenuType = 'link' | 'submenu' | 'separator';

interface BaseMenuItem{
    id: string;
    type?: MenuType;
    name?: string;
    icon?: IconDefinition;
}

interface LinkItem extends BaseMenuItem{
    type?: 'link';
    name: string;
    path: string;
}

interface SubmenuItem extends BaseMenuItem{
    type: 'submenu';
    name: string;
    items: Omit<LinkItem, 'type'>[];
    defaultExpanded?: boolean;
}

type MenuItem = LinkItem | SubmenuItem | (BaseMenuItem & { type: 'separator' });

export type {
    MenuItem,
    LinkItem,
    SubmenuItem,
};
