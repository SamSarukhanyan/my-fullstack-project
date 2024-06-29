export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minWidth: state.selectProps.value ? 'auto' : '100px',
    width: state.selectProps.value ? 'auto' : '100px',
    height: "30px",
    transition: 'border-color 100ms',
    cursor: "pointer",
    borderColor: '#ced4da',
    borderRadius: '6px', // Добавленный стиль для закругленных углов

    '&:hover': {
      borderColor: '#80bdff'
    },
    '&:focus': {
      borderColor: '#80bdff',
    },
    boxShadow: state.menuIsOpen ? '0 0 0 1px #80bdff' : null,
    '& svg': {
      transition: 'transform 200ms ease-in-out',
      transform: state.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)'
    }
  }),
  option: (provided, state) => ({
    ...provided,
    width: 'auto',
    padding: "5px 15px 15px 15px",
    height: "35px",
    transition: 'background-color 100ms, color 100ms',
    cursor: "pointer",
    backgroundColor: state.isSelected ? '#2a878b' : 'white',
    color: state.isSelected ? 'white' : 'black',
    '&:hover': {
      color: "white",
      backgroundColor: "#2a878b"
    }
  }),
  menu: (provided, state) => ({
    ...provided,
    zIndex: 9999,
    fontSize: "18px",
    width: 'auto',
    opacity: state.selectProps.menuIsOpen ? 1 : 0,
    transform: state.selectProps.menuIsOpen ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 300ms ease-in-out, transform 300ms ease-in-out',
    transformOrigin: 'top',
    marginTop: '4px',
    animation: state.selectProps.menuIsOpen ? 'slideUp 300ms ease-in-out' : 'slideDown 300ms ease-in-out',
    borderRadius: '10px', // Добавленный стиль для закругленных углов
    border: '1px solid #DBDBDB' // Добавленный стиль для рамки
  }),
  menuList: (provided) => ({
    ...provided,
    width: 'auto',
    whiteSpace: 'nowrap',
    padding: "10px 0px 10px 0px",
    fontSize: "18px",
    boxShadow: "0px 0px 50px 25px #DEDEDE",
    borderRadius: '10px', // Добавленный стиль для закругленных углов внутреннего списка
    height: 'auto', // Максимальная высота меню
    overflowY: 'auto', // Включаем вертикальную прокрутку
    // Добавленные стили для кастомизации прокрутки
    '::-webkit-scrollbar': {
      width: '8px',
    },
    '::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '10px',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#CACACA',
      borderRadius: '10px',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#495057',
    whiteSpace: 'nowrap',
  }),
  indicatorSeparator: (provided) => ({
    display: 'none', // Удаляет разделитель индикаторов
  }),
};

export const customStylesCurrency = {
  control: (provided, state) => ({
    ...provided,
    height: "35px",
    minWidth: "150px",
    transition: 'border-color 100ms',
    cursor: "pointer",
    fontSize: "15px",
    borderColor: '#ced4da',
    borderRadius: '6px', // Добавленный стиль для закругленных углов

    '&:hover': {
      borderColor: '#80bdff'
    },
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)'
    },
    boxShadow: state.menuIsOpen ? '0 0 0 1px #80bdff' : null,
    '& svg': {
      transition: 'transform 200ms ease-in-out',
      transform: state.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)'
    }
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "15px",
    padding: "5px 5px 8px 10px",
    height: "35px",
    transition: 'background-color 100ms, color 100ms',
    cursor: "pointer",
    backgroundColor: state.isSelected ? '#80bdff' : state.isFocused ? '#f8f9fa' : 'white',
    color: state.isSelected ? 'white' : 'black',
    '&:hover': {
      color: state.isSelected ? '#318CE7' : state.isFocused ? '#318CE7' : 'white',
      backgroundColor: state.isSelected ? '#80bdff' : state.isFocused ? '#f8f9fa' : 'white',
    }
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: '4px', // Добавленный стиль для закругленных углов
    border: '1px solid #D5D5D5', // Добавленный стиль для рамки
    zIndex: 9999,
    opacity: state.selectProps.menuIsOpen ? 1 : 0,
    transform: state.selectProps.menuIsOpen ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 300ms ease-in-out, transform 300ms ease-in-out',
    transformOrigin: 'top',
    marginTop: '4px',
    animation: state.selectProps.menuIsOpen ? 'slideUp 300ms ease-in-out' : 'slideDown 300ms ease-in-out'
  }),
  menuList: (provided) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: '3px', // Добавленный стиль для закругленных углов внутреннего списка
    maxHeight: '250px', // Максимальная высота меню
    overflowY: 'auto', // Включаем вертикальную прокрутку
    // Добавленные стили для кастомизации прокрутки
    '::-webkit-scrollbar': {
      width: '8px',
    },
    '::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '10px',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '10px',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#495057'
  }),
  indicatorSeparator: (provided) => ({
    display: 'none', // Удаляет разделитель индикаторов
  }),
};