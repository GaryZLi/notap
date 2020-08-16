import * as types from '../action-types/view';

export const updateLines = lines => ({
    type: types.UPDATE_LINES,
    lines,
});

export const updateCurrentLineNumber = number => ({
    type: types.UPDATE_CURRENT_LINE_NUMBER,
    number,
});

export const updateCurrentLineText = text => ({
    type: types.UPDATE_CURRENT_LINE_TEXT,
    text,
});

export const updateLineText = (text, lineNumber) => ({
    type: types.UPDATE_LINE_TEXT,
    text,
    lineNumber,
})

export const updateLineType = lineNumber => ({
    type: types.UPDATE_LINE_TYPE,
    lineNumber,
});