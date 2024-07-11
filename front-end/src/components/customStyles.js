export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minWidth: state.selectProps.value ? 'auto' : '100px',
    width: state.selectProps.value ? 'auto' : '100px',
    height: "30px",
    transition: 'border-color 100ms',
    cursor: "pointer",
    borderColor: '#ced4da',
    borderRadius: '6px', 
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
    borderRadius: '10px', 
    border: '1px solid #DBDBDB' 
  }),
  menuList: (provided) => ({
    ...provided,
    width: 'auto',
    whiteSpace: 'nowrap',
    padding: "10px 0px 10px 0px",
    fontSize: "18px",
    boxShadow: "0px 0px 50px 25px #DEDEDE",
    borderRadius: '10px', 
    height: 'auto', 
    overflowY: 'auto', 
   
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
    display: 'none', 
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
    borderRadius: '4px', 
    border: '1px solid #D5D5D5', 
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
    borderRadius: '3px', 
    maxHeight: '250px', 
    overflowY: 'auto', 

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
    display: 'none', 
  }),
};


export const sortStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "300px",
    height: "auto",
    fontSize: '18px',
    transition: "border-color 100ms",
    cursor: "pointer",
    borderColor: "#ced4da",
    borderRadius: "6px",
    backgroundColor: '#C2DAD4',
    "&:hover": {
      borderColor: "#80bdff",
    },
    "&:focus": {
      borderColor: "#80bdff",
    },
    boxShadow: state.menuIsOpen ? "0 0 0 1px #80bdff" : null,
    position: "relative",
  }),
  option: (provided, state) => ({
    ...provided,
    width: "auto",
    height: "auto",
    paddingTop: '5px',
    transition: "background-color 100ms, color 100ms",
    cursor: "pointer",
    backgroundColor: state.isSelected ? "#2a878b" : "white",
    color: state.isSelected ? "white" : "black",
    "&:hover": {
      color: "white",
      backgroundColor: "#2a878b",
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    zIndex: 9999,
    fontSize: "18px",
    width: "auto",
    opacity: state.selectProps.menuIsOpen ? 1 : 0,
    transform: state.selectProps.menuIsOpen
      ? "translateY(0)"
      : "translateY(20px)",
    transition: "opacity 300ms ease-in-out, transform 300ms ease-in-out",
    transformOrigin: "center", // Open and close from the center
    marginTop: "4px",
    animation: state.selectProps.menuIsOpen
      ? "slideUp 300ms ease-in-out"
      : "slideDown 300ms ease-in-out",
    borderRadius: "10px",
    border: "1px solid #DBDBDB",
  }),
  menuList: (provided) => ({
    ...provided,
    width: "100%",
    whiteSpace: "nowrap",
    padding: "10px 0px 10px 0px",
    fontSize: "18px",
    boxShadow: "0px 0px 15px 2px rgba(0, 0, 0, 0.185)",
    borderRadius: "10px",
    height: "auto",
    overflowY: "auto",
    "::-webkit-scrollbar": {
      width: "8px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "10px",
      cursor: "pointer",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#CACACA",
      borderRadius: "10px",
      cursor: "pointer",
      border: '1px solid #858179',
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#858179",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    position: "absolute",
    color: "rgb(29, 172, 53)",
    width: "100%",
    height: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    pointerEvents: "none", // Disable interaction

    "&::before": {
      content: `'${state.selectProps.placeholder}'`,
      color: "#505050",
      whiteSpace: "nowrap",
      marginRight: "10px",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "#BEBEBE",
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
    transition: 'transform 100ms ease-in-out',
    "& svg": {
      width: "15px",
      height: "15px",
    },
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "#505050" , // здесь изменяем цвет placeholder
  }),
}