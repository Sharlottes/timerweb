import React from 'react'
import useInterval from '../hooks/useInterval';

const testDate = '20221120,120311'

const parseDate = (date = testDate) =>
  new Date(+date.slice(0, 4), +date.slice(4, 6) - 1, +date.slice(6, 8), +date.slice(9, 11), +date.slice(11, 13), +date.slice(13, 15))

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

export default Digit;