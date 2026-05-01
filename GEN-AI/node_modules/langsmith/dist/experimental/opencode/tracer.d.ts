import { type RunTreeConfig } from "../../run_trees.js";
type Event = any;
type Message = any;
type Model = any;
type Part = any;
export declare class OpenCodeSessionTracer {
    private sessions;
    private client;
    private inputConfig;
    constructor(inputConfig?: Partial<RunTreeConfig>);
    private getSession;
    private getMessage;
    private getProviderMetadata;
    private sendTrace;
    flush(): Promise<void>;
    handleSystem(input: {
        model: Model;
        sessionID?: string | undefined;
    }, output: {
        system: string[];
    }): Promise<void>;
    handleSessionLoad(sessionID: string, history: (sessionID: string) => Promise<{
        info: Message;
        parts: Part[];
    }[]>): Promise<void>;
    handleEvent({ event: { properties, type } }: {
        event: Event;
    }): Promise<void>;
}
export {};
