// reducers.js
const initialState = {
    lightDot: false,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_LIGHT_DOT':
        return {
          ...state,
          lightDot: !state.lightDot,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  