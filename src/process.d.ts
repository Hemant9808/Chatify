declare module 'process/browser' {
    import { Process } from 'node:process';
    const process: Process;
    export default process;
  }
  