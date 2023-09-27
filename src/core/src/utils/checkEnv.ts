export const checkEnv = (envs: object) => {
  for (const key in envs) {
    //@ts-ignore
    const value = envs[key];
    if (!value) {
      throw new Error(`env "${key}" is ${value}`);
    }
  }
};
