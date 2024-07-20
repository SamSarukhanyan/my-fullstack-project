export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    zIndex: "4000 !important",
    width: "100%",
    height: "auto",
    fontSize: '18px',
    transition: "border-color 100ms",
    cursor: "pointer",
    borderColor: "#ced4da",
    borderRadius: "6px",
    backgroundColor: 'white',
    "&:hover": {
      borderColor: "#7D7D7D",
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
    position: 'absolute',
    left: '35%',
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
};


export const advancedStyles = {
  control: (provided, state) => ({
    ...provided,
    position: 'relative',
    width: "100%",
    height: "auto",
    transition: "border-color 100ms",
    cursor: "pointer",
    borderColor: "#557c6467",
    borderRadius: "6px",
    backgroundColor: 'white',
    color: 'red',
    "&:hover": {
      borderColor: "#7D7D7D",
    },
    "&:focus": {
      borderColor: "#80bdff",
    },
    boxShadow: state.menuIsOpen ? "0 0 0 1px #80bdff" : null,
  }),
  option: (provided, state) => ({
    ...provided,
    width: "auto",
    paddingTop: '5px',
    height: "auto",
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
    position: 'absolute',
    left: '40%',
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
    boxShadow: "0px 0px 30px 5px #C4C4C4",
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
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
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
      marginRight: "80px",
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
    "&::after": {
      position: "absolute",
      left: "-10px",
      color: "#505050" , // здесь изменяем цвет placeholder
    },
  }),
};