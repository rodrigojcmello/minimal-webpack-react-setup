import { ReactElement } from 'react';
import style from './not-found.module.scss';

function NotFound(): ReactElement {
  return (
    <div className={style['not-found']}>
      <h1>404 not found</h1>
    </div>
  );
}

export default NotFound;
