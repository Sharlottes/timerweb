import React from 'react'
import ClipboardCopybar from '../components/ClipboardCopybar';

const MainPage: React.FC = () => {
  const [date, setDate] = React.useState('20230101');
  const [time, setTime] = React.useState('000000');
  const [color, setColor] = React.useState('000000');
  const [title, setTitle] = React.useState('새해!');

  return (
    <div className='main-container'>
      <span style={{ fontWeight: 'bold', fontSize: 50 }}>Countdown Embed Generator</span>
      <div className='divider' style={{ margin: '5px 0 15px 0' }} />
      <span>카운트다운 임베드 생성기!</span>
      <div>
        <input type='date' defaultValue={'2023-01-01'} onChange={ev => setDate(ev.target.value.replaceAll('-', ''))} />
        <input type='time' defaultValue='00:00' onChange={ev => setTime(ev.target.value.replaceAll(':', '') + '00')} />
        <input type='color' defaultValue={'#' + color} onChange={ev => setColor(ev.target.value.slice(1))} />
        <input type='text' onChange={ev => setTitle(ev.target.value)} />
      </div>
      <ClipboardCopybar date={date} time={time} title={title} color={color} />
    </div>
  )
}

export default MainPage;