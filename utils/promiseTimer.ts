export interface promiseTimerReturnDataType {
  cancelTimeoutFunction: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  promise: Promise<any>
}

export function promiseTimer(
  fun: Function,
  delay: number
): promiseTimerReturnDataType {
  let cancelTimeoutFunction;
  const promise = new Promise(function executor(resolve, reject) {
    const timeoutId = setTimeout(async function timeoutHandler() {
      try {
        const result = await fun();
        resolve(result);
      } catch (e) {
        reject(e);
      }
    }, delay);
    cancelTimeoutFunction = () => {
      clearTimeout(timeoutId);
      resolve();
    };
  });

  return {
    cancelTimeoutFunction,
    promise
  };
}