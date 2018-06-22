/**
 *
 * @param {any} param
 *
 * @throws {Error}
 */
function requiredParam(param) {
    const requiredParamError = new Error(
        `Required parameter, "${param}" is missing.`
    );

    // preserve original stack trace
    if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(requiredParamError, requiredParam);
    }

    throw requiredParamError;
}
