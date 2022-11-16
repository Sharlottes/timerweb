import React from 'react'
import ClipboardCopybar from '../components/ClipboardCopybar';

const getCurrentDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}


const MainPage: React.FC = () => {
  const [date, setDate] = React.useState(getCurrentDate().replaceAll('-', ''));
  const [time, setTime] = React.useState('235900');
  const [title, setTitle] = React.useState('');

  console.log(`${date},${time}`)
  return (
    <div className='main-container'>
      <span style={{ fontWeight: 'bold', fontSize: 50 }}>Countdown Embed Generator</span>
      <div className='divider' style={{ width: '100%', margin: '5px 0 15px 0' }} />
      <span>카운트다운 임베드 생성기!</span>
      <div>
        <input type='date' defaultValue={getCurrentDate()} onChange={ev => setDate(ev.target.value.replaceAll('-', ''))} />
        <input type='time' defaultValue='23:59' onChange={ev => setTime(ev.target.value.replaceAll(':', '') + '00')} />
        <input type='text' onChange={ev => setTitle(ev.target.value)} />
      </div>
      <ClipboardCopybar date={date} time={time} title={title} />
    </div>
  )
}

export default MainPage;