import chalk from "chalk";

export function clear() {
  console.clear();
}

export function errorLog(err: string) {
  console.log(chalk.red(err));
}

export function defaultLog(log: any) {
  console.log(chalk.white(log));
}
