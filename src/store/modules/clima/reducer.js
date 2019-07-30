export default function clima(state = [], action) {
  switch (action.type) {
    case 'TEMPERATURE_MAX':
      return [...state, action.cidadesListaId];
    default:
      return state;
  }
}
