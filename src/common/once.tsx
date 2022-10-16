export function once(f: Function) {
  let done: boolean = false;
  return () => {
    if (!done) {
      done = true;
      f();
    }
  };
}
