export default {
    GET_ORDER: 'GET_ORDER',
};

export function getActionSet(action) {
    return action + '_SET';
}

export function getActionSuccess(action) {
    return action + '_SUCCESS';
}

export function getActionFail(action) {
    return action + '_FAIL';
}

export function getActionUnmount(action) {
    return action + '_UNMOUNT';
}
