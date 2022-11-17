import React from 'react'
import ClipboardCopybar from '../components/ClipboardCopybar';

const MainPage: React.FC = () => {
  const [time, setTime] = React.useState('20230101,000000');
  const [color, setColor] = React.useState('000000');
  const [title, setTitle] = React.useState('새해!');

  return (
    <div className='main-container'>
      <span style={{ fontWeight: 'bold', fontSize: 50 }}>Countdown Embed Generator</span>
      <div className='divider' style={{ margin: '5px 0 15px 0' }} />
      <span>카운트다운 임베드 생성기!</span>
      <form className='embed-config-form'>
        <ul>
          <li>
            <label>목표시각</label>
            <input
              type='datetime-local'
              defaultValue={'2023-01-01T00:00'}
              onChange={ev =>
                setTime(ev.target.value.replace(/[-:]/g, '').replace('T', ',') + '00')
              }
            />
          </li>
          <li>
            <label>타이머 색</label>
            <input type='text' value={color} onChange={({ target: { value } }) => {
              setColor(value);
              const elem = document.querySelector('form.embed-config-form > ul :nth-child(3)');
              if (elem) elem.innerHTML = /^#?[a-f|A-F|0-9]{6}$/.test(value) ? '' : 'invalid format!';
            }} />
            <label></label>
          </li>
          <li>
            <label>타이틀</label>
            <input type='text' onChange={ev => setTitle(ev.target.value)} />
          </li>
        </ul>
      </form>
      <div className='embed-container'>
        <iframe src={`/embed/?date=${time}&title=${title}&color=${color}`} />
        <ClipboardCopybar time={time} title={title} color={color} />
      </div>
    </div>
  )
}

export default MainPage;