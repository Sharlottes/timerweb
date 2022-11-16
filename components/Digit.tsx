import React from 'react'
import useInterval from '../hooks/useInterval';

export interface DigitProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  getter: () => string
  ignoreBlink?: boolean
}

const Digit: React.FC<DigitProps> = ({ getter, ignoreBlink = false, ...props }) => {
  const [time, setTime] = React.useState<string>('00');
  const ref = React.useRef<HTMLDivElement>(null);

  useInterval(() => {
    const remainingTime = getter();
    if (time !== remainingTime) {
      setTime(remainingTime);

      if (ignoreBlink) {
        if (ref.current?.className.includes('blink')) ref.current.className = 'digit'
      }
      else if (ref.current) {
        ref.current.className = 'digit blink';
        setTimeout(() => {
          if (ref.current) ref.current.className = 'digit'
        }, 200);
      }
    }
  }, 10);

  return (
    <div ref={ref} className='digit blink' {...props}>
      {time}
    </div>
  )
}

export default Digit;