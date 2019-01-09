import * as React from 'react';
import { Card } from './../card/cardComponent';
import * as styles from './dashboard.css';

interface ContentListProps {
  items: any;
  handleClick: (id: number) => void;
  routeProps?: any;
  itemKeys: Array<any>;
  itemHeaders: Array<string>;
}

interface ContentListItemProps {
  listItem: any;
  handleClick: (id: number) => void;
  itemKeys: Array<any>;
}

const ContentListItem = (props: ContentListItemProps) => {
  const {
    itemKeys,
    listItem,
  } = props;
  return (
    <li onClick={() => props.handleClick(listItem.id)}>
      {itemKeys && itemKeys.map((key: string, i: number) => {
        return (
          <p key={i}>
            <span>
              {
                typeof key === 'object' ?
                  listItem[key[0]][key[1]] ? listItem[key[0]][key[1]] : '' :
                  listItem[key] ? listItem[key] : ''
              }
            </span>
          </p>
        );
      })}
    </li>
  );
};

export const ContentList = (props: ContentListProps) => {
  const { itemHeaders } = props;
  return (
    <Card>
      <ul className={styles.contentList}>
        <li>{itemHeaders && itemHeaders.map((val, i) => <p key={i}><strong>{val}</strong></p>)}</li>
        {props.items.content && props.items.content.map((listItem: any) => {
          return (
            <ContentListItem
              key={listItem.id}
              handleClick={props.handleClick}
              listItem={listItem}
              itemKeys={props.itemKeys}
            />
          );
        })}
      </ul>
    </Card>
  );
};
