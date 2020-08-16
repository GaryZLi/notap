import * as types from '../action-types/view';

export const initialState = {
    currentLineNumber: 1,
    lines: [[]],
    currentLineText: '',
};

const viewReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_LINES:
            return {
                ...state,
                lines: action.lines,
            }

        case types.UPDATE_CURRENT_LINE_NUMBER:
            return {
                ...state,
                currentLineNumber: action.number,
            }

        case types.UPDATE_CURRENT_LINE_TEXT:
            return {
                ...state,
                currentLineText: action.text,
            }
    
        case types.UPDATE_LINE_TEXT:
            const lines = state.lines;
            lines[action.lineNumber - 1] = action.text;
            return {
                ...state,
                lines,
            }

        default:
            return state;
    }
}

export default viewReducer;