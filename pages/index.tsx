import { useRouter } from 'next/router';
import React from 'react'
import useInterval from '../hooks/useInterval';

const testDate = '20221120,120311'

const parseDate = (date = testDate) =>
  new Date(+date.slice(0, 4), +date.slice(4, 6) - 1, +date.slice(6, 8), +date.slice(9, 11), +date.slice(11, 13), +date.slice(13, 15))
const getRemainingTime = (date = testDate) =>
  new Date(parseDate(date).getTime() - Date.now());

const Digit: React.FC<{ getter: () => string }> = ({ getter }) => {
  const [time, setTime] = React.useState<string>('00');
  const ref = React.useRef<HTMLDivElement>(null);

  useInterval(() => {
    const remainingTime = getter();
    if (time !== remainingTime) {
      setTime(remainingTime);
      if (ref.current) {
        ref.current.className = 'digit blink';
        setTimeout(() => {
          if (ref.current) ref.current.className = 'digit'
        }, 200);
      }
    }
  }, 10);

  return (
    <div ref={ref} className='digit blink'>
      {time}
    </div>
  )
}

const MainPage: React.FC = () => {
  const [milisecond, setMiliSecond] = React.useState(0);

  const { query } = useRouter();
  const date = query.date?.toString();
  const title = query.title?.toString();
  React.useEffect(() => {
    const id = setInterval(() => {
      setMiliSecond(getRemainingTime(date).getMilliseconds());
    }, 10);
    () => clearInterval(id);
  }, []);

  return (
    <>
      <div className='timer-container'>
        <div className='title'>{title}</div>
        <div className='timer'>
          <Digit getter={() => Math.floor(getRemainingTime(date).getTime() / 1000 / 60 / 60 / 24).toString().padStart(2, '0')} />
          :
          <Digit getter={() => getRemainingTime(date).getHours().toString().padStart(2, '0')} />
          :
          <Digit getter={() => getRemainingTime(date).getMinutes().toString().padStart(2, '0')} />
          :
          <Digit getter={() => getRemainingTime(date).getSeconds().toString().padStart(2, '0')} />
          :
          <div className='digit'>{milisecond.toString().padStart(3, '0')}</div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 50 }}>
        <iframe src='http://localhost:3001' style={{ border: 'none', minWidth: 420 }} />
      </div>
    </>

  )
}




export default MainPage;