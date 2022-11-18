import React from 'react'
import ClipboardCopybar from '../components/ClipboardCopybar';

const ColorPickInput: React.FC<{
  color: string,
  setColor: React.Dispatch<React.SetStateAction<string>>
}> = ({ color, setColor }) => {
  const [input, setInput] = React.useState<{ render: () => JSX.Element }>({ render: () => <></> });

  React.useEffect(() => {
    setInput({ render: () => <input type='color' value={color} onChange={handleColorChange} /> });
  }, [color]);

  const handleColorChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setColor(value);
    const elem = document.querySelector('form.embed-config-form > ul > li > label.error');
    if (elem) elem.innerHTML = /^#?[a-f|A-F|0-9]{6}$/.test(value) ? '' : 'invalid format!';
  }

  return (
    <>
      <label>타이머 색</label>
      <input type='text' value={color} onChange={handleColorChange} />
      {input.render()}
      <label className='error'></label>
    </>
  )
}

const MainPage: React.FC = () => {
  const [time, setTime] = React.useState('20230101,000000');
  const [color, setColor] = React.useState('000000');
  const [title, setTitle] = React.useState('새해!');

  return (
    <div className='main-container'>
      <span style={{ fontWeight: 'bold', fontSize: 50 }}>Countdown Embed Generator</span>
      <div className='divider' style={{ margin: '5px 0 15px 0' }} />
      <div className='content-container'>
        <h2>카운트다운 임베드 생성기!</h2>
        아래의 설정 입력란에 맞춰 카운트다운 임베드를 생성하고 iframe 또는 url로 공유하세요!
        <form className='embed-config-form'>
          <ul>
            <li>
              <label>목표시각</label>
              <input
                type='datetime-local'
                defaultValue={'2023-01-01T00:00'}
                onChange={ev =>
                  setTime(ev.target.value.replaceAll(
                    /[(\-|:)|(T)]/g,
                    (match) => match === '-' || match === ':' ? '' : ','
                  ) + '00')
                }
              />
            </li>
            <li>
              <ColorPickInput color={color} setColor={setColor} />
            </li>
            <li>
              <label>타이틀</label>
              <input
                type='text'
                defaultValue='새해!'
                onChange={ev => setTitle(ev.target.value)} />
            </li>
          </ul>
        </form>
        <iframe src={`/embed/?date=${time}&title=${encodeURIComponent(title)}&color=${encodeURIComponent(color)}`} />
        <div className='divider' style={{ marginTop: '20px' }} />
        <ClipboardCopybar time={time} title={title} color={color} />
      </div>
    </div>
  )
}

export default MainPage;