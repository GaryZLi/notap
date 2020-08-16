import * as types from '../action-types/view';

export const initialState = {
    currentLineNumber: 1,
    lines: [''],
    currentLineText: '',
};

let temp;

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
            temp = state.lines;

            if (typeof temp[action.lineNumber - 1] === 'string') {
                temp[action.lineNumber - 1] = action.text;
            }
            else {
                temp[action.lineNumber - 1].text = action.text;
            }

            return {
                ...state,
                lines: temp,
            }

        case types.UPDATE_LINE_TYPE:
            temp = [
                ...state.lines
            ];

            if (typeof temp[action.lineNumber - 1] === 'string') {
                temp[action.lineNumber - 1] = {
                    text: temp[action.lineNumber - 1].text || '',
                    language: 'javascript',
                }

                if (action.lineNumber === state.lines.length) {
                    temp.push('');
                }
            }
            else {
                temp[action.lineNumber - 1] = temp[action.lineNumber - 1].text;
            }

            return {
                ...state,
                lines: temp,
            };

        default:
            return state;
    }
}

export default viewReducer;