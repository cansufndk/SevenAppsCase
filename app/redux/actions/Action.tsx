import { Character } from "@/app/Type/Types";

export enum ActionTypes {
  FETCH_CHARACTERS_REQUEST = "FETCH_CHARACTERS_REQUEST",
  FETCH_CHARACTERS_SUCCESS = "FETCH_CHARACTERS_SUCCESS",
  FETCH_CHARACTERS_FAILURE = "FETCH_CHARACTERS_FAILURE",
  TOGGLE_CHARACTER_SELECTION = "TOGGLE_CHARACTER_SELECTION",
  REMOVE_SELECTED_CHARACTER = "REMOVE_SELECTED_CHARACTER",
}

/*export const fetchCharactersAction = (query: string) => {
  return async (dispatch: any) => {
    dispatch({ type: ActionTypes.FETCH_CHARACTERS_REQUEST });
    try {
      const characters = await fetchCharacters(query);
      dispatch(fetchCharactersSuccess(characters));
    } catch (error: any) {
      dispatch(fetchCharactersFailure(error.message));
    }
  };
};*/

export const fetchCharactersAction = (query: string) => ({
  type: ActionTypes.FETCH_CHARACTERS_REQUEST,
  payload: query,
});

export const fetchCharactersSuccess = (characters: Character[]) => ({
  type: ActionTypes.FETCH_CHARACTERS_SUCCESS,
  payload: characters,
});

export const fetchCharactersFailure = (error: string) => ({
  type: ActionTypes.FETCH_CHARACTERS_FAILURE,
  payload: error,
});

export const toggleCharacterSelection = (character: Character) => ({
  type: ActionTypes.TOGGLE_CHARACTER_SELECTION,
  payload: character,
});

export const removeSelectedCharacter = (characterId: number) => ({
  type: ActionTypes.REMOVE_SELECTED_CHARACTER,
  payload: characterId,
});
