import { useRouter } from 'next/router';
import React from 'react'
import Digit from '../components/Digit';

const testDate = '20230101,000000'

const parseDate = (date = testDate) => {
  return new Date(+date.slice(0, 4), +date.slice(4, 6) - 1, +date.slice(6, 8), +date.slice(9, 11), +date.slice(11, 13), +date.slice(13, 15))
}

type timeType = 'day' | 'hour' | 'minute' | 'second' | 'milisecond';
const cal: Record<timeType, (n: number) => number> = {
  day: n => n / 1000 / 60 / 60 / 24,
  hour: n => n / 1000 / 60 / 60 % 60,
  minute: n => n / 1000 / 60 % 60,
  second: n => n / 1000 % 60,
  milisecond: n => n % 1000,
}
const getRemainingTime = (date = testDate, type: timeType) => {
  const time = new Date(parseDate(date).getTime() - new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000).getTime() - new Date().getTimezoneOffset() * 60 * 1000;

  return Math.max(Math.floor(cal[type](time)), 0);
}

const TimerEmbed: React.FC = () => {
  const { query } = useRouter();

  const date = query.date?.toString() || undefined;
  const title = query.title?.toString();
  const color = query.color?.toString() || '000000';

  return (
    <div className='center'>
      <div className='timer-container'>
        <div className='title'>{title}</div>
        <div className='timer' style={{ color: '#' + color }}>
          {date && !/\d{8},\d{6}/.test(date)
            ? <span style={{ color: 'red' }}>invalid date format!</span>
            : (<>
              <Digit getter={() => getRemainingTime(date, 'day').toString().padStart(2, '0')} />
              :
              <Digit getter={() => getRemainingTime(date, 'hour').toString().padStart(2, '0')} />
              :
              <Digit getter={() => getRemainingTime(date, 'minute').toString().padStart(2, '0')} />
              :
              <Digit getter={() => getRemainingTime(date, 'second').toString().padStart(2, '0')} style={{ marginRight: 0 }} />
              <div style={{ display: 'flex', transform: 'translateX(-3px)', alignItems: 'first baseline' }}>
                .
                <Digit ignoreBlink
                  getter={() => Math.round(getRemainingTime(date, 'milisecond') / 10).toString().slice(0, 2).padStart(2, '0')}
                  style={{ textAlign: 'left', fontSize: '0.5em', margin: 0, width: '20px' }}
                />
              </div>
            </>)
          }
        </div>
      </div>
    </div>
  )
}

export default TimerEmbed;