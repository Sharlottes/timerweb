import React from 'react'

const ColorPickInput: React.FC<{
  color: string,
  setColor: React.Dispatch<React.SetStateAction<string>>
}> = ({ color, setColor }) => {
  const [input, setInput] = React.useState<JSX.Element>(<></>);

  React.useEffect(() => {
    setInput(<input type='color' value={color} onChange={handleColorChange} />);
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
      {input}
      <label className='error'></label>
    </>
  )
}

export default ColorPickInput;