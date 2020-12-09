import { ReactElement } from 'react';
import style from './page1.module.scss';
import Button from '../../components/Button';

function Page1(): ReactElement {
  return (
    <div className={style.page1}>
      <h1>Page 1</h1>
      <Button
        label="Text"
        onClick={() => {
          // eslint-disable-next-line no-alert
          alert('clicked');
        }}
      />
    </div>
  );
}

export default Page1;
