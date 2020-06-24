export interface debounceFunctionReturnDataType {
  cancelDelayedTask: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  promise: Promise<any>
}

export function debounceFunction(
  fun: Function,
  delay: number
): debounceFunctionReturnDataType {
  let cancelDelayedTask;
  const promise = new Promise(function executor(resolve, reject) {
    const timeoutHandler = async () => {
      try {
        const result = await fun();
        resolve(result);
      } catch (e) {
        reject(e);
      }

      cancelDelayedTask();
    };

    window.addEventListener('beforeunload', timeoutHandler);
    const timeoutId = setTimeout(timeoutHandler, delay);

    cancelDelayedTask = () => {
      clearTimeout(timeoutId);
      window.removeEventListener('beforeunload', timeoutHandler);
      resolve(null);
    };
  });

  return {
    cancelDelayedTask,
    promise
  };
}