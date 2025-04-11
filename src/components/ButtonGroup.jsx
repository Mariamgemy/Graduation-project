

function ButtonGroup({ onButtonClick }) {
  const buttons = [
    { value: 'button1', label: 'سياسة الخصوصية والحماية  ' },
    { value: 'button3', label: 'الاشتراكات والحسابات  ' },
    { value: 'button2', label: ' المساعدة والدعم  ' },
    { value: 'button4', label: '  عن SmartGov      ' },
    { value: 'button5', label: '  أسئلة عامة    ' },
  ];

  return (
    <div className="d-flex flex-column  align-items-start justify-content-center ">
      {buttons.map((button) => (
        <button
          key={button.value}
          className="btn btn-outline-secondary mb-2 mt-2"
          onClick={() => onButtonClick(button.value)}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
}

export default ButtonGroup;