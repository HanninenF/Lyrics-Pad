import uuid from "react-native-uuid";
import { FormAction, LyricType, MusicianType } from "../types/types";

export const initialState: LyricType = {
  id: uuid.v4().toString(),
  title: "",
  content: "",
  composers: { music: [], lyrics: [] },
  createdAt: Date.now(), // 👈 lägg till detta
  tags: [], // valfri, men bra att initiera om du använder det senare
};

export default function formReducer(
  state: LyricType,
  action: FormAction
): LyricType {
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
