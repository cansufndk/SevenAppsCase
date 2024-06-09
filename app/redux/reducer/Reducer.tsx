import { ActionTypes } from "../actions/Action"; // Eylem tiplerini içe aktarın
import { Character } from "@/app/Type/Types";

const initialState = {
  characters: [],
  loading: false,
  error: "",
  selectedCharacters: [],
};

const charactersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.FETCH_CHARACTERS_REQUEST:
      return { ...state, loading: true, error: "" };
    case ActionTypes.FETCH_CHARACTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        characters: action.payload,
        error: "",
      };
    case ActionTypes.FETCH_CHARACTERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ActionTypes.TOGGLE_CHARACTER_SELECTION:
      const isSelected = state.selectedCharacters.some(
        (character: Character) => character.id === action.payload.id
      );
      return {
        ...state,
        selectedCharacters: isSelected
          ? state.selectedCharacters.filter(
              (character: Character) => character.id !== action.payload.id
            )
          : [...state.selectedCharacters, action.payload],
      };

    case ActionTypes.REMOVE_SELECTED_CHARACTER:
      return {
        ...state,
        selectedCharacters: state.selectedCharacters.filter(
          (character: Character) => character.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default charactersReducer;
