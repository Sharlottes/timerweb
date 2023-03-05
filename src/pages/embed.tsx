import { useRouter } from 'next/router';
import React from 'react'
import Digit from '../components/Digit';
import { getRemainingTime } from '../utils/getRemainingTime';
import useInterval from '../hooks/useInterval';

const Title: React.FC<{ format: string, date: string }> = ({ format, date }) => {
  const [title, setTitle] = React.useState('');

  useInterval(() => {
    setTitle(format.replace(/(?:^\$|[^\\]\$)(D|H|M|S)/gi, (_, p: string, index: number, string: string) => {
      const obj: Record<string, number> = {
        d: getRemainingTime(date, 'day', true),
        D: getRemainingTime(date, 'day', true),
        H: getRemainingTime(date, 'hour', true),
        h: getRemainingTime(date, 'hour'),
        M: getRemainingTime(date, 'minute', true),
        m: getRemainingTime(date, 'minute'),
        S: getRemainingTime(date, 'second', true),
        s: getRemainingTime(date, 'second')
      }
      return (index === 0 ? '' : string[index]) + (obj[p] ?? '').toString();
    }))
  }, 10);

  return <div className='title'>{title}</div>
}

const TimerEmbed: React.FC = () => {
  const { query } = useRouter();

  const date = query.date?.toString() || "";
  const title = query.title?.toString() || "";
  const color = query.color?.toString().replaceAll('#', '') || '000000';

  return (
    <div className='timer-container'>
      <Title format={title} date={date} />
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
  )
}

export default TimerEmbed;