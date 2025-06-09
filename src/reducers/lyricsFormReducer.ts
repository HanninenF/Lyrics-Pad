import { FormValues, MusicianType } from "../types/types";

type FormAction =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_CONTENT"; payload: string }
  | { type: "ADD_COMPOSER"; role: "music" | "lyrics"; payload: MusicianType }
  | { type: "REMOVE_COMPOSER"; role: "music" | "lyrics"; id: string };

export default function formReducer(
  state: FormValues,
  action: FormAction
): FormValues {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_CONTENT":
      return { ...state, content: action.payload };
    case "ADD_COMPOSER":
      if (
        state.composers[action.role].some((m) => m.id === action.payload.id)
      ) {
        return state;
      }
      return {
        ...state,
        composers: {
          ...state.composers,
          [action.role]: [...state.composers[action.role], action.payload],
        },
      };
    case "REMOVE_COMPOSER":
      return {
        ...state,
        composers: {
          ...state.composers,
          [action.role]: state.composers[action.role].filter(
            (m) => m.id !== action.id
          ),
        },
      };
    default:
      return state;
  }
}
